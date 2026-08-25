"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { InterestWorld } from "../components/InterestWorld";
import { SmoothLink } from "../components/SmoothLink";

type Lang = "en" | "zh";

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
    worlds: [
      { label: "MUSIC", title: "The soundtrack to everyday life.", body: "Music is where I reset, focus, and keep small moments from passing too quickly.", status: "STORIES COMING SOON" },
      { label: "ANIMAL LOVER", title: "Life is better with animals around.", body: "Taotao gets the first introduction. More stories about animals and companionship will come next.", status: "STORIES COMING SOON" },
      { label: "TRAVELLER", title: "I like seeing how other places live.", body: "A future home for trips, photographs, and the details I want to remember.", status: "STORIES COMING SOON" },
    ],
  },
  zh: {
    back: "返回个人主页",
    kicker: "05 · 实验室之外",
    hint: "点击会动的图标打开内容 · 滚动或滑动切换",
    dragHint: "拖动淘淘可以转圈 · 点击可以打开内容",
    open: "看看这个兴趣",
    modalTitle: "更多故事，之后慢慢补上。",
    modalBody: "这里先保留好位置。下一步会加入歌单、照片、去过的地方，还有更具体的小故事。",
    close: "关闭",
    worlds: [
      { label: "音乐", title: "日常生活里，音乐一直都在。", body: "听歌、弹琴，或者只是找到刚好适合当下的一首歌，都会让我重新进入自己的节奏。", status: "具体内容之后补上" },
      { label: "喜欢动物", title: "有动物在身边，生活会更好一点。", body: "先让淘淘和大家见面。以后这里会放更多关于它、关于动物，也关于陪伴的小故事。", status: "具体内容之后补上" },
      { label: "旅行", title: "我喜欢看看别的地方怎样生活。", body: "这里之后会放旅行照片、去过的地方，还有那些我不想忘记的细节。", status: "具体内容之后补上" },
    ],
  },
};

export default function InterestsPage() {
  const [lang, setLang] = useState<Lang>("en");
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
    if ((event.target as HTMLElement).closest(".interest-world-canvas")) {
      pointerStart.current = null;
      return;
    }
    pointerStart.current = event.clientX;
  };
  const pointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".interest-world-canvas")) {
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
      <button className="interest-language" onClick={() => setLang(lang === "en" ? "zh" : "en")}><span className={lang === "en" ? "active" : ""}>EN</span><i /><span className={lang === "zh" ? "active" : ""}>中</span></button>
    </header>

    <div className="interest-scene-name" aria-live="polite"><span>{String(active + 1).padStart(2, "0")}</span><strong>{world.label}</strong></div>

    <section className="interest-story" key={`${lang}-${active}`}>
      <p>{t.kicker}</p>
      <h1>{world.title}</h1>
      <p>{world.body}</p>
      <button onClick={() => setOpen(true)}><span>{t.open}</span><i>↗</i></button>
      <small>{world.status}</small>
    </section>

    <nav className="interest-dots" aria-label="Interest worlds">{t.worlds.map((item, index) => <button className={index === active ? "active" : ""} onClick={() => setActive(index)} key={item.label} aria-label={item.label}><i /><span>{item.label}</span></button>)}</nav>
    <button className="interest-arrow interest-arrow-left" onClick={() => changeWorld(-1)} aria-label="Previous world">‹</button>
    <button className="interest-arrow interest-arrow-right" onClick={() => changeWorld(1)} aria-label="Next world">›</button>
    <div className={`interest-hint ${active === 1 ? "dog-drag-hint" : ""}`}><i /><span>{active === 1 ? t.dragHint : t.hint}</span></div>
    <p className="interest-copyright">© 2026 By Xingtong Lin</p>

    {open && <div className="interest-placeholder-modal" role="dialog" aria-modal="true" aria-label={t.modalTitle} onPointerDown={(event) => event.stopPropagation()} onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <article><button onClick={() => setOpen(false)} aria-label={t.close}>×</button><span>{world.label}</span><h2>{t.modalTitle}</h2><p>{t.modalBody}</p><i>{String(active + 1).padStart(2, "0")}</i></article>
    </div>}
  </main>;
}
