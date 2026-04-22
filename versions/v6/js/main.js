// v6 — Pragmatic Core
// Minimal JS: gentle fade-in on scroll, gated by prefers-reduced-motion.
// No other interactions, no scroll-hijacking.

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  // Reduced-motion or no IO support: show everything immediately.
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
