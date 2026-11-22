## Contribution-first details — 2026-11-22

The approved homepage/card layout, light glass and animations remain. The research dialog now leads with the user's contribution; all original paragraphs and attribution remain, with lab demonstrations following the text. Independent before/after visual review confirmed that experiments, analysis, poster context and the own-poster link fit the normal English Yttri detail view clearly. The first-author paper has direct original-source access alongside its existing detail dialog. See the newest verification entry for scope, keyboard/mobile checks and limitations.

## Approved micro-refinements — 2026-11-22

Independent Designly visual review of the new English Research and Work captures passed: dates are clearer, lab names are easier to distinguish, and Next Capital/Yovo marks have a more balanced optical size. Existing card composition, light glass, image frames and reading rail remain. The root browser review confirmed the dated footer counter and narrow-screen fit. See the newest entry in `docs/verification.md` for exact checks and counting limitations. No publication occurred.

## Image background continuity and compact Work cards — 2026-11-22

This bounded revision follows the user's approval of the restored pixel network and simpler Research cards. It supersedes the Work rows in the preceding revision.

- Research image trays now have a responsive 2:1 ratio and zero inner padding. He Lab and Wang Lab use white backgrounds matched to their source edges. Yttri uses black and bottom alignment: its original black top edge extends naturally into the remaining space. All three originals remain contained and unchanged; no scientific content is cropped or generated.
- Work returns to cards in a two-column grid. Small source thumbnails sit beside the role and organization, with date and a 44px detail action in a shared footer. Desktop cards measure 549×176px at a 1280px viewport. On phones they become one column and grow naturally for wrapped text.
- Used Themely to express the existing Pearl & Tide tokens, Designly for bounded-edit composition and source-edge review, and Product Design for preserving the approved source while implementing and comparing the scoped changes. No new palette, hero, route or image assets were introduced.
- Compared Research before/after captures at 1280×720 together. Verified equal Research card geometry and image-box proportions; inspected Work at 1280, 800 and 390px. At 320px, all card content fits without document/card horizontal overflow. Glunovo's mobile dialog opens with the correct content and restores focus when closed. Browser warning/error log is empty.
- Pages build, frontend TypeScript, targeted ESLint, all seven export tests and whitespace checks passed. The hero component still matches pushed main exactly. Local English preview only; no deployment or email submission.
- Evidence: `blended-research-cards-en.jpg`, `blended-research-cards-mobile-en.jpg`, `compact-work-cards-en.jpg`, and `compact-work-cards-mobile-en.jpg` in the existing visualization folder.

# Latest visual review: restored pixel network and simpler experience layout — 2026-11-22

This revision supersedes the experimental radial neuron and shared image-caption cards below.

- Verified remote main at `4258f066d7abaa140365a455ce81ea3cffd7f182`; restored `HeroNeuralField.tsx` exactly to that pushed version. Original pixel paths, traveling signals, pointer illumination and click wave return. The right reading neuron, single portrait, glass header and existing interest effects remain.
- Research uses three contained image cards with separate role, lab and date text. Cards have matching dimensions, visible borders, natural content height, full-image proportions and a single 44px details action. Work uses four horizontal entries with thumbnail, role, organization, date and the same details action; mobile dates sit beneath the text. These rows are a new suitable layout, not a claim to restore an earlier committed row implementation.
- Browser checks at 1280, 800, 390 and 320px found no document or work-row horizontal overflow. Research cards match within each width (357.33×333.75px on desktop; 272×331.75px at 320px). Long work roles wrap without clipping. The current institution color was read back after fixing a competing legacy CSS selector.
- Opened Yttri and Glunovo dialogs and confirmed their content. Closing Yttri restored focus to its original details button. Research accessible headings include both role and lab. The restored hero click pulse incremented; text and portrait transforms remained `none`. Header retains `blur(22px) saturate(1.45)`. Browser warning/error log was empty.
- Pages build, all seven export tests, frontend TypeScript, targeted ESLint and whitespace checks passed. Reduced-motion/offscreen behavior was reviewed in the restored source; OS preferences were not changed.
- Local English preview: http://localhost:5175/. No deployment or contact submission. Email remains explicitly unverified.
- Evidence: `restored-network-home-en.jpg`, `research-classic-cards-en.jpg`, `work-experience-rows-en.jpg`, `work-experience-mobile-en.jpg` in the existing visualization directory.

# Latest visual review: compact spacing and continuous sections — 2026-11-22

Shortened normal cards from 400px to 352px, keeping all seven the same size and retaining the image/glass split. Narrow 320px cards use a shared 376px height for long roles. Existing Yttri proportions and visible blue-gray boundaries remain. All measured cards fit their captions at the checked normal font size.

The previous Hero/About join had a hard warm-to-blue edge and stacked empty padding. The new hero resolves to the shared pearl base, its canvas fades at the bottom, and About begins sooner. Research and Interests use matching edge fades; Publications no longer adds a competing border. Compared the original and revised 705px join visually. Reviewed the clearer desktop web and the compact Research/Outputs flow; text and portrait remain unobstructed.

Responsive checks: 1280, 705, 390 and 320px; no horizontal overflow and equal card sizes at each width. The stronger web responds to pointer drag/click and pauses offscreen. Code review covers reduced motion/transparency, growing captions and print behavior; OS preferences were not changed. Earlier sections below describe superseded iterations.

# Latest visual review: equal cards and expanded neuron

The existing light-glass card form is retained. Research and Work use equal desktop widths and 400px normal heights, shared caption planes, a visible blue-gray outline and the same responsive column counts. All seven cards were measured at 1280, 800, 390 and 320px viewport widths. The original Yttri horizontal banner is fully contained; its previously exaggerated cover crop and dark full-card base are gone.

