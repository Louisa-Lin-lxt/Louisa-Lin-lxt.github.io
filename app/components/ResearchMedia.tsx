"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/research-media.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const labs = [
  {
    video: "he-lab.mp4",
    poster: "/optimized/he-lab.jpg",
    source: "https://www.cmu.edu/bme/helab/",
    caption: "He Lab · brain imaging animation",
    captionZh: "He Lab · 脑成像示意动画",
    sourceLabel: "He Lab website",
    sourceLabelZh: "He Lab 官网",
  },
  {
    video: "yttri-behavior.mp4",
    poster: "/research-media/yttri-behavior-poster.jpg",
    source: "https://github.com/YttriLab/B-SOID",
    caption: "Yttri Lab · B-SOiD demonstration",
    captionZh: "Yttri Lab · B-SOiD 行为分析演示",
    sourceLabel: "B-SOiD source",
    sourceLabelZh: "B-SOiD 项目来源",
  },
];

export function ResearchFilm({ index, lang }: { index: number; lang: "en" | "zh" }) {
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

  return <figure className={`inline-media research-film research-film-${index}`}>
    <div className="inline-media-frame research-film-screen">
      {failed
        ? <img src={asset(lab.poster)} alt={lang === "zh" ? lab.captionZh : lab.caption} />
        : <video ref={videoRef} src={asset(`/research-media/${lab.video}`)} poster={asset(lab.poster)} muted loop playsInline preload="metadata" onError={() => setFailed(true)} aria-label={lang === "zh" ? lab.captionZh : lab.caption} />}
    </div>
    <figcaption><span>{lang === "zh" ? lab.captionZh : lab.caption}</span>{index !== 0 && <a href={lab.source} target="_blank" rel="noreferrer">{lang === "zh" ? lab.sourceLabelZh : lab.sourceLabel}<span aria-hidden="true">↗</span></a>}</figcaption>
  </figure>;
}

export function ResearchSupplement({ index, lang }: { index: number; lang: "en" | "zh" }) {
  if (index === 0) return <p className="research-related"><a href="https://www.youtube.com/watch?v=bwriLGRuDZI" target="_blank" rel="noreferrer">{lang === "zh" ? "CMU Engineering · 脑机接口机械手演示视频" : "CMU Engineering · BCI robotic hand video"}<span aria-hidden="true">↗</span></a></p>;

  return <figure className="inline-media research-supporting-figure">
    <a className="inline-media-frame" href={asset("/research-media/yttri-carl.png")} target="_blank" rel="noreferrer" aria-label={lang === "zh" ? "打开 CARL 实验任务原图" : "Open full-size CARL task figure"}><img src={asset("/research-media/yttri-carl.png")} alt={lang === "zh" ? "Yttri Lab CARL 实验任务：选择端口与奖励概率示意图" : "Yttri Lab CARL task: choice ports and reward probabilities"} width="1200" height="329" /></a>
    <figcaption><span>{lang === "zh" ? "CARL 实验任务示意图" : "CARL task figure"}</span><a href="https://labs.bio.cmu.edu/yttri/research/" target="_blank" rel="noreferrer">{lang === "zh" ? "Yttri Lab 研究页面" : "Yttri Lab research page"}<span aria-hidden="true">↗</span></a></figcaption>
  </figure>;
}
