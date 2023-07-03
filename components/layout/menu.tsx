"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { tMenu } from "@/lib/types";

type MenuProps = {
  menu: tMenu[];
};

export default function Menu({ menu }: MenuProps) {
  const pathname = usePathname();

  return (
    <>
      {
        menu.length > 0 && 
          <ul className="flex gap-[30px]">
            {
              menu.map(d => (
                <li
                  key={d.path}
                  className={cn("font-bold text-[20px] hover:text-green", {
                    "text-green": pathname === d.path
                  })}
                >
                  <Link href={d.path}>{d.label}</Link>
                </li>
              ))
            }
          </ul>
      }
    </>
  );
}
