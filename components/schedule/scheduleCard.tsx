"use client"

import { useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { getDay, isToday } from "date-fns";
import { FCProps, GameDetail, ScheduleDetail, ScheduleType, TeamDetail } from "@/lib/types";
import { formatDate } from "@/lib/format";
import styles from "./schedule.module.css";
import Modal from "../modal/modal";
import DetailModalContent from "./detailModalContent";

type ScheduleCardProps = FCProps & {
  type: "row" | "card";
  schedule: ScheduleType;
  detail: ScheduleDetail[];
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

export default function ScheduleCard({
  type,
  schedule, 
  detail,
  teamDetail,
  gameDetail,
}: ScheduleCardProps) {
  const [visible, setVisible] = useState(false);

  const { date, teams, winner }: ScheduleType = schedule;

  const dateString: string = formatDate(date, "MM/dd");
  const day: string = days[getDay(date)];

  return (
    <>
      <div
        className={cn(styles[type], "hoverCard cursor-pointer")}
        onClick={() => setVisible(true)}
      >
        <div
          className={cn(styles.date, {
            "!text-yellow-300": isToday(date)
          })}
        >
          <time
            dateTime={dateString}
            className="block text-3xl font-bold"
          >
            {dateString}
          </time>
          <div className="text-xl font-bold">{day}</div>
        </div>
        <div className={styles.inner}>
          {
            teams.map(d => (
              <div
                key={d.id}
                className={cn({
                  "grayscale": winner != null && d.id !== winner
                })}
              >
                <Image
                  src={d.avatar}
                  alt={d.name}
                  width={type === "card" ? 80 : 100}
                  height={type === "card" ? 80 : 100}
                />
              </div>
            ))
          }
        </div>
      </div>
      <Modal
        visible={visible}
        width={1200}
        closeFunc={() => setVisible(false)}
      >
        <DetailModalContent
          visible={visible}
          detail={detail}
          showTeamDetail={winner == null}
          teamDetail={teamDetail}
          gameDetail={gameDetail}
        />
      </Modal>
    </>
  );
}