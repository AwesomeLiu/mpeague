import cn from "classnames";
import { FCProps } from "@/lib/types";
import styles from "./popover.module.css";

type PopoverProps = FCProps & {
  position?: "top" | "right" | "bottom" | "left";
  content: string | React.ReactNode;
}

export default function Popover({ position = "top", content, children }: PopoverProps) {
  return (
    <div className="group">
      <div
        className={cn("absolute z-100 hidden group-hover:block", {
          "left-[50%] top-[-16px] translate-x-[-50%] translate-y-[-100%]": position === "top",
          "right-[-16px] top-[50%] translate-x-[100%] translate-y-[-50%]": position === "right",
          "left-[50%] bottom-[-16px] translate-x-[-50%] translate-y-[100%]": position === "bottom",
          "left-[-16px] top-[50%] translate-x-[-100%] translate-y-[-50%]": position === "left",
        })}
      >
        <div
          className={cn(styles.arrow, "absolute block w-[16px] h-[16px] overflow-hidden z-10", {
            "left-[50%] bottom-0 translate-x-[-50%] translate-y-[100%] -rotate-180": position === "top",
            "left-0 top-[50%] translate-x-[-100%] translate-y-[-50%] -rotate-90": position === "right",
            "left-[50%] top-0 translate-x-[-50%] translate-y-[-100%]": position === "bottom",
            "right-0 top-[50%] translate-x-[100%] translate-y-[-50%] rotate-90": position === "left",
          })}
        >
        </div>
        <div className="border-[2px] border-green border-solid rounded-[8px] min-w-[200px] p-[10px] bg-white">
          {content}
        </div>
      </div>
      {children}
    </div>
  );
}