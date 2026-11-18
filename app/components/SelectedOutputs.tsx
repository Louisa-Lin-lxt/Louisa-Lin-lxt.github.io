import type { Lang } from "./usePersistentLanguage";
import "./SelectedOutputs.css";

const articleUrl = "https://doi.org/10.1016/j.ipha.2026.08.008";

const labels = {
  en: {
    heading: "Selected outputs",
    article: "Co-authored article · 2026",
    poster: "Research poster · 2025",
    posterVenue: "CMU SURA · Meeting of the Minds",
    articleLink: "Read the article",
  },
  zh: {
    heading: "部分学术成果",
    article: "合著论文 · 2026",
    poster: "学术海报 · 2025",
    posterVenue: "CMU SURA · Meeting of the Minds",
    articleLink: "查看论文",
  },
} as const;

export function SelectedOutputs({ lang }: { lang: Lang }) {
  const t = labels[lang];

  return <aside className="selected-outputs" aria-labelledby="selected-outputs-heading">
    <h3 id="selected-outputs-heading">{t.heading}</h3>
    <div className="selected-output-list">
      <article className="selected-output">
        <p className="selected-output-kind">{t.article}</p>
        <div className="selected-output-main">
          <h4><a href={articleUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.articleLink}: Algorithmic advances and challenges in continuous glucose monitoring for extreme glycemic risk management in the intensive care unit`}>
            Algorithmic advances and challenges in continuous glucose monitoring for extreme glycemic risk management in the intensive care unit
            <span aria-hidden="true" className="selected-output-arrow">↗</span>
          </a></h4>
          <p>Intelligent Pharmacy <span aria-hidden="true">·</span> X. Lin, Z. Yang, R. Fan, X. Wang &amp; Y. Zhu</p>
        </div>
      </article>
      <article className="selected-output">
        <p className="selected-output-kind">{t.poster}</p>
        <div className="selected-output-main">
          <h4>Decision Making Along a Semi-continuous Dimension in an Open Field Arena</h4>
          <p>{t.posterVenue} <span aria-hidden="true">·</span> X. Lin</p>
        </div>
      </article>
    </div>
  </aside>;
}
