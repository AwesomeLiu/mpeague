import { ScheduleType } from "@/lib/types";
import { getCurrentSchedule } from "@/lib/api";
import Container from "../container";
import ScheduleCardWrapper from "./scheduleCardWrapper";

export default async function CurrentSchedule() {
  const schedule = await getCurrentSchedule() as ScheduleType[];

  return (
    <section className="mb-[80px] py-[60px] bg-green">
      <h1 className="text-5xl text-white font-bold text-center mb-[16px]">SCHEDULE</h1>
      <h2 className="text-2xl text-white font-bold text-center mb-[32px]">日程</h2>
      <Container cns="w-[650px]">
        {
          schedule.map((d, i) => (
            <ScheduleCardWrapper
              key={i}
              type="row"
              schedule={d}
            />
          ))
        }
        <div id="schedule" role="anchor"></div>
      </Container>
    </section>
  );
}
