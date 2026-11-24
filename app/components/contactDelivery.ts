export const contactEmail = "xingtonl@andrew.cmu.edu";
export const contactCategories = ["Coffee chat", "Research", "Recruiting"] as const;

// Formspree's public form endpoint, not an account API key.
// The receiving mailbox is verified in the Formspree account.
export const contactEndpoint = "https://formspree.io/f/mrpqobgj";
export const contactDeliveryVerified = true;

export type ContactResult = "success" | "unconfigured" | "invalid" | "rate-limited" | "error";

export async function submitContact(
  data: FormData,
  signal: AbortSignal,
  endpoint: string = contactEndpoint,
  request: typeof fetch = fetch,
): Promise<ContactResult> {
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) return "unconfigured";

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const category = String(data.get("category") ?? "");
  const honeypot = String(data.get("_gotcha") ?? "");
  if (honeypot || !email || !message
    || name.length > 100 || email.length > 254 || message.length > 10_000
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !contactCategories.some(item => item === category)) return "invalid";

  const sender = (name || email).replace(/[\r\n]+/g, " ");
  const subject = `[Website][${category}] Message from ${sender}`;

  try {
    const response = await request(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
      signal,
      body: JSON.stringify({ name, email, message, category, subject, _gotcha: honeypot }),
    });
    if (response.status === 429) return "rate-limited";
    const result = await response.json() as { next?: unknown; error?: unknown; errors?: unknown } | null;
    // Formspree acknowledges acceptance with `next`. Keep the visitor here;
    // this response confirms submission, not final inbox delivery.
    return response.ok && result && typeof result.next === "string"
      && result.error === undefined && result.errors === undefined ? "success" : "error";
  } catch {
    // A timeout does not prove rejection; do not automatically resend a message.
    return "error";
  }
}
