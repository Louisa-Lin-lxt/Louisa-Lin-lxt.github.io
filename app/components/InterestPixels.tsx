"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

// The same 32 × 36 pixel scale and quiet palette as Taotao's photo silhouette.
const columns = 32;
const rows = 36;
const palette = {
  ink: "#263e54",
  navy: "#344f68",
  blue: "#506988",
  blueLight: "#aab7c9",
  bluePale: "#d9e8f0",
  cream: "#faf5e9",
  gold: "#e6c76a",
  goldShade: "#c5a553",
} as const;

type Color = keyof typeof palette;
type Pixel = { x: number; y: number; color: Color };

function musicColor(x: number, y: number): Color | undefined {
  const distance = Math.hypot(x - 15.5, y - 17);
  let color: Color | undefined;

  // Vinyl grooves, with a warm center label and a small spindle.
  if (distance <= 12.8) color = "ink";
  if (distance <= 11.2) color = "blue";
  if (distance <= 10.3) color = "ink";
  if (distance <= 8.5) color = "navy";
  if (distance <= 7.5) color = "ink";
  if (distance <= 4.5) color = "goldShade";
  if (distance <= 3.6) color = "gold";
  if (distance <= 1.25) color = "cream";
  if (distance <= 0.7) color = "ink";
  if (color && distance > 8.5 && distance < 11.2 && x >= 7 && x <= 10 && y >= 8 && y <= 14) color = "blueLight";

  // The stepped tonearm makes the record legible even at phone size.
  if (y >= 3 && y <= 5 && x >= 27 && x <= 29) color = "bluePale";
  if (y >= 6 && y <= 18 && x >= 28 && x <= 29) color = "blueLight";
  if (y >= 18 && y <= 20 && x >= 26 && x <= 29) color = "bluePale";
  if (y >= 20 && y <= 23 && x >= 25 && x <= 27) color = "gold";
  if (y === 24 && x >= 24 && x <= 26) color = "goldShade";

  // A short equalizer gives the illustration a distinct music silhouette.
  const bars = [2, 4, 6, 3, 5, 2, 4];
  const bar = Math.floor((x - 7) / 3);
  if (x >= 7 && x <= 25 && (x - 7) % 3 < 2 && bar >= 0 && bar < bars.length && y >= 36 - bars[bar]) {
    color = bar === 2 || bar === 4 ? "gold" : "blue";
  }
  return color;
}

function travelColor(x: number, y: number): Color | undefined {
  let color: Color | undefined;

  // Arched handle above a softly rounded, strapped suitcase.
  if (y === 3 && x >= 13 && x <= 18) color = "ink";
  if ((y === 4 || y === 5) && (x >= 11 && x <= 13 || x >= 18 && x <= 20)) color = "ink";
  if (y >= 6 && y <= 9 && (x >= 10 && x <= 11 || x >= 20 && x <= 21)) color = "ink";
  if (y >= 6 && y <= 8 && x >= 13 && x <= 18) color = "cream";

  if (y === 9 && x >= 8 && x <= 23) color = "ink";
  if (y === 10 && x >= 6 && x <= 25) color = "ink";
  if (y >= 11 && y <= 28 && x >= 5 && x <= 26) {
    color = x <= 6 || x >= 25 ? "ink" : x >= 22 ? "navy" : "blue";
    if (y === 11 || y === 28) color = "ink";
    if (y >= 13 && y <= 26 && x >= 8 && x <= 9) color = "blueLight";
    if (y >= 12 && y <= 27 && (x >= 11 && x <= 12 || x >= 20 && x <= 21)) color = "gold";
    if (y >= 12 && y <= 27 && (x === 12 || x === 21) && y % 5 === 0) color = "goldShade";
    if (y >= 16 && y <= 21 && x >= 15 && x <= 18) color = "cream";
    if (y >= 17 && y <= 20 && x >= 16 && x <= 17) color = "bluePale";
    if (y === 16 && x >= 15 && x <= 18) color = "goldShade";
  }
  if (y === 29 && x >= 7 && x <= 24) color = "ink";

  if (y >= 30 && y <= 32 && (x >= 8 && x <= 11 || x >= 20 && x <= 23)) color = "ink";
  if (y === 30 && (x === 9 || x === 21)) color = "blueLight";
  return color;
}

