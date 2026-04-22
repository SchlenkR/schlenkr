// v10 — minimal scroll-triggered type reveal.
// Gated behind prefers-reduced-motion and IntersectionObserver support.

const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

if (!reduce && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-reveal");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  for (const el of document.querySelectorAll(".reveal")) {
    io.observe(el);
  }
}

// Nice-to-have: when a question is opened, keep its heading visible.
// Native <details> already handles keyboard + a11y; we only smooth the scroll.
for (const qa of document.querySelectorAll("details.qa")) {
  qa.addEventListener("toggle", () => {
    if (qa.open && !reduce) {
      const rect = qa.getBoundingClientRect();
      if (rect.top < 0) {
        qa.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}
