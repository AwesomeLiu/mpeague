"use client"

import { useEffect, useState } from "react";
import { getDay } from "date-fns";
import { ArrowsPointingInIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { GameDetail, ScheduleDetail, TeamDetail } from "@/lib/types";
import format from "@/lib/formatDate";
import GameRank from "../player/gameRank";
import GameChart from "./gameChart";
import TeamDetailRank from "../team/teamDetailRank";

type DetailModalContentProps = {
  visible: boolean;
  detail: ScheduleDetail[];
  showTeamDetail: boolean;
  teamDetail: TeamDetail[];
  gameDetail: GameDetail[];
};

const days: Record<number, string> = {
  0: "（日）",
  1: "（一）",
  2: "（二）",
  3: "（三）",
  4: "（四）",
  5: "（五）",
  6: "（六）",
};

export default function DetailModalContent({
  visible,
  detail,
  showTeamDetail,
  teamDetail,
  gameDetail,
}: DetailModalContentProps) {
  const [session, setSession] = useState<number | null>(null);

  const date = detail[0].date;
  const dateString: string = format(date, "MM/dd");
  const day: string = days[getDay(date)];

  const themes = detail[0].players.map(d => d.teamInfo.theme);

  useEffect(() => {
    return () => {
      setSession(null);
    };
  }, [visible]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-[20px] my-[30px]">
        {dateString}
        <span className="text-xl ml-[5px]">{day}</span>
      </h1>
      {
        showTeamDetail ?
          <TeamDetailRank teamDetail={teamDetail} />
          :
          <div className="relative grid grid-cols-3 gap-[20px] justify-items-center">
            {
              detail.filter(d => session ? d.session === session : true).map(d => (
                <section key={d.session} className="mb-[20px]">
                  <h2 className="relative text-xl leading-[28px] text-slate-500 font-bold text-center mb-[8px]">
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => setSession(d.session)}
                    >
                      第{d.session}回合
                    </span>
                    {
                      session && session !== 1 &&
                      <ChevronLeftIcon
                        className="absolute top-0 left-0 w-[28px] h-[28px] cursor-pointer"
                        onClick={() => setSession(session - 1)}
                      />
                    }
                    {
                      session && session !== 3 &&
                      <ChevronRightIcon
                        className="absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer"
                        onClick={() => setSession(session + 1)}
                      />
                    }
                  </h2>
                  <GameRank dataSource={d.players} />
                </section>
              ))
            }
            {
              session && gameDetail.length > 0 &&
              <section className="col-span-2">
                <GameChart
                  key={session}
                  data={gameDetail[session - 1].detail}
                  themes={themes}
                />
                <ArrowsPointingInIcon
                  className="absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer"
                  onClick={() => setSession(null)}
                />
              </section>
            }
          </div>
      }
    </>
  );
}