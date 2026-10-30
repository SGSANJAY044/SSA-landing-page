import { test, expect } from '@playwright/test';
import { publishedServices } from '../src/data/services.js';

for (const prefix of ['', '/ta']) {
  test(`home renders and intro hands off (${prefix || '/en'})`, async ({ page }) => {
    await page.goto(`${prefix}/`);
    await expect(page.locator('h1')).toBeVisible();
    // Intro overlay removes itself and the header mark becomes visible.
    await expect(page.locator('[data-intro]')).toHaveCount(0, { timeout: 8000 });
    await expect(page.locator('[data-brand-mark]')).toBeVisible();
  });
}

test('intro plays once per session', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-intro]')).toHaveCount(0, { timeout: 8000 });
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/intro-pending/);
});

test('carousel autoplays at reading pace, jumps by dot and filters', async ({ page }) => {
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await carousel.scrollIntoViewIfNeeded();
  const counter = carousel.locator('[data-counter]');
  await expect(counter).toHaveText(/^\d{2} \/ \d{2}$/);

  // Autoplay runs while on screen, with no pause button, and gives each card ~5.5s.
  await expect(carousel).toHaveAttribute('data-playing', 'true');
  await expect(carousel.locator('[data-toggle]')).toHaveCount(0);
  const fill = carousel.locator('.dot[aria-current="true"] .dot__fill');
  // Browsers reorder the animation shorthand, so match duration and name separately.
  await expect(fill).toHaveAttribute('style', /\b5[0-5]\d\d(\.\d+)?ms\b.*svc-timer|svc-timer.*\b5[0-5]\d\d(\.\d+)?ms\b/);

  // One dot per service; tapping the 4th jumps there and it becomes the active pill.
  const dots = carousel.locator('[data-dots] .dot');
  await expect(dots).toHaveCount(publishedServices.length);
  await dots.nth(3).click();
  await expect(counter).toHaveText(/^04 \//);
  await expect(dots.nth(3)).toHaveAttribute('aria-current', 'true');

  await carousel.locator('[data-filter="free"]').click();
  const freeCount = publishedServices.filter((s) => s.free).length;
  await expect(carousel.locator('.embla__slide')).toHaveCount(freeCount);
  await expect(dots).toHaveCount(freeCount);
});

test('online registration checker answers', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-deed="mortgage"]').click();
  await expect(page.locator('[data-result="mortgage"]')).toBeVisible();
  await expect(page.locator('[data-result="resale"]')).toBeHidden();
});

for (const service of publishedServices) {
  test(`service page: ${service.slug}`, async ({ page }) => {
    const res = await page.goto(`/services/${service.slug}/`);
    expect(res.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(service.content.en.title);
  });
}

test('checklist persists and builds the WhatsApp message', async ({ page }) => {
  await page.goto('/services/patta-transfer/');
  const items = page.locator('.checklist .item');
  await items.first().click();
  await expect(page.locator('[data-count]')).toHaveText(/^1 \//);

  const href = await page.locator('[data-send]').getAttribute('href');
  const url = new URL(href);
  expect(url.hostname).toBe('wa.me');
  expect(url.searchParams.get('text')).toContain('Patta transfer');

  await page.reload();
  await expect(page.locator('[data-count]')).toHaveText(/^1 \//);
});

test('lead sheet: names the service, switches, and validates the callback', async ({ page }) => {
  await page.goto('/services/patta-transfer/');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const sheet = page.locator('[data-lead]');
  await expect(sheet).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('[data-lead-title]')).toContainText('Patta transfer');
  const wa = () => page.locator('[data-lead-wa]').getAttribute('href');
  expect(new URL(await wa()).searchParams.get('text')).toContain('Patta transfer');

  await page.locator('[data-lead-switch]').click();
  await page.locator('[data-pick="dtcp-approval"]').click();
  await expect(page.locator('[data-lead-title]')).toContainText('DTCP approval');
  expect(new URL(await wa()).searchParams.get('text')).toContain('DTCP approval');

  await page.locator('[data-lead-callback] summary').click();
  await page.locator('[data-lead-form] input[name="phone"]').fill('12345');
  await page.locator('[data-lead-submit]').click();
  await expect(page.locator('[data-lead-error]')).toBeVisible();

  await page.locator('[data-lead-close]').click();
  await expect(sheet).toBeHidden();
});

test('lead sheet stays away after the visitor has messaged', async ({ page, context }) => {
  // Don't actually open WhatsApp from the test.
  await context.route('https://wa.me/**', (route) => route.abort());
  await page.goto('/services/tslr/');
  await page.locator('.bar__btn--wa').click();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(8000);
  await expect(page.locator('[data-lead]')).toBeHidden();
});

test('bottom bar hides while the hero buttons are visible, appears after', async ({ page, context }) => {
  await context.addInitScript(() => sessionStorage.setItem('ssa-intro-seen', '1'));
  await page.goto('/');
  const bar = page.locator('.bar');
  await expect(bar).toHaveClass(/is-tucked/);
  await page.evaluate(() => document.querySelector('#services').scrollIntoView());
  await expect(bar).not.toHaveClass(/is-tucked/);
  await expect(bar).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).toHaveClass(/is-tucked/);
});

test('language toggle keeps the same page', async ({ page }) => {
  await page.goto('/services/tslr/');
  await page.locator('.header__lang').click();
  await expect(page).toHaveURL(/\/ta\/services\/tslr\/$/);
});
