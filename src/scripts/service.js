/** Service page: animated stepper, persistent checklist, scroll reveals. The title arrives via view transition. */
import { initSmoothScroll, initReveals } from './motion.js';
import { initStepper } from './stepper.js';
import { initChecklist } from './checklist.js';

initSmoothScroll();
document.querySelectorAll('[data-stepper]').forEach(initStepper);
document.querySelectorAll('[data-checklist]').forEach(initChecklist);
initReveals();