The upper-left neuron now spans the hero whitespace. Soft guards clear the text/buttons, portrait and header; pointer interaction is stronger while the reading surfaces remain stationary. Reviewed the English desktop and narrow mobile composition, clicked the web and checked its interaction state. Yttri's detail dialog still opens, closes and restores focus. Browser warnings/errors were empty.

One code-review finding was fixed: an explicit 204px caption height could clip enlarged text. Captions now have a minimum height and can grow; the card reserves image space and grows with them. Normal font-size geometry stays equal. This reflow fallback, reduced-motion/transparency and print were code-reviewed, not OS-emulated.

Current evidence: `uniform-glass-research-en.jpg`, `uniform-glass-work-en.jpg`, `uniform-glass-mobile-en.jpg`, `expanded-neuron-home-en.jpg`, `expanded-neuron-mobile-en.jpg`, stored in `/Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/`. Earlier reviews below describe superseded iterations.

# Latest visual review: light glass and radial neuron

Result: passed for this local revision. This section supersedes the dark-caption findings below.

Compared the previous dark-card capture and current light-glass capture together. The 20px rounded card form, image placement, text order and full-card detail access remain. The lower surface now shows a soft tint from the image through a translucent white/blue fill and real 22px blur. Dark roles and organization names remain clear; dates were darkened after contrast review. Research and Work use the same styles.

English desktop (1280×900) and mobile (390×844) visual checks passed. Long mobile captions expand the glass panel without truncation or horizontal overflow. The radial corner illustration remains above the eyebrow, with stationary reading content and a soma-centered breath. Details open and restore focus after closing. Reduced-motion, reduced-transparency and print fallbacks were code-reviewed rather than OS-emulated.

Evidence: `light-glass-research-en.jpg`, `light-glass-work-en.jpg`, `light-glass-mobile-en.jpg`, `radial-neuron-home-en.jpg` under `/Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/`. The reference is the previously verified local card form, adapted to the user's new light-material request. No reference artwork was copied.

# Corner neuron and unified cards — 2026-11-21

Final result: passed for the requested local design adaptation.

## Reference and captures

- Source: `/var/folders/gq/dllxv_0x1692bvht1s54fphh0000gn/T/codex-clipboard-48cab89d-3040-448b-9b76-717035bb2d7e.png` (1714 × 856).
- English implementation: `http://127.0.0.1:5175/`.
- Capture folder: `/Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/`.
- `corner-cards-research-en.jpg`: 1280 × 720, settled research cards.
- `corner-cards-work-en.jpg`: 1280 × 900, work heading and card grid.
- `corner-neuron-home-en.jpg`: 1280 × 900, corner neuron, English introduction and portrait.
- `corner-cards-mobile-en.jpg`: 390 × 844, single-column work cards.

The reference and final research capture were inspected together in the same comparison input. This is an adaptation of the card form, as requested, rather than a pixel-identical reproduction. The reference's Siemens photograph and orange palette are not reused. Existing lab figures, company assets, blue-gray palette, champagne accent and glass details remain.

## Visual comparison

| Region | Result |
| --- | --- |
| Card silhouette and image | One integrated rounded surface, image behind the lower caption. Lab diagrams and logos remain contained rather than cropped; the photographic Yttri image fills its card. |
| Information hierarchy | White position, champagne lab/organization, quiet monospaced date; no extra research project titles. Research and Work share the same component and styles. |
| Upper-right action | A translucent detail affordance uses the existing dialog interaction. The entire card is a native button target. A flip gesture was not added solely because it appears in the reference. |
| Spacing and responsive layout | Research uses three desktop columns and two tablet columns; longer work entries use two desktop columns. Both become single-column on phones. No document overflow at 1280, 800, 390 or 320 px. |
| Hero composition | Small, faint soma and asymmetric branches occupy upper-left whitespace. Name, introduction and single portrait stay unobstructed. Mobile illustration remains above the eyebrow. |
| Material and motion | Header retains 22px blur / 145% saturation. Card affordances retain 16px blur. Integrated cards settle to opacity 1 and transform none. Pixel artwork and reading neuron remain. |

## Review iterations

1. Code review found the percentage-based card scrim could expose wrapped white text to a pale background. Moved the gradient onto the caption itself, with a fixed 84px fade preceding the text's 88px top padding. Rechecked Glunovo's wrapped role at 390 and 320px; all lines remain on the dark region. No clipping or title truncation.
2. Three research columns were too compressed at the tablet breakpoint. Changed 701–999px to two columns; verified two 340px columns at 800px.
3. Added print-specific normal-flow images, dark captions and hidden action overlays so captions do not depend on printed background graphics. This fallback was reviewed in code; the print dialog was not exercised.

No remaining P0/P1/P2 visual findings in the checked states. Reduced-motion and lifecycle behavior were reviewed in code; no physical-device frame-rate or print-output claim.

## Interaction and build evidence

- Keyboard Enter opens Bin He Lab details. Mobile Glunovo card opens its dialog; closing returns focus to `View details: Glunovo`.
- Clicking the hero increments `data-pulse` to 1 and enters `interacting`; leaving the hero for Work changes the neuron to `paused`.
- English remained selected throughout the final captures. Browser warning/error log was empty.
- Static build, frontend TypeScript, targeted ESLint, seven export tests and whitespace checks passed.
- Local preview only. Email delivery remains explicitly unverified; no contact message was sent, and nothing was pushed or deployed.
