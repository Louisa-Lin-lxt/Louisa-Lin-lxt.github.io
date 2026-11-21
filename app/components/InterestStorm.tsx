"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export type StormPixel = { x: number; y: number; width: number; height: number; color: string };
export type StormHandle = {
  play(from: StormPixel[], to: StormPixel[], direction: 1 | -1, onDone: () => void): void;
  cancel(): void;
};

type PreparedPixel = StormPixel & { angle: number; radius: number };
type RunningStorm = { frame: number; onDone: () => void };

const duration = 520;
const maxPixels = 650;
const goldenAngle = 2.399963229728653;

export function captureStormPixels(stage: HTMLElement): StormPixel[] {
  const stageRect = stage.getBoundingClientRect();
  const cells = [...stage.querySelectorAll<HTMLElement>(
    ".taotao-pixel-board > .taotao-pixel, .taotao-pixel-board > .interest-pixel",
  )];
  const count = Math.min(cells.length, maxPixels);
  return Array.from({ length: count }, (_, index) => {
    const cell = cells[Math.floor(index * cells.length / count)];
    const rect = cell.getBoundingClientRect();
    return {
      x: rect.left - stageRect.left,
      y: rect.top - stageRect.top,
      width: rect.width,
      height: rect.height,
      color: cell.style.getPropertyValue("--pixel-color").trim() || getComputedStyle(cell).backgroundColor,
    };
  });
}

function prepare(pixels: StormPixel[]): PreparedPixel[] {
  const count = Math.min(pixels.length, maxPixels);
  return Array.from({ length: count }, (_, index) => {
    const pixel = pixels[Math.floor(index * pixels.length / count)];
    return {
      ...pixel,
      angle: index * goldenAngle,
      radius: 24 + ((index * 73) % 83),
    };
  });
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
const mix = (start: number, end: number, amount: number) => start + (end - start) * amount;

function draw(
  context: CanvasRenderingContext2D,
  pixels: PreparedPixel[],
  progress: number,
  centerX: number,
  centerY: number,
  direction: 1 | -1,
  incoming: boolean,
) {
  const phase = incoming ? clamp((progress - .36) / .64) : clamp(progress / .56);
  if (incoming && phase <= 0 || !incoming && phase >= 1) return;
  const amount = ease(phase);
  const swirl = Math.sin(Math.PI * phase);
  const alpha = incoming ? phase ** .8 : 1 - phase ** 1.5;
  const scale = incoming ? .42 + .58 * amount : 1 - .58 * amount;
  const spin = direction * (incoming ? 1 - phase : phase) * 3.1;

  context.globalAlpha = alpha;
  for (const pixel of pixels) {
    const homeX = pixel.x + pixel.width / 2;
    const homeY = pixel.y + pixel.height / 2;
    const path = incoming ? amount : 1 - amount;
    const angle = pixel.angle + spin;
    const x = mix(centerX, homeX, path) + Math.cos(angle) * pixel.radius * swirl + direction * 38 * swirl;
    const y = mix(centerY, homeY, path) + Math.sin(angle) * pixel.radius * swirl;
    const width = Math.max(1, pixel.width * scale);
    const height = Math.max(1, pixel.height * scale);
    context.fillStyle = pixel.color;
    context.fillRect(Math.round(x - width / 2), Math.round(y - height / 2), width, height);
  }
  context.globalAlpha = 1;
}

export const InterestStorm = forwardRef<StormHandle>(function InterestStorm(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runningRef = useRef<RunningStorm | null>(null);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const cancel = useCallback(() => {
    const running = runningRef.current;
    if (!running) { clear(); return; }
    runningRef.current = null;
    cancelAnimationFrame(running.frame);
    clear();
    running.onDone();
  }, [clear]);

  const play = useCallback((from: StormPixel[], to: StormPixel[], direction: 1 | -1, onDone: () => void) => {
    cancel();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !from.length && !to.length || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const width = bounds.width, height = bounds.height;
    if (!width || !height) { onDone(); return; }
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const departing = prepare(from), arriving = prepare(to);
    const all = [...departing, ...arriving];
    const left = Math.min(...all.map(pixel => pixel.x));
    const top = Math.min(...all.map(pixel => pixel.y));
    const right = Math.max(...all.map(pixel => pixel.x + pixel.width));
    const bottom = Math.max(...all.map(pixel => pixel.y + pixel.height));
    const centerX = (left + right) / 2, centerY = (top + bottom) / 2;
    const running: RunningStorm = { frame: 0, onDone };
    runningRef.current = running;
    const started = performance.now();

    const tick = (now: number) => {
      if (runningRef.current !== running) return;
      const progress = clamp((now - started) / duration);
      context.clearRect(0, 0, width, height);
      draw(context, departing, progress, centerX, centerY, direction, false);
      draw(context, arriving, progress, centerX, centerY, direction, true);
      if (progress >= 1) {
        runningRef.current = null;
        clear();
        onDone();
      } else {
        running.frame = requestAnimationFrame(tick);
      }
    };
    tick(started);
  }, [cancel, clear]);

  useImperativeHandle(ref, () => ({ play, cancel }), [play, cancel]);

  useEffect(() => {
    const onResize = () => cancel();
    const onVisibility = () => { if (document.hidden) cancel(); };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancel();
    };
  }, [cancel]);

  return <canvas ref={canvasRef} aria-hidden="true" className="interest-storm-canvas" />;
});