function createPixels(colorAt: (x: number, y: number) => Color | undefined): Pixel[] {
  const pixels: Pixel[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const color = colorAt(x, y);
    if (color) pixels.push({ x, y, color });
  }
  return pixels;
}

const illustrations = {
  music: createPixels(musicColor),
  travel: createPixels(travelColor),
};

type Props = { topic: "travel" } | {
  topic: "music";
  lang: "en" | "zh";
  titles: readonly string[];
  onSelect: (index: number) => void;
  onPreview: (index: number | null) => void;
};

export function InterestPixels(props: Props) {
  const [lit, setLit] = useState<number | null>(null);
  const [focused, setFocused] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const cells = illustrations[props.topic];
  if (props.topic === "travel") return <div className="taotao-pixel-board interest-pixel-board" aria-hidden="true" style={{ "--columns": columns, "--rows": rows } as CSSProperties}>
    {cells.map(({ x, y, color }) => <span className="interest-pixel" key={`${x}-${y}`} style={{ gridColumn: x + 1, gridRow: y + 1, "--pixel-color": palette[color] } as CSSProperties} />)}
  </div>;

  // Stable sectors keep neighboring pixels associated with the same show.
  const musicalAt = ({ x, y }: Pixel) => Math.floor(((Math.atan2(y - 17, x - 15.5) + Math.PI * 2.5) % (Math.PI * 2)) / (Math.PI * 2) * props.titles.length);
  const preview = (index: number | null) => { setLit(index); props.onPreview(index === null ? null : musicalAt(cells[index])); };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    let next = event.key === "Home" ? 0 : event.key === "End" ? cells.length - 1 : index;
    if (direction) {
      const current = cells[index];
      const candidates = cells.map((cell, i) => ({ i, dx: cell.x - current.x, dy: cell.y - current.y }))
        .filter(({ dx, dy }) => direction[0] ? dx * direction[0] > 0 : dy * direction[1] > 0);
      const distance = ({ dx, dy }: { dx: number; dy: number }) => Math.abs(dx) + Math.abs(dy) + (direction[0] ? Math.abs(dy) : Math.abs(dx)) * 20;
      candidates.sort((a, b) => distance(a) - distance(b));
      next = candidates[0]?.i ?? index;
    }
    setFocused(next);
    buttons.current[next]?.focus();
  };
  const active = lit === null ? null : cells[lit];
  return <div className="taotao-pixel-board music-pixel-board" role="group" aria-label={props.lang === "en" ? "Music and theatre pixels. Use arrow keys to explore; Enter opens a show’s story." : "音乐与戏剧像素。方向键选择，回车打开故事。"} onPointerLeave={() => preview(null)} style={{ "--columns": columns, "--rows": rows } as CSSProperties}>
    {cells.map((cell, index) => {
      const distance = active ? Math.hypot(cell.x - active.x, cell.y - active.y) : Infinity;
      const show = musicalAt(cell);
      return <button key={`${cell.x}-${cell.y}`} ref={node => { buttons.current[index] = node; }} type="button"
        className={`taotao-pixel${distance < 3.8 ? " is-lit" : ""}${distance < 1 ? " is-center" : ""}`}
        tabIndex={focused === index ? 0 : -1} aria-haspopup="dialog"
        aria-label={props.lang === "en" ? `Open ${props.titles[show]}, pixel ${index + 1}` : `打开 ${props.titles[show]}，像素 ${index + 1}`}
        style={{ gridColumn: cell.x + 1, gridRow: cell.y + 1, "--pixel-color": palette[cell.color] } as CSSProperties}
        onPointerEnter={() => preview(index)} onPointerDown={() => preview(index)} onFocus={() => { setFocused(index); preview(index); }} onBlur={() => preview(null)}
        onKeyDown={event => navigate(event, index)} onClick={() => { setFocused(index); props.onSelect(show); }} />;
    })}
  </div>;
}
