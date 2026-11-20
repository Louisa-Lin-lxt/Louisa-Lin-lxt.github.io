"use client";

import { useRef, useState, useSyncExternalStore, type PointerEvent, type WheelEvent } from "react";
import { TaotaoPixels } from "../components/TaotaoPixels";
import { InterestPixels } from "../components/InterestPixels";
import { SmoothLink } from "../components/SmoothLink";
import { usePersistentLanguage } from "../components/usePersistentLanguage";
import "../styles/interests-polish.css";

const copy = {
  en: {
    title: "Beyond Academics",
    intro: "Music, Taotao, and travel are part of my life beyond research.",
    worldsAria: "Explore interests",
    worlds: [
      { title: "Music", body: "I turn to music to relax or focus, depending on the day." },
      { title: "Taotao", body: "Photos of life with Taotao." },
      { title: "Travel", body: "I like exploring new places and noticing the details of everyday life there." },
    ],
  },
  zh: {
    title: "学业之外",
    intro: "音乐、淘淘和旅行，是我研究之外喜欢的事。",
    worldsAria: "兴趣主题",
    worlds: [
      { title: "音乐", body: "听音乐让我在忙碌时放松下来，也更容易重新集中注意力。" },
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
  const [slide, setSlide] = useState({ direction: "next", revision: 0 });
  const t=copy[lang], world=t.worlds[active];
  const select=(index:number) => {
    const current = getTopic();
    if (index < 0 || index >= topics.length || index === current) return;
    setSlide(previous => ({ direction: index > current ? "next" : "previous", revision: previous.revision + 1 }));
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
    event.currentTarget.style.setProperty("--drag-offset", `${Math.max(-90, Math.min(90, dx * .28))}px`);
  };
  const resetSwipe = (event: PointerEvent<HTMLElement>) => {
    swipeStart.current = null;
    event.currentTarget.classList.remove("is-dragging");
    event.currentTarget.style.removeProperty("--drag-offset");
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
  return <main className="interests-page" lang={lang === 'zh' ? 'zh-CN' : 'en'}>
    <div className="content-width">
      <header className="interest-header"><SmoothLink href="/" className="brand home-link">{lang === "en" ? "Home" : "首页"}</SmoothLink><button className="language-control" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang==='en'?'selected':''}>EN</span><i /><span className={lang==='zh'?'selected':''}>中</span></button></header>
      <div className="interests-intro"><h1>{t.title}</h1><p>{t.intro}</p></div>
      <div className="interest-tabs" role="tablist" aria-label={t.worldsAria}>{t.worlds.map((item,index)=><button key={index} id={`tab-${topics[index]}`} role="tab" aria-selected={active===index} aria-controls="interest-panel" tabIndex={active===index?0:-1} onClick={()=>select(index)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(active+(event.key==='ArrowRight'?1:2))%3;select(next);document.getElementById(`tab-${topics[next]}`)?.focus();}}}>{item.title}</button>)}</div>
      <section className="interest-stage is-pixel-gallery" role="tabpanel" id="interest-panel" aria-labelledby={`tab-${topics[active]}`} onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={finishSwipe} onPointerCancel={resetSwipe} onWheel={scrollSwipe} onClickCapture={event => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; window.clearTimeout(suppressTimer.current); } }}>
        <div key={`${active}-${slide.revision}`} className={`interest-slide-content${slide.revision ? ` from-${slide.direction}` : ""}`}>
        {active===1?<TaotaoPixels lang={lang}/>:<div className="taotao-pixel-gallery">
          <div className="taotao-pixel-copy"><h2>{world.title}</h2><p>{world.body}</p></div>
          <InterestPixels topic={active===0?'music':'travel'}/>
        </div>}
        </div>
      </section>
      <footer className="interests-footer"><span>© 2026 Xingtong Lin</span></footer>
    </div>
  </main>;
}
