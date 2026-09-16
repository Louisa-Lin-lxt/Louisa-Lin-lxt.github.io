"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { InterestWorld } from "../components/InterestWorld";
import { SmoothLink } from "../components/SmoothLink";
import { usePersistentLanguage } from "../components/usePersistentLanguage";

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "05 · OFF DUTY",
    hint: "Click the moving icon to open · scroll or swipe to switch",
    dragHint: "Drag Taotao to rotate · click to open",
    open: "Explore this interest",
    modalTitle: "More stories are on the way.",
    modalBody: "I’m keeping this space ready for the playlists, photos, places, and small stories I’ll add next.",
    close: "Close",
    worldsAria: "Interest worlds",
    previous: "Previous world",
    next: "Next world",
    worlds: [
      { label: "MUSIC", title: "The soundtrack to everyday life.", body: "Music is where I reset, focus, and keep small moments from passing too quickly.", status: "STORIES COMING SOON" },
      { label: "ANIMAL LOVER", title: "Life is better with animals around.", body: "Taotao gets the first introduction. More stories about animals and companionship will come next.", status: "STORIES COMING SOON" },
      { label: "TRAVELLER", title: "I like seeing how other places live.", body: "A future home for trips, photographs, and the details I want to remember.", status: "STORIES COMING SOON" },
    ],
  },
  zh: {
    back: "返回主页",
    kicker: "04 · 研究之外",
    hint: "点击图形查看 · 滚动或滑动切换",
    dragHint: "拖动淘淘旋转 · 点击查看",
    open: "查看内容",
    modalTitle: "更多内容正在整理",
    modalBody: "后续将补充歌单、照片、旅行记录和其他相关内容。",
    close: "关闭",
    worldsAria: "兴趣主题",
    previous: "上一个主题",
    next: "下一个主题",
    worlds: [
      { label: "音乐", title: "音乐与日常生活", body: "音乐用于放松、集中注意力和调整日常节奏。这里将记录相关歌单与演奏经历。", status: "内容整理中" },
      { label: "动物", title: "动物与陪伴", body: "淘淘是这一部分的主要成员。这里将记录与动物和日常陪伴相关的内容。", status: "内容整理中" },
      { label: "旅行", title: "旅行与观察", body: "旅行帮助我理解不同地区的生活方式。这里将记录旅行照片、地点和观察。", status: "内容整理中" },
    ],
  },
};

export default function InterestsPage() {
  const { lang, toggleLang } = usePersistentLanguage();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const wheelLock = useRef(false);
  const pointerStart = useRef<number | null>(null);
  const t = copy[lang];
  const world = t.worlds[active];

  const changeWorld = (direction: number) => setActive((current) => (current + direction + 3) % 3);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") changeWorld(1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") changeWorld(-1);
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) < 18 || wheelLock.current) return;
    wheelLock.current = true;
    changeWorld(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 720);
  };

  const pointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".interest-world-canvas, .interest-placeholder-modal")) {
      pointerStart.current = null;
      return;
    }
    pointerStart.current = event.clientX;
  };
  const pointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".interest-world-canvas, .interest-placeholder-modal")) {
      pointerStart.current = null;
      return;
    }
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) > 55) changeWorld(distance < 0 ? 1 : -1);
    pointerStart.current = null;
  };

  return <main className={`interest-experience interest-scene-${active + 1}`} onWheel={handleWheel} onPointerDown={pointerDown} onPointerUp={pointerUp}>
    <div className="interest-grid" aria-hidden="true" />
    <InterestWorld active={active} onOpen={() => setOpen(true)} label={world.label} />

    <header className="interest-header">
      <SmoothLink className="interest-xl" href="/" ariaLabel={t.back}>XL</SmoothLink>
      <SmoothLink className="interest-back" href="/">← {t.back}</SmoothLink>
      <button className="interest-language" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang === "en" ? "active" : ""}>EN</span><i /><span className={lang === "zh" ? "active" : ""}>中</span></button>
    </header>

    <div className="interest-scene-name" aria-live="polite"><span>{String(active + 1).padStart(2, "0")}</span><strong>{world.label}</strong></div>

    <section className="interest-story" key={`${lang}-${active}`}>
      <p>{t.kicker}</p>
      <h1>{world.title}</h1>
      <p>{world.body}</p>
      <button onClick={() => setOpen(true)}><span>{t.open}</span><i>↗</i></button>
      <small>{world.status}</small>
    </section>

    <nav className="interest-dots" aria-label={t.worldsAria}>{t.worlds.map((item, index) => <button className={index === active ? "active" : ""} onClick={() => setActive(index)} key={item.label} aria-label={item.label}><i /><span>{item.label}</span></button>)}</nav>
    <button className="interest-arrow interest-arrow-left" onClick={() => changeWorld(-1)} aria-label={t.previous}>‹</button>
    <button className="interest-arrow interest-arrow-right" onClick={() => changeWorld(1)} aria-label={t.next}>›</button>
    <div className={`interest-hint ${active === 1 ? "dog-drag-hint" : ""}`}><i /><span>{active === 1 ? t.dragHint : t.hint}</span></div>
    <p className="interest-copyright">© 2026 By Xingtong Lin</p>

    {open && <div className="interest-placeholder-modal" role="dialog" aria-modal="true" aria-label={t.modalTitle}>
      <article><button onClick={() => setOpen(false)} aria-label={t.close}>×</button><span>{world.label}</span><h2>{t.modalTitle}</h2><p>{t.modalBody}</p><i>{String(active + 1).padStart(2, "0")}</i></article>
    </div>}
  </main>;
}
