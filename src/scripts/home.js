/**
 * Home page choreography:
 *   intro (first visit) → hero reveal → gentle auto-scroll to services,
 *   cancelled the moment the visitor touches, scrolls or presses a key.
 */
import { initSmoothScroll, initReveals, scrollToY, reducedMotion } from './motion.js';
import { playIntro } from './intro.js';
import { revealHero, initParallax } from './hero.js';
import { initCarousel } from './carousel.js';
import { initChecker } from './checker.js';
import { initStepper } from './stepper.js';

const AUTO_SCROLL_DELAY = 1500;

main();

async function main() {
  const lenis = initSmoothScroll();
  lenis?.stop();

  const hero = document.querySelector('[data-hero]');
  let heroTimeline;

  const introPlayed = await playIntro({
    onReveal: () => {
      heroTimeline = revealHero(hero);
    },
  });
  lenis?.start();

  initParallax(hero);
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  document.querySelectorAll('[data-checker]').forEach(initChecker);
  document.querySelectorAll('[data-stepper]').forEach(initStepper);
  initReveals();

  if (introPlayed && !reducedMotion) scheduleAutoScroll(heroTimeline);
}

function scheduleAutoScroll(heroTimeline) {
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  events.forEach((type) => window.addEventListener(type, cancel, { once: true, passive: true }));

  heroTimeline?.then(() => {
    setTimeout(() => {
      events.forEach((type) => window.removeEventListener(type, cancel));
      if (!cancelled && window.scrollY < 40) scrollToY(carouselFocusY());
    }, AUTO_SCROLL_DELAY);
  });
}

/**
 * Scroll position that centres the carousel (filters + card + dots) in the space
 * actually visible between the sticky header and the floating Call/WhatsApp bar.
 * If it is taller than that space, keep the card and dots fully in view instead.
 */
function carouselFocusY() {
  const block = document.querySelector('[data-carousel]');
  const card = block.querySelector('.embla');
  const header = document.querySelector('.header')?.getBoundingClientRect().bottom ?? 0;
  const bar = document.querySelector('.bar')?.getBoundingClientRect().top ?? window.innerHeight;
  const top = header + 8;
  const bottom = bar - 8;
  const space = bottom - top;

  const rect = block.getBoundingClientRect();
  if (rect.height <= space) {
    return window.scrollY + rect.top - (top + (space - rect.height) / 2);
  }
  // Too tall: align the card+dots group to the bottom of the visible space.
  const cardTop = card.getBoundingClientRect().top;
  const groupHeight = rect.bottom - cardTop;
  return groupHeight <= space
    ? window.scrollY + rect.bottom - bottom
    : window.scrollY + cardTop - top;
}
