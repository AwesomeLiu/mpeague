import cn from "classnames";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { UnionPlayer } from "@/lib/types";
import Avatar from "../avatar";

type GameRankProps = {
  dataSource: UnionPlayer[];
};

export default function GameRank({ dataSource }: GameRankProps) {
  dataSource.sort((a, b) => (+b.score) - (+a.score));

  return (
    <ol>
      {
        dataSource.map((d, i) => (
          <li
            key={"id" in d ? d.id : d.teamInfo.id}
            className="mb-[15px]"
          >
            <div className="flex items-center justify-between gap-[15px] w-[330px]" role={`team_${i}`}>
              <div
                className={cn("px-[8px] py-[4px] text-[24px] font-bold text-white rounded-[8px]", {
                  "bg-red": i === 0,
                  "bg-green": i > 0,
                })}
              >
                {i + 1}
              </div>
              <div className="basis-[100px] relative">
                {
                  "id" in d && d.id && d.avatar ?
                    <Avatar
                      src={d.avatar}
                      alt={d.name}
                      size={100}
                    />
                    :
                    <UserCircleIcon className="w-[100px] h-[100px] fill-gray-300"/>
                }
                <Avatar
                  src={d.teamInfo.avatar}
                  alt={d.teamInfo.name}
                  size={50}
                  cns="absolute right-[-15px] bottom-[-15px]"
                />
              </div>
              <div className="basis-[150px] font-bold">
                <p className="text-[22px] mb-[8px] max-w-[150px] truncate">{"id" in d ? d.name : "-"}</p>
                <p className="text-[18px] max-w-[150px] truncate">{d.score}</p>
              </div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}