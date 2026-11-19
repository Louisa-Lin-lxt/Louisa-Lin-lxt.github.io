"use client";

import { useState, type MouseEvent } from "react";
import { DetailDialog } from "./DetailDialog";
import type { Lang } from "./usePersistentLanguage";
import "./PublicationsProjects.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const posterPdf = `${basePath}/research-media/yttri-2025-first-year-poster.pdf`;
const posterImage = `${basePath}/research-media/yttri-2025-first-year-poster-thumbnail.jpg`;
const articleUrl = "https://doi.org/10.1016/j.ipha.2026.08.008";

type Entry = {
  id: "paper" | "poster" | "bci";
  year: string;
  kind: string;
  title: string;
  source: string;
  authors?: string;
  description: string;
  link?: string;
  linkLabel?: string;
};

const content: Record<Lang, {
  heading: string;
  publications: string;
  projects: string;
  details: string;
  close: string;
  posterCaption: string;
  entries: Entry[];
}> = {
  en: {
    heading: "Publications & Projects",
    publications: "Papers & posters",
    projects: "Projects",
    details: "View details",
    close: "Close details",
    posterCaption: "2025 Meeting of the Minds poster · Carnegie Mellon University",
    entries: [
      {
        id: "paper", year: "2026", kind: "First author · Narrative review",
        title: "Algorithmic advances and challenges in continuous glucose monitoring for extreme glycemic risk management in the intensive care unit",
        source: "Intelligent Pharmacy",
        authors: "Xingtong Lin, Zongwen Yang, Rong Fan, Xinchen Wang & Ya Zhu",
        description: "I co-authored a narrative review on how continuous glucose monitoring could support the management of extreme glycemic risk in intensive care. We examine threshold and trend alerts, predictive models, and the limits of changing sensor reliability, then discuss a decision-support approach that accounts for data confidence and blood-glucose verification.",
        link: articleUrl, linkLabel: "Read the article",
      },
      {
        id: "poster", year: "2025", kind: "First-year research poster",
        title: "Decision Making Along a Semi-continuous Dimension in an Open Field Arena",
        source: "Meeting of the Minds · Carnegie Mellon University",
        authors: "Louisa Lin, Kevin K.M. Wright & Eric A. Yttri",
        description: "Presented during my first year at CMU, this poster introduces the Yttri Lab’s 27-port open-field task and explores how mice adjusted their choices as the reward distribution shifted. Working with PhD mentor Kevin K.M. Wright and PI Eric A. Yttri, I helped run behavioral sessions and examined early patterns of adaptation and persistent port preferences.",
        link: posterPdf, linkLabel: "Open poster PDF",
      },
      {
        id: "bci", year: "2026", kind: "Unpublished course project",
        title: "BCI decoder",
        source: "Carnegie Mellon University",
        description: "In a CMU brain-computer interface course project, I processed a provided five-trial EEG dataset, extracted C3/C4 high-alpha features using spatial filtering and Burg spectral estimation, and used their difference to simulate horizontal cursor movement. I compared the raw and mean-centered trajectories.",
      },
    ],
  },
  zh: {
    heading: "论文与项目",
    publications: "论文与海报",
    projects: "项目",
    details: "查看详情",
    close: "关闭详情",
    posterCaption: "2025 年 Meeting of the Minds 海报 · 卡内基梅隆大学",
    entries: [
      {
        id: "paper", year: "2026", kind: "第一作者 · 叙述性综述",
        title: "Algorithmic advances and challenges in continuous glucose monitoring for extreme glycemic risk management in the intensive care unit",
        source: "Intelligent Pharmacy",
        authors: "Xingtong Lin、Zongwen Yang、Rong Fan、Xinchen Wang、Ya Zhu",
        description: "我以第一作者身份参与撰写了一篇叙述性综述，讨论连续血糖监测如何辅助重症监护中的极端血糖风险管理。文章梳理阈值与趋势预警、预测模型，以及传感器可靠性变化带来的限制，并讨论结合数据置信度和血糖复测的临床决策支持路径。",
        link: articleUrl, linkLabel: "查看论文",
      },
      {
        id: "poster", year: "2025", kind: "大一阶段研究海报",
        title: "Decision Making Along a Semi-continuous Dimension in an Open Field Arena",
        source: "Meeting of the Minds · 卡内基梅隆大学",
        authors: "Louisa Lin、Kevin K.M. Wright、Eric A. Yttri",
        description: "这张海报是我在 CMU 大一期间完成的阶段性展示，介绍 Yttri Lab 的 27 孔开放场行为任务，观察奖励分布变化后小鼠如何调整选择。在博士生 Kevin K.M. Wright 指导、PI Eric A. Yttri 带领下，我参与行为实验，并分析了早期的策略调整与持续偏好现象。",
        link: posterPdf, linkLabel: "打开海报 PDF",
      },
      {
        id: "bci", year: "2026", kind: "未发表的课程项目",
        title: "脑电光标解码模拟",
        source: "卡内基梅隆大学",
        description: "在 CMU 的脑机接口课程项目中，我使用课程提供的五组脑电试次，对 C3/C4 通道进行空间滤波与 Burg 功率谱估计，提取高 alpha 频段特征，再用两通道特征差模拟光标的水平移动。我比较了原始输出与整体均值校正后的模拟轨迹。",
      },
    ],
  },
};

export function PublicationsProjects({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [selected, setSelected] = useState<Entry["id"] | null>(null);
  const active = t.entries.find(entry => entry.id === selected);

  function open(event: MouseEvent<HTMLButtonElement>, id: Entry["id"]) {
    event.currentTarget.focus({ preventScroll: true });
    setSelected(id);
  }

  function group(title: string, entries: Entry[]) {
    return <div className="output-group" key={title}>
      <h3>{title}</h3>
      <div className="output-list">{entries.map(entry => <article className="output-entry" key={entry.id}>
        <button type="button" className="output-open" aria-haspopup="dialog" onClick={event => open(event, entry.id)}>
          <span className="output-date"><time>{entry.year}</time><span>{entry.kind}</span></span>
          <span className="output-summary"><strong>{entry.title}</strong><span>{entry.source}</span></span>
          <span className="output-action">{t.details}<span aria-hidden="true">→</span></span>
        </button>
      </article>)}</div>
    </div>;
  }

  return <>
    <section id="outputs" className="section output-section" aria-labelledby="outputs-heading">
      <div className="content-width">
        <div className="section-heading" data-reveal><h2 id="outputs-heading">{t.heading}</h2></div>
        {group(t.publications, t.entries.filter(entry => entry.id !== "bci"))}
        {group(t.projects, t.entries.filter(entry => entry.id === "bci"))}
      </div>
    </section>
    {active && <DetailDialog className="output-detail-dialog" title={active.title} closeLabel={t.close} onClose={() => setSelected(null)}>
      <article className="output-detail">
        <header>
          <p className="output-detail-kind">{active.year} <span aria-hidden="true">·</span> {active.kind}</p>
          <h2>{active.title}</h2>
          <p className="output-detail-source">{active.source}</p>
          {active.authors && <p className="output-detail-authors">{active.authors}</p>}
        </header>
        <p className="output-detail-description">{active.description}</p>
        {active.link && <a className="output-document-link" href={active.link} target="_blank" rel="noopener noreferrer">{active.linkLabel}<span aria-hidden="true">↗</span></a>}
        {active.id === "poster" && <figure className="output-poster-preview"><img src={posterImage} alt={t.posterCaption} width="1400" height="1050" loading="lazy" /></figure>}
      </article>
    </DetailDialog>}
  </>;
}
