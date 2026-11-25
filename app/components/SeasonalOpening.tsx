"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { seasonForDate } from "./season";
import { createHolidayEntrance } from "./holidayEntrance";
import "../styles/seasonal-opening.css";

function subscribeToSeason(update: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const refresh = () => {
    document.documentElement.dataset.season = currentSeason() ?? "none";
    update();
    clearTimeout(timer);
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    timer = setTimeout(refresh, midnight.getTime() - now.getTime() + 100);
  };
  refresh();
  document.addEventListener("visibilitychange", refresh);
  return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", refresh); };
}

const currentSeason = () => seasonForDate(new Date());
const serverSeason = () => null;

function ChristmasOrnament({ lang }: { lang: "en" | "zh" }) {
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const shake = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const [sparkle, setSparkle] = useState(false);
  const pauseScene = useRef<(paused: boolean) => void>(() => {});
  const sparkleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entrance = useRef<ReturnType<typeof createHolidayEntrance> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    if (!container.current) return;
    const arrival = createHolidayEntrance(container.current);
    entrance.current = arrival;
    const ready = () => { if (pausedRef.current) arrival.finish(); else arrival.play(true); };
    // No Three.js or GPU work outside the holiday season.
    import("./christmasScene").then(({ createChristmasScene }) => {
      if (cancelled || !canvas.current || !button.current) return;
      const scene = createChristmasScene(canvas.current, button.current, ready);
      if (!scene) { ready(); return; } // CSS glass remains when WebGL is unavailable.
      dispose = scene.dispose;
      shake.current = scene.shake;
      pauseScene.current = scene.setPaused;
      scene.setPaused(pausedRef.current);
    }).catch(() => { if (!cancelled) ready(); });
    return () => { cancelled = true; arrival.dispose(); dispose?.(); if (sparkleTimer.current) clearTimeout(sparkleTimer.current); };
  }, []);

  const activate = () => {
    if (pausedRef.current) return;
    shake.current();
    setSparkle(true);
    if (sparkleTimer.current) clearTimeout(sparkleTimer.current);
    sparkleTimer.current = setTimeout(() => setSparkle(false), 1800);
  };

  return <div ref={container} className="seasonal-opening" data-season="christmas" data-sparkle={sparkle} data-paused={paused}>
    <button ref={button} className="christmas-ornament" type="button" onClick={activate}
      aria-label={lang === "en" ? "Shake the glass Christmas ornament" : "轻摇玻璃圣诞挂饰"}>
      <span className="ornament-fallback" aria-hidden="true"><i className="ornament-tree" /><i className="ornament-star">✦</i></span>
      <canvas ref={canvas} aria-hidden="true" />
      <span className="ornament-sparkles" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i></span>
    </button>
    <div className="seasonal-controls">
      <button type="button" className="seasonal-replay" onClick={() => {
        pausedRef.current = false; setPaused(false); pauseScene.current(false); entrance.current?.play(); activate();
        document.dispatchEvent(new CustomEvent("holiday-motion-pause", { detail: false }));
        button.current?.focus({ preventScroll: true });
      }} aria-label={lang === "en" ? "Replay Christmas entrance" : "重播圣诞入场"} title={lang === "en" ? "Replay entrance" : "重播入场"}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 5a5 5 0 1 1-1 5M4 1v4h4" /></svg>
      </button>
      <button type="button" className="seasonal-pause" onClick={() => {
        const next = !paused; pausedRef.current = next; setPaused(next); pauseScene.current(next); entrance.current?.finish();
        document.dispatchEvent(new CustomEvent("holiday-motion-pause", { detail: next }));
      }} aria-label={lang === "en" ? (paused ? "Resume holiday animation" : "Pause holiday animation") : (paused ? "继续节日动画" : "暂停节日动画")} aria-pressed={paused}>
        <svg viewBox="0 0 16 16" aria-hidden="true">{paused ? <path d="m6 4 5 4-5 4z" /> : <path d="M6 4v8m4-8v8" />}</svg>
      </button>
    </div>
  </div>;
}

export function SeasonalOpening({ lang }: { lang: "en" | "zh" }) {
  const season = useSyncExternalStore(subscribeToSeason, currentSeason, serverSeason);
  return season === "christmas" ? <ChristmasOrnament lang={lang} /> : null;
}
