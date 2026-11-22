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

`npm run build:pages` writes deployable static files to **`dist/client`**. GitHub Pages serves the tracked root export on `main`, so an authorized release must sync that output to the repository root before committing and pushing. Replace generated `_next` assets only; preserve source files and omit `.DS_Store`, `.vite`, `.assetsignore` and `_headers`. Building alone does not publish. The canonical site URL is `https://louisa-lin-lxt.github.io/`.

## Edit content and presentation

- `app/content/portfolio.ts`: bilingual biography, education, research and experience.
- `app/HomeClient.tsx`: page structure, navigation and story dialogs.
- `app/styles/visual-refinement.css`: current design tokens, self-hosted fonts and responsive composition.
- `app/styles/story-details.css`: story dialog presentation.
- `app/components/ContactForm.tsx`: in-page submission, timeout and response states.
- `app/components/VisitorCounter.tsx`: shared visit total from November 22, 2026; localhost only reads it. `npm run test:counter` checks counting and preview behavior without changing the live total.
- `app/components/HeroNeuralField.tsx`: bounded, pointer-triggered pixel signals.
- `app/components/NeuralProgress.tsx`: right-side reading progress and section links.
- `app/components/ProjectShelf.tsx`: research previews and compact work cards.
- `app/interests/InterestsClient.tsx`: swipe and keyboard navigation with particle transitions.
- `public/fonts`: Work Sans and IBM Plex Mono WOFF2 assets and OFL licenses.
- `public/optimized`: web images; original assets remain available.

English uses Work Sans. Chinese uses native sans-serif fallbacks. Research imagery stays contain-fit and all full descriptions remain available in dialogs. Beyond Academics retains Music, Taotao and Travel as pixel scenes without visible topic tabs.

The contact form submits in-page through Formspree to the owner's verified mailbox. Its public endpoint and delivery-verification flag are in `app/components/contactDelivery.ts`. A real test was accepted, recorded in the Formspree inbox, and confirmed received in the CMU inbox on November 22, 2026. See `docs/contact-delivery.md` for the verification record and reply workflow.

Visitor counting starts when the new component is deployed. There is no historical baseline to recover. The local preview shows a read-only total.

## Scope of checks

See `docs/visual-redesign.md` for design decisions and `docs/verification.md` for the test record and preview images. The frontend typecheck deliberately excludes the optional Cloudflare worker/database starter. The repository-wide TypeScript command still needs those pre-existing Cloudflare binding declarations.
