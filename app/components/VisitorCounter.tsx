"use client";

import { useEffect, useState } from "react";
import { counterStartDate, productionHost, readVisitCount } from "./visitCounter";
import "../styles/visitor-counter.css";

type CounterState = { value: number | null; status: "loading" | "ready" | "unavailable"; preview: boolean };

export function VisitorCounter({ lang }: { lang: "en" | "zh" }) {
  const [counter, setCounter] = useState<CounterState>({ value: null, status: "loading", preview: false });

  useEffect(() => {
    let cancelled = false;
    const preview = window.location.hostname !== productionHost;
    readVisitCount(window.location.hostname).then(
      value => { if (!cancelled) setCounter({ value, status: "ready", preview }); },
      () => { if (!cancelled) setCounter({ value: null, status: "unavailable", preview }); },
    );
    return () => { cancelled = true; };
  }, []);

  const description = lang === "en"
    ? "Recorded page visits since November 22, 2026, once the counter is live. Repeat visits may count; this is not a count of unique people. Earlier traffic was not recorded."
    : "自 2026 年 11 月 22 日起，在计数器上线后记录的累计访问次数（非独立访客数）。重复访问可能计入，不补算此前未记录的访问。";
  const previewDescription = lang === "en"
    ? "Preview only: local visits do not increase the total. "
    : "本地预览不会增加访问次数。";
  const unavailable = lang === "en" ? "Visit count unavailable. " : "访问统计暂不可用。";
  const number = counter.value === null ? "—" : counter.value.toLocaleString(lang === "en" ? "en-US" : "zh-CN");

  return <span className="visitor-counter" title={`${counter.status === "unavailable" ? unavailable : ""}${counter.preview ? previewDescription : ""}${description}`}>
    <svg className="visitor-counter__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 1h6v1h2v2h1v8h-1v2h-2v1H5v-1H3v-2H2V4h1V2h2V1Zm0 1v1H4v2H3v6h1v2h1v1h6v-1h1v-2h1V5h-1V3h-1V2H5Z" fill="currentColor" />
      <path d="M5 5h1v2H5zm5 0h1v2h-1zM5 9h1v1h4V9h1v2H5Z" fill="currentColor" />
    </svg>
    <span className="visitor-counter__value">{number} {lang === "en" ? "visits" : "次访问"}</span>
    <span className="visitor-counter__since">{lang === "en" ? "since " : "自 "}<time dateTime={counterStartDate}>{lang === "en" ? "Nov 22, 2026" : "2026.11.22"}</time></span>
    {counter.preview && <span className="visitor-counter__preview">{lang === "en" ? "preview" : "预览"}</span>}
  </span>;
}
