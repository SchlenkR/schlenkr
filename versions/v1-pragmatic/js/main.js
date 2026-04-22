// v1-pragmatic — Editorial (customer-first sub-variant)
// Minimal enhancement: subtle fade-in on scroll.
// Gated by prefers-reduced-motion.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".hero, .section, .contact, .frame, .shape, .faq__item, .pullquote, .empathy__item"
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
