/* v20 — Cursor Diorama
 * Cursor XY parallax + scroll Z dolly.
 * Gated on (min-width: 1024px) and (pointer: fine).
 * Respects prefers-reduced-motion.
 */

import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger/+esm';
import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;

/* ─────────── Nav scroll state ─────────── */
const nav = document.querySelector('.nav');
if (nav) {
  const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

/* ─────────── Hotspot tooltip (always on — no parallax needed) ─────────── */
const hotspot = document.querySelector('.pxl-hotspot');
const tooltip = document.querySelector('.hotspot-tooltip');
if (hotspot && tooltip) {
  let open = false;
  const show = () => {
    tooltip.classList.add('is-visible');
    open = true;
  };
  const hide = () => {
    tooltip.classList.remove('is-visible');
    open = false;
  };
  hotspot.addEventListener('click', (e) => {
    e.stopPropagation();
    open ? hide() : show();
  });
  document.addEventListener('click', (e) => {
    if (open && !tooltip.contains(e.target) && e.target !== hotspot) hide();
  });
}

/* ─────────── FAQ: close others on open ─────────── */
document.querySelectorAll('.faq-item').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('.faq-item').forEach((o) => { if (o !== d) o.open = false; });
    }
  });
});

/* ─────────── Gate: mobile / coarse / reduced-motion → static ─────────── */
if (!isDesktop || prefersReduced) {
  // Static diorama. Nothing else to wire.
} else {
  /* ───── Lenis smooth scroll (desktop only) ───── */
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    smoothTouch: false,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ───── Cursor XY parallax ───── */
  const stage = document.querySelector('.hero-stage');
  const layers = Array.from(document.querySelectorAll('.layer'));
  // depth 0.005 (back) → 0.08 (front). 6 layers.
  const depths = [0.006, 0.018, 0.032, 0.048, 0.068, 0.085];
  // target & current per layer
  const targets = layers.map(() => ({ x: 0, y: 0 }));
  const current = layers.map(() => ({ x: 0, y: 0 }));
  let mouseX = 0, mouseY = 0, centerX = 0, centerY = 0;
  let ticking = false;

  const setCenter = () => {
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    centerX = r.left + r.width / 2;
    centerY = r.top + r.height / 2;
  };
  setCenter();
  window.addEventListener('resize', setCenter, { passive: true });
  window.addEventListener('scroll', setCenter, { passive: true });

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    layers.forEach((_, i) => {
      const d = depths[i] ?? depths[depths.length - 1];
      // Clamp movement to a reasonable range (3–10px typical).
      targets[i].x = dx * d;
      targets[i].y = dy * d;
    });
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  };

  const tick = () => {
    let active = false;
    layers.forEach((layer, i) => {
      const c = current[i];
      const t = targets[i];
      const nx = c.x + (t.x - c.x) * 0.12;
      const ny = c.y + (t.y - c.y) * 0.12;
      c.x = nx; c.y = ny;
      // Parallax-only transform; scroll dolly handler (if any) will append a scale.
      const dollyScale = parseFloat(layer.dataset.dollyScale || '1');
      const dollyOpacity = parseFloat(layer.dataset.dollyOpacity || '1');
      layer.style.transform = `translate3d(${nx.toFixed(2)}px, ${ny.toFixed(2)}px, 0) scale(${dollyScale})`;
      layer.style.opacity = dollyOpacity;
      if (Math.abs(t.x - nx) > 0.05 || Math.abs(t.y - ny) > 0.05) active = true;
    });
    if (active) {
      requestAnimationFrame(tick);
    } else {
      ticking = false;
      // drop will-change hint by clearing transform-inducing layer style — keep translate3d though.
    }
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  /* ───── Scroll Z dolly ───── */
  // Near layers scale up (+3–5%) and fade slightly as hero scrolls past.
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress; // 0 → 1
      document.documentElement.style.setProperty('--scroll-progress', p.toFixed(3));
      layers.forEach((layer, i) => {
        const d = depths[i] ?? 0;
        // Scale: back layers unchanged, front layers grow up to ~1.05.
        const scaleBoost = d * 0.65; // front ~0.055
        const scale = 1 + p * scaleBoost;
        // Opacity: front layers fade a touch
        const fadeStrength = d * 3.2; // front ~0.27
        const opacity = Math.max(0, 1 - p * fadeStrength);
        // Store for the parallax tick to read — ensures combined transform.
        layer.dataset.dollyScale = scale.toFixed(4);
        layer.dataset.dollyOpacity = opacity.toFixed(3);
        // Apply immediately using last known parallax position.
        const c = current[i];
        layer.style.transform =
          `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        layer.style.opacity = opacity.toFixed(3);
      });
    },
  });
}
