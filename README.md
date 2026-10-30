# SSA-landing-page
SRI SWARNABAIRAVA ASSOCIATES — mobile-first property documentation site (Astro + vanilla JS).

## Run
```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm test           # Playwright smoke tests (builds + previews automatically)
npm run lint
```

## Where things live
- `src/data/services.js` — all service copy (EN + TA), fees, timelines. `draft: true` hides a service.
- `src/data/site.js` — phones, WhatsApp number, email, address.
- `src/data/onlineReg.js` — "can it be registered online?" checker rules (TN, Oct 2026).
- `src/i18n/ui.js` — UI strings in both languages.
- `src/components/illustrations/` — one SVG scene per service slug.
- `public/logo.svg` — placeholder mark; replace with the client logo (same file name).

## Before launch — TODO(client)
Search the code for `TODO(client)`: logo, address/hours/map, WhatsApp number, fees and
timelines, production domain (`astro.config.mjs`, `public/robots.txt`), poster items #6 and #13,
and a native-speaker review of the Tamil copy.

## Deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds with the repo's Pages URL
(`SITE`/`BASE` env vars) and publishes `dist/`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
Local builds keep `base: '/'`; to reproduce the Pages build: `SITE=https://<user>.github.io BASE=/<repo> npm run build`.
