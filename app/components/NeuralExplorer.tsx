"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "./usePersistentLanguage";
import { PixelSignal } from "./PixelSignal";

const topics = {
  en: [
    { short:"Research", title:"EEG & behavioral neuroscience", text:"Human EEG recording, behavioral experiments, and research support.", link:"Explore research", target:"research" },
    { short:"Venture", title:"Technology & early-stage investing", text:"Healthcare and technology sourcing as a Next Capital Venture Fellow.", link:"Explore experience", target:"experience" },
    { short:"Interests", title:"A little beyond the lab", text:"Music, life with Taotao, and places along the way.", link:"Explore interests", target:"interests" },
  ],
  zh: [
    { short:"科研", title:"脑电与行为神经科学", text:"人类 EEG 记录、行为实验与研究支持。", link:"探索科研", target:"research" },
    { short:"投资", title:"科技与早期投资", text:"作为嘉程资本 Venture Fellow，参与医疗健康与科技项目挖掘。", link:"探索经历", target:"experience" },
    { short:"兴趣", title:"实验室之外", text:"音乐、与淘淘的日常，以及旅途中的风景。", link:"探索兴趣", target:"interests" },
  ],
};
const initialPositions = [{left:"29%",top:"19%"},{left:"80%",top:"45%"},{left:"44%",top:"78%"}];

