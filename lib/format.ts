import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

// by providing a default string of "PP" or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
// PP: Apr 29, 1993
export function formatDate(
  date: number | Date,
  formatStr: string = "PP",
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1,
): string {
  return format(date, formatStr, {
    locale: zhCN,
    weekStartsOn,
  });
}

// number or null to percentage or text with 'pt'
export function formatSurfix(
  num: string | number | null,
  surfix?: "%" | "pt",
  decimal: number = 2
): string {
  if (typeof num === "number" || typeof num === "string") {
    if (surfix === "%") {
      return (+num * 100).toFixed(decimal) + surfix;
    } else if (surfix === "pt") {
      return num + " " + surfix;
    } else {
      return num + "";
    }
  }
  return "-";
}
