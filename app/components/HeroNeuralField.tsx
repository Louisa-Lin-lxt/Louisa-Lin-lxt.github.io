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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerActive = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!pointerActive) return;
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const sendSignal = (event: PointerEvent) => {
      updatePointer(event);
      if (!pointerActive || reducedMotion) return;
      signalX = pointerX;
      signalY = pointerY;
      signalStarted = performance.now() * .001;
    };
    const pointerLeave = () => { pointerActive = false; };

    const draw = (timestamp: number) => {
      const time = timestamp * .001;
      context.clearRect(0, 0, width, height);
      const signalRadius = Math.max(0, (time - signalStarted) * 320);

      edges.forEach((edge) => {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        if (!a || !b) return;
        const distanceToPointer = pointerActive ? Math.min(Math.hypot(a.x - pointerX, a.y - pointerY), Math.hypot(b.x - pointerX, b.y - pointerY)) : 999;
        const awake = Math.max(0, 1 - distanceToPointer / 230);
        const waveDistance = Math.abs(Math.hypot((a.x + b.x) / 2 - signalX, (a.y + b.y) / 2 - signalY) - signalRadius);
        const wave = signalRadius < 700 ? Math.max(0, 1 - waveDistance / 95) : 0;
        const sample = quadraticPoint(a, b, edge.bend, .5);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.quadraticCurveTo(sample.controlX, sample.controlY, b.x, b.y);
        context.strokeStyle = `rgba(40,122,218,${.07 + awake * .22 + wave * .28})`;
        context.lineWidth = .75 + awake * .65 + wave * .7;
        context.stroke();

        const progress = reducedMotion ? edge.phase : (time * edge.speed + edge.phase + awake * .18 + wave * .24) % 1;
        const pulse = quadraticPoint(a, b, edge.bend, progress);
        const pulseStrength = .18 + awake * .72 + wave * .7;
        context.beginPath();
        context.arc(pulse.x, pulse.y, 1.5 + pulseStrength * 2.3, 0, Math.PI * 2);
        context.fillStyle = `rgba(${edge.from % 7 === 0 ? "255,205,49" : "68,160,244"},${Math.min(.92, pulseStrength)})`;
        context.shadowBlur = 7 + pulseStrength * 12;
        context.shadowColor = edge.from % 7 === 0 ? "rgba(255,205,49,.55)" : "rgba(47,141,240,.48)";
        context.fill();
        context.shadowBlur = 0;
      });

      nodes.forEach((node) => {
        const distance = pointerActive ? Math.hypot(node.x - pointerX, node.y - pointerY) : 999;
        const awake = Math.max(0, 1 - distance / 190);
        const waveDistance = Math.abs(Math.hypot(node.x - signalX, node.y - signalY) - signalRadius);
        const wave = signalRadius < 700 ? Math.max(0, 1 - waveDistance / 70) : 0;
        const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 1.2 + node.phase * Math.PI * 2) * .12;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse + awake * 2.2 + wave * 2.6, 0, Math.PI * 2);
        context.fillStyle = node.yellow ? `rgba(255,205,49,${.46 + awake * .35 + wave * .2})` : `rgba(47,141,240,${.32 + awake * .42 + wave * .24})`;
        context.shadowBlur = 8 + awake * 18 + wave * 16;
        context.shadowColor = node.yellow ? "rgba(255,205,49,.5)" : "rgba(47,141,240,.42)";
        context.fill();
        context.shadowBlur = 0;
      });

      if (pointerActive && !reducedMotion) {
        const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 180);
        glow.addColorStop(0, "rgba(47,141,240,.085)");
        glow.addColorStop(.55, "rgba(255,212,71,.028)");
        glow.addColorStop(1, "rgba(47,141,240,0)");
        context.fillStyle = glow;
        context.fillRect(pointerX - 180, pointerY - 180, 360, 360);
      }
      if (signalRadius > 1 && signalRadius < 700 && !reducedMotion) {
        context.beginPath();
        context.arc(signalX, signalY, signalRadius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(255,205,49,${Math.max(0, .24 - signalRadius / 3000)})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
      frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", sendSignal);
    hero.addEventListener("pointerleave", pointerLeave);
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", sendSignal);
      hero.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return <canvas className="hero-neural-field" ref={canvasRef} aria-hidden="true" />;
}
