# Portfolio motion — 2026-11-22

Keep the Pearl & Tide palette, translucent glass, single portrait, pixel artwork, reading neuron and existing interest storm. The six previously requested filler passages remain removed. This document describes implementation behavior, not browser or performance verification.

## Interactive hero — restored pushed version

The user rejected the experimental corner web. `HeroNeuralField.tsx` is restored byte-for-byte from pushed main commit `4258f066d7abaa140365a455ce81ea3cffd7f182`, verified against `git ls-remote origin refs/heads/main` on 2026-11-22. It distributes 20–36 small pixel nodes through the hero, joined by curved dotted paths. Signals travel along these paths; pointer proximity brightens nearby connections, and a click sends an expanding wave. The radial soma, cross-threads, spring deformation, breathing and geometric masks are removed.

The restored canvas keeps its original 25fps drawing cap, capped device-pixel ratio, passive pointer movement listener, hidden/offscreen pause, resize observer and cleanup. Reduced motion uses a still network and disables click waves. The CSS uses the pushed horizontal opacity mask and .7 canvas opacity. Name, copy, buttons and portrait remain stationary.

## Main sections

`useSectionMotion.ts` prepares only content that starts below the viewport. Content already onscreen is untouched. Stable card/section anchors trigger each entrance once, 48px before entering the viewport, then are unobserved; returning to a section does not replay it. Supporting content in the same row follows its lead by 70ms. Interest arrows fade with their titles rather than appearing alone.

All main sections share the pearl base. Hero, Research and Interests gradients resolve to that exact color at their edges; hard section borders are removed. Desktop section padding is 80px, with a 52px hero bottom and 56px About top. Narrow layouts use 52px section padding and a 40px About top. The tablet hero follows its content height instead of keeping an artificial empty band. These are static spacing and background changes; reading text does not track scrolling.

| Part | Treatment |
| --- | --- |
| Headings, prose, education and output groups | Stationary opacity entrance over 500ms. |
| Research and compact work cards | The entire card fades as one stationary surface over 500ms; its image and text remain together. |
| Adjacent project cards in one row | 55ms staggering, capped at 110ms. |
| Pixel-interest illustrations | Opacity plus a 16px upward settling movement over 650ms. |

The shared reveal curve is `cubic-bezier(.2, .9, .2, 1)`. Native scrolling and anchors remain in charge of page position. Keyboard focus immediately reveals the containing group. Switching to reduced motion finishes all pending entrances; hiding the document finishes active entrances. A `beforeprint` handler reveals every pending group so unvisited content is not omitted from printing. Cleanup cancels animations, disconnects the observer and removes listeners. Without JavaScript, content remains visible.

## Coursework and research

The native Selected coursework disclosure groups two courses under **Graduate-level** and five under **Undergraduate**, with corresponding Chinese headings. Its 260ms height and 200ms content transitions can reverse from the current frame; keyboard activation and reduced motion settle immediately.

Research remains a set of image cards. Each card's text is limited to position, lab and date; descriptive specialty tags and institution subtitles are removed from the card surface. Detail dialogs retain their fuller content. The button-free interest route retains its existing cancellable 520ms pixel storm.

## Reference evidence and adaptation

The following values come from public browser-delivered source; no reference artwork or source bundle is included in the implementation.

- [Sida Cheng stylesheet](https://sidacheng.com/_astro/index.Bp6XkxBu.css): `.ch[data-astro-cid-bbe6dxrz]` and `@keyframes rise` use an 800ms character rise from `translateY(105%)`, the curve `cubic-bezier(.2,.9,.2,1)`, and 45ms character intervals. Its gallery crossfade uses 450ms `ease`. This informs a prepared entrance and a shared reveal curve, not a replay on every scroll reversal.
- [Yutian Chen stylesheet](https://www.yutianchen.blog/_next/static/css/5e3145c27f08e2aa.css): `.homepage-card` uses 300ms `ease` for surface, border and background changes under `prefers-reduced-motion:no-preference`; this rule does not translate the whole card. This informs stable reading text and restrained interaction surfaces.
- [Walk with Zilin main module](https://walk-with-zilin.vercel.app/assets/main-Cfy0tOib.js): the flower configuration uses 20px pointer shift, 7px text shift and interpolation factor `.08`; object responses use springs. Its `bo` paging function cancels the prior tween and applies `power2.out`, with duration clamped between 350ms and 1600ms. The [entry module](https://walk-with-zilin.vercel.app/assets/index-B5WdSjKm.js) loads that scene only above 1023.98px. The transferable idea is continuous, interruptible response. Its wheel interception and desktop-only page structure are not adopted.

The experimental neuron adaptations were removed in favor of the pushed implementation above. The 16px lift is reserved for pixel-interest artwork; project cards use the stationary fade and capped stagger described above. Additional material and typography observations are in [reference-source-review.md](reference-source-review.md).
