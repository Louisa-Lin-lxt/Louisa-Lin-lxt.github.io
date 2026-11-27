# Pearl & Tide: local redesign, 21 November 2026

This iteration is local only. It does not update the published root export or push to GitHub.

## Design direction

A calm, personal research portfolio with a single portrait, clear academic hierarchy and a few distinctive interactions. ENERGY 2 / RHYTHM 3 / MOTION 2. The supplied references were opened and visually reviewed: Sida Cheng, Azure JX, Yutian Chen, Walk with Zilin, Julie Zhang, Bing Lin, Jackie Hu and Chia. Their common useful traits are authentic imagery, clear identity, intentional spacing and personal detail. See the [reference and source review](reference-source-review.md) for evidence and transferable rules. This is an original composition, not a reproduction of another site's artwork.

- Work Sans: open shapes and moderate weights suit both academic information and personal material. IBM Plex Mono is limited to dates and indexing. Both are self-hosted with OFL licenses in public/fonts. Chinese retains native sans-serif fallbacks.
- Pearl & Tide replaces the rejected mint/coral palette with cool pearl `#F4F8FC`, white surfaces, ice blue `#EAF3FC`, primary blue `#246BCB`, navy ink `#18324B`, muted text `#5D7084`, and borders `#D8E5F0`. Champagne `#C8A35A` is limited to decorative neuron accents and faint background light. The sea-blue/gold portrait and original pixel colors anchor the palette; typography and animation behavior remain intact.
- The hero pairs one photographic anchor with open text. The name animates letter opacity without changing its measured width.
- Background and education form an open two-column section. Research uses three comparable image previews. Publications use bibliographic rows. Experience is a compact list with logos and dates. Interests have larger pixel illustrations. This variation follows the content.
- Selective frosted glass restores depth to the fixed header, portrait rim, the single grouped interests tray and swipe stage, contact form and dialogs. Translucent white, fine luminous edges, soft shadows and 22px blur with 145% saturation form one material family. Research uses bordered, contained image cards with separate text; the image trays are opaque to preserve the source figures. The Resume/CV and social controls echo this material with light surfaces and rounded edges. Prose and publications stay open. Work uses compact two-column cards with small thumbnails and separate date footers. Reading surfaces are more opaque, with solid fallbacks for unsupported or reduced transparency.
- Arrows identify navigation and detail actions. The email copy control says Copy; it does not imply external navigation.
- The right-side pixel neuron remains a progress indicator and desktop section navigator. The narrow mobile version is passive; the menu provides navigation.
- Hero animation runs after pointer interaction for up to 1.5 seconds, then stops. Canvas geometry is cached; offscreen and hidden tabs stop rendering. Interest swipes retain their cancellable 520ms particle transition, keyboard alternatives and reduced-motion fallback.

## Implementation

The existing React/Vinext static export remains. No new runtime dependencies were added. `visual-refinement.css` replaces the previous override stack; dialog-specific rules moved into `story-details.css`. Form submission is isolated in `ContactForm.tsx`; visitor counting is isolated in `VisitorCounter.tsx`.

The production CSS optimizer treated prefixed and standard backdrop-filter declarations as aliases and retained the last declaration. Standard-first, WebKit-last source rules became WebKit-only in the export, leaving Chromium's standard computed filter at `none`. Glass rules now place `-webkit-backdrop-filter` before `backdrop-filter`, preserving both in the current build. A regression test reads the CSS actually linked by the static export and checks the unprefixed declaration on the normal `.interest-list` and `.detail-dialog` rules; it does not rely on source CSS or the header's inline style.

Installed skills applied: web-artifacts-builder (component organization and visual restraint), fixing-motion-performance (bounded rendering, cached geometry), antislop and antislop-ui (intentional hierarchy, real content, no invented metrics). The artifact scaffolding scripts were not run against this existing repository.

## Email verification

The existing FormSubmit recipient is xingtonl@andrew.cmu.edu. One terminal-origin verification request on 21 November 2026 returned HTTP 403 / Cloudflare 1010 (browser signature blocked). No provider acceptance or delivery receipt was obtained. The owner did not find activation mail. A normal browser submission was prepared but automatic approval review refused the retry; it was not sent. No bypass or user-agent spoofing was attempted.

The form now has a 20-second abort timeout, duplicate-request guard, unmount cleanup and an explicit fallback after failure. Inputs remain intact on errors; only accepted messages clear the form. The website sends visitor inquiries to the owner and sets Reply-To; it is not a mailbox client. End-to-end delivery remains unverified.

## Visitor count

The counter uses CounterAPI.com's default cumulative-event mode in the dedicated `portfolio-2026-11-22` bucket. The English label reads “visits since Nov 22, 2026”; Chinese uses the same date and counting unit. Only the exact published hostname attempts to record an event, at most once per document, across home and interests pages. Language changes and client-side remounts do not increment it. Localhost reads with `readOnly=true`, displays preview, and does not increase the count. Failed or unconfirmed production recording (including a zero increment response) displays a dash, never an invented number. The November 26 investigation has not yet verified successful live increments; earlier unrecorded traffic is not reconstructed. The API is public and approximate, not an audited analytics system.
