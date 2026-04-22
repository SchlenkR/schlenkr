// v8 — AI Foundations
// Scroll reveals + foundations-stack animation.
// Gated on prefers-reduced-motion.

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ------- Scroll reveal (generic) -------
function setupReveals() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  targets.forEach((el) => io.observe(el));
}

// ------- Foundations stacking animation -------
function setupFoundations() {
  const fig = document.querySelector(".foundations-viz");
  if (!fig) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fig.classList.add("slabs-in");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          fig.classList.add("slabs-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.3 }
  );
  io.observe(fig);
}

// ------- Current year in footer -------
function setupYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  setupReveals();
  setupFoundations();
  setupYear();
});
