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
type EntryProps = { index:number; lang:Lang; onOpen:(index:number)=>void };

function DetailsButton({organization,index,lang,onOpen}:EntryProps & {organization:string}) {
  return <button type="button" className="card-open" aria-haspopup="dialog" aria-label={`${lang==='en'?'View details':'查看详情'}: ${organization}`} onClick={event=>{event.currentTarget.focus({preventScroll:true});onOpen(index);}}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
  </button>;
}

function ResearchCard({index,lang,onOpen}:EntryProps) {
  const story=researchTimeline[lang][index];
  const {organization,position}=storyIdentity(story,'research',index,lang);
  const titleId=`research-card-${index}-title`;
  return <article className="project-card research-card" aria-labelledby={titleId}>
    <figure className="shelf-figure"><div className={`shelf-image ${story.imageClass ?? ''}`}><img src={`${basePath}${story.image}`} alt={story.alt} loading="lazy"/></div></figure>
    <div className="shelf-card-copy">
      <h3 id={titleId}><span>{position}</span><span className="shelf-organization">{organization}</span></h3>
      <div className="shelf-card-bottom">
        <time>{story.date}</time>
        <DetailsButton organization={organization} index={index} lang={lang} onOpen={onOpen}/>
      </div>
    </div>
  </article>;
}

function ExperienceCard({index,lang,onOpen}:EntryProps) {
  const story=experience[lang][index];
  const {organization,position}=storyIdentity(story,'experience',index,lang);
  const titleId=`experience-${index}-title`;
  return <article className="project-card work-card" aria-labelledby={titleId}>
    <div className="work-card-heading">
      <img className={`work-card-logo ${story.imageClass ?? ''}`} src={`${basePath}${story.image}`} alt={story.alt} loading="lazy"/>
      <div className="work-card-copy">
        <h3 id={titleId}>{position}</h3>
        <p>{organization}</p>
      </div>
    </div>
    <div className="shelf-card-bottom work-card-footer">
      <time>{story.date}</time>
      <DetailsButton organization={organization} index={index} lang={lang} onOpen={onOpen}/>
    </div>
  </article>;
}

export function ProjectShelf({kind,lang,onOpen}:{kind:ShelfKind;lang:Lang;onOpen:(index:number)=>void}) {
  const stories=(kind==='research'?researchTimeline:experience)[lang];
  const Entry=kind==='research'?ResearchCard:ExperienceCard;
  return <div className={`project-shelf ${kind}-shelf`} data-reveal="support">
    <div className={kind==='research'?'card-grid':'work-card-grid'} role="region" aria-label={lang==='en'?(kind==='research'?'Research cards':'Work experience'):(kind==='research'?'科研卡片':'工作经历')}>
      {stories.map((_,index)=><Entry key={index} index={index} lang={lang} onOpen={onOpen}/>)}
    </div>
  </div>;
}
