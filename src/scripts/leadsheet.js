/**
 * Lead sheet: asks "Looking for {service}?" once the visitor shows real intent,
 * with WhatsApp pre-filled for that service, Call, a callback form, and a
 * "Not this — something else" picker.
 *
 * Politeness rules: never during the intro, never twice for the same service,
 * at most MAX_PROMPTS per session with GAP_MS between them, and never again once
 * the visitor has called, messaged or asked for a callback.
 */
import { getLenis } from './motion.js';
import { waLink } from './whatsapp.js';
import {
  recordInterest,
  currentInterest,
  interestTrail,
  markShown,
  markConverted,
  promptState,
  track,
} from './interest.js';

const MAX_PROMPTS = 2;
const GAP_MS = 60_000;
const CONTACT_KEY = 'ssa-contact';

export function initLeadSheet() {
  const dialog = document.querySelector('[data-lead]');
  if (!dialog) return;

  const { number, endpoint } = dialog.dataset;
  const services = JSON.parse(dialog.dataset.services);
  const s = JSON.parse(dialog.dataset.strings);
  const titleOf = (slug) => services.find((x) => x.slug === slug)?.title ?? null;
  const fill = (template, vars) => template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

  const views = {
    service: dialog.querySelector('[data-view="service"]'),
    pick: dialog.querySelector('[data-view="pick"]'),
  };
  const title = dialog.querySelector('[data-lead-title]');
  const waBtn = dialog.querySelector('[data-lead-wa]');
  const backBtn = dialog.querySelector('[data-lead-back]');
  const form = dialog.querySelector('[data-lead-form]');
  const error = dialog.querySelector('[data-lead-error]');
  const thanks = dialog.querySelector('[data-lead-thanks]');
  const submit = dialog.querySelector('[data-lead-submit]');
  // form.name would be the <form>'s own name attribute, so go through .elements
  const fields = { name: form.elements.namedItem('name'), phone: form.elements.namedItem('phone') };

  let activeSlug = null;

  const messageFor = (slug) => (slug ? fill(s.msg, { service: titleOf(slug) }) : s.msgGeneric);

  // ---- views ---------------------------------------------------------------

  function showService(slug) {
    activeSlug = slug;
    title.textContent = slug ? fill(s.title, { service: titleOf(slug) }) : s.titlePick;
    waBtn.href = waLink(number, messageFor(slug));
    views.service.hidden = false;
    views.pick.hidden = true;
    dialog.setAttribute('aria-labelledby', 'lead-title');
  }

  function showPick() {
    dialog.querySelectorAll('[data-pick]').forEach((chip) => {
      chip.setAttribute('aria-current', String(chip.dataset.pick === activeSlug && !!activeSlug));
    });
    backBtn.hidden = !activeSlug;
    views.service.hidden = true;
    views.pick.hidden = false;
    dialog.setAttribute('aria-labelledby', 'lead-pick-title');
  }

  function open(slug, reason) {
    if (slug) showService(slug);
    else {
      activeSlug = null;
      showService(null);
      showPick();
    }
    prefillContact();
    dialog.showModal();
    getLenis()?.stop();
    markShown(slug);
    track('ssa_prompt', { service: slug ?? 'generic', reason });
  }

  function close() {
    dialog.close();
  }

  dialog.addEventListener('close', () => getLenis()?.start());
  dialog.querySelector('[data-lead-close]').addEventListener('click', close);
  // Tap on the backdrop (the dialog box itself, outside the inner panel) closes it.
  dialog.addEventListener('click', (e) => e.target === dialog && close());
  dialog.querySelector('[data-lead-switch]').addEventListener('click', showPick);
  backBtn.addEventListener('click', () => showService(activeSlug));

  dialog.querySelectorAll('[data-pick]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const slug = chip.dataset.pick || null;
      if (slug) recordInterest(slug, 'pick');
      track('ssa_pick', { service: slug ?? 'other' });
      showService(slug);
    });
  });

  enableDragToClose(dialog, close);

  // ---- callback form ---------------------------------------------------------

  function prefillContact() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONTACT_KEY) ?? 'null');
      if (saved) {
        fields.name.value ||= saved.name ?? '';
        fields.phone.value ||= saved.phone ?? '';
      }
    } catch {
      /* nothing saved */
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = fields.name.value.trim();
    const phone = normalisePhone(fields.phone.value);
    if (!phone) {
      error.textContent = s.phoneError;
      error.hidden = false;
      fields.phone.focus();
      return;
    }
    error.hidden = true;

    const service = titleOf(activeSlug) ?? s.serviceOther;
    const lead = {
      name,
      phone,
      service,
      serviceSlug: activeSlug,
      trail: interestTrail().join(' → '),
      page: location.pathname,
      locale: document.documentElement.lang,
      source: new URLSearchParams(location.search).get('utm_source') ?? (document.referrer || 'direct'),
      at: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONTACT_KEY, JSON.stringify({ name, phone }));
    } catch {
      /* fine — just no prefill next time */
    }

    submit.disabled = true;
    submit.textContent = s.sending;
    const sent = endpoint ? await postLead(endpoint, lead) : false;
    if (!sent) {
      // No endpoint configured (or it failed): hand the lead over on WhatsApp instead.
      window.open(waLink(number, fill(s.msgCallback, { name: name || '-', phone, service })), '_blank', 'noopener');
    }
    markConverted('callback', activeSlug);

    form.hidden = true;
    thanks.textContent = fill(s.thanks, { name: name ? `, ${name}` : '', phone });
    thanks.hidden = false;
    submit.disabled = false;
    submit.textContent = s.submit;
  });

  // ---- conversions anywhere on the page ---------------------------------------

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href.startsWith('tel:')) markConverted('call', activeSlug ?? currentInterest()?.slug);
    else if (href.includes('wa.me/')) markConverted('whatsapp', activeSlug ?? currentInterest()?.slug);
    else {
      const card = link.closest('.card');
      const slug = card && href.match(/\/services\/([^/]+)\//)?.[1];
      if (slug) recordInterest(slug, 'card');
    }
    if (dialog.open && (href.startsWith('tel:') || href.includes('wa.me/'))) setTimeout(close, 400);
  });

  // ---- keep page-level WhatsApp links in step with interest -------------------

  const syncLinks = () => {
    const interest = currentInterest();
    if (!interest) return;
    document.querySelectorAll('[data-wa-dynamic]').forEach((a) => {
      a.href = waLink(number, messageFor(interest.slug));
    });
  };
  syncLinks();
  document.addEventListener('ssa:interest', syncLinks);

  // ---- triggers ----------------------------------------------------------------

  const canPrompt = (slug) => {
    const state = promptState();
    return (
      !state.converted &&
      state.shown.length < MAX_PROMPTS &&
      Date.now() - state.lastShownAt > GAP_MS &&
      !state.shown.includes(slug ?? 'generic') &&
      !document.documentElement.classList.contains('intro-pending') &&
      !dialog.open &&
      !document.activeElement?.matches('input, textarea, select')
    );
  };
  const tryOpen = (slug, reason) => {
    if (canPrompt(slug)) open(slug, reason);
  };

  const { page, service } = document.body.dataset;

  if (page === 'service' && service) {
    recordInterest(service, 'view');
    watchEngagement(({ seconds, depth }) => {
      // Read most of the page, or lingered while reading — either signals intent.
      if (seconds >= 6 && (depth >= 0.75 || (seconds >= 15 && depth >= 0.3))) {
        tryOpen(service, depth >= 0.75 ? 'read' : 'dwell');
        return true;
      }
      return false;
    });
  }

  if (page === 'home') {
    const returning = currentInterest();
    document.addEventListener('ssa:interest', (e) => {
      if (e.detail.source === 'checker') setTimeout(() => tryOpen(e.detail.slug, 'checker'), 5000);
    });
    watchEngagement(({ seconds }) => {
      if (returning && seconds >= 8) {
        // Came back from a service page — ask about that service.
        tryOpen(returning.slug, 'return');
        return true;
      }
      if (!returning && seconds >= 35 && window.scrollY > window.innerHeight * 0.6) {
        tryOpen(currentInterest()?.slug ?? null, 'idle');
        return true;
      }
      return false;
    });
  }
}

/** Calls `check({ seconds, depth })` every second until it returns true. */
function watchEngagement(check) {
  const start = Date.now();
  let maxDepth = 0;
  const depth = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    maxDepth = Math.max(maxDepth, scrollable > 0 ? window.scrollY / scrollable : 1);
    return maxDepth;
  };
  window.addEventListener('scroll', depth, { passive: true });
  const timer = setInterval(() => {
    if (document.hidden) return;
    if (check({ seconds: (Date.now() - start) / 1000, depth: depth() })) {
      clearInterval(timer);
      window.removeEventListener('scroll', depth);
    }
  }, 1000);
}

/** Indian mobile: accept spaces, dashes, +91 or a leading 0. Returns 10 digits or null. */
function normalisePhone(raw) {
  const digits = raw.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

async function postLead(endpoint, lead) {
  try {
    // text/plain keeps this a "simple" request — no CORS preflight (Apps Script friendly).
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead),
    });
    return res.ok || res.type === 'opaque';
  } catch {
    return false;
  }
}

/** Pull the sheet down by its handle to dismiss (mobile). */
function enableDragToClose(dialog, close) {
  const handle = dialog.querySelector('[data-lead-drag]');
  let startY = null;
  handle.addEventListener('pointerdown', (e) => {
    startY = e.clientY;
    handle.setPointerCapture(e.pointerId);
    dialog.style.transition = 'none';
  });
  handle.addEventListener('pointermove', (e) => {
    if (startY === null) return;
    dialog.style.translate = `0 ${Math.max(0, e.clientY - startY)}px`;
  });
  const end = (e) => {
    if (startY === null) return;
    const dy = e.clientY - startY;
    startY = null;
    dialog.style.transition = '';
    dialog.style.translate = '';
    if (dy > 90) close();
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
}
