import { Suspense } from "react";
import Link from "next/link";
import cn from "classnames";
import { getGameRounds } from "@/lib/api";
import Container from "@/components/container";
import Skeleton from "@/components/layout/skeleton";
import Season from "@/components/schedule/season";
import CurrentSchedule from "@/components/schedule/currentSchedule";

type SchedulePageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  };
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const { round } = searchParams;
  const check = typeof round === "string";
  const rounds = await getGameRounds();

  return (
    <>
      <CurrentSchedule />
      <Container cns="w-[900px]">
        <section className="mb-[36px]">
          <div className="grid grid-cols-8 gap-[16px]">
            {
              rounds.map(d => (
                d.disabled ?
                  <button
                    key={d.round}
                    className="btn btn-disabled font-bold w-[100%] !mr-0"
                    disabled={d.disabled}
                  >
                    {d.remark}
                  </button>
                  :
                  <Link
                    key={d.round}
                    href={{ query: { round: d.round }, hash: "schedule" }}
                  >
                    <button
                      className={cn("btn font-bold w-[100%] !mr-0", {
                        "btn-border": !((check && round === d.round) || (!check && d.round === "1")),
                        "btn-primary": (check && round === d.round) || (!check && d.round === "1"),
                      })}
                    >
                      {d.remark}
                    </button>
                  </Link>
              ))
            }
          </div>
        </section>
        <Suspense fallback={<Skeleton />}>
          <Season round={round} />
        </Suspense>
      </Container>
    </>
  );
}
