/**
 * Vertical stepper: the connecting line draws as you scroll and each step
 * lights up when the line reaches it. Used by "How it works" and service pages.
 */
import { gsap, ScrollTrigger, reducedMotion } from './motion.js';

export function initStepper(list) {
  const line = list.querySelector('[data-stepper-line]');
  const steps = list.querySelectorAll('[data-step]');
  if (reducedMotion) {
    steps.forEach((s) => s.classList.add('is-done'));
    return;
  }

  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
    },
  );

  steps.forEach((step) => {
    gsap.from(step.querySelector('[data-step-body]'), {
      x: 24,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: step, start: 'top 82%', once: true },
    });
    ScrollTrigger.create({
      trigger: step,
      start: 'top 62%',
      onEnter: () => step.classList.add('is-done'),
      onLeaveBack: () => step.classList.remove('is-done'),
    });
  });
}
