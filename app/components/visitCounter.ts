export const productionHost = "louisa-lin-lxt.github.io";
export const counterStartDate = "2026-11-22";
const counterUrl = `https://counterapi.com/api/${productionHost}/view/portfolio-${counterStartDate}`;

// A shared request avoids duplicate counts from Strict Mode, language changes,
// and client-side navigation. A fresh document can record another visit.
export function createVisitCounter(request: typeof fetch = fetch) {
  let pendingCount: Promise<number> | undefined;

  return (hostname: string): Promise<number> => {
    const recordsVisit = hostname === productionHost;
    // Incrementing is the provider's default. Only send readOnly when reading;
    // do not rely on the service interpreting the string "false" as a boolean.
    const url = recordsVisit ? counterUrl : `${counterUrl}?readOnly=true`;
    pendingCount ??= request(url, {
      credentials: "omit",
      // Send only the site origin, never the page path or query string.
      referrerPolicy: "strict-origin",
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    }).then(async response => {
      if (!response.ok) throw new Error("Visit count unavailable");
      const { value } = await response.json();
      if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid visit count");
      // A successful first recorded visit must produce at least one. A zero
      // response is not proof that the increment was accepted by the provider.
      if (recordsVisit && value === 0) throw new Error("Visit recording not confirmed");
      return value as number;
    });
    // Do not retry an ambiguous failure: the service may have recorded it.
    return pendingCount;
  };
}

export const readVisitCount = createVisitCounter();