export function NeuralExplorer({ lang, onExplore }: { lang: Lang; onExplore: (target:string)=>void }) {
  const hostRef=useRef<HTMLDivElement>(null);
  const nodeRefs=useRef<(HTMLButtonElement|null)[]>([]);
  const sliderRef=useRef<HTMLInputElement>(null);
  const emitRef=useRef<(index:number)=>void>(()=>{});
  const rotateRef=useRef<(angle:number)=>void>(()=>{});
  const activateRef=useRef<(index:number)=>void>(()=>{});
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const [selected,setSelected]=useState(0);
  const [pulse,setPulse]=useState(0);
  const [phase,setPhase]=useState<'idle'|'sending'|'arrived'>('idle');
  const [ready,setReady]=useState(false);
  const activate=useCallback((index:number)=>{
    setSelected(index); setPulse(value=>value+1); setPhase('sending');
    emitRef.current(index);
    if(timer.current) clearTimeout(timer.current);
    timer.current=setTimeout(()=>setPhase('arrived'),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:1250);
  },[]);
  useEffect(()=>{activateRef.current=activate;},[activate]);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);

  useEffect(()=>{
    const host=hostRef.current;
    if(!host)return;
    let disposed=false;
    let cleanup=()=>{};
    void import('three').then(THREE=>{
      if(disposed)return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.3:1.6));
      renderer.setClearColor(0,0); renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden','true');
      host.prepend(renderer.domElement);
      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(38,1,.1,30); camera.position.set(0,0,6.2);
      const form=new THREE.Group(); scene.add(form);
      scene.add(new THREE.HemisphereLight(0xf4fcff,0x60748d,3));
      const light=new THREE.DirectionalLight(0xffffff,4); light.position.set(-3,4,5);scene.add(light);
      const rim=new THREE.DirectionalLight(0xb2daf1,3);rim.position.set(3,-2,2);scene.add(rim);
      const shell=new THREE.MeshPhysicalMaterial({color:0xbad7e5,metalness:.22,roughness:.26,clearcoat:1});
      const fibre=new THREE.MeshPhysicalMaterial({color:0x568eab,metalness:.25,roughness:.3});
      const soma=new THREE.Mesh(new THREE.SphereGeometry(.35,32,24),shell);soma.scale.set(1,1.12,.8);form.add(soma);
      const ends=[new THREE.Vector3(-.82,1.35,.15),new THREE.Vector3(1.22,.2,-.1),new THREE.Vector3(-.2,-1.32,.3)];
      const controls=[new THREE.Vector3(-.05,.8,.48),new THREE.Vector3(.75,.65,.2),new THREE.Vector3(-.6,-.72,-.22)];
      const curves=ends.map((end,i)=>new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),controls[i].clone().multiplyScalar(.55),controls[i],end]));
      curves.forEach((curve,index)=>{
        form.add(new THREE.Mesh(new THREE.TubeGeometry(curve,56,.075,10,false),shell));
        for(let strand=0;strand<7;strand++){
          const points=[];
          for(let step=0;step<=60;step++){
            const t=step/60, point=curve.getPoint(t), a=strand/7*Math.PI*2+t*5;
            const spread=.09+.04*Math.sin(t*Math.PI);
            point.x+=Math.cos(a)*spread;point.z+=Math.sin(a)*spread;points.push(point);
          }
          form.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),60,.011,4,false),fibre));
        }
        for(const side of [-1,1]){
          const start=curve.getPoint(.65),end=ends[index].clone().add(new THREE.Vector3(side*.25,-.1,side*.22));
          const branch=new THREE.CatmullRomCurve3([start,start.clone().lerp(end,.55).add(new THREE.Vector3(side*.07,0,.12)),end]);
          form.add(new THREE.Mesh(new THREE.TubeGeometry(branch,24,.025,6,false),fibre));
        }
      });
      const colors=[0x3489cb,0x8278b1,0xc6a344];
      const nodes=ends.map((end,index)=>{
        const material=new THREE.MeshPhysicalMaterial({color:colors[index],emissive:colors[index],emissiveIntensity:.12,roughness:.24,metalness:.18,clearcoat:1});
        const mesh=new THREE.Mesh(new THREE.SphereGeometry(.16,24,16),material);mesh.position.copy(end);mesh.userData.index=index;form.add(mesh);return mesh;
      });
      const signalMaterial=new THREE.MeshBasicMaterial({color:0xf7d776});
      const signalGeometry=new THREE.SphereGeometry(.045,12,8);
      const signals=Array.from({length:6},()=>{const mesh=new THREE.Mesh(signalGeometry,signalMaterial);mesh.visible=false;form.add(mesh);return mesh;});
      const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
      let frame=0,lastFrame=0,visible=true,dirty=true,signalStart=-Infinity,signalIndex=0;
      let targetYaw=0,targetPitch=0,parallaxX=0,parallaxY=0;
      let down:{x:number;y:number;id:number;yaw:number;pitch:number;dragging:boolean}|null=null;
      const projected=new THREE.Vector3();
      const render=()=>{
        form.updateMatrixWorld(true);
        nodes.forEach((node,index)=>{
          node.getWorldPosition(projected);projected.project(camera);
          const button=nodeRefs.current[index];
          if(button){button.style.left=`${(projected.x*.5+.5)*100}%`;button.style.top=`${(-projected.y*.5+.5)*100}%`;}
        });
        renderer.render(scene,camera);
      };
      const tick=(now:number)=>{
        frame=requestAnimationFrame(tick);
        if(!visible||document.hidden||now-lastFrame<32)return;
        lastFrame=now;
        const elapsed=now-signalStart;
        const moving=elapsed>=0&&elapsed<1250&&!motion.matches;
        const yaw=targetYaw+(motion.matches?0:parallaxX),pitch=targetPitch+(motion.matches?0:parallaxY);
        const turning=Math.abs(form.rotation.y-yaw)>.001||Math.abs(form.rotation.x-pitch)>.001;
        if(!dirty&&!moving&&!turning)return;
        form.rotation.y+=(yaw-form.rotation.y)*(motion.matches?1:.16);form.rotation.x+=(pitch-form.rotation.x)*(motion.matches?1:.16);
        signals.forEach((mesh,index)=>{const t=elapsed/1100-index*.035;mesh.visible=moving&&t>=0&&t<=1;if(mesh.visible)mesh.position.copy(curves[signalIndex].getPoint(t));});
        nodes.forEach((node,index)=>{const arrival=index===signalIndex&&elapsed>950&&elapsed<1250&&!motion.matches;node.scale.setScalar(arrival?1+Math.sin((elapsed-950)/300*Math.PI)*.35:1);});
        render();dirty=moving;
      };
      emitRef.current=index=>{signalIndex=index;signalStart=performance.now();nodes.forEach((node,i)=>{node.material.emissiveIntensity=i===index?.5:.12;});dirty=true;};
      rotateRef.current=angle=>{targetYaw=THREE.MathUtils.degToRad(angle);targetPitch=0;dirty=true;};
      const pointerDown=(event:PointerEvent)=>{
        if((event.target as Element).closest('button')||event.button!==0)return;
        down={x:event.clientX,y:event.clientY,id:event.pointerId,yaw:targetYaw,pitch:targetPitch,dragging:false};
      };
      const pointerMove=(event:PointerEvent)=>{
        if(down&&event.pointerId===down.id){
          const dx=event.clientX-down.x,dy=event.clientY-down.y;
          // Vertical touch gestures remain native page scroll. Only horizontal intent rotates.
          if(!down.dragging&&Math.abs(dx)>7&&(event.pointerType==='mouse'||Math.abs(dx)>Math.abs(dy)*1.3)){
            down.dragging=true;host.setPointerCapture(event.pointerId);host.classList.add('is-dragging');
          }
          if(down.dragging){targetYaw=THREE.MathUtils.clamp(down.yaw+dx*.008,-.55,.55);targetPitch=THREE.MathUtils.clamp(down.pitch+dy*.004,-.22,.22);if(sliderRef.current)sliderRef.current.value=String(Math.round(THREE.MathUtils.radToDeg(targetYaw)));dirty=true;}
        } else if(event.pointerType==='mouse'&&!motion.matches){const rect=host.getBoundingClientRect();parallaxX=((event.clientX-rect.left)/rect.width-.5)*.1;parallaxY=((event.clientY-rect.top)/rect.height-.5)*.07;dirty=true;}
      };
      const pointerEnd=(event:PointerEvent)=>{
        if(down&&!down.dragging&&Math.hypot(event.clientX-down.x,event.clientY-down.y)<7){
          const rect=host.getBoundingClientRect(),ray=new THREE.Raycaster();
          ray.setFromCamera(new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
          const hit=ray.intersectObjects(nodes)[0];if(hit)activateRef.current(hit.object.userData.index);
        }
        down=null;host.classList.remove('is-dragging');if(host.hasPointerCapture(event.pointerId))host.releasePointerCapture(event.pointerId);
      };
      const cancel=()=>{down=null;host.classList.remove('is-dragging');};
      const leave=()=>{parallaxX=0;parallaxY=0;dirty=true;};
      const resize=()=>{const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true;render();};
      const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
      const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true;});intersection.observe(host);
      const refresh=()=>{dirty=true;};
      host.addEventListener('pointerdown',pointerDown);host.addEventListener('pointermove',pointerMove);host.addEventListener('pointerup',pointerEnd);host.addEventListener('pointercancel',cancel);host.addEventListener('pointerleave',leave);
      motion.addEventListener('change',refresh);document.addEventListener('visibilitychange',refresh);
      resize();frame=requestAnimationFrame(tick);setReady(true);
      const contextLost=(event:Event)=>{event.preventDefault();cancelAnimationFrame(frame);setReady(false);};
      renderer.domElement.addEventListener('webglcontextlost',contextLost);
      cleanup=()=>{
        cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();
        host.removeEventListener('pointerdown',pointerDown);host.removeEventListener('pointermove',pointerMove);host.removeEventListener('pointerup',pointerEnd);host.removeEventListener('pointercancel',cancel);host.removeEventListener('pointerleave',leave);
        motion.removeEventListener('change',refresh);document.removeEventListener('visibilitychange',refresh);
        renderer.domElement.removeEventListener('webglcontextlost',contextLost);
        const geometries=new Set<InstanceType<typeof THREE.BufferGeometry>>(),materials=new Set<InstanceType<typeof THREE.Material>>();
        form.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(material=>materials.add(material));}});
        geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());renderer.dispose();renderer.domElement.remove();emitRef.current=()=>{};rotateRef.current=()=>{};
      };
    }).catch(()=>{});
    return ()=>{disposed=true;cleanup();};
  },[]);

  const items=topics[lang],item=items[selected];
  return <div className={`neural-explorer ${ready?'is-ready':'is-simplified'}`} data-signal-phase={phase}>
    <div className="neural-stage" ref={hostRef} role="group" aria-label={lang==='en'?'Interactive neural connections':'互动神经连接'}>
      <svg className="neural-fallback" viewBox="0 0 300 340" aria-hidden="true"><path d="M150 170C145 115 128 102 87 65M150 170C200 175 220 140 240 153M150 170C105 218 120 252 132 265"/><circle cx="150" cy="170" r="24"/></svg>
      {items.map((node,index)=><button key={node.target} ref={element=>{nodeRefs.current[index]=element;}} className={`neural-node neural-node-${index}`} style={initialPositions[index]} onClick={()=>activate(index)} aria-pressed={selected===index} aria-label={lang==='en'?`Send signal: ${node.short}`:`发送信号：${node.short}`}><span className="node-target"/><span className="node-label">{node.short}</span></button>)}
      <p className="neural-hint">{lang==='en'?'Drag to turn · tap a node':'拖动旋转 · 点击节点'}</p>
    </div>
    <div className="neural-console glass-panel">
      <div className="connection-status"><PixelSignal pulse={pulse} active={phase!=='idle'}/><span role="status">{phase==='idle'?(lang==='en'?'Choose a connection':'选择一个连接'):phase==='sending'?(lang==='en'?'Sending a signal…':'信号传播中…'):(lang==='en'?`Connected to ${item.short}`:`已连接到${item.short}`)}</span></div>
      <h3>{item.title}</h3><p>{item.text}</p>
      <div className="neural-console-actions"><a href={`#${item.target}`} onClick={()=>onExplore(item.target)}>{item.link}<span aria-hidden="true">↗</span></a><button type="button" onClick={()=>activate(selected)} aria-label={lang==='en'?'Replay signal':'再次发送信号'} title={lang==='en'?'Replay signal':'再次发送信号'}>↻</button></div>
      <div className="neural-tools"><label>{lang==='en'?'Rotate':'旋转'}<input ref={sliderRef} type="range" min="-31" max="31" defaultValue="0" onChange={event=>rotateRef.current(Number(event.target.value))} aria-label={lang==='en'?'Rotate neural structure':'旋转神经结构'}/></label><button type="button" onClick={()=>{rotateRef.current(0);if(sliderRef.current)sliderRef.current.value='0';}}>{lang==='en'?'Reset':'复位'}</button></div>
      <small>{lang==='en'?'Illustrative interaction · not research data':'互动示意 · 非研究数据'}</small>
    </div>
  </div>;
}
