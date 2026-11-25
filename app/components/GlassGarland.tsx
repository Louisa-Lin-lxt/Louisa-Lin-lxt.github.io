"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const SPACING = 36;
const HEIGHT = 28;
const RADIUS_X = 4.98;
const RADIUS_Y = 7.56;
type Bounds = { left: number; top: number; width: number };

const lensMask = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28"><ellipse cx="18" cy="16.8" rx="4.98" ry="7.56" fill="white"/></svg>')}")`;

// R/G encode the horizontal/vertical offset of real backdrop pixels.
// A smooth radial lens magnifies its center and bends detail near its rim.
function createLensMap(width: number) {
  const canvas = document.createElement("canvas");
  const resolution = 2;
  canvas.width = Math.ceil(width * resolution);
  canvas.height = HEIGHT * resolution;
  const context = canvas.getContext("2d");
  if (!context) return "";
  const pixels = context.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const nx = (((x + .5) / resolution) % SPACING - 18) / RADIUS_X;
      const ny = ((y + .5) / resolution - 16.8) / RADIUS_Y;
      const radius = nx * nx + ny * ny;
      const bend = radius < 1 ? 1.75 * (.35 + .65 * radius) : 0;
      const offset = (y * canvas.width + x) * 4;
      // feDisplacementMap scale=4 gives a maximum displacement below 2px.
      pixels.data[offset] = Math.round(255 * (.5 - nx * bend / 4));
      pixels.data[offset + 1] = Math.round(255 * (.5 - ny * bend / 4));
      pixels.data[offset + 2] = 128;
      pixels.data[offset + 3] = 255;
    }
  }
  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL();
}

export function GlassGarland({ style }: { style: CSSProperties }) {
  const anchor = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const position = useRef<Bounds | null>(null);
  const [surface, setSurface] = useState<(Bounds & { map: string }) | null>(null);
  const filterId = `holiday-lens-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const element = anchor.current;
    if (!element) return;
    let pending = 0;
    let mapWidth = 0;
    const measure = () => {
      pending = 0;
      const rect = element.getBoundingClientRect();
      position.current = { left: rect.left, top: rect.top, width: rect.width };
      if (overlay.current) {
        overlay.current.style.left = `${rect.left}px`;
        overlay.current.style.top = `${rect.top}px`;
        overlay.current.hidden = rect.width === 0 || rect.bottom < 0 || rect.top > innerHeight;
      }
      if (rect.width > 0 && rect.width !== mapWidth) {
        mapWidth = rect.width;
        setSurface({ left: rect.left, top: rect.top, width: rect.width, map: createLensMap(rect.width) });
      }
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    const season = new MutationObserver(schedule);
    resize.observe(element);
    season.observe(document.documentElement, { attributes: true, attributeFilter: ["data-season"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(pending);
      resize.disconnect(); season.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const element = overlay.current;
    if (!element) return;
    const glints = [...element.querySelectorAll<HTMLElement>(".glass-bulb__reflection")];
    const shades = [...element.querySelectorAll<HTMLElement>(".glass-bulb__shade")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let previousTime = 0;
    let paused = Boolean(document.querySelector(".seasonal-opening[data-paused='true']"));
    let levels = glints.map(() => ({ x: 0, y: 0, light: .72 }));

    const draw = (time: number) => {
      frame = 0;
      if (document.hidden || element.hidden || paused) return;
      const bounds = position.current;
      if (!bounds) return;
      const ease = 1 - Math.exp(-Math.min(time - previousTime || 16, 50) / 80);
      previousTime = time;
      let moving = false;
      levels = levels.map((level, i) => {
        const dx = pointer ? (pointer.x - bounds.left - (18 + i * SPACING)) / 180 : 0;
        const dy = pointer ? (pointer.y - bounds.top - 16.8) / 160 : 0;
        const proximity = pointer ? Math.exp(-(dx * dx + dy * dy) * .35) : 0;
        const target = { x: Math.tanh(dx) * 1.65, y: Math.tanh(dy) * 1.2, light: .72 + proximity * .28 };
        const next = { x: level.x + (target.x - level.x) * ease, y: level.y + (target.y - level.y) * ease, light: level.light + (target.light - level.light) * ease };
        if (Math.abs(target.x - next.x) + Math.abs(target.y - next.y) + Math.abs(target.light - next.light) > .008) moving = true;
        glints[i].style.transform = `translate3d(${next.x.toFixed(3)}px,${next.y.toFixed(3)}px,0) rotate(${(next.x * -9).toFixed(2)}deg)`;
        glints[i].style.opacity = next.light.toFixed(3);
        shades[i].style.transform = `translate3d(${(-next.x * .45).toFixed(3)}px,${(-next.y * .35).toFixed(3)}px,0)`;
        return next;
      });
      if (moving) frame = requestAnimationFrame(draw);
    };
    const schedule = () => { if (!frame && !document.hidden && !reduced.matches && !paused) frame = requestAnimationFrame(draw); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const reset = () => { pointer = null; schedule(); };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule(); };
    const preference = () => {
      cancelAnimationFrame(frame); frame = 0; pointer = null;
      if (reduced.matches) {
        levels = glints.map(() => ({ x: 0, y: 0, light: .72 }));
        glints.forEach(glint => { glint.style.transform = "none"; glint.style.opacity = ".72"; });
        shades.forEach(shade => { shade.style.transform = "none"; });
      }
      else schedule();
    };
    const pause = (event: Event) => {
      paused = (event as CustomEvent<boolean>).detail;
      if (paused) { cancelAnimationFrame(frame); frame = 0; } else schedule();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("holiday-motion-pause", pause);
    reduced.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("holiday-motion-pause", pause);
      reduced.removeEventListener("change", preference);
    };
  }, [surface?.width]);

  return <>
    <div ref={anchor} className="seasonal-header__garland" data-live={Boolean(surface)} style={style} />
    {surface && createPortal(<div ref={overlay} aria-hidden="true" className="seasonal-header__garland seasonal-header__garland--live" style={{ ...style, left: surface.left, top: surface.top, width: surface.width }}>
      <svg className="glass-garland__filters" width="0" height="0" focusable="false">
        <defs><filter id={filterId} x="0" y="0" width={surface.width} height={HEIGHT} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feImage href={surface.map} x="0" y="0" width={surface.width} height={HEIGHT} preserveAspectRatio="none" result="lensNormals" />
          <feDisplacementMap in="SourceGraphic" in2="lensNormals" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter></defs>
      </svg>
      <div className="glass-garland__backdrop" style={{ maskImage: lensMask, WebkitMaskImage: lensMask, backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` }} />
      <div className="glass-garland__shell" />
      <div className="glass-garland__reflections">{Array.from({ length: Math.ceil(surface.width / SPACING) }, (_, i) =>
        <span className="glass-bulb" key={i} style={{ left: 18 + i * SPACING - RADIUS_X }}><i className="glass-bulb__shade" /><i className="glass-bulb__reflection" /></span>
      )}</div>
    </div>, document.body)}
  </>;
}
