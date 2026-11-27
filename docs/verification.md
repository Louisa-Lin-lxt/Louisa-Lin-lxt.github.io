## Visit recording investigation — 2026-11-26

- Owner reports repeated production visits but a persistent zero. A read-only service response also returned zero. Earlier mocked tests verified URL construction and client deduplication, not actual service persistence; they did not establish working production counting.
- Production now uses the provider's documented default increment URL, omitting optional false-valued flags. Preview requests alone send `readOnly=true`. `strict-origin` supplies only the website origin to the service. These remove integration ambiguities; the exact server-side reason for the previous zero is not yet proven.
- A zero returned by a production increment is treated as unconfirmed and shown through the existing unavailable state, rather than presented as zero visitors. Preview may still show a genuine read-only zero. No optimistic increment, fabricated baseline, or retry of ambiguous writes is used.
- Independent diagnostic requests were blocked with HTTP 403 / Cloudflare 1010 (browser signature banned), so no successful diagnostic increment was recorded. The production-page browser check was separately blocked because automatic approval review could not connect (DNS/502); it was not bypassed. Actual increment and persistence remain unverified.
- Counter regression coverage includes zero increment responses, denied/rate-limited responses, malformed payloads, preview isolation and one request per document. Historical traffic before successful tracking cannot be recovered from this counter.

## Approved Pages release preparation — 2026-11-22

- User approved publishing the current local version. Remote `main` matches the starting commit, and the live homepage's asset references match the tracked root export.
- Latest Pages export completed successfully. Frontend TypeScript, targeted ESLint, seven export tests, three mocked counter tests and source whitespace checks passed. Independent review found no blocking issues in the contact form, counter or research detail rendering.
- Release includes the approved glass styling, pixel interactions, compact cards, contribution-first prose without extra headings, graduate-level coursework grouping, direct article access and the November 22 visit counter. Email delivery remains explicitly unverified.
- Sync the validated static export into the tracked root, excluding local metadata and non-Pages build files. Earlier “local only” entries below describe their respective pre-release checks.

## Contribution-first research details and direct article access — 2026-11-22

- All three research dialogs show the complete original narrative before lab media. Per the user's follow-up, both section headings (“My contribution” and “Lab context”) and paragraph prefixes such as “Experiments”, “Analysis” and “Poster” are removed in both languages; the prose reads naturally. Existing narrative wording, paragraph styling and media separation are unchanged. Yttri adds a direct link to the existing first-year poster PDF. Work detail rendering remains unchanged.
- The first-author review retains its bibliographic row and full title, with slightly stronger authorship/source text and separate “Read article” and “View details” controls. The DOI link is a real anchor, not nested inside a button. Poster and BCI rows retain their existing controls. Publication metadata is aligned to the start of its grid cell.
- Kept the homepage Contact / Resume/CV actions exactly as requested. A comparison of HomeClient's main markup and checksums of the card component, global refinement styles, neuron, section motion, interests, and visit counter confirmed they are unchanged in this revision.
- Production export, frontend TypeScript, targeted ESLint, seven export tests and whitespace checks passed. The export test verifies the DOI and independent controls. No dependency changes.
- In the English browser, checked text-before-media order in He, Yttri and Wang dialogs; Yttri's own-poster href; keyboard activation of the paper details; and focus restoration after closing. At 320px the research dialog and publication row fit, and both paper actions retained 44px height without overlap. The final 705px author/date gap is 6px; browser warning/error log is empty. The remote publisher destination was not fetched in this UI check.
- Evidence in `contribution-first-2026-11-22/` under the existing visualization directory: `before-yttri-en.jpg`, `yttri-en.jpg`, `yttri-mobile-en.jpg`, `publications-en.jpg`; `yttri-natural-prose-en.jpg` records removal of paragraph labels, and `yttri-body-only-en.jpg` records removal of the two section headings. The latter revision passed production export and frontend TypeScript checks; the English preview confirmed zero extra headings and narrative-before-media order. Local preview only; no push, deployment, contact submission or live counter increment.

## Card typography, logo balance and dated visit total — 2026-11-22

- Card dates are now 12px with a slightly deeper blue-gray. Research uses an 18px role and 17px medium-weight lab label, preserving the existing position/lab/date order. Next Capital and Yovo use 3px internal image padding; their outer frames, image proportions and source assets are unchanged.
- The footer records cumulative visits in CounterAPI.com's `portfolio-2026-11-22` bucket with `unique=false`. Only the exact production hostname increments, once per document. Existing home and interests footers share the request. Localhost uses `readOnly=true`; failures show a dash, and no history is fabricated. The read-only endpoint returned HTTP 200 with a real zero; the English browser displayed `0 visits since Nov 22, 2026 preview` on both routes. Counting on production begins after deployment, which was not performed.
- Production export, frontend TypeScript, targeted ESLint, seven export tests and three mocked counter-behavior tests passed. The first sandboxed export could not bind its prerender loopback socket; the authorized local build then completed successfully. `npm test` now includes the counter tests.
- Compared current English Research and Work captures to the approved version. Checked 705px card composition, 320px wrapped content/date-to-arrow spacing, and 1280px footer. No horizontal overflow at 320/705/1280px; browser warning/error log was empty. The mobile footer wraps within its container.
- Checksums confirmed HeroNeuralField, useSectionMotion, hero motion CSS, interests component/styles, HomeClient, content and Publications component unchanged during this revision. No email was submitted or deployment made.
- Evidence: `micro-polish-2026-11-22/research-en.jpg`, `work-en.jpg`, `counter-en.jpg`, and `counter-mobile-en.jpg` in the existing visualization directory.

## Image background continuity and compact Work cards — 2026-11-22

This bounded revision follows the user's approval of the restored pixel network and simpler Research cards. It supersedes the Work rows in the preceding revision.

- Research image trays now have a responsive 2:1 ratio and zero inner padding. He Lab and Wang Lab use white backgrounds matched to their source edges. Yttri uses black and bottom alignment: its original black top edge extends naturally into the remaining space. All three originals remain contained and unchanged; no scientific content is cropped or generated.
- Work returns to cards in a two-column grid. Small source thumbnails sit beside the role and organization, with date and a 44px detail action in a shared footer. Desktop cards measure 549×176px at a 1280px viewport. On phones they become one column and grow naturally for wrapped text.
- Used Themely to express the existing Pearl & Tide tokens, Designly for bounded-edit composition and source-edge review, and Product Design for preserving the approved source while implementing and comparing the scoped changes. No new palette, hero, route or image assets were introduced.
- Compared Research before/after captures at 1280×720 together. Verified equal Research card geometry and image-box proportions; inspected Work at 1280, 800 and 390px. At 320px, all card content fits without document/card horizontal overflow. Glunovo's mobile dialog opens with the correct content and restores focus when closed. Browser warning/error log is empty.
- Pages build, frontend TypeScript, targeted ESLint, all seven export tests and whitespace checks passed. The hero component still matches pushed main exactly. Local English preview only; no deployment or email submission.
- Evidence: `blended-research-cards-en.jpg`, `blended-research-cards-mobile-en.jpg`, `compact-work-cards-en.jpg`, and `compact-work-cards-mobile-en.jpg` in the existing visualization folder.

## Restored pixel network and simpler experience layout — 2026-11-22

This revision supersedes the experimental radial neuron and shared image-caption cards below.

- Verified remote main at `4258f066d7abaa140365a455ce81ea3cffd7f182`; restored `HeroNeuralField.tsx` exactly to that pushed version. Original pixel paths, traveling signals, pointer illumination and click wave return. The right reading neuron, single portrait, glass header and existing interest effects remain.
- Research uses three contained image cards with separate role, lab and date text. Cards have matching dimensions, visible borders, natural content height, full-image proportions and a single 44px details action. Work uses four horizontal entries with thumbnail, role, organization, date and the same details action; mobile dates sit beneath the text. These rows are a new suitable layout, not a claim to restore an earlier committed row implementation.
- Browser checks at 1280, 800, 390 and 320px found no document or work-row horizontal overflow. Research cards match within each width (357.33×333.75px on desktop; 272×331.75px at 320px). Long work roles wrap without clipping. The current institution color was read back after fixing a competing legacy CSS selector.
- Opened Yttri and Glunovo dialogs and confirmed their content. Closing Yttri restored focus to its original details button. Research accessible headings include both role and lab. The restored hero click pulse incremented; text and portrait transforms remained `none`. Header retains `blur(22px) saturate(1.45)`. Browser warning/error log was empty.
- Pages build, all seven export tests, frontend TypeScript, targeted ESLint and whitespace checks passed. Reduced-motion/offscreen behavior was reviewed in the restored source; OS preferences were not changed.
- Local English preview: http://localhost:5175/. No deployment or contact submission. Email remains explicitly unverified.
- Evidence: `restored-network-home-en.jpg`, `research-classic-cards-en.jpg`, `work-experience-rows-en.jpg`, `work-experience-mobile-en.jpg` in the existing visualization directory.

## Compact cards and continuous section backgrounds — 2026-11-22

- Reduced the shared card/caption minimums from 400/204px to 352/156px, tightened caption padding and spacing, and kept the 196px image allocation and visible glass outline. Research and Work still match. At 320px viewport width, both collections use 376/180px to accommodate wrapped roles. Captions can expand for enlarged content.
- Hero, Research and Interests now fade to the shared paper at their boundaries. Removed hard section borders, including the competing Publications CSS border. Reduced desktop section padding from 100 to 80px and the Hero/About padding pair from 78+100 to 52+56px. At 705px, removed the hero's excess minimum-height slack; the actual Hero/About transition was visually reviewed before and after.
- Increased neuron thread visibility and mouse response, with movement-triggered signals along the same branch, a compact click ripple, and a 90px bottom fade. Text, controls and portrait masks remain. Browser drag entered `interacting`, click pulse incremented, and scrolling away entered `paused`.
- Section entrances begin 48px before viewport entry; supporting same-row content has a 70ms offset. Interest arrows now share the title fade. Existing pixel artwork, spring motion and interest storm remain.
- Verified equal card dimensions and no horizontal overflow at 1280, 705, 390 and 320px; normal captions fit. Desktop Hero/About and Research/Outputs composition reviewed. Build, frontend TypeScript, targeted ESLint, all seven export tests and whitespace checks passed. Accessibility preference fallbacks were reviewed in code, not by changing OS settings.
- Local preview only: http://127.0.0.1:5175/#home. No deployment or contact submission.
- Evidence in the existing visualization folder: `clearer-neuron-home-en.jpg`, `compact-glass-research-en.jpg`, `soft-section-join-en.jpg`, and `before-section-join-en.jpg`.

## Equal glass cards and expanded hero neuron — 2026-11-21

Latest local revision, superseding the small corner web and mixed card widths below. English preview: http://127.0.0.1:5175/#home.

- Research and Work now share three desktop columns, two tablet columns and one phone column. All seven cards measured 357.33×400px at a 1280px viewport, 340×400px at 800px, 342×400px at 390px and 272×400px at 320px (subpixel rounding aside). Caption minimums and reserved image space allow enlarged text to reflow rather than hit a fixed-height clip.
- Blue-gray outer edges and a slightly clearer caption divider separate the cards from the pale background. Captions retain real 22px blur / 145% saturation. The Yttri banner is contained at its original horizontal proportions, rather than enlarged and cropped across the entire card.
- A 57-node, fourteen-ray neuron now reaches through the hero whitespace from the upper-left soma. Soft masks preserve the complete introduction, controls, portrait and header. Proximity-weighted pointer pull is bounded at 24px; click signals travel the larger graph. Browser interaction incremented the pulse and entered the interacting state. Mobile hero copy and portrait remained visually clear.
- Opened Yttri details and closed them; focus returned to its card. Desktop, tablet and narrow/mobile views showed no horizontal overflow; all seven captions fit at normal font size. Browser warnings/errors were empty. Reduced motion, transparency, enlarged-text reflow and print were code-reviewed; OS settings and physical output were not exercised.
- Final production export, frontend TypeScript, targeted ESLint, seven export tests and whitespace checks passed. No push/deployment or email submission; the existing unverified-email notice remains.
- Evidence: `uniform-glass-research-en.jpg`, `uniform-glass-work-en.jpg`, `uniform-glass-mobile-en.jpg`, `expanded-neuron-home-en.jpg`, `expanded-neuron-mobile-en.jpg` in `/Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/`.

## Light glass captions and radial neuron — 2026-11-21

This revision supersedes the dark caption treatment and earlier asymmetric neuron below. The current English preview is http://127.0.0.1:5175/#home.

- Kept the integrated card form, images, role/organization/date hierarchy and detail dialogs. Replaced the dark scrim with a translucent pearl caption, 22px backdrop blur, a fine white edge and deep blue text. Research and Work share this treatment. The caption grows with wrapped text.
- Darkened the small date text to retain contrast over the darkest image; added opaque reduced-transparency treatment for the detail chip and fixed print-image selector specificity.
- The hero now has nine radial branches, 28 nodes and 15 faint connecting threads around its upper-left soma. A slow soma-centered CSS breath accompanies existing pointer springs and bounded click signals. Mobile gets 84px of hero top padding to keep the web above the introduction. Copy and portrait remain stationary.
- English browser checks at 1280×900 and 390×844 confirmed card geometry, actual caption blur, readable wrapped Glunovo text, and no horizontal overflow. The mobile detail dialog opened and closed, returning focus to Glunovo. A hero click incremented the pulse counter and entered interacting; CSS breathing was visible in the computed transform.
- Static export, frontend TypeScript, targeted ESLint, all seven export tests and whitespace checks passed. Reduced motion, reduced transparency and print behavior were inspected in code; OS preference and physical-print tests were not performed.
- Screenshots: light-glass-research-en.jpg, light-glass-work-en.jpg, light-glass-mobile-en.jpg and radial-neuron-home-en.jpg in `/Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/`.
- Local only; no push or deployment. Email delivery status remains unverified, and no message was sent.

## Corner neuron and unified image cards — 2026-11-21

This entry supersedes the larger interactive neuron and separated image/caption treatment described below. Local preview: http://127.0.0.1:5175/#home.

- The hero neuron now sits in upper-left whitespace, with a small soma, asymmetric branches, low opacity, subtle drift and bounded pointer/click signals. The introduction and portrait stay clear. Right reading rail and pixel interests remain.
- Research and Work use the same image-led card component: position, organization and dates overlay the image, with a translucent detail affordance. Desktop Work uses two columns for longer roles; tablet Research uses two, and phone layouts use one.
- Caption gradients follow the actual text height, keeping wrapped roles readable. Print styles use dark normal-flow captions without relying on background printing. Whole-card entrances fade as one stationary surface.
- Compared the supplied reference and final rendered cards together. Reviewed desktop at 1280px, tablet at 800px, and mobile at 390px and 320px; no horizontal overflow. Glunovo's wrapped caption stayed readable. Header and card affordance blur were confirmed in computed styles.
- Keyboard activation opened research details. Mobile work details opened and closed, returning focus to Glunovo. Hero click incremented its pulse counter; the hero paused offscreen. Browser warning/error log was empty.
- Production export, frontend TypeScript, targeted ESLint, whitespace check and all seven export tests passed. Reduced-motion and print fallback were reviewed in code, not through OS settings or a print dialog.
- No push or deployment. Email delivery remains unverified; no form submission was made. Visual evidence and limitations are in [design-qa.md](../design-qa.md).

## Interactive neuron, quieter entrances, concise research — 2026-11-21

This entry supersedes the previous automatic opening and repeat entrance behavior below. Changes remain local at http://localhost:5175/#home.

- Replaced the timed hero sequence with an elastic branching neuron: pointer proximity pulls nearby branches, and click/tap starts a bounded signal from the nearest node. Pearl & Tide colors, glass, single portrait, right reading rail and pixel interests remain.
- Section entrances now run once. Headings and copy fade without translation; card imagery rises 16 px with a small same-row stagger. Stable observer anchors, focus handling, reduced-motion handling and before-print cleanup prevent hidden or jumping reading content.
- Selected coursework now has two Graduate-level courses and five Undergraduate courses, with equivalent Chinese labels. Research card copy is position, lab and dates; details remain available.
- Production export, frontend TypeScript, targeted ESLint, whitespace checks and all seven export tests passed. No new dependencies.
- Browser checked English desktop at 1280 px and mobile at 390 px, plus the native 319 px preview width. Mobile document width matched the viewport. The neuron visibly deformed during a pointer drag and changed to `interacting`; a click incremented `data-pulse`. Coursework opened with both groups, settled to intrinsic height and closed through keyboard activation. Chinese coursework labels and mobile navigation worked.
- Research cards changed from prepared opacity-zero surfaces to fully visible settled surfaces; copy retained `transform: none`. Bin He Lab details opened and closed. The retained Music-to-Taotao interaction entered `is-storming` and completed at the Taotao hash. Browser error/warning log was empty.
- Reduced-motion, offscreen lifecycle and print handling were reviewed in code. OS accessibility preferences and the print dialog were not changed; no physical-device frame-rate claim is made.
- No push or deployment. The email-delivery-unverified notice remains and no message was submitted.

Screenshot: [English research cards](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/interactive-research-en.jpg>).

## Neural opening and section motion — 2026-11-21

- Removed the six requested filler passages and their Chinese counterparts. Removed the portrait caption space and unused hero-copy styles. Pearl & Tide colors, glass, single portrait, pixels, reading rail and interest storm remain.
- Added a bounded automatic dendrite-to-axon opening, an interruptible native coursework disclosure, and grouped entrances for every main content section. Timing and lifecycle details are in [motion-refinement.md](motion-refinement.md).
- Final production export, frontend TypeScript, targeted ESLint, whitespace check and all seven export tests passed.
- English browser checks covered 1280px desktop and 390px mobile with no horizontal overflow. Confirmed automatic `opening` then `settled`, a click-triggered `responding` pulse, and offscreen `paused`. Read back live heading/body entrance transforms, tested coursework pointer reversal and immediate keyboard activation, and verified mobile navigation plus the retained Music-to-Taotao `is-storming` transition. Browser warning/error log was empty.
- Header computed style retains `blur(22px) saturate(1.45)`. Reduced-motion behavior was reviewed in code; OS preferences were not changed. No claim of physical-device frame-rate testing.
- Changes are local at http://localhost:5175/#home. No push or deployment. The unverified-email notice remains; no message was submitted.

Screenshot: [English homepage](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/neural-motion-home-en.jpg>).

## Pearl & Tide glass refinement — 2026-11-21

This entry supersedes the rejected mint/coral palette below. English preview is open at http://localhost:5175/#home. Changes remain local; no root export sync, push or deployment.

- Replaced competing accent colors with pearl white, sea blue and small champagne details. Restored translucent material to navigation, portrait rim, research image trays, grouped pixel interests, swipe stage, contact panel and reading dialogs. Layout, pixel artwork and existing motion remain.
- Inspected public HTML/CSS/JS from six supplied reference sites. Julie returned 429 and Chia 403 during source retrieval; neither was retried or bypassed. Exact observations, source links and the distinction between reference evidence and our design inference are in [reference-source-review.md](reference-source-review.md).
- Fixed production CSS optimization dropping the standard `backdrop-filter` by placing its WebKit declaration first. Browser computed styles now confirm 22px blur / 145% saturation on the header, portrait rim, interests tray, swipe stage, contact panel and dialog; the detail backdrop has 6px blur. The reading panel retains a 92–94% opaque fill.
- Production build, frontend TypeScript, targeted ESLint and whitespace checks passed. Seven export tests passed, including the new compiled-CSS glass regression. The local preview script now binds IPv4 loopback explicitly because the browser could not reach its previous IPv6-only listener.
- English desktop and 390px mobile checks found no horizontal overflow. Opened and closed the research dialog and mobile menu. Verified the hero pulse increment, neuron section state, active pixel-storm canvas, completed Music-to-Taotao transition, rapid direction reversal, and Taotao photo opening. Final browser warning/error log was empty.
- Text contrast on the base pearl surface is 12.33:1 for main text and 4.78:1 for muted text; white text across the primary button gradient is at least 4.69:1. These checks cover those specified color pairs, not every translucent composite. Reduced-transparency fallbacks were inspected in code; OS accessibility settings were not changed.
- The bilingual unverified-email notice remains. No contact submission was attempted during this visual pass.

Screenshots: [English homepage](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/pearl-glass-final-home.jpg>) · [pixel interests](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/pearl-glass-final-interests.jpg>) · [mobile](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/pearl-glass-final-mobile.jpg>).

## Brighter palette applied locally — 2026-11-21

- Applied the approved blue/coral/mint palette to the site, interest route, detail dialogs and neuron colors. Preserved all layout and type declarations, motion durations, transforms, keyframes, pixel artwork and interaction logic. A before/after CSS declaration comparison and normalized Hero canvas comparison confirmed only color changes in this pass.
- Final production export, six export tests, frontend TypeScript, targeted ESLint and whitespace checks passed. Browser computed colors matched the approved page, primary button, research surface, mint interests surface and coral neuron core.
- English browser preview verified the Hero click pulse (`data-pulse` incremented), scroll navigation/current section, particle transition (`is-storming` with canvas), rapid reversal and Taotao photo opening. A 390px viewport had no horizontal overflow; the final console error/warning list was empty. Animation implementations were retained, not replaced.
- English preview left open at http://localhost:5175/. No push or production update. The existing bilingual unverified-email notice remains.
- Screenshots: [homepage](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/brighter-palette-home.jpg>) · [pixel interests](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/brighter-palette-interests.jpg>).

## Local visual upgrade and contact verification — 2026-11-21

This entry supersedes older layout descriptions below. Preview: http://localhost:5175/. Source and `dist/client` changed locally; tracked root export and production were not published.

- Replaced the accumulated visual overrides with a consistent paper/ink layout, self-hosted Work Sans and IBM Plex Mono (OFL), one portrait, open research previews, bibliographic output rows, and compact experience rows. Preserved bilingual research content, the neuron reading rail, pixel illustrations, and button-free interest swipe/particle navigation.
- Production export, frontend TypeScript, targeted ESLint, six static-export tests, and `git diff --check` passed on the final source. No new runtime dependencies were added.
- Browser checked English desktop at 1280×720 and English/Chinese mobile at 390×844. Name and navigation were readable, with document width equal to the mobile viewport. Mobile menu navigation, email copy feedback, seven research/experience dialogs, and three publication/project dialogs worked. Escape restored focus after closing the research detail.
- Interest keyboard navigation, rapid direction changes, a real pointer drag, and a Taotao photo dialog worked. Hero animation lifecycle checks covered idle, bounded activity, offscreen and reduced-motion behavior; OS reduced-motion settings were not changed for browser emulation. Final browser error/warning log was empty.
- Counter preview displayed a real read-only total of zero, visibly labeled as approximate and since tracking began. Local visits do not increment it. No earlier analytics integration was found; this cannot recover historical visitors. Production counting starts only when this version is deployed.
- Contact component now has duplicate-submit protection, a 20-second timeout, cleanup, preserved fields after unconfirmed submission, explicit activation feedback, and an email-app fallback. Form success still requires a positive provider response; no end-to-end delivery claim is made.
- A single synthetic FormSubmit test at 2026-11-21 17:52:34 EST received HTTP 403 / Cloudflare 1010 (`browser_signature_banned`). Provider acceptance and inbox receipt were not established. The owner reported no activation email in inbox or spam. Automatic approval review rejected a subsequent browser submission as retrying an access-control-blocked request; that browser test was not sent and no bypass was attempted.

Screenshots: [desktop](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/portfolio-upgrade-desktop.jpg>) · [mobile](</Users/xingtonglin/.codex/visualizations/2026/11/04/01a1a74b-a93a-7d53-9cc4-9bcbb90cb41b/portfolio-upgrade-mobile.jpg>).

Limits: email delivery remains unverified and needs service activation or an alternative provider; no physical-device or screen-reader audit was performed. These checks do not assert those outcomes.

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
