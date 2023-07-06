import cn from "classnames";
import { TeamDetail } from "@/lib/types";
import Avatar from "../avatar";

type TeamDetailRankProps = {
  teamDetail: TeamDetail[];
};

export default function TeamDetailRank({ teamDetail }: TeamDetailRankProps) {
  return (
    <ol>
      {
        teamDetail.map(d => (
          <li key={d.id}>
            <div className="flex items-center justify-center gap-[25px]">
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
              <div className="basis-[500px] grid grid-cols-5 gap-[10px] justify-items-center">
                {
                  d.players?.map(p => (
                    <Avatar
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      size={80}
                    />
                  ))
                }
              </div>
              <div className="basis-[150px] text-[24px] font-bold text-right">{d.score}</div>
              <div className="basis-[150px] text-[24px] font-bold text-right">
                <span className="text-[40px] text-lime-600 mr-[10px]">{d.matches}</span>
                <span>/ 80</span>
              </div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}