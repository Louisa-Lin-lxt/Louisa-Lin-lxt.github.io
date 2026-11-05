## Content and layout pass — 2026-11-04

- Removed the duplicate Venture Fellow card over the portrait, the Research methods accordion, the interests introduction that repeated three card titles, the contact-form heading that repeated the submit button, the footer's repeated navigation/tagline, and detail summaries that restated the responsibility list. The hero now describes current Bin He Lab / Next Capital work, while About covers earlier Yttri / Tsinghua work and the connection to venture evaluation.
- Preserved three Research cards and four Work Experience cards in horizontal rails, with organization, role, date and detail entry. Wang Lab now says Summer Research Participant / 暑期研究参与者 rather than the generic Research Assistant label. No new role, result, or publication was added.
- Changed the card imagery from nested grey boxes to a unified full-width image stage while keeping scientific images contain-fit. Reduced the research detail video height so the title and responsibilities appear in the first dialog viewport. Made interests an open three-column list and kept the portrait/pixel signal as the main visual motif.
- Browser checked at 1280×900 and 390×844: home, Research, Work Experience, interests, contact and mobile menu; card rails remained horizontal, mobile next arrow advanced to 2/3, English/Chinese toggle kept the rail position, and no document-wide horizontal overflow appeared. Mobile card rails now hide the redundant native horizontal scrollbar while retaining swipe, next-card peek, count and arrow controls. Research detail video played muted with `loop=true`, `paused=false`, and current time advanced from 0.24 to 0.90 seconds; Escape closed the mobile detail, restored focus to its originating card, and kept scroll Y unchanged. Resume link points to an exported two-page PDF; LinkedIn and Xiaohongshu targets and contact form fields were inspected.
- `npm run build:pages`, `npm run typecheck:frontend`, targeted ESLint, `npm run test:export` (5/5), and `git diff --check` passed. The Pages build still reports an existing >500 KB chunk. No real contact message was sent; FormSubmit mailbox activation and receipt are not verified. Changes remain local and unpublished.
- Current screenshots are at the top of `previews.md` with the `refined-` prefix.

## Visual and Chinese-copy refinement — 2026-11-04

- Preserved the three Research and four Work Experience horizontal cards, their compact organization/role/date previews, manual horizontal browsing, and detail dialogs.
- Tightened the hero, section spacing, card text grouping, and navigation rhythm. Increased small link, form-label, field, and detail-body sizes. On 390px screens, Name and Email now stack so the placeholder and typed address remain visible.
- Simplified Chinese hero, About, research and experience descriptions without changing roles or claims. Rewrote the He and Yttri English summaries for direct wording and correct tense.
- Removed empty Music/Travel detail prompts. Both now have short bilingual descriptions and retain their interactive artwork; Taotao's pixel photo album is unchanged. Research detail media is positioned above the reading column.
- Verified in the local production preview at 1280×900 and 390×844: English and Chinese layouts, horizontal card controls, mobile navigation, detail closing and focus return, résumé PDF export, LinkedIn/Xiaohongshu targets, and WeChat copy feedback. Both research videos were playing muted with `loop=true` and `controls=false` while visible. The 390px document had no horizontal overflow.
- `npm run build:pages`, `npm run typecheck:frontend`, targeted ESLint, `npm run test:export` (5/5), and `git diff --check` passed. The Pages build still warns about the existing large 3D-related chunk. No real contact message was sent, and receipt delivery was not verified. Changes remain local, not published.
- Current screenshots are listed at the top of `previews.md` with the `polish-` prefix.

## Top research media and Taotao photo collection — 2026-11-04

Supersedes the side-column media and playback-button descriptions below.

- Research detail media now sits above the text. He and Yttri videos play silently in a loop without visible playback controls. Hidden tabs pause and visible tabs resume; reduced-motion/data-saving preferences retain the poster instead of autoplay.
- Browser verified both videos playing muted with loop=true, controls=false, and only the dialog-close button present. Yttri continued playing beyond its 10.4-second duration. Media block ends exactly where the reading column begins.
- At 390px, document width is 390px and dialog content width 350px, with no horizontal overflow. Desktop and mobile media retain their original aspect ratio.
- Imported 17 supplied ZIP entries, omitted one exact duplicate, and converted 16 unique photos to web JPEGs (3,182,222 bytes total, maximum edge 1440px, orientation preserved, EXIF absent). Originals remain untouched in the user's ZIP. Source mapping: taotao-photo-sources.json.
- Pixel positions map to the 16 photos. Photo modal adds previous/next and a count; both directions wrap. Images load only when selected.
- Browser checked all 16 photos sequentially: all loaded successfully, no dialog overflow, and counter/source matched. Verified pixel 3 opens the sunglasses photo; pixel 1 opens the rug photo. Escape returns focus to the original pixel and restores its illumination. Previous from photo 1 wraps to 16. No console errors.
- Frontend typecheck, targeted ESLint, Pages build, five existing export tests and whitespace check passed.
- Screenshots: previews/research-top-media.png, previews/research-he-top-media.png, previews/taotao-album-mobile.png.
- Local preview only; not published. Reduced-motion behavior inspected in code, not emulated in browser. External YouTube playback not tested.

## Research detail motion media — 2026-11-04

- He Lab details: official lab animation converted to silent H.264, with a direct link to CMU Engineering’s robotic-hand BCI video.
- Yttri Lab details: official B-SOiD four-panel behavior montage, with the official CARL task figure below. All source labels link to the lab/project; research text and compact homepage cards remain unchanged.
- Videos mount only when their corresponding dialog opens; muted inline looping playback, explicit pause/play, reduced-motion/data-saving autoplay opt-out, hidden-tab pause and static-poster fallback.
- Video payload: 469,805 + 283,602 bytes. H.264, 1052×606 / 960×722; original timing retained. Media sources, conversion details and B-SOiD GPL license included in public/research-media.
- Passed frontend typecheck, targeted ESLint, GitHub Pages static build and all 5 existing export tests. All 6 media/provenance files verified byte-identical in static export.
- Browser verification completed after explicit user authorization: both videos decoded and played muted with readyState 4; He playback paused at 15.382685s and stayed there until resumed. Yttri montage and CARL image loaded correctly. Escape/close remove the video and return focus to the originating card.
- Verified English desktop and Chinese 390×844 layouts for both labs: no horizontal overflow (document 390px, dialog content/client width both 350px); full video framing and visible close controls. No browser console errors. Reduced-motion/data-saving opt-out was inspected in code, not emulated in-browser. External YouTube playback was not tested.
- Screenshots: previews/research-yttri-motion-desktop.png, previews/research-yttri-motion-mobile.png, previews/research-he-motion-mobile.png.
- Local preview: http://localhost:5175/#research. Not published.

## Taotao interactive pixel album — 2026-11-04

Supersedes the Taotao 3D model described below. Music and Travel were unchanged at this point; see the latest refinement above.

- Taotao tab renders 597 independently clickable CSS pixels, with local pointer/focus illumination. No Canvas or animation loop is mounted on this tab.
- Each pixel maps into the photo list in TaotaoPixels.tsx. The only supplied photograph currently appears for every pixel; no additional photos were invented.
- Verified pointer illumination (45 nearby cells), click-to-photo, successful photo loading, Escape closure, focus return to the original pixel, ArrowRight selection, Enter opening, and a single tab stop within the illustration.
- At 390px: Chinese instructions and photo modal fit; document width is 390px; close button is visible. Reduced-motion CSS removes transitions and pixel movement.
- Frontend typecheck, lint, Pages build, existing five export checks and diff whitespace check passed. No browser console errors.
- Screenshots: previews/taotao-pixel-gallery.png, previews/taotao-photo-mobile.png.
- Local preview only, not published.

## Taotao photo reference and Home navigation — 2026-11-04

- Reference: user-supplied IMG_9398.HEIC, viewed locally after HEIF decoding. Photo was used as a visual reference only.
- Homepage pixel artwork and interest-page model now share ivory fur, drop ears, round dark eyes, a warm muzzle and narrow patterned blue harness. Removed the old blue pixel face and solid 3D vest.
- Header and interest-page home links now read Home / 首页 without the personal wordmark or fibre icon. Footer home link is consistent.
- Reviewed kangyao-huang.tech, os-keyboard.com, sidacheng.com, and azurejx.github.io. Kept the approved horizontal portfolio layout; borrowed restraint in navigation and consistent information hierarchy.
- Passed frontend typecheck, lint, Pages build, 5 export checks and diff whitespace check.
- Browser verified Taotao deep link, model drag, keyboard detail opening, Escape, Home return and Chinese Home label. At 390px, body width is 390px. No console errors on the verified preview.
- Screenshots: previews/taotao-pixel-home.png, previews/taotao-reference-model.png, previews/home-simple-mobile.png.
- Local preview only; not published. Interest-detail placeholders still existed at this point and were removed in the latest refinement above.

# Latest update: compact cards and simplified contact

- All 7 horizontal cards show only organization, position, dates and the detail entry. Removed project descriptions, contribution blocks, tags and topic selectors from previews. Full details retain their original content.
- Main headings: Research / Work Experience / Beyond Academics, with corresponding Chinese translations and navigation labels.
- Hero heading: Xingtong Lin. The introduction ends with “You can also call me Louisa.” Chinese copy follows the same structure.
- Three new matching pixel illustrations replace the old interest line icons.
- Contact retains the message form and existing LinkedIn/Xiaohongshu/WeChat logo assets. No personal-email display or bottom résumé button remains; header and hero résumé links remain.

Checks: build, lint, frontend typecheck and all 5 static-export tests passed. Opened every card and confirmed the correct detail title and 3/6-step content. Desktop row layout and 390 px Chinese layout inspected. No mobile body overflow, no topic controls. WeChat copy returned success; platform link targets were verified. Empty form focused Name and reported 4 required fields; no real message sent.

Current screenshots: compact-research.png, compact-experience.png, compact-beyond-academics.png, compact-contact.png.

---
Previous checks (superseded where they describe removed UI):

# Latest card cleanup and motion check

Removed image-caption disclaimers from research cards and details, the general unpublished-data note, and repeated confidentiality sentences in both language versions. Lab names, responsibilities and actual contributions remain; institutional links in details remain usable.

Card hover now responds in 160 ms. Detail opening uses a 200 ms fade and 0.98-to-1 scale; closing uses 140 ms. Removed the large translation from each card to the modal and reduced backdrop blur from 9 to 4 px.

Verified on the static export: no card captions or disclosure notes; computed opening duration 0.2 s; Escape returns focus and retains page Y (1758 px in the tested case). At 390 px the detail panel is 352 px wide and contains no removed disclaimer text. Desktop research card padding is 16/20/18 px and all three remain aligned. Build, lint, frontend typecheck and five export tests pass.

Current card screenshot: previews/clean-research.png.

---
Previous verification records:

# Latest refinement checks — pixel background / reading progress

- No hero 3D viewer, card neurons, folder decorations or Send a signal controls remain in the rendered homepage.
- Live GitHub hero inspected: its neural network proximity/click interaction is retained in pixel Canvas form.
- Clicked the hero background: the Canvas received and started a signal pulse.
- Side-neuron navigation checked: Experience selected at 67.6% progress, Contact at 100%, and returning Home resets to 0%.
- Chinese and English mobile hero inspected at 390 px; body width remains 390 px.
- Existing horizontal cards and full project details remain.
- Production static build, lint, frontend typecheck and all 5 export tests passed. No console errors in the final session.
- Production Venture Fellow detail opens and closes with Escape; no folder appears in the detail. At 390 px the Experience next control scrolls 326 px, with no body overflow.
- Current screenshot files use the `pixel-` prefix; earlier `interactive-` images document the superseded 3D iteration.

---
Previous full regression record (features removed in this refinement are historical):

# Interactive refinement verification — 2026-11-04

