import { Suspense } from "react";
import Link from "next/link";
import cn from "classnames";
import { startOfWeek, addDays } from "date-fns";
import { GameRound } from "@/lib/types";
import { getGameRounds } from "@/lib/api";
import Container from "@/components/container";
import Skeleton from "@/components/layout/skeleton";
import Season from "@/components/schedule/season";
import LastSchedule from "@/components/schedule/lastSchedule";

type SchedulePageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  };
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const { round } = searchParams;

  const today: Date = new Date();
  const start: Date = startOfWeek(today, { weekStartsOn: 1 });
  const end: Date = addDays(start, 5);

  // round
  const rounds = await getGameRounds() as GameRound[];

  // round schedule
  const check = typeof round === "string";
  const startDate = check ? rounds[+round - 1].start : start;
  const endDate = check ? rounds[+round - 1].end : end;

  return (
    <>
      <LastSchedule />
      <Container cns="w-[900px]">
        <section className="mb-[36px]" id="schedule">
          <div className="grid grid-cols-8 gap-[16px]">
            {
              rounds.map(d => (
                <Link
                  key={d.round}
                  href={{ query: { round: d.round }, hash: "schedule" }}
                >
                  <button
                    className={cn("btn font-bold w-[100%] !mr-0", {
                      "btn-border": !(check && round === d.round),
                      "btn-primary": check && round === d.round,
                      "btn-disabled": d.disabled
                    })}
                    disabled={d.disabled}
                  >
                    {d.remark}
                  </button>
                </Link>
              ))
            }
          </div>
        </section>
        <Suspense fallback={<Skeleton />}>
          <Season
            start={startDate}
            end={endDate}
          />
        </Suspense>
      </Container>
    </>
  );
}
