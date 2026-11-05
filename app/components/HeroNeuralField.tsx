"use client";

import { useEffect, useRef } from "react";

type NodePoint = { x: number; y: number; radius: number; yellow: boolean; phase: number };
type Edge = { from: number; to: number; bend: number; phase: number; speed: number };

const quadraticPoint = (a: NodePoint, b: NodePoint, bend: number, progress: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const controlX = (a.x + b.x) / 2 - dy / length * bend;
  const controlY = (a.y + b.y) / 2 + dx / length * bend;
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * a.x + 2 * inverse * progress * controlX + progress * progress * b.x,
    y: inverse * inverse * a.y + 2 * inverse * progress * controlY + progress * progress * b.y,
    controlX,
    controlY,
  };
};

export function HeroNeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerActive = false;
    let signalX = -1000;
    let signalY = -1000;
    let signalStarted = -10;
    const nodes: NodePoint[] = [];
    const edges: Edge[] = [];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible=true, lastDraw=0, dirty=true;

    const seedNetwork = () => {
      nodes.length = 0;
      edges.length = 0;
      let seed = Math.round(width * 11 + height * 7) || 1;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      const count = Math.max(20, Math.min(36, Math.round(width / 46)));
      for (let index = 0; index < count; index += 1) {
        const lane = index % 5;
        const progress = index / Math.max(count - 1, 1);
        const x = width * (.025 + progress * .82) + (random() - .5) * width * .07;
        const wave = Math.sin(progress * Math.PI * 2.4 + lane * .78);
        const y = height * (.18 + lane * .16) + wave * height * .055 + (random() - .5) * height * .07;
        nodes.push({ x, y, radius: 2 + random() * 2.2, yellow: index % 8 === 2 || index % 11 === 0, phase: random() });
      }
      nodes.forEach((node, index) => {
        const candidates = nodes
          .map((target, targetIndex) => ({ targetIndex, distance: Math.hypot(target.x - node.x, target.y - node.y), forward: target.x > node.x }))
          .filter((item) => item.forward && item.distance < Math.min(width * .24, 290))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, index % 4 === 0 ? 3 : 2);
        candidates.forEach((candidate, candidateIndex) => {
          if (edges.some((edge) => edge.from === index && edge.to === candidate.targetIndex)) return;
          edges.push({
            from: index,
            to: candidate.targetIndex,
            bend: (candidateIndex % 2 ? -1 : 1) * (12 + random() * 32),
            phase: random(),
            speed: .055 + random() * .055,
          });
        });
      });
    };

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedNetwork();
      dirty=true;
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerActive = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!pointerActive) return;
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      dirty=true;
    };
    const sendSignal = (event: PointerEvent) => {
      updatePointer(event);
      if (!pointerActive || motion.matches || (event.target as Element).closest("a,button,input")) return;
      canvas.dataset.pulse=String(Number(canvas.dataset.pulse??0)+1);
      signalX = pointerX;
      signalY = pointerY;
      signalStarted = performance.now() * .001;
    };
    const pointerLeave = () => { pointerActive = false; dirty=true; };

    const square=(x:number,y:number,size:number,color:string)=>{
      context.fillStyle=color;
      context.fillRect(Math.round(x/4)*4,Math.round(y/4)*4,size,size);
    };
    const draw = (timestamp: number) => {
      frame=requestAnimationFrame(draw);
      if(!visible||document.hidden||timestamp-lastDraw<40||motion.matches&&!dirty)return;
      lastDraw=timestamp;dirty=false;
      const time=timestamp*.001;
      context.clearRect(0,0,width,height);
      const signalRadius=Math.max(0,(time-signalStarted)*320);
      edges.forEach(edge=>{
        const a=nodes[edge.from],b=nodes[edge.to];
        const distance=pointerActive?Math.min(Math.hypot(a.x-pointerX,a.y-pointerY),Math.hypot(b.x-pointerX,b.y-pointerY)):999;
        const awake=motion.matches?0:Math.max(0,1-distance/210);
        const waveDistance=Math.abs(Math.hypot((a.x+b.x)/2-signalX,(a.y+b.y)/2-signalY)-signalRadius);
        const wave=!motion.matches&&signalRadius<900?Math.max(0,1-waveDistance/80):0;
        const count=Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/3);
        const seen=new Set<string>();
        for(let i=0;i<=count;i++){
          const point=quadraticPoint(a,b,edge.bend,i/count),x=Math.round(point.x/4)*4,y=Math.round(point.y/4)*4,key=`${x}:${y}`;
          if(seen.has(key))continue;seen.add(key);
          square(x,y,2,`rgba(72,133,188,${.10+awake*.16+wave*.28})`);
        }
        const t=motion.matches?edge.phase:(time*edge.speed+edge.phase)%1;
        const pulse=quadraticPoint(a,b,edge.bend,t);
        square(pulse.x,pulse.y,4,`rgba(${edge.from%7===0?'197,163,65':'52,130,192'},${.35+awake*.3+wave*.3})`);
      });
      nodes.forEach(node=>{
        const distance=pointerActive?Math.hypot(node.x-pointerX,node.y-pointerY):999;
        const awake=motion.matches?0:Math.max(0,1-distance/180);
        const waveDistance=Math.abs(Math.hypot(node.x-signalX,node.y-signalY)-signalRadius);
        const wave=!motion.matches&&signalRadius<900?Math.max(0,1-waveDistance/70):0;
        const color=`rgba(${node.yellow?'195,160,56':'45,126,187'},${.4+awake*.3+wave*.3})`;
        square(node.x,node.y,4,color);
        for(const [x,y] of [[-4,0],[4,0],[0,-4],[0,4]])square(node.x+x,node.y+y,3,color);
        if(awake+wave>.6)for(const [x,y]of[[-8,0],[8,0],[0,-8],[0,8]])square(node.x+x,node.y+y,2,color);
      });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true;});
    intersection.observe(hero);
    const refresh=()=>{dirty=true;};
    motion.addEventListener("change",refresh);
    document.addEventListener("visibilitychange",refresh);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", sendSignal);
    hero.addEventListener("pointerleave", pointerLeave);
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change",refresh);
      document.removeEventListener("visibilitychange",refresh);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", sendSignal);
      hero.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return <canvas className="hero-neural-field" ref={canvasRef} aria-hidden="true" />;
}
