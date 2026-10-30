/** Hero: headline reveal, rotating keyword and layered parallax background. */
import { gsap, reducedMotion, splitReveal } from './motion.js';

export function revealHero(hero) {
  const tl = gsap.timeline();
  const words = splitReveal(hero.querySelectorAll('[data-split]'));
  if (words) tl.add(words);

  const fades = hero.querySelectorAll('[data-hero-fade]');
  gsap.set(fades, { visibility: 'visible' });
  if (!reducedMotion) {
    tl.from(fades, { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' }, words ? '-=0.55' : 0);
  }
  startRotator(hero.querySelector('[data-rotator]'));
  return tl;
}

function startRotator(el) {
  if (!el) return;
  const words = JSON.parse(el.dataset.rotator);
  if (words.length < 2 || reducedMotion) return;
  let i = 0;
  const next = () => {
    i = (i + 1) % words.length;
    gsap
      .timeline()
      .to(el, { yPercent: -60, autoAlpha: 0, duration: 0.3, ease: 'power2.in' })
      .add(() => {
        el.textContent = words[i];
      })
      .fromTo(el, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' });
  };
  setInterval(next, 2400);
}

/** Each [data-speed] layer drifts at its own rate while the hero scrolls away. */
export function initParallax(hero) {
  if (reducedMotion) return;
  hero.querySelectorAll('[data-speed]').forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed);
    gsap.to(layer, {
      y: () => hero.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
  });
}
