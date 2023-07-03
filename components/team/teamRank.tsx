import cn from "classnames";
import { TeamScore } from "@/lib/types";
import { getTeamScore } from "@/lib/api";
import Avatar from "../avatar";

export default async function TeamRank() {
  const dataSource: TeamScore[] = await getTeamScore();

  return (
    <ol>
      {
        dataSource.map(d => (
          <li key={d.id}>
            <div className="flex items-center justify-center gap-[25px]">
              <div
                className={cn("px-[8px] py-[4px] text-[24px] font-bold text-white rounded-[8px]", {
                  "bg-red": d.rank === 1,
                  "bg-green": d.rank !== 1 && d.eliminated === true,
                  "bg-same-300": d.rank !== 1 && d.eliminated === false,
                })}
              >
                {d.rank}
              </div>
              <div className="basis-[100px]">
                <Avatar
                  src={d.avatar}
                  alt={d.name}
                  size={100}
                />
              </div>
              <div className="basis-[280px] text-[24px] font-bold">{d.name}</div>
              <div className="basis-[130px] text-[24px] font-bold text-right">{d.score} pt</div>
              <div className="basis-[130px] text-[24px] font-bold text-right">{d.diff} pt</div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}