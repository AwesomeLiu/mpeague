import { DailyScore } from "@/lib/types";
import { getLastSchedule } from "@/lib/api";
import ScheduleCard from "@/components/schedule/scheduleCard";
import Container from "../container";

export default async function LastSchedule() {
  const schedule = await getLastSchedule() as DailyScore[];

  return (
    <section className="mb-[80px] py-[50px] bg-green" role="intro">
      <h1 className="text-5xl text-white font-bold text-center mb-[16px]">SCHEDULE</h1>
      <h2 className="text-2xl text-white font-bold text-center mb-[32px]">日程</h2>
      <Container cns="w-[650px]">
        {
          schedule.map((d, i) => (
            <ScheduleCard
              key={i}
              type="row"
              data={d}
            />
          ))
        }
      </Container>
    </section>
  );
}
