import { asset } from '../i18n/ui.js';

// Generated so the sitemap URL follows the deploy's site and base.
export function GET({ site }) {
  const sitemap = new URL(asset('/sitemap-index.xml'), site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
