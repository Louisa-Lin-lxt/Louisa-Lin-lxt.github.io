export type Season = "christmas" | null;

// Recurs every year in the visitor's local calendar, including the January wrap.
export function seasonForDate(date: Date): Season {
  const day = (date.getMonth() + 1) * 100 + date.getDate();
  return day >= 1122 || day <= 106 ? "christmas" : null;
}
