"use client";

import { useState } from "react";
import { musicals } from "../content/musicals";
import { DetailDialog } from "./DetailDialog";
import { InterestPixels } from "./InterestPixels";

const titles = musicals.map(show => show.title);

export function MusicPixels({ lang }: { lang: "en" | "zh" }) {
  const [preview, setPreview] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const show = selected === null ? null : musicals[selected];
  return <>
    <div className="taotao-pixel-gallery">
      <div className="taotao-pixel-copy">
        <h2>{lang === "en" ? "Music" : "音乐"}</h2>
        <p>{lang === "en" ? "Favorite shows, songs I’ve sung, and the memories in between. Click a pixel to explore." : "喜欢的剧、唱过的歌，还有和它们有关的故事。点开像素看看吧。"}</p>
        <div className="music-covers-note">
          <h3>{lang === "en" ? "Covers, coming soon" : "翻唱，敬请期待"}</h3>
          <p>{lang === "en" ? "I occasionally share song covers on Instagram. I’m still figuring out how to bring them here. Stay tuned." : "我偶尔会在 Instagram 分享翻唱。还在研究怎么把它们放到这里，敬请期待。"}</p>
        </div>
      </div>
      <div className="music-pixel-art">
        <InterestPixels topic="music" lang={lang} titles={titles} onSelect={setSelected} onPreview={setPreview} />
        <p className="music-pixel-preview" aria-live="polite">{preview === null ? (lang === "en" ? "Stories behind the pixels" : "像素里的舞台故事") : musicals[preview].title}</p>
      </div>
    </div>
    {show && <DetailDialog title={show.title} closeLabel={lang === "en" ? "Close story" : "关闭故事"} onClose={() => setSelected(null)} className="music-dialog">
      <div className="music-dialog-copy"><h2>{show.title}</h2>{show[lang].map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {/* Mount only after a pixel is opened; removing the iframe on close stops playback. */}
      {show.album && <iframe className="music-player" title={`${show.title} — Spotify`} src={`https://open.spotify.com/embed/album/${show.album}?utm_source=generator`}
        width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
      <div className="music-dialog-footer">
        {show.album && <p>{lang === "en" ? "Press play to listen. Spotify may limit playback to previews." : "点击播放即可试听。Spotify 可能仅提供片段。"}</p>}
        <div>{show.album && <a href={`https://open.spotify.com/album/${show.album}`} target="_blank" rel="noopener noreferrer">{lang === "en" ? "Open in Spotify" : "在 Spotify 打开"} ↗</a>}<a href={show.url} target="_blank" rel="noopener noreferrer">{lang === "en" ? "Official show site" : "演出官网"} ↗</a></div>
      </div>
    </DetailDialog>}
  </>;
}
