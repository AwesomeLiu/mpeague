"use client"

import { useEffect, useState } from "react";
import { getDay } from "date-fns";
import { ArrowsPointingInIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DailyScore } from "@/lib/types";
import format from "@/lib/format";
import Modal from "../modal/modal";
import GameRank from "../player/gameRank";
import GameChart from "./gameChart";

type DetailModalProps = {
  visible: boolean;
  data: DailyScore;
  closeFunc: Function;
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

export default function DetailModal({ visible, data, closeFunc }: DetailModalProps) {
  const [session, setSession] = useState<number | null>(null);

  const { date, teams, games }: DailyScore = data;

  const dateString: string = format(date, "MM/dd");
  const day: string = days[getDay(date)];

  useEffect(() => {
    return () => {
      setSession(null);
    };
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={1200}
      closeFunc={() => closeFunc()}
    >
      <h1 className="text-3xl font-bold text-center mt-[20px] my-[30px]">
        {dateString}
        <span className="text-xl ml-[5px]">{day}</span>
      </h1>
      <div className="relative grid grid-cols-3 gap-[20px] justify-items-center">
        {
          games.filter(d => session ? d.session === session : true).map(d => (
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
              <GameRank dataSource={d.result} />
            </section>
          ))
        }
        {
          session &&
          <section className="col-span-2">
            <GameChart key={session} />
            <ArrowsPointingInIcon
              className="absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer"
              onClick={() => setSession(null)}
            />
          </section>
        }
      </div>
    </Modal>
  );
}