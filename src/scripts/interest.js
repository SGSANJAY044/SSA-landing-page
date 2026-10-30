/**
 * Session-scoped record of what the visitor engages with, so the lead sheet and
 * WhatsApp links can name the service they actually care about.
 * Stored in sessionStorage — nothing leaves the device until the visitor acts.
 */
const KEY = 'ssa-interest';

const empty = () => ({ last: null, signals: {}, shown: [], lastShownAt: 0, converted: false });

function read() {
  try {
    return { ...empty(), ...JSON.parse(sessionStorage.getItem(KEY) ?? '{}') };
  } catch {
    return empty();
  }
}

function write(state) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage blocked — interest just won't carry across pages */
  }
}

/** Note engagement with a service. `source`: view | card | checker | checklist | pick. */
export function recordInterest(slug, source, detail) {
  if (!slug) return;
  const state = read();
  const signal = state.signals[slug] ?? { count: 0 };
  state.signals[slug] = { count: signal.count + 1, source, detail: detail ?? signal.detail, at: Date.now() };
  state.last = slug;
  write(state);
  track('ssa_interest', { service: slug, source });
  document.dispatchEvent(new CustomEvent('ssa:interest', { detail: { slug, source } }));
}

/** Most recent service the visitor engaged with, or null. */
export function currentInterest() {
  const state = read();
  return state.last ? { slug: state.last, ...state.signals[state.last] } : null;
}

export function interestTrail() {
  return Object.entries(read().signals)
    .sort(([, a], [, b]) => a.at - b.at)
    .map(([slug, s]) => `${slug}×${s.count}`);
}

export function markShown(slug) {
  const state = read();
  state.shown.push(slug ?? 'generic');
  state.lastShownAt = Date.now();
  write(state);
}

export function promptState() {
  const { shown, lastShownAt, converted } = read();
  return { shown, lastShownAt, converted };
}

/** The visitor tapped Call/WhatsApp or sent a callback — stop prompting. */
export function markConverted(channel, slug) {
  const state = read();
  state.converted = true;
  write(state);
  track('ssa_lead', { channel, service: slug ?? state.last ?? 'none' });
}

/** Push to a GA4/GTM dataLayer if one is installed; harmless otherwise. */
export function track(event, data = {}) {
  window.dataLayer?.push({ event, ...data });
}
