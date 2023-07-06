import { ScheduleType } from "@/lib/types";
import { getScheduleByRound } from "@/lib/api";
import ScheduleCardWrapper from "./scheduleCardWrapper";

type SeasonProps = {
  round: string | string[] | undefined;
};

export default async function Season({ round }: SeasonProps) {
  if (typeof round !== "string" || !(Number.isInteger(Number(round)) && Number(round) > 0)) {
    round = "1";
  }

  const schedule = await getScheduleByRound(+round) as ScheduleType[];

  return (
    <section className="grid grid-cols-4 gap-[25px] justify-items-center">
      {
        schedule.map((d, i) => (
          <ScheduleCardWrapper
            key={i}
            type="card"
            schedule={d}
          />
        ))
      }
    </section>
  );
}
