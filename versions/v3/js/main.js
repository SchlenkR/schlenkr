/* v3 Manifesto — motion gate + reveal on intersection.
   All motion is gated on prefers-reduced-motion: reduce (handled in CSS
   AND here by bailing out of any JS-driven animation). */

const prefersReduced =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  // Reduced motion OR no IntersectionObserver: just show everything.
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

// Update current year in footer
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
