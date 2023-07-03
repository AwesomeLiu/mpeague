import { parseISO, isSameYear } from "date-fns";
import format from "@/lib/format";

type DateProps = {
  dateString: string;
};

export default function DateCom({ dateString }: DateProps) {
  const date: Date = parseISO(dateString);
  const formatStr: string = isSameYear(date, new Date()) ? "MM-dd" : "yyyy-MM-dd";

  return (
    <time
      dateTime={dateString}
      className="text-[16px]"
    >
      {format(date, formatStr)}
    </time>
  );
}
