"use client";

import type { CSSProperties } from "react";

// One pixel neuron, used consistently across the explorer and project shelves.
// This is an illustrative interaction, not an EEG trace or recorded data.
const soma = [[4,2],[5,2],[6,2],[3,3],[4,3],[5,3],[6,3],[7,3],[3,4],[4,4],[5,4],[6,4],[7,4],[3,5],[4,5],[5,5],[6,5],[7,5],[4,6],[5,6],[6,6]];
const pixels = [...soma,[1,0],[2,1],[2,2],[0,4],[1,4],[2,4],[1,8],[2,7],[2,6],[8,4],[9,4],[10,3],[11,2],[12,2],[13,3],[14,4],[15,4],[16,5],[17,6],[18,6],[19,5],[20,4],[21,4],[22,4],[23,3],[24,2],[25,2]];


export function PixelSignal({ pulse = 0, active = false, delay = 0 }: { pulse?: number | string; active?: boolean; delay?: number }) {
  return <svg key={pulse} data-pulse={pulse} className={`pixel-signal ${pulse ? "is-firing" : ""} ${active ? "is-connected" : ""}`} viewBox="0 0 112 36" aria-hidden="true" shapeRendering="crispEdges">
    {pixels.map(([x,y],index) => <rect key={index} className={`pixel-bit ${index<soma.length?"pixel-soma":""} ${index===10?"pixel-nucleus":""}`} x={x*4} y={y*4} width="3.5" height="3.5" style={{"--pixel-delay": `${delay+Math.max(0,index-soma.length)*23}ms`} as CSSProperties} />)}
  </svg>;
}

export function MemoFolder({ opening = false }: { opening?: boolean }) {
  return <span className={`memo-folder ${opening ? "is-opening" : ""}`} aria-hidden="true"><span className="memo-back" /><span className="memo-paper"><i /><i /><i /></span><span className="memo-front"><i /></span></span>;
}
