"use client";

import { useEffect, useRef, useState } from 'react';
import type { Lang } from './usePersistentLanguage';

const sections=['home','about','research','experience','interests','contact'];
const names={en:['Home','About','Research','Work Experience','Beyond Academics','Contact'],zh:['首页','关于我','科研','工作经历','学业之外','联系']};
const pixels: {x:number;y:number}[]=[];
function line(x1:number,y1:number,x2:number,y2:number){
  const steps=Math.max(Math.abs(x2-x1),Math.abs(y2-y1))/4;
  for(let i=0;i<=steps;i++) pixels.push({x:Math.round((x1+(x2-x1)*i/steps)/4)*4,y:Math.round((y1+(y2-y1)*i/steps)/4)*4});
}
// A single soma, dendrites and a long branching axon. All squares share one grid.
line(24,28,8,12);line(8,12,8,0);line(24,28,40,12);line(40,12,44,0);line(24,28,24,8);
for(let i=0;i<5;i++){const y=44+i*60;line(24,y,24,y+36);line(24,y+36,28,y+40);line(28,y+40,24,y+60);line(24,y+36,i%2?40:8,y+28);}
const uniquePixels=[...new Map(pixels.map(p=>[`${p.x},${p.y}`,p])).values()];

export function NeuralProgress({lang,activeSection}:{lang:Lang;activeSection:string}) {
  const [progress,setProgress]=useState(0);
  const frame=useRef(0);
  useEffect(()=>{
    const update=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const stops=sections.map(id=>{const e=document.getElementById(id);return Math.max(0,Math.min(max,(e?.offsetTop??0)-innerHeight*.35));});
      const y=Math.max(0,scrollY);let fraction=0;
      for(let i=0;i<stops.length-1;i++)if(y>=stops[i])fraction=(i+Math.min(1,(y-stops[i])/Math.max(1,stops[i+1]-stops[i])))/(stops.length-1);
      if(y>=max-4)fraction=1;
      setProgress(Math.round(fraction*1000)/10);
    };
    const queue=()=>{cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(update);};
    const observer=new ResizeObserver(queue);observer.observe(document.body);
    addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);update();
    return()=>{cancelAnimationFrame(frame.current);observer.disconnect();removeEventListener('scroll',queue);removeEventListener('resize',queue);};
  },[]);
  const active=Math.max(0,sections.indexOf(activeSection));
  return <nav className="neural-progress" aria-label={lang==='en'?'Page sections':'页面区块'} data-progress={progress}>
    <span className="sr-only" role="progressbar" aria-label={lang==='en'?'Reading progress':'阅读进度'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-valuetext={names[lang][active]}/>
    <svg viewBox="0 0 52 356" preserveAspectRatio="none" aria-hidden="true" shapeRendering="crispEdges">
      <defs><clipPath id="neuron-progress-fill"><rect width="52" height={44+progress*3}/></clipPath></defs>
      <g className="progress-rest">{uniquePixels.map(p=><rect key={`${p.x}-${p.y}`} {...p} width="3" height="3"/>)}</g>
      <g className="progress-lit" clipPath="url(#neuron-progress-fill)">{uniquePixels.map(p=><rect key={`${p.x}-${p.y}`} {...p} width="3" height="3"/>)}</g>
      <path className="progress-soma" d="M20 24h12v4h4v12h-4v4H20v-4h-4V28h4Z"/><rect className="progress-core" x="24" y="32" width="4" height="4"/>
    </svg>
    {sections.map((id,i)=><a key={id} className={`progress-stop ${i<=active?'is-lit':''}`} href={`#${id}`} aria-current={activeSection===id?'location':undefined} aria-label={names[lang][i]} style={{top:24+i*60}}><i aria-hidden="true"/><span>{names[lang][i]}</span></a>)}
  </nav>;
}
