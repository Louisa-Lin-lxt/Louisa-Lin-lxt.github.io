# Louisa Lin — personal website

Bilingual personal portfolio for Xingtong “Louisa” Lin: neuroscience / neuroengineering, technology, and early-stage investing. Built with React, Vinext and a lightweight pixel Canvas hero. Supports static GitHub Pages hosting.

## Run locally

Requires Node.js 22.13+.

```sh
npm install
npm run dev -- --port 5174
```

## Validate and preview the GitHub Pages build

```sh
npm run lint
npm run typecheck:frontend
npm test
npm run preview:pages
```

The static preview runs at `http://localhost:5175`. `npm test` builds with the existing GitHub Pages configuration and then checks the exported routes, assets, résumé PDF and core links. To check an already built export, use `npm run test:export`.

`npm run build:pages` writes deployable static files to **`dist/client`**. Publish that directory through the existing GitHub Pages deployment. This redesign does not publish or change the remote site automatically. The canonical site URL is `https://louisa-lin-lxt.github.io/`.

## Edit content and presentation

- `app/content/portfolio.ts`: English and Chinese biography, roles, research contributions, source credits and UI copy.
- `app/HomeClient.tsx`: page structure, navigation, contact form and project details.
- `app/globals.css`: shared typography, layout, responsive breakpoints and motion.
- `app/components/DetailDialog.tsx`: native dialog, focus loop, Escape and focus restoration.
- `app/components/HeroNeuralField.tsx`: original live-site neural background reworked into pixel paths and pointer-triggered signals.
- `app/components/NeuralProgress.tsx`: one fixed pixel neuron that lights with reading progress; desktop nodes navigate sections.
- `app/components/ProjectShelf.tsx`: compact horizontal research/experience cards and manual browsing.
- Project cards contain no decorative neurons, folders or signal controls.
- `app/interactive-portfolio.css`: scoped hero, horizontal shelf and interaction styling.
- `app/interests/InterestsClient.tsx`: interest tabs and deep links; normal scrolling.
- `public/optimized`: resized web images. Original source files remain in `public`.
- `public/Xingtong-Lin-Resume.pdf`: existing résumé, unchanged.

English uses Arial. Chinese requests DengXian / 等线, with PingFang SC and Microsoft YaHei fallbacks; a licensed DengXian web font is not bundled. Research images use `object-fit: contain`. Cards show organization, position and dates; full project descriptions and institutional links live in details.

The contact form retains the existing FormSubmit service. Delivery and recipient activation need an authorized real submission to verify. Contact uses platform-logo links and a WeChat copy control; the personal email and duplicate bottom résumé link are intentionally hidden. Personal photo collections, playlists and travel entries are still awaiting source content.

## Scope of checks

See `docs/visual-redesign.md` for design decisions and `docs/verification.md` for the test record and preview images. The frontend typecheck deliberately excludes the optional Cloudflare worker/database starter. The repository-wide TypeScript command still needs those pre-existing Cloudflare binding declarations.
