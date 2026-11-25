"use client";

/* The named section is the keyboard surface for swipe navigation and contains Taotao's own pixel buttons. */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import { InterestStorm, captureStormPixels, type StormHandle, type StormPixel } from "../components/InterestStorm";
import { TaotaoPixels } from "../components/TaotaoPixels";
import { InterestPixels } from "../components/InterestPixels";
import { SmoothLink } from "../components/SmoothLink";
import { usePersistentLanguage } from "../components/usePersistentLanguage";
import { VisitorCounter } from "../components/VisitorCounter";
import { MusicPixels } from "../components/MusicPixels";
import { SeasonalHeader } from "../components/SeasonalHeader";
import "../styles/interests-polish.css";

const copy = {
  en: {
    title: "Beyond Academics",
    intro: "Music, Taotao, and travel are part of my life beyond research.",
    stageAria: "Swipe left or right, or use the arrow keys to explore.",
    worlds: [
      { title: "Music", body: "Music is part of my everyday life, and I’m especially drawn to musicals." },
      { title: "Taotao", body: "Photos of life with Taotao." },
      { title: "Travel", body: "I like exploring new places and noticing the details of everyday life there." },
    ],
  },
  zh: {
    title: "学业之外",
    intro: "音乐、淘淘和旅行，是我研究之外喜欢的事。",
    stageAria: "左右滑动或使用方向键切换。",
    worlds: [
      { title: "音乐", body: "音乐是我生活的一部分，我也很喜欢音乐剧。" },
      { title: "淘淘", body: "和淘淘在一起的照片。" },
      { title: "旅行", body: "我喜欢去新的地方走走，留意当地生活的细节。" },
    ],
  },
};

const topics = ["music", "taotao", "travel"];
const swipeThreshold = 40;
function subscribeHash(callback: () => void) { window.addEventListener("hashchange",callback); return () => window.removeEventListener("hashchange",callback); }
function getTopic() { return Math.max(0,topics.indexOf(window.location.hash.slice(1))); }

