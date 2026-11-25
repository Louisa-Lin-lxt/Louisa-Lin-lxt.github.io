import type { CSSProperties } from "react";
import { GlassGarland } from "./GlassGarland";
import "../styles/seasonal-header.css";

const colors = ["#df6878", "#47a786", "#dfa947", "#5d9ed1"];
const coreColors = ["#d83f5f", "#178b6a", "#c88112", "#357fc9"];

// The glass stays clear; only the small light inside it pulses.
// One repeating tile keeps the garland sharp at any viewport width.
function lightTile(group?: number, fixedReflection = true) {
  const bulbs = colors.map((color, i) => {
    if (group !== undefined && i % 2 !== group) return "";
    const x = 18 + i * 36;
    const core = coreColors[i];
    // Enlarge around the cap so the wire, spacing, and 28px strip stay fixed.
    const bulbTransform = `translate(${x} 9) scale(1.2) translate(${-x} -9)`;
    if (group !== undefined) return `<defs>
        <radialGradient id="glow${i}"><stop stop-color="${core}" stop-opacity=".24"/><stop offset=".45" stop-color="${core}" stop-opacity=".07"/><stop offset="1" stop-color="${core}" stop-opacity="0"/></radialGradient>
        <radialGradient id="core${i}"><stop stop-color="#fffce8"/><stop offset=".18" stop-color="${core}"/><stop offset=".6" stop-color="${core}" stop-opacity=".9"/><stop offset="1" stop-color="${core}" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="${x}" cy="16.8" rx="8" ry="10" fill="url(#glow${i})"/>
      <g transform="${bulbTransform}"><ellipse cx="${x}" cy="15.5" rx="2.2" ry="3.7" fill="url(#core${i})"/></g>`;
    return `<defs>
        <radialGradient id="glass${i}" cx="40%" cy="32%" r="72%"><stop stop-color="#fff" stop-opacity=".01"/><stop offset=".56" stop-color="${color}" stop-opacity=".025"/><stop offset=".79" stop-color="${color}" stop-opacity=".16"/><stop offset=".93" stop-color="#6f8c9b" stop-opacity=".27"/><stop offset="1" stop-color="#fff" stop-opacity=".78"/></radialGradient>
        <linearGradient id="edge${i}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".26" stop-color="#c3d8e2" stop-opacity=".84"/><stop offset=".54" stop-color="#658795" stop-opacity=".7"/><stop offset=".77" stop-color="${color}" stop-opacity=".68"/><stop offset="1" stop-color="#fff"/></linearGradient>
        <linearGradient id="cap${i}" x1="0" x2="1"><stop stop-color="#627d82"/><stop offset=".42" stop-color="#e8f4f5"/><stop offset=".7" stop-color="#90a8ad"/><stop offset="1" stop-color="#526d75"/></linearGradient>
      </defs>
      <path d="M${x} 6v3" stroke="#7c9390" stroke-width="1"/>
      <g transform="${bulbTransform}">
      <ellipse cx="${x + .35}" cy="16.1" rx="4.15" ry="6.3" fill="none" stroke="#557182" stroke-opacity=".19" stroke-width=".8"/>
      <ellipse cx="${x}" cy="15.5" rx="4.15" ry="6.3" fill="url(#glass${i})" stroke="url(#edge${i})" stroke-width=".75"/>
      <ellipse cx="${x}" cy="15.5" rx="3.5" ry="5.65" fill="none" stroke="#fff" stroke-opacity=".46" stroke-width=".38"/>
      <ellipse cx="${x}" cy="15.5" rx="1.3" ry="2.6" fill="${core}" fill-opacity=".28"/>
      <path d="M${x - .55} 12v4q.55 1 .95 0v-2" fill="none" stroke="${core}" stroke-opacity=".85" stroke-width=".65"/>
      ${fixedReflection ? `<path d="M${x - 1.2} 10.5q-2.4 2-1.7 5" fill="none" stroke="#fff" stroke-opacity=".95" stroke-width="1.05" stroke-linecap="round"/>` : ""}
      <path d="M${x + 2.9} 15.9q.1 3.7-2.6 4.4" fill="none" stroke="${color}" stroke-opacity=".72" stroke-width=".8" stroke-linecap="round"/>
      <path d="M${x - 1.1} 21q1.6.55 2.7-.65" fill="none" stroke="#fff" stroke-opacity=".94" stroke-width=".55" stroke-linecap="round"/>
      ${fixedReflection ? `<path d="M${x - .2} 20.6q1.7-.2 2.4-2" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width=".75" stroke-linecap="round"/>` : ""}
      <path d="M${x - 1.8} 9h3.6" stroke="url(#cap${i})" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M${x - 1.5} 8.6h2.8" stroke="#fff" stroke-opacity=".7" stroke-width=".45"/>
      </g>`;
  }).join("");
  const wire = group === undefined ? '<path d="M0 1Q18 12 36 1Q54 12 72 1Q90 12 108 1Q126 12 144 1" fill="none" stroke="#8fa7a0" stroke-opacity=".65" stroke-width=".8"/>' : "";
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="144" height="28" viewBox="0 0 144 28">${wire}${bulbs}</svg>`)}")`;
}

const garland = {
  "--garland-base": lightTile(),
  "--garland-glass-base": lightTile(undefined, false),
  "--garland-warm": lightTile(0),
  "--garland-cool": lightTile(1),
} as CSSProperties;

const flakes = [
  [4, 9, 9, -2], [17, 7, 12, -8], [31, 10, 10, -5], [45, 7, 13, -10],
  [59, 9, 11, -7], [73, 8, 12, -3], [86, 10, 10, -9], [97, 7, 13, -6],
];

export function SeasonalHeader() {
  return <div className="seasonal-header" aria-hidden="true">
    <div className="seasonal-header__snow">
      {flakes.map(([x, size, duration, delay], i) => <svg key={x} className="seasonal-header__flake" viewBox="0 0 16 16" fill="none" focusable="false" style={{
        left: `${x}%`, width: size, height: size,
        "--flake-duration": `${duration}s`, "--flake-delay": `${delay}s`,
        "--flake-drift": `${i % 2 ? -9 : 9}px`, "--flake-rest": `${12 + (i % 3) * 18}px`,
      } as CSSProperties}>
        <path d="M8 1v14M2 4.5l12 7M2 11.5l12-7M5.5 2.5 8 5l2.5-2.5M5.5 13.5 8 11l2.5 2.5M2.5 7.5 5.5 6.5 5 3.5M11 12.5l-.5-3 3-1M2.5 8.5l3 1-.5 3M11 3.5l-.5 3 3 1" />
      </svg>)}
    </div>
    <GlassGarland style={garland} />
  </div>;
}
