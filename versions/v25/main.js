/*
 * v25 — Field Notes · minimal progressive enhancement.
 *
 * Motion policy: none beyond section fade-in. Respects
 * prefers-reduced-motion. IntersectionObserver-driven; no layout shift.
 */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Bail out cleanly — the CSS fallback keeps everything readable.
  if (reduce || !("IntersectionObserver" in window)) {
    return;
  }

  // Sections that get a gentle fade-in.
  var selectors = [
    ".hero",
    ".disclosure",
    ".entry",
    ".howwework",
    ".proof",
    ".curiosity",
    ".faq",
    ".about",
    ".cta-repeat"
  ];

  var nodes = document.querySelectorAll(selectors.join(","));
  nodes.forEach(function (el) { el.classList.add("will-fade"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  nodes.forEach(function (el) { io.observe(el); });
})();