export default function InterestsPage() {
  const { lang, toggleLang } = usePersistentLanguage();
  const active = useSyncExternalStore(subscribeHash,getTopic,() => 0);
  const swipeStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const suppressTimer = useRef<number | undefined>(undefined);
  const wheelSwipe = useRef({ distance: 0, last: 0, locked: false });
  const stageRef = useRef<HTMLElement>(null);
  const stormRef = useRef<StormHandle>(null);
  const pendingStorm = useRef<{ from: StormPixel[]; direction: 1 | -1 } | null>(null);
  const storming = useRef(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const t=copy[lang], world=t.worlds[active];
  useLayoutEffect(() => {
    const pending = pendingStorm.current;
    const stage = stageRef.current;
    if (!pending || !stage) return;
    pendingStorm.current = null;
    const to = captureStormPixels(stage);
    stormRef.current?.play(pending.from, to, pending.direction, () => {
      storming.current = false;
      stage.classList.remove("is-storming");
    });
  }, [active]);
  useEffect(() => () => {
    window.clearTimeout(suppressTimer.current);
    stormRef.current?.cancel();
  }, []);
  const select=(index:number) => {
    const current = getTopic();
    if (index < 0 || index >= topics.length || index === current || stageRef.current?.querySelector("dialog[open]")) return;
    const stage = stageRef.current;
    if (storming.current) stormRef.current?.cancel();
    if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const from = captureStormPixels(stage);
      if (from.length) {
        pendingStorm.current = { from, direction: index > current ? 1 : -1 };
        storming.current = true;
        stage.classList.add("is-storming");
      }
    }
    if (stage?.contains(document.activeElement) && document.activeElement !== stage) stage.focus({ preventScroll: true });
    setDirection(index > current ? "next" : "previous");
    window.history.replaceState(null,"",`#${topics[index]}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };
  const startSwipe = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest("dialog[open]"))) return;
    window.clearTimeout(suppressTimer.current);
    suppressClick.current = false;
    wheelSwipe.current = { distance: 0, last: 0, locked: false };
    swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };
  const moveSwipe = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) < 16 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    if (Math.abs(dx) >= swipeThreshold && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
    const gallery = event.currentTarget.querySelector<HTMLElement>(".taotao-pixel-gallery");
    if (gallery) gallery.style.transform = `translateX(${Math.max(-90, Math.min(90, dx * .28))}px)`;
  };
  const resetSwipe = (event: PointerEvent<HTMLElement>) => {
    swipeStart.current = null;
    event.currentTarget.classList.remove("is-dragging");
    event.currentTarget.querySelector<HTMLElement>(".taotao-pixel-gallery")?.style.removeProperty("transform");
  };
  const finishSwipe = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    resetSwipe(event);
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    suppressClick.current = true;
    window.clearTimeout(suppressTimer.current);
    suppressTimer.current = window.setTimeout(() => { suppressClick.current = false; }, 350);
    const next = getTopic() + (dx < 0 ? 1 : -1);
    if (next < 0 || next >= topics.length) return;
    select(next);
  };
  const scrollSwipe = (event: WheelEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("dialog[open]")) return;
    if (Math.abs(event.deltaX) < 3 || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.5) return;
    const gesture = wheelSwipe.current, now = performance.now();
    if (now - gesture.last > 240 || (gesture.locked && Math.sign(event.deltaX) !== Math.sign(gesture.distance))) {
      gesture.distance = 0;
      gesture.locked = false;
    }
    gesture.last = now;
    if (gesture.locked) return;
    gesture.distance += event.deltaX;
    if (Math.abs(gesture.distance) < 50) return;
    gesture.locked = true;
    select(getTopic() + (gesture.distance > 0 ? 1 : -1));
  };
  const changeWithKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget || event.defaultPrevented) return;
    const next = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? topics.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };
  return <main className="interests-page" lang={lang === 'zh' ? 'zh-CN' : 'en'}>
    <div className="content-width">
      <header className="interest-header"><SeasonalHeader /><SmoothLink href="/" className="brand home-link">{lang === "en" ? "Home" : "首页"}</SmoothLink><button className="language-control" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang==='en'?'selected':''}>EN</span><i /><span className={lang==='zh'?'selected':''}>中</span></button></header>
      <div className="interests-intro"><h1>{t.title}</h1><p>{t.intro}</p></div>
      <span className="interest-sr-only" role="status" aria-live="polite" aria-atomic="true">{lang === "en" ? `${world.title}, ${active + 1} of ${topics.length}` : `${world.title}，第 ${active + 1} 项，共 ${topics.length} 项`}</span>
      <section ref={stageRef} className="interest-stage is-pixel-gallery" tabIndex={0} aria-label={`${world.title}${lang === "en" ? ". " : "。"}${t.stageAria}`} onKeyDown={changeWithKeys} onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={finishSwipe} onPointerCancel={resetSwipe} onWheel={scrollSwipe} onClickCapture={event => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; window.clearTimeout(suppressTimer.current); } }}>
        <div key={active} className={`interest-slide-content from-${direction}`}>
        {active===0?<MusicPixels lang={lang}/>:active===1?<TaotaoPixels lang={lang}/>:<div className="taotao-pixel-gallery">
          <div className="taotao-pixel-copy">
            <h2>{world.title}</h2><p>{world.body}</p>
          </div>
          <InterestPixels topic="travel"/>
        </div>}
        </div>
        <InterestStorm ref={stormRef} />
      </section>
      <p className="interest-swipe-note">{lang === "en" ? "Drag or swipe to explore" : "左右拖动或滑动，继续探索"}</p>
      <footer className="interests-footer"><span>© 2026 Xingtong Lin</span><VisitorCounter lang={lang} /></footer>
    </div>
  </main>;
}
