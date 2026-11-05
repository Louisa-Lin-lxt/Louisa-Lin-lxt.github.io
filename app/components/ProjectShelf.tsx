"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { experience, researchTimeline, type Story } from "../content/portfolio";
import type { Lang } from "./usePersistentLanguage";

export type ShelfKind = 'research' | 'experience';
const basePath=process.env.NEXT_PUBLIC_BASE_PATH??'';
export function storyIdentity(story:Story,kind:ShelfKind,index:number,lang:Lang) {
  const [organization,...affiliation]=story.org.split(' · ');
  const position=kind==='research'
    ? (index===2 ? (lang==='en'?'Summer Research Participant':'暑期研究参与者') : (lang==='en'?'Research Assistant':'研究助理'))
    : story.title;
  return {organization,affiliation:affiliation.join(' · '),position};
}
function ShelfCard({kind,index,lang,onOpen,onKeyDown}:{kind:ShelfKind;index:number;lang:Lang;onOpen:(index:number)=>void;onKeyDown:(event:KeyboardEvent<HTMLButtonElement>)=>void}) {
  const story=(kind==='research'?researchTimeline:experience)[lang][index];
  const {organization,position}=storyIdentity(story,kind,index,lang);
  const titleId=`${kind}-card-${index}-title`;
  return <article className={`project-card ${kind}-card`} aria-labelledby={titleId}>
    <figure className="shelf-figure"><div className={`shelf-image ${story.imageClass ?? ''}`}><img src={`${basePath}${story.image}`} alt={story.alt} loading="lazy"/></div></figure>
    <div className="shelf-card-copy">
      <h3 id={titleId}>{organization}</h3>
      <p className="shelf-position">{position}</p>
      <time>{story.date}</time>
      <div className="shelf-card-bottom"><button type="button" className="card-open" onKeyDown={onKeyDown} aria-haspopup="dialog" aria-label={`${lang==='en'?'View details':'查看详情'}: ${organization}`} onClick={()=>onOpen(index)}><span>{lang==='en'?'View details':'查看详情'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>
    </div>
  </article>;
}

export function ProjectShelf({kind,lang,onOpen}:{kind:ShelfKind;lang:Lang;onOpen:(index:number)=>void}) {
  const railRef=useRef<HTMLDivElement>(null);
  const [position,setPosition]=useState({overflow:false,left:false,right:false,first:1,last:kind==='research'?3:4});
  const stories=(kind==='research'?researchTimeline:experience)[lang];
  const count=stories.length;
  useEffect(()=>{
    const rail=railRef.current;if(!rail)return;
    let frame=0;
    const measure=()=>{
      const bounds=rail.getBoundingClientRect();
      const cards=[...rail.querySelectorAll<HTMLElement>('.project-card')];
      const shown=cards.map((card,index)=>({index,rect:card.getBoundingClientRect()})).filter(({rect})=>rect.left>=bounds.left-3&&rect.right<=bounds.right+3);
      const first=shown[0]?.index??Math.round(rail.scrollLeft/Math.max(1,cards[0]?.offsetWidth??1));
      const last=shown.at(-1)?.index??first;
      const next={overflow:rail.scrollWidth>rail.clientWidth+4,left:rail.scrollLeft>4,right:rail.scrollLeft+rail.clientWidth<rail.scrollWidth-4,first:first+1,last:last+1};
      setPosition(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next);
    };
    const queue=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure);};
    const observer=new ResizeObserver(queue);observer.observe(rail);rail.querySelectorAll('.project-card').forEach(card=>observer.observe(card));
    rail.addEventListener('scroll',queue,{passive:true});queue();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();rail.removeEventListener('scroll',queue);};
  },[kind]);
  function scroll(direction:number){
    const rail=railRef.current;if(!rail)return;
    const cards=[...rail.querySelectorAll<HTMLElement>('.project-card')];
    const current=Math.round(rail.scrollLeft/((cards[1]?.offsetLeft??cards[0]?.offsetWidth??1)-(cards[0]?.offsetLeft??0)));
    const target=cards[Math.max(0,Math.min(count-1,current+direction))];
    rail.scrollTo({left:target.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  function handleCardKey(event:KeyboardEvent<HTMLButtonElement>) {

      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      const rail=railRef.current;if(!rail)return;
      const buttons=[...rail.querySelectorAll<HTMLButtonElement>('.card-open')],index=buttons.indexOf(document.activeElement as HTMLButtonElement);
      if(index<0)return;event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?count-1:Math.max(0,Math.min(count-1,index+(event.key==='ArrowRight'?1:-1)));
      buttons[next]?.focus({preventScroll:true});
      const card=buttons[next]?.closest<HTMLElement>('.project-card');if(card)rail.scrollTo({left:card.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});

  }
  return <div className={`project-shelf ${kind}-shelf`}>
    <div ref={railRef} className="card-rail" role="region" aria-label={lang==='en'?`${kind==='research'?'Research':'Experience'} cards`:`${kind==='research'?'科研':'经历'}卡片`} style={{'--card-count':count} as CSSProperties}>
      {stories.map((_,index)=><ShelfCard key={index} kind={kind} index={index} lang={lang} onOpen={onOpen} onKeyDown={handleCardKey}/>)}
    </div>
{position.overflow&&<div className="shelf-footer"><div className="rail-controls"><span>{position.first===position.last?position.first:`${position.first}–${position.last}`} / {count}</span><button type="button" disabled={!position.left} onClick={()=>scroll(-1)} aria-label={lang==='en'?`Previous ${kind} card`:`上一张${kind==='research'?'科研':'经历'}卡片`}>←</button><button type="button" disabled={!position.right} onClick={()=>scroll(1)} aria-label={lang==='en'?`Next ${kind} card`:`下一张${kind==='research'?'科研':'经历'}卡片`}>→</button></div></div>}
  </div>;
}
