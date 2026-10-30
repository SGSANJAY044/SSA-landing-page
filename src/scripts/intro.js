/**
 * Brand intro: logo pops in, waves ripple out, then the logo flies into the
 * header slot (FLIP) and the overlay lifts. Plays once per browser session —
 * the inline head script in Base.astro decides that by setting
 * `html.intro-pending` before first paint.
 *
 * Resolves `true` when the intro actually played.
 */
import { gsap } from './motion.js';

const SEEN_KEY = 'ssa-intro-seen';

export function playIntro({ onReveal } = {}) {
  const root = document.documentElement;
  const overlay = document.querySelector('[data-intro]');
  if (!overlay || !root.classList.contains('intro-pending')) {
    overlay?.remove();
    onReveal?.();
    return Promise.resolve(false);
  }

  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage blocked — the intro will simply play again next time */
  }

  const logo = overlay.querySelector('[data-intro-logo]');
  const rings = overlay.querySelectorAll('[data-intro-ring]');
  const word = overlay.querySelector('[data-intro-word]');
  const bg = overlay.querySelector('[data-intro-bg]');
  const skip = overlay.querySelector('[data-intro-skip]');
  const target = document.querySelector('[data-brand-mark]');

  // FLIP deltas are read lazily, when the fly-out tween starts.
  const delta = () => {
    const from = logo.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    return {
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: to.width / from.width,
    };
  };
  let flight;

  return new Promise((resolve) => {
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      onReveal?.();
    };

    const tl = gsap.timeline({
      onComplete: () => {
        reveal();
        overlay.remove();
        root.classList.remove('intro-pending');
        resolve(true);
      },
    });

    tl.from(logo, { scale: 0.5, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.7)' })
      .fromTo(
        rings,
        { scale: 1, autoAlpha: 0.9 },
        { scale: 2.3, autoAlpha: 0, duration: 2, stagger: 0.32, ease: 'sine.out' },
        '<0.15',
      )
      .from(word, { y: 14, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '<0.35')
      .addLabel('fly', '-=0.7')
      .to(word, { autoAlpha: 0, y: -8, duration: 0.25 }, 'fly')
      .to(
        logo,
        {
          x: () => (flight ??= delta()).x,
          y: () => (flight ??= delta()).y,
          scale: () => (flight ??= delta()).scale,
          duration: 0.75,
          ease: 'power3.inOut',
        },
        'fly',
      )
      .to(bg, { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, 'fly+=0.2')
      .add(reveal, 'fly+=0.35');

    const finishNow = () => tl.progress(1);
    skip?.addEventListener('click', finishNow, { once: true });
    overlay.addEventListener('click', finishNow, { once: true });
    window.addEventListener('keydown', (e) => e.key === 'Escape' && finishNow(), { once: true });
  });
}
