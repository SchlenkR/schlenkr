// v9 — In-House Muscle. Respectful motion, reduced-motion gated.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  // Reduced motion or no IO — show immediately.
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Year in footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
