/**
 * Document checklist: ticks persist per service in localStorage, and the
 * WhatsApp button carries what the visitor has and still needs — so the first
 * message is already a qualified enquiry.
 */
import { waLink } from './whatsapp.js';
import { recordInterest } from './interest.js';

export function initChecklist(root) {
  const { slug, number, intro, haveLabel, needLabel } = root.dataset;
  const key = `ssa-checklist-${slug}`;
  const boxes = Array.from(root.querySelectorAll('input[type="checkbox"]'));
  const count = root.querySelector('[data-count]');
  const meter = root.querySelector('[data-meter]');
  const send = root.querySelector('[data-send]');

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]');
    } catch {
      return [];
    }
  };
  const save = (ticked) => {
    try {
      localStorage.setItem(key, JSON.stringify(ticked));
    } catch {
      /* storage unavailable — ticks just won't persist */
    }
  };

  const update = () => {
    const have = boxes.filter((b) => b.checked);
    const need = boxes.filter((b) => !b.checked);
    count.textContent = `${have.length} / ${boxes.length}`;
    meter.style.setProperty('--progress', boxes.length ? have.length / boxes.length : 0);

    const label = (b) => `• ${b.value}`;
    const lines = [intro];
    if (have.length) lines.push('', `${haveLabel}:`, ...have.map(label));
    if (need.length) lines.push('', `${needLabel}:`, ...need.map(label));
    send.href = waLink(number, lines.join('\n'));
  };

  const saved = new Set(load());
  boxes.forEach((box, i) => {
    box.checked = saved.has(i);
    box.addEventListener('change', () => {
      save(boxes.flatMap((b, j) => (b.checked ? [j] : [])));
      update();
      recordInterest(slug, 'checklist');
    });
  });
  update();
}
