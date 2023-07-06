import cn from "classnames";
import { PlayerRankType } from "@/lib/types";
import { getPlayerRank } from "@/lib/api";
import Avatar from "../avatar";
import styles from "./player.module.css";

type PlayerRankProps = {
  title: string;
  type: PlayerRankType;
};

export default async function PlayerRank({ title, type }: PlayerRankProps) {
  const dataSource = await getPlayerRank(type);

  return (
    <div className="w-[400px]">
      <h3 className="text-center text-lg font-bold mb-[12px]">{title}</h3>
      <ol>
        {
          dataSource.map(d => (
            <li key={d.id}>
              <div
                className={cn("flex items-center justify-center gap-[12px] py-[6px]", {
                  "bg-green text-white rounded-[8px]": d.rank === 1,
                })}
              >
                <div
                  className={cn("basis-[30px] leading-[30px] text-[18px] text-center", {
                    "bg-white text-green rounded-full": d.rank === 1,
                    "font-bold": d.rank <= 3
                  })}
                >
                  {d.rank}
                </div>
                <div
                  className={cn("basis-[36px] relative", {
                    [styles.champion]: d.rank === 1
                  })}
                >
                  <Avatar
                    src={d.avatar}
                    alt={d.name}
                    size={36}
                  />
                </div>
                <div
                  className={cn("basis-[140px] text-[16px]", {
                    "font-bold": d.rank <= 3
                  })}
                >
                  {d.name}
                </div>
                <div
                  className={cn("basis-[100px] text-[16px] text-right", {
                    "font-bold": d.rank <= 3
                  })}
                >
                  {d.score}
                </div>
              </div>
            </li>
          ))
        }
      </ol>
    </div>
  );
}