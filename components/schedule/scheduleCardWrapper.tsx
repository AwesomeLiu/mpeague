import { ScheduleType } from "@/lib/types";
import { getGameDetailByGameId, getScheduleDetail, getTeamsRank } from "@/lib/api";
import ScheduleCard from "./scheduleCard";

type ScheduleCardWrapperProps = {
  type: "row" | "card";
  schedule: ScheduleType;
};

export default async function ScheduleCardWrapper({ type, schedule }: ScheduleCardWrapperProps) {
  const { date, teams }: ScheduleType = schedule;
  const teamIds = teams.map(d => d.id);
  const detail = await getScheduleDetail(date, teams);
  const teamDetail = await getTeamsRank(teamIds, true);

  const gameIds = detail.map(d => d.gameId);
  const gameDetail = await getGameDetailByGameId(gameIds);

  return (
    <ScheduleCard
      type={type}
      schedule={schedule}
      detail={detail}
      teamDetail={teamDetail}
      gameDetail={gameDetail}
    />
  );
}