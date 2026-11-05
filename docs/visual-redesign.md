# Latest refinement: pixel background and quiet cards

The latest user direction replaces the 3D hero with the live GitHub site's original background-network behavior in pixel form. `HeroNeuralField` retains pointer proximity and click propagation, now drawn as square nodes and stepped pixel paths. No Three.js scene or control panel is mounted on the home page.

A single neuron sits at the right edge. The axon lights progressively as the page scrolls; desktop nodes double as section links and show their names only on hover/focus. Mobile shows a narrow passive indicator, retaining the normal menu for navigation. Reduced motion stops the background animation while progress and section links remain functional.

Removed from both card shelves: pixel neurons, folder graphics, Send a signal controls, illustrative-signal captions, and redundant browsing tips. Removed duplicate hero/section eyebrow labels and the hero's repeated focus list. Scientific image credits, factual dates/roles and detail controls remain.

The portrait is larger again, with one concise Venture Fellow panel. Research and Experience retain their horizontal structure and detail behavior.

---
Earlier iteration (superseded where it differs from the update above):

# Louisa — interactive visual refinement, 2026-11-04

## Fixed structure
Research remains three horizontal cards. Experience remains four horizontal cards in its original order. Every card opens its corresponding complete introduction. Small screens retain a horizontal rail, with part of the next card exposed. Navigation, bilingual content, résumé, contact methods and the interests route remain available.

## Visual language
Cold white, ice blue-grey, ink blue and restrained warm yellow. Arial / DengXian / PingFang fallbacks. One neural connection motif links the silver-blue 3D branches, blue/gold pixel neuron and selected-card border. Translucency is limited to navigation and hero panels; body copy rests on stable light surfaces.

The hero separates name, factual background, portrait, research/résumé actions and an interactive neural form. About separates education and minor from supporting coursework. Research cards expose institution, dates, role, context and contribution. Experience cards expose role, institution, date and concrete responsibilities. Supporting skills remain disclosures; interests and contact follow.

Images sit in consistent contain-fit frames with source captions. Original images and full descriptions remain available. No outcomes, papers or metrics were invented. Original role dates were retained; see verification notes about discrepancies with the existing PDF.

## Interaction model
- Drag the neural structure within a limited angle, or use the keyboard-operable rotation slider. Click Research, Venture or Interests to send a short gold signal along a branch and update the glass information panel. Its link takes the visitor to the matching section and highlights a relevant research/venture card. Replay and reset controls are explicit.
- A pixel neuron fires once on card hover/focus, a topic selection, or Send a signal. Topic buttons highlight related cards without filtering or reordering them. Pixels have a reserved strip beneath images and are labelled illustrative.
- Experience cards use a small CSS 3D folder. Hover/focus opens the cover; the detail view repeats the opening cue without delaying the text.
- Cards use a consistent lift, border and arrow response. Detail containers animate from the card location. Native dialog handles keyboard containment, Escape, close and focus restoration.
- Horizontal rails use native scrolling. Arrows and position counts appear only when needed. Arrow keys, Home and End move between card controls. No automatic scrolling or carousel timer.
- Mobile vertical page scroll is retained; the neural drag captures only horizontal touch intent. Reduced motion removes travel/lift animations while preserving controls and state changes. WebGL failure retains SVG and the same topic controls.

## Maintenance
Keep the existing React/Vinext and GitHub Pages static export. Three.js is dynamically imported; capped resolution, idle/offscreen rendering and lower mobile pixel ratio limit work. Pixel/folder interactions need no new dependencies. The static output uses ordinary anchors rather than server-dependent RSC navigation.
