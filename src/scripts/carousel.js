/**
 * Services carousel: Embla + Autoplay, category filters, an active-slide
 * highlight and expanding-dot pagination whose active pill fills while
 * autoplay counts down.
 *
 * No pause button by design: the delay is long enough to read a card, a swipe
 * restarts the full countdown, hover/focus hold it, it only runs while on
 * screen, and it never runs for prefers-reduced-motion.
 */
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { reducedMotion } from './motion.js';

// Time per card: title + one-line benefit (~15–20 words) at a relaxed reading pace.
const DELAY = 5500;

export function initCarousel(root) {
  const viewport = root.querySelector('[data-embla-viewport]');
  const container = root.querySelector('[data-embla-container]');
  const allSlides = Array.from(container.children);
  const counter = root.querySelector('[data-counter]');
  const dotsEl = root.querySelector('[data-dots]');

  let onScreen = false;

  const autoplay = Autoplay({
    delay: DELAY,
    playOnInit: false,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });
  const embla = EmblaCarousel(viewport, { loop: true, align: 'center' }, [autoplay]);
  root.classList.add('is-ready');

  const pad = (n) => String(n).padStart(2, '0');

  // One dot per slide; rebuilt whenever a filter changes the slide count.
  const buildDots = () => {
    const titles = embla.slideNodes().map((s) => s.querySelector('.card__title')?.textContent.trim() ?? '');
    dotsEl.replaceChildren(
      ...titles.map((title, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `${dotsEl.dataset.dotLabel} ${i + 1}: ${title}`);
        dot.innerHTML = '<span class="dot__pip"><span class="dot__fill"></span></span>';
        dot.addEventListener('click', () => embla.scrollTo(i));
        return dot;
      }),
    );
  };

  // By index, not aria-current: autoplay's own 'select' handler (which fires timerset)
  // runs before ours, so the attribute may not be updated yet.
  const activeFill = () => dotsEl.children[embla.selectedScrollSnap()]?.querySelector('.dot__fill');

  const syncActive = () => {
    const index = embla.selectedScrollSnap();
    const slides = embla.slideNodes();
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
    });
    dotsEl.querySelectorAll('.dot').forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === index));
      if (i !== index) dot.querySelector('.dot__fill').style.animation = 'none';
    });
    counter.textContent = `${pad(index + 1)} / ${pad(slides.length)}`;
  };

  const resume = () => {
    if (!reducedMotion && onScreen) autoplay.play();
  };

  const restartTimer = () => {
    const fill = activeFill();
    if (!fill) return;
    fill.style.animation = 'none';
    void fill.offsetWidth; // restart the CSS animation
    fill.style.animation = `svc-timer ${autoplay.timeUntilNext() ?? DELAY}ms linear forwards`;
  };

  buildDots();
  embla
    .on('select', syncActive)
    .on('reInit', () => {
      buildDots();
      syncActive();
    })
    .on('autoplay:timerset', restartTimer)
    .on('autoplay:timerstopped', () => {
      const fill = activeFill();
      if (fill) fill.style.animation = 'none';
    })
    .on('autoplay:play', () => {
      root.dataset.playing = 'true';
    })
    .on('autoplay:stop', () => {
      root.dataset.playing = 'false';
    });
  syncActive();

  root.querySelector('[data-prev]').addEventListener('click', () => embla.scrollPrev());
  root.querySelector('[data-next]').addEventListener('click', () => embla.scrollNext());
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') embla.scrollPrev();
    if (e.key === 'ArrowRight') embla.scrollNext();
  });

  root.dataset.playing = 'false';

  root.querySelectorAll('[data-filter]').forEach((chip, _, chips) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      const filter = chip.dataset.filter;
      const match = allSlides.filter(
        (s) => filter === 'all' || (filter === 'free' ? s.dataset.free === 'true' : s.dataset.group === filter),
      );
      container.replaceChildren(...match);
      // reInit re-creates plugins, so autoplay comes back stopped.
      embla.reInit();
      embla.scrollTo(0, true);
      resume();
    });
  });

  new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) resume();
      else autoplay.stop();
    },
    { threshold: 0.35 },
  ).observe(root);

  return embla;
}
