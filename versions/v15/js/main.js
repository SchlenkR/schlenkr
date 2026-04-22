// v15 — Horizontal Tour
// GSAP ScrollTrigger pinned horizontal section + Lenis smooth scroll.
// Mobile (coarse pointer) and reduced-motion fallbacks disable the
// pin and Lenis; layout CSS handles the alternative presentation.

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger.js/+esm";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm";

gsap.registerPlugin(ScrollTrigger);

const coarsePointer = window.matchMedia("(pointer: coarse)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const narrowWidth = window.matchMedia("(max-width: 820px)");

const shouldAnimate = !reduceMotion.matches && !coarsePointer.matches && !narrowWidth.matches;

// -------- Masthead "stuck" border --------
const masthead = document.querySelector(".masthead");
if (masthead) {
  const onScroll = () => {
    masthead.classList.toggle("is-stuck", window.scrollY > 4);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// -------- Lenis smooth scroll (only on fine-pointer, motion-OK) --------
let lenis = null;
if (shouldAnimate) {
  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
  });

  // Drive Lenis from GSAP's ticker so ScrollTrigger stays in sync.
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Make sure PageDown / spacebar / arrows still work — Lenis allows
  // native keyboard scrolling by default; we just need to make sure we
  // don't preventDefault anywhere.
}

// -------- Horizontal pinned tour --------
const tour = document.querySelector(".tour");
const pin = tour?.querySelector(".tour__pin");
const track = tour?.querySelector(".tour__track");
const slides = tour ? Array.from(tour.querySelectorAll(".slide")) : [];
const dots = tour ? Array.from(tour.querySelectorAll(".tour__dot")) : [];
const counter = tour?.querySelector(".tour__count");

function setActiveSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
  dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  if (counter) counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

if (tour && slides.length) {
  // Initial dot/counter
  setActiveSlide(0);
}

if (shouldAnimate && track && slides.length > 1) {
  const slideCount = slides.length;
  const distance = () => (slideCount - 1) * window.innerWidth;

  const horizontalTween = gsap.to(track, {
    x: () => `-${distance()}px`,
    ease: "none",
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => `+=${distance() + window.innerHeight * 0.5}`, // total scroll ~ (n-1) * vw + buffer (~4× viewport for 5 slides)
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress to active slide index
        const raw = progress * (slideCount - 1);
        const i = Math.min(slideCount - 1, Math.round(raw));
        setActiveSlide(i);
      },
    },
  });

  // Re-compute distance on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
} else if (slides.length) {
  // Mobile / reduced-motion: activate slides as they enter the viewport.
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = slides.indexOf(entry.target);
              if (idx >= 0) setActiveSlide(idx);
            }
          });
        },
        { threshold: 0.5 }
      )
    : null;
  if (io) slides.forEach((s) => io.observe(s));
  else slides.forEach((s) => s.classList.add("is-active"));
}

// -------- Respect motion changes mid-session --------
reduceMotion.addEventListener?.("change", () => {
  // Simplest reliable path: reload so GSAP / Lenis state is rebuilt.
  window.location.reload();
});