Preview: http://localhost:5175/ serves the actual GitHub Pages export in `dist/client`. Development: http://localhost:5174/. No remote publication or push was performed.

## Original issues addressed
1. Competing hero emphasis made background and primary actions harder to scan.
2. Research contributions were hidden behind details; titles, images and dates lacked a consistent hierarchy.
3. Institutional scientific images needed uncropped frames and clear source/ownership captions.
4. Decorative motion offered limited exploration or purposeful feedback.
5. Small-screen browsing and detail keyboard/return behavior needed explicit handling.

## Automated checks
- `npm run lint`: passed.
- `npm run typecheck:frontend`: passed.
- `npm run build:pages`: passed; home, interests and 404 exported.
- `npm run test:export`: 5 passed. Tests cover actual page output, routes, assets/PDF, credits/contact links, all seven cards, interactive fallbacks and interest tabs.
- `git diff --check`: passed.
- Production browser console: no errors in the final tested session.

The build still warns about a minified Three.js chunk over 500 KB. It is dynamically loaded, with capped pixel ratio, idle/offscreen rendering and a static fallback. Portrait and research images are approximately 124/62/145/125 KB. Original assets are preserved.

## Browser checks in this refinement
| Area | Observed result |
| --- | --- |
| Desktop | At 1440 px, 3 research and 4 experience cards share a row; no overflow arrows are shown when all fit. Images remain contain-fit. |
| Responsive | 375, 390 and 768 px inspected without body overflow. At 390 px, cards remain horizontal with a next-card peek and manual controls. |
| Hero 3D | Clicking nodes updates topic/status; dragging changed rotation from 0 to 28 degrees and moved node positions. Reset restores orientation. Section links highlight the related card. |
| Pixels | Repeated Send a signal clicks restart the one-shot animation. Hover/focus and topic selection also trigger it. Behavior selection highlights only the matching research card; card order and positions remain stable. |
| Horizontal browsing | Next research moves to card 2, arrow-key selection moves to card 3; position indicator updates. Experience next control also inspected on mobile. |
| Details | All 7 cards opened the correct title/content on static output. Close receives initial focus. Shift+Tab stays inside the modal. Escape closes, returns focus to the selected card and retains horizontal position (326 px in the tested second-card case). For the final experience card, page Y stayed at 4057 px and rail X stayed at 939 px across open/close. |
| Mobile details | English and Chinese text, long research titles and close control inspected. No horizontal dialog overflow. |
| Navigation | Desktop anchors, current-section indicator and mobile menu navigation work. Research heading remains below fixed navigation. |
| Language | English/Chinese switches update content and document language. Chinese survives a static-page reload. Mobile hero panels were corrected to flow with content height and rechecked in both languages. |
| Résumé | Existing PDF opened through the header link; PDF viewer rendered 2 pages. |
| Contact | Email, LinkedIn and Xiaohongshu targets inspected; email and WeChat copy success feedback checked. Empty form focuses Name and reports 4 required invalid fields; no message was sent. |

The retained interests route was exercised in the preceding redesign pass (topic deep links, tab/arrow selection, detail, refresh and home return); its static export is still checked automatically. See the preview gallery for the current horizontal-card screenshots, rather than the earlier layout captures.

## Limits and content to confirm
- No physical phone, separate screen reader, or low-end hardware performance audit. Reduced-motion and WebGL-fallback paths are implemented and source-reviewed; OS settings/GPU availability were not changed for a live simulation.
- Actual FormSubmit delivery and recipient activation remain untested. Direct email is available.
- Interest photo collections, playlists and travel entries still need the owner's source material.
- Some original site dates differ from the existing résumé: for example, Glunovo ends June 2025 on the site, June 2026 in the PDF; Yttri ends September 2026 on the site but says Present in the PDF. Dates were not guessed or silently reconciled. Confirm before publication.
- DengXian is not bundled or installed on the test Mac; the Chinese system fallback is used.
- Legacy repository-wide TypeScript checking still requires pre-existing Cloudflare worker/database bindings. The website-specific typecheck passes.
- Changes are local; production GitHub Pages has not been changed.
