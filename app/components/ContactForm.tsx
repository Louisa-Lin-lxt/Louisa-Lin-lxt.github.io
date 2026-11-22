"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { copy, ui } from "../content/portfolio";
import type { Lang } from "./usePersistentLanguage";
import { contactCategories as categories, contactDeliveryVerified, contactEmail as emailAddress, submitContact, type ContactResult } from "./contactDelivery";

type SubmitState = "idle" | "sending" | ContactResult;

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
    if (data.get("_gotcha")) return;

    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    setSubmitState("sending");

    try {
      const result = await submitContact(data, controller.signal);
      if (activeRequest.current !== controller) return;
      if (result === "success") form.reset();
      setSubmitState(result);
    } catch {
      if (activeRequest.current === controller) setSubmitState("error");
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  const sending = submitState === "sending";
  const needsFallback = ["error", "unconfigured", "rate-limited"].includes(submitState);
  const hasError = needsFallback || submitState === "invalid";
  const feedback = submitState === "success" ? t.formSuccess
    : submitState === "unconfigured" ? t.formUnavailable
    : submitState === "invalid" ? t.formInvalid
    : submitState === "rate-limited" ? t.formRateLimited
    : submitState === "error" ? t.formError : "";

  return <div className="contact-form-panel" data-reveal="support">
    <form aria-label={ui[lang].form} aria-describedby="contact-delivery-note" onSubmit={sendMessage} onChange={() => { if (!sending) setSubmitState("idle"); }} aria-busy={sending}>
      <p id="contact-delivery-note" className="contact-delivery-note">{contactDeliveryVerified ? t.formPrivacyNote : t.formDeliveryNotice}</p>
      <div className="form-two">
        <label>{t.formName}<input autoComplete="name" name="name" required maxLength={100} placeholder={t.formNamePlaceholder} disabled={sending} /></label>
        <label>{t.formEmail}<input autoComplete="email" type="email" name="email" required maxLength={254} placeholder={t.formEmailPlaceholder} disabled={sending} /></label>
      </div>
      <label>{t.formCategory}<select name="category" defaultValue="Research" disabled={sending}>{categories.map((category, index) => <option key={category} value={category}>{t.formCategories[index]}</option>)}</select></label>
      <label>{t.formSubject}<input name="subject" required maxLength={160} placeholder={t.formSubjectPlaceholder} disabled={sending} /></label>
      <label>{t.formMessage}<textarea name="message" rows={4} required maxLength={10000} placeholder={t.formMessagePlaceholder} disabled={sending} /></label>
      <div className="honeypot" aria-hidden="true"><label>Leave blank<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" className="button button-primary submit-button" disabled={sending}>
        {sending ? t.formSending : t.formSubmit}
        <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
      </button>
      <p className={`form-feedback ${hasError ? "error" : submitState}`} role={hasError ? "alert" : "status"}>
        {feedback}
        {needsFallback && <> <a className="form-fallback" href={`mailto:${emailAddress}`}>{lang === "en" ? "Open email app" : "打开邮件应用"}</a></>}
      </p>
    </form>
  </div>;
}
