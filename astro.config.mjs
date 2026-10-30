// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(client): replace with the production domain once it is decided.
// The GitHub Pages workflow overrides both: SITE=https://<user>.github.io, BASE=/<repo>.
const SITE = process.env.SITE || 'https://sriswarnabairava.in';
const BASE = process.env.BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ta'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', ta: 'ta-IN' } },
    }),
  ],
  // Service cards opt in with data-astro-prefetch; on touch devices "hover" fires on touchstart.
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // Dev only: let the dev server answer through an ngrok tunnel for on-device testing.
  vite: { server: { allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app'] } },
});
