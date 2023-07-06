// number or null to percentage
export default function formatSurfix(
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
