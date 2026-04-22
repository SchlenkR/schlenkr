// v1 — Editorial
// Minimal enhancement: subtle fade-in on scroll for .section elements.
// Gated by prefers-reduced-motion. If not allowed, we do nothing.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".hero, .section, .contact, .service, .project, .thesis"
  );

  targets.forEach((el) => el.classList.add("fade-in"));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );

  targets.forEach((el) => io.observe(el));
}
