import cn from "classnames";
import { Player } from "@/lib/types";
import Avatar from "../avatar";

type GameRankProps = {
  dataSource: Player[];
};

export default function GameRank({ dataSource }: GameRankProps) {
  dataSource.sort((a, b) => a.rank - b.rank);

  return (
    <ol>
      {
        dataSource.map(d => (
          <li
            key={d.id}
            className="mb-[15px]"
          >
            <div className="flex items-center justify-between gap-[15px] w-[330px]">
              <div
                className={cn("px-[8px] py-[4px] text-[24px] font-bold text-white rounded-[8px]", {
                  "bg-red": d.rank === 1,
                  "bg-green": d.rank !== 1,
                })}
              >
                {d.rank}
              </div>
              <div className="basis-[100px] relative">
                <Avatar
                  src={d.avatar}
                  alt={d.name}
                  size={100}
                />
                <Avatar
                  src={d.team.avatar}
                  alt={d.team.name}
                  size={50}
                  cns="absolute right-[-15px] bottom-[-15px]"
                />
              </div>
              <div className="basis-[150px] font-bold">
                <p className="text-[22px] mb-[8px] max-w-[150px] truncate">{d.name}</p>
                <p className="text-[18px] max-w-[150px] truncate">{d.score}</p>
              </div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}