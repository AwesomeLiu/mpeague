import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

// by providing a default string of "PP" or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
// PP: Apr 29, 1993

export default function formatDate(
  date: number | Date,
  formatStr: string = "PP",
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1,
) {
  return format(date, formatStr, {
    locale: zhCN,
    weekStartsOn,
  });
}
