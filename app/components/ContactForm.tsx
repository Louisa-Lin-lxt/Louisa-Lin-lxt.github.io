"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { copy, ui } from "../content/portfolio";
import type { Lang } from "./usePersistentLanguage";

const emailAddress = "xingtonl@andrew.cmu.edu";
const categories = ["Research", "Collaboration", "Other"] as const;
type SubmitState = "idle" | "sending" | "success" | "error" | "activation";

export function ContactForm({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
  }, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeRequest.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim().replace(/[\r\n]/g, " ");
    const category = String(data.get("category") ?? "Other");
    if (!name || !email || !subject || !message || !categories.some(item => item === category)) {
      setSubmitState("error");
      return;
    }

    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    setSubmitState("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name, email, message, subject, category,
          _replyto: email,
          _subject: `[Website][${category}] ${subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = await response.json() as { success?: boolean | string; message?: string };
      if (activeRequest.current !== controller) return;
      if (/needs activation/i.test(result.message ?? "")) {
        setSubmitState("activation");
        return;
      }
      if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Not accepted");
      form.reset();
      setSubmitState("success");
    } catch {
      if (activeRequest.current === controller) setSubmitState("error");
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  const sending = submitState === "sending";
  const needsFallback = submitState === "error" || submitState === "activation";
  const feedback = submitState === "success" ? t.formSuccess
    : submitState === "activation" ? t.formActivation
    : submitState === "error" ? t.formError : "";

  return <div className="contact-form-panel" data-reveal="support">
    <form aria-label={ui[lang].form} aria-describedby="contact-delivery-note" onSubmit={sendMessage} onChange={() => { if (!sending) setSubmitState("idle"); }} aria-busy={sending}>
      <p id="contact-delivery-note" className="contact-delivery-note">{t.formDeliveryNotice}</p>
      <div className="form-two">
        <label>{t.formName}<input autoComplete="name" name="name" required placeholder={t.formNamePlaceholder} disabled={sending} /></label>
        <label>{t.formEmail}<input autoComplete="email" type="email" name="email" required placeholder={t.formEmailPlaceholder} disabled={sending} /></label>
      </div>
      <label>{t.formCategory}<select name="category" defaultValue="Research" disabled={sending}>{categories.map((category, index) => <option key={category} value={category}>{t.formCategories[index]}</option>)}</select></label>
      <label>{t.formSubject}<input name="subject" required maxLength={160} placeholder={t.formSubjectPlaceholder} disabled={sending} /></label>
      <label>{t.formMessage}<textarea name="message" rows={4} required placeholder={t.formMessagePlaceholder} disabled={sending} /></label>
      <div className="honeypot" aria-hidden="true"><label>Leave blank<input name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" className="button button-primary submit-button" disabled={sending}>
        {sending ? t.formSending : t.formSubmit}
        <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
      </button>
      <p className={`form-feedback ${submitState}`} role={needsFallback ? "alert" : "status"}>
        {feedback}
        {needsFallback && <> <a className="form-fallback" href={`mailto:${emailAddress}`}>{lang === "en" ? "Open email app" : "打开邮件应用"}</a></>}
      </p>
    </form>
  </div>;
}
