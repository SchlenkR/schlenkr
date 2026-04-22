// v14 — The Making
// Scroll stack: GSAP 3.15 + ScrollTrigger, Lenis 1.3.23 (conditional).

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger.js/+esm";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

// --------- Lenis smooth scroll (conditional) ---------
if (!prefersReducedMotion && !coarsePointer) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// --------- Section reveals ---------
if (!prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

// --------- Parallax on milestone shots ---------
if (!prefersReducedMotion) {
  document.querySelectorAll(".milestone .shot img").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".milestone"),
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      }
    );
  });
}

// --------- Pinned milestone chapter (scrubs through 3 states) ---------
if (!prefersReducedMotion) {
  const pin = document.querySelector(".chapter-pin");
  if (pin) {
    const states = pin.querySelectorAll(".chapter-state");
    const counter = pin.querySelector(".chapter-counter");
    const fill = pin.querySelector(".chapter-progress-fill");
    const total = states.length;

    ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (fill) fill.style.width = `${(p * 100).toFixed(2)}%`;
        const idx = Math.min(total - 1, Math.floor(p * total));
        states.forEach((s, i) => {
          if (i === idx) s.setAttribute("data-active", "");
          else s.removeAttribute("data-active");
        });
        if (counter) counter.textContent = `Chapter ${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      },
    });
  }
}

// --------- Refresh on load complete ---------
window.addEventListener("load", () => ScrollTrigger.refresh());
