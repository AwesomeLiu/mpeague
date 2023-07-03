"use client"

import { useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { getDay, isToday } from "date-fns";
import { DailyScore } from "@/lib/types";
import format from "@/lib/format";
import DetailModal from "./detailModal";
import styles from "./schedule.module.css";

type ScheduleCardProps = {
  type: "row" | "card";
  data: DailyScore;
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

export default function ScheduleCard({ type, data }: ScheduleCardProps) {
  const [visible, setVisible] = useState(false);

  const { date, teams }: DailyScore = data;

  const dateString: string = format(date, "MM/dd");
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
                  "grayscale": d.rank !== 1,
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
      <DetailModal
        visible={visible}
        data={data}
        closeFunc={() => setVisible(false)}
      />
    </>
  );
}