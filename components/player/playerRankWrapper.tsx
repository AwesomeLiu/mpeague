"use client";

import { useState } from "react";
import cn from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { FCProps } from "@/lib/types";
import styles from "./player.module.css";

export default function PlayerRankWrapper({ children }: FCProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  return (
    <>
      <div
        className={cn("flex justify-between gap-[25px] mb-[24px] overflow-hidden", {
          [styles.top10]: isCollapsed
        })}
      >
        {children}
      </div>
      <button
        className="group block mx-auto font-bold btn btn-border"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {
          isCollapsed ?
            <>
              <span>展开</span>
              <ChevronDownIcon className="inline-block animate-bounce stroke-2 w-5 h-5 ml-[5px] group-hover:text-white" />
            </>
            :
            <>
              <span>收起</span>
              <ChevronUpIcon className="inline-block animate-rebounce stroke-2 w-5 h-5 ml-[5px] group-hover:text-white" />
            </>
        }
      </button>
    </>
  );
}