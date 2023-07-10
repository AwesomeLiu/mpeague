import cn from "classnames";
import { getTeamsRank } from "@/lib/api";
import Avatar from "../avatar";

export default async function TeamRank() {
  const dataSource = await getTeamsRank();

  return (
    <ol>
      {
        dataSource.map(d => (
          <li key={d.id}>
            <div className="flex items-center justify-center gap-[25px] hoverCard">
              <div
                className={cn("px-[8px] py-[4px] text-[24px] font-bold text-white rounded-[8px]", {
                  "bg-red": d.rank === 1,
                  "bg-green": d.rank !== 1 && d.eliminated === false,
                  "bg-same-300": d.rank !== 1 && d.eliminated === true,
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
              <div className="basis-[280px] text-[24px] font-bold text-left">{d.name}</div>
              <div className="basis-[150px] text-[24px] font-bold text-right">{d.score}</div>
              <div className="basis-[150px] text-[24px] font-bold text-right">{d.diff}</div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}