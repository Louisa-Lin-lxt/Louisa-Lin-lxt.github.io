"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { DetailDialog } from "./DetailDialog";
import { taotaoPhotos as photos } from "../content/taotao-photos";

// One palette and silhouette, based on Taotao's ivory curls and blue harness.
const columns = 32, rows = 36;
const palette = { fur: '#eee7d9', light: '#faf5e9', shade: '#d6cbb7', muzzle: '#c8ad8b', eye: '#302e2c', blue: '#506988', spot: '#b7c8db' };
type Color = keyof typeof palette;
const cells: { x: number; y: number; color: Color }[] = [];
for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
  let color: Color | undefined;
  const ellipse = (cx: number, cy: number, rx: number, ry: number) => ((x-cx)/rx)**2 + ((y-cy)/ry)**2 <= 1;
  if (ellipse(15.5, 25, 7, 9)) color = 'fur';
  if ((x >= 10 && x <= 13 || x >= 19 && x <= 22) && y >= 26 && y <= 34) color = 'fur';
  if ((x >= 9 && x <= 13 || x >= 19 && x <= 23) && y === 35) color = 'shade';
  if (ellipse(6, 12, 4, 6) || ellipse(25, 12, 4, 6)) color = 'shade';
  if (ellipse(6, 11, 3, 5) || ellipse(25, 11, 3, 5)) color = 'fur';
  if (ellipse(15.5, 10, 10, 10)) color = 'light';
  if (color && color !== 'shade' && (x*7+y*11)%19 < 3) color = 'fur';
  if (ellipse(15.5, 15, 5, 3)) color = 'muzzle';
  if (ellipse(12, 15, 2, 2) || ellipse(19, 15, 2, 2)) color = 'fur';
  if ((x===11 || x===12 || x===19 || x===20) && (y===10 || y===11)) color = 'eye';
  if ((x===11 || x===19) && y===10) color = 'spot';
  if (x>=14 && x<=17 && y>=14 && y<=15 || x>=15 && x<=16 && y===16) color = 'eye';
  if (x>=14 && x<=17 && y===18) color = 'shade';
  if (color && y>=21 && y<=27 && Math.abs(y-(25-Math.abs(x-15.5)*.6))<1.1) color = 'blue';
  if (y>=25 && y<=31 && x>=15 && x<=16) color = 'blue';
  if (color==='blue' && (x+y)%4===0) color = 'spot';
  if (color) cells.push({x,y,color});
}

export function TaotaoPixels({lang}:{lang:'en'|'zh'}) {
  const [lit,setLit] = useState<number|null>(null);
  const [focused,setFocused] = useState(0);
  const [photo,setPhoto] = useState<number|null>(null);
  const buttons = useRef<(HTMLButtonElement|null)[]>([]);
  const active = lit === null ? null : cells[lit];
  const openPhoto = (index:number) => { setFocused(index); setPhoto(index % photos.length); };
  const navigate = (event:KeyboardEvent<HTMLButtonElement>, index:number) => {
    const directions:Record<string,[number,number]> = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    const direction=directions[event.key];
    if (!direction && event.key!=='Home' && event.key!=='End') return;
    event.preventDefault();
    let next=event.key==='Home'?0:event.key==='End'?cells.length-1:index;
    if(direction) {
      const current=cells[index];
      const candidates=cells.map((cell,i)=>({i,dx:cell.x-current.x,dy:cell.y-current.y})).filter(({dx,dy})=>direction[0]?dx*direction[0]>0:dy*direction[1]>0);
      candidates.sort((a,b)=>(Math.abs(a.dx)+Math.abs(a.dy)+(direction[0]?Math.abs(a.dy):Math.abs(a.dx))*20)-(Math.abs(b.dx)+Math.abs(b.dy)+(direction[0]?Math.abs(b.dy):Math.abs(b.dx))*20));
      next=candidates[0]?.i??index;
    }
    setFocused(next); buttons.current[next]?.focus();
  };
  return <>
    <div className="taotao-pixel-gallery">
      <div className="taotao-pixel-copy"><h2>{lang==='en'?'Taotao':'淘淘'}</h2><p>{lang==='en'?'Move over the pixels to light them up. Click one to see a photo.':'移过像素，点亮淘淘。点击一格，打开照片。'}</p></div>
      <div className="taotao-pixel-board" role="group" aria-label={lang==='en'?'Taotao photo pixels. Use arrow keys to explore; Enter opens a photo.':'淘淘像素相册。方向键选择像素，回车打开照片。'} onPointerLeave={()=>setLit(null)} style={{'--columns':columns,'--rows':rows} as CSSProperties}>
        {cells.map((cell,index)=>{
          const distance=active?Math.hypot(cell.x-active.x,cell.y-active.y):99;
          return <button key={`${cell.x}-${cell.y}`} ref={node=>{buttons.current[index]=node;}} type="button" className={`taotao-pixel${distance<3.8?' is-lit':''}${distance<1?' is-center':''}`} tabIndex={focused===index?0:-1} aria-haspopup="dialog" aria-label={lang==='en'?`Open Taotao photo, pixel ${index+1}`:`打开淘淘照片，像素 ${index+1}`} style={{gridColumn:cell.x+1,gridRow:cell.y+1,'--pixel-color':palette[cell.color]} as CSSProperties} onPointerEnter={()=>setLit(index)} onPointerDown={()=>setLit(index)} onFocus={()=>{setFocused(index);setLit(index);}} onBlur={()=>setLit(null)} onKeyDown={event=>navigate(event,index)} onClick={()=>openPhoto(index)} />;
        })}
      </div>
    </div>
    {photo!==null&&<DetailDialog title={lang==='en'?'Taotao photo':'淘淘的照片'} closeLabel={lang==='en'?'Close photo':'关闭照片'} onClose={()=>setPhoto(null)} className="taotao-photo-dialog"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH??''}${photos[photo].src}`} alt={photos[photo][lang]} width={photos[photo].width} height={photos[photo].height} /><nav className="taotao-photo-controls" aria-label={lang==='en'?'Photo navigation':'照片切换'}><button type="button" onClick={()=>setPhoto((photo-1+photos.length)%photos.length)} aria-label={lang==='en'?'Previous photo':'上一张照片'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button><span aria-live="polite">{photo+1} / {photos.length}</span><button type="button" onClick={()=>setPhoto((photo+1)%photos.length)} aria-label={lang==='en'?'Next photo':'下一张照片'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button></nav></DetailDialog>}
  </>;
}
