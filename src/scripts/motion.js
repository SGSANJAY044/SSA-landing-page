/**
 * Shared motion setup: GSAP plugins, Lenis smooth scroll and scroll reveals.
 * Everything here is a no-op under prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

export function initSmoothScroll() {
  if (reducedMotion || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

/** Smoothly scroll to a page Y position (number) — falls back to native scrolling. */
export function scrollToY(y, { duration = 1.6 } = {}) {
  const top = Math.max(0, Math.round(y));
  if (lenis) lenis.scrollTo(top, { duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
}

/** Smoothly scroll to a selector or element; falls back to native scrolling. */
export function scrollToTarget(target, { duration = 1.6 } = {}) {
  // Lenis reads '#…' strings as ids only, so resolve selectors here.
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    // Clear the sticky header plus a little breathing room.
    const header = document.querySelector('.header')?.offsetHeight ?? 0;
    lenis.scrollTo(el, { duration, offset: -(header + 16), easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

/** Fade-up any [data-reveal] element as it enters the viewport. */
export function initReveals() {
  if (reducedMotion) return;
  const items = gsap.utils.toArray('[data-reveal]');
  if (!items.length) return;
  gsap.set(items, { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }),
  });
}

/** Word-by-word masked reveal for headings. Returns the timeline (or null). */
export function splitReveal(targets, vars = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  gsap.set(els, { visibility: 'visible' });
  if (reducedMotion) return null;
  // Masks get .split-word-mask (extra room for descenders, see global.css);
  // once the reveal is done, unwrap so nothing clips at rest.
  const split = SplitText.create(els, { type: 'words', mask: 'words', wordsClass: 'split-word' });
  return gsap.from(split.words, {
    yPercent: 110,
    duration: 0.9,
    stagger: 0.06,
    ease: 'power4.out',
    ...vars,
    onComplete: () => split.revert(),
  });
}

export { gsap, ScrollTrigger };
