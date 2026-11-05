"use client";

import { useSyncExternalStore } from "react";
import { InterestWorld } from "../components/InterestWorld";
import { TaotaoPixels } from "../components/TaotaoPixels";
import { SmoothLink } from "../components/SmoothLink";
import { usePersistentLanguage } from "../components/usePersistentLanguage";
import "../styles/interests-polish.css";

const copy = {
  en: {
    title: "Beyond Academics",
    intro: "Music, Taotao, and travel are part of my life beyond research.",
    hint: "Click or drag to rotate",
    controlHelp: "Click or drag to rotate. Arrow keys also work",
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
    hint: "点击或拖动图形旋转",
    controlHelp: "点击或拖动图形旋转，也可以用方向键操作",
    worldsAria: "兴趣主题",
    worlds: [
      { title: "音乐", body: "听音乐让我在忙碌时放松下来，也更容易重新集中注意力。" },
      { title: "淘淘", body: "和淘淘在一起的照片。" },
      { title: "旅行", body: "我喜欢去新的地方走走，留意当地生活的细节。" },
    ],
  },
};

const topics = ["music", "taotao", "travel"];
function subscribeHash(callback: () => void) { window.addEventListener("hashchange",callback); return () => window.removeEventListener("hashchange",callback); }
function getTopic() { return Math.max(0,topics.indexOf(window.location.hash.slice(1))); }

export default function InterestsPage() {
  const { lang, toggleLang } = usePersistentLanguage();
  const active = useSyncExternalStore(subscribeHash,getTopic,() => 0);
  const t=copy[lang], world=t.worlds[active];
  const select=(index:number) => { window.history.replaceState(null,"",`#${topics[index]}`); window.dispatchEvent(new HashChangeEvent("hashchange")); };
  return <main className="interests-page" lang={lang === 'zh' ? 'zh-CN' : 'en'}>
    <div className="content-width">
      <header className="interest-header"><SmoothLink href="/" className="brand home-link">{lang === "en" ? "Home" : "首页"}</SmoothLink><button className="language-control" onClick={toggleLang} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}><span className={lang==='en'?'selected':''}>EN</span><i /><span className={lang==='zh'?'selected':''}>中</span></button></header>
      <div className="interests-intro"><h1>{t.title}</h1><p>{t.intro}</p></div>
      <div className="interest-tabs" role="tablist" aria-label={t.worldsAria}>{t.worlds.map((item,index)=><button key={index} id={`tab-${topics[index]}`} role="tab" aria-selected={active===index} aria-controls="interest-panel" tabIndex={active===index?0:-1} onClick={()=>select(index)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(active+(event.key==='ArrowRight'?1:2))%3;select(next);document.getElementById(`tab-${topics[next]}`)?.focus();}}}>{item.title}</button>)}</div>
      <section className={`interest-stage ${active===1?"is-pixel-gallery":""}`} role="tabpanel" id="interest-panel" aria-labelledby={`tab-${topics[active]}`}>
        {active===1?<TaotaoPixels lang={lang}/>:<>
        <InterestWorld active={active} label={`${world.title}${lang === "zh" ? "。" : ". "}${t.controlHelp}`} />
        <div className="interest-story" key={`${lang}-${active}`}><h2>{world.title}</h2><p>{world.body}</p></div>
        <p className="interest-hint">{t.hint}</p>
        </>}
      </section>
      <footer className="interests-footer"><span>© 2026 Xingtong Lin</span></footer>
    </div>
  </main>;
}
