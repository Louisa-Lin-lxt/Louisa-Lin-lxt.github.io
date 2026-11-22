export const productionHost = "louisa-lin-lxt.github.io";
export const counterStartDate = "2026-11-22";
const counterUrl = `https://counterapi.com/api/${productionHost}/view/portfolio-${counterStartDate}`;

// A shared request avoids duplicate counts from Strict Mode, language changes,
// and client-side navigation. A fresh document can record another visit.
export function createVisitCounter(request: typeof fetch = fetch) {
  let pendingCount: Promise<number> | undefined;

  return (hostname: string): Promise<number> => {
    pendingCount ??= request(`${counterUrl}?unique=false&readOnly=${hostname !== productionHost}`, {
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    }).then(async response => {
      if (!response.ok) throw new Error("Visit count unavailable");
      const { value } = await response.json();
      if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid visit count");
      return value as number;
    });
    // Do not retry an ambiguous failure: the service may have recorded it.
    return pendingCount;
  };
}

export const readVisitCount = createVisitCounter();
