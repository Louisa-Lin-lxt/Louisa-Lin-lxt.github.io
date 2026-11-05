"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/research-media.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const labs = [
  { name: "He Lab", video: "he-lab.mp4", poster: "/optimized/he-lab.jpg", source: "https://www.cmu.edu/bme/helab/", label: "Brain imaging", labelZh: "脑成像" },
  { name: "Yttri Lab · B-SOiD", video: "yttri-behavior.mp4", poster: "/research-media/yttri-behavior-poster.jpg", source: "https://github.com/YttriLab/B-SOID", label: "Behavior analysis", labelZh: "行为分析" },
];

export function ResearchMedia({ index, lang }: { index: number; lang: "en" | "zh" }) {
  const lab = labs[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const syncPlayback = () => {
      if (document.hidden || motion.matches || connection?.saveData) video.pause();
      else void video.play().catch(() => {});
    };
    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      video.pause();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return <div className={`detail-media research-media research-media-${index}`}>
    <figure className="research-film">
      <div className="research-film-screen">
        {failed ? <img src={asset(lab.poster)} alt={lang === "zh" ? lab.labelZh : lab.label} /> : <video ref={videoRef} src={asset(`/research-media/${lab.video}`)} poster={asset(lab.poster)} muted loop playsInline preload="metadata" onError={() => setFailed(true)} aria-label={`${lab.name}: ${lang === "zh" ? lab.labelZh : lab.label}`} />}

      </div>
      <figcaption><span>{lang === "zh" ? lab.labelZh : lab.label}</span><a href={lab.source} target="_blank" rel="noreferrer">{lab.name}<span aria-hidden="true">↗</span></a></figcaption>
    </figure>
    {index === 0 ? <a className="research-video-link" href="https://www.youtube.com/watch?v=bwriLGRuDZI" target="_blank" rel="noreferrer">
      <span className="research-video-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 6 9 6-9 6Z" /></svg></span>
      <span><strong>{lang === "zh" ? "脑机接口 · 机械手控制" : "BCI · Robotic hand control"}</strong><span>CMU Engineering · YouTube</span></span><span aria-hidden="true">↗</span>
    </a> : <figure className="research-supporting-figure">
      <a href={asset("/research-media/yttri-carl.png")} target="_blank" rel="noreferrer"><img src={asset("/research-media/yttri-carl.png")} alt={lang === "zh" ? "Yttri Lab CARL 实验任务：选择端口与奖励概率示意图" : "Yttri Lab CARL task: choice ports and reward probabilities"} width="1200" height="329" /></a>
      <figcaption><span>CARL</span><a href="https://labs.bio.cmu.edu/yttri/research/" target="_blank" rel="noreferrer">Yttri Lab <span aria-hidden="true">↗</span></a></figcaption>
    </figure>}
  </div>;
}
