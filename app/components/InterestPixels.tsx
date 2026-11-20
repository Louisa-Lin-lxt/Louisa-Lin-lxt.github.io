import type { CSSProperties } from "react";

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

export function InterestPixels({ topic }: { topic: "music" | "travel" }) {
  return <div className="taotao-pixel-board interest-pixel-board" aria-hidden="true" style={{ "--columns": columns, "--rows": rows } as CSSProperties}>
    {illustrations[topic].map(({ x, y, color }) => <span className="interest-pixel" key={`${x}-${y}`} style={{ gridColumn: x + 1, gridRow: y + 1, "--pixel-color": palette[color] } as CSSProperties} />)}
  </div>;
}
