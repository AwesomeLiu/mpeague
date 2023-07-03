import { DailyScore } from "@/lib/types";
import { getScheduleByDate } from "@/lib/api";
import ScheduleCard from "@/components/schedule/scheduleCard";

type SeasonProps = {
  start: Date;
  end: Date;
};

export default async function Season({ start, end }: SeasonProps) {
  const schedule = await getScheduleByDate(start, end) as DailyScore[];

  return (
    <section className="grid grid-cols-4 gap-[25px] justify-items-center">
      {
        schedule.map((d, i) => (
          <ScheduleCard
            key={i}
            type="card"
            data={d}
          />
        ))
      }
    </section>
  );
}
