/** "Can it be registered online?" — tap a deed type, reveal its pre-rendered answer. */
import { gsap, reducedMotion } from './motion.js';
import { recordInterest } from './interest.js';

export function initChecker(root) {
  const options = root.querySelectorAll('[data-deed]');
  const results = root.querySelectorAll('[data-result]');
  const empty = root.querySelector('[data-result-empty]');

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const id = option.dataset.deed;
      options.forEach((o) => o.setAttribute('aria-pressed', String(o === option)));
      empty.hidden = true;
      results.forEach((r) => {
        r.hidden = r.dataset.result !== id;
      });
      recordInterest(option.dataset.service, 'checker', id);
      const shown = root.querySelector(`[data-result="${id}"]`);
      if (!reducedMotion) {
        gsap.from(shown, { y: 14, autoAlpha: 0, duration: 0.45, ease: 'power3.out' });
      }
    });
  });
}
