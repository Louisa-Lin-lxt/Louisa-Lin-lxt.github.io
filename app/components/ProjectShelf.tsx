"use client";

import { experience, researchTimeline, type Story } from "../content/portfolio";
import type { Lang } from "./usePersistentLanguage";

export type ShelfKind = 'research' | 'experience';
const basePath=process.env.NEXT_PUBLIC_BASE_PATH??'';
export function storyIdentity(story:Story,kind:ShelfKind,index:number,lang:Lang) {
  const [organization,...affiliation]=story.org.split(' · ');
  const position=kind==='research'
    ? (lang==='en'?'Research Assistant':'研究助理')
    : story.title;
  return {organization,affiliation:affiliation.join(' · '),institution:affiliation[0]??'',position};
}
function ShelfCard({kind,index,lang,onOpen}:{kind:ShelfKind;index:number;lang:Lang;onOpen:(index:number)=>void}) {
  const story=(kind==='research'?researchTimeline:experience)[lang][index];
  const {organization,institution,position}=storyIdentity(story,kind,index,lang);
  const titleId=`${kind}-card-${index}-title`;
  return <article className={`project-card ${kind}-card`} aria-labelledby={titleId}>
    <figure className="shelf-figure"><div className={`shelf-image ${story.imageClass ?? ''}`}><img src={`${basePath}${story.image}`} alt={story.alt} loading="lazy"/></div></figure>
    <div className="shelf-card-copy">
      <h3 id={titleId}>{organization}</h3>
      {kind==='research'&&institution&&<p className="shelf-institution">{institution}</p>}
      <p className="shelf-position">{position}</p>
      <time>{story.date}</time>
      <div className="shelf-card-bottom"><button type="button" className="card-open" aria-haspopup="dialog" aria-label={`${lang==='en'?'View details':'查看详情'}: ${organization}`} onClick={event=>{event.currentTarget.focus({preventScroll:true});onOpen(index);}}><span>{lang==='en'?'View details':'查看详情'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>
    </div>
  </article>;
}

export function ProjectShelf({kind,lang,onOpen}:{kind:ShelfKind;lang:Lang;onOpen:(index:number)=>void}) {
  const stories=(kind==='research'?researchTimeline:experience)[lang];
  return <div className={`project-shelf ${kind}-shelf`}>
    <div className="card-grid" role="region" aria-label={lang==='en'?`${kind==='research'?'Research':'Experience'} cards`:`${kind==='research'?'科研':'经历'}卡片`}>
      {stories.map((_,index)=><ShelfCard key={index} kind={kind} index={index} lang={lang} onOpen={onOpen}/>)}
    </div>
  </div>;
}
