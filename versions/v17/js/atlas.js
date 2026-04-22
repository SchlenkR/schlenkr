// v17 — Type Atlas · scroll & morph engine
// Self-contained module. CDN-only. Respects prefers-reduced-motion.

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger/+esm";
import DrawSVGPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/DrawSVGPlugin/+esm";
import MorphSVGPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/MorphSVGPlugin/+esm";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

// ---- Motif shapes (simple abstract "nodes") ----
// Six stations + hero = seven motifs. Each is a closed path.
const MOTIF_PATHS = [
  // Station 0 — hero — simple node (circle)
  "M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z",
  // Station 1 — cracked node (diamond)
  "M50,8 L92,50 L50,92 L8,50 Z",
  // Station 2 — branching node (triangle up)
  "M50,10 L92,86 L8,86 Z",
  // Station 3 — convergent (hex)
  "M28,14 L72,14 L92,50 L72,86 L28,86 L8,50 Z",
  // Station 4 — inversion (square)
  "M12,12 L88,12 L88,88 L12,88 Z",
  // Station 5 — aligned (chevron)
  "M10,30 L50,10 L90,30 L90,70 L50,90 L10,70 Z",
  // Station 6 — closure (star-ish)
  "M50,8 L62,38 L92,42 L68,62 L76,90 L50,74 L24,90 L32,62 L8,42 L38,38 Z",
];

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;

/* ---------- Lenis smoothing (desktop only, no reduced-motion) ---------- */
let lenis = null;
if (!reduce && !coarse) {
  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false,
  });
  document.documentElement.classList.add("lenis-smoothing");
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Helpers ---------- */
function setInitialStrokeState(svg) {
  const texts = svg.querySelectorAll("text");
  texts.forEach((t) => {
    // Make the text visible as an outline even before draw
    t.setAttribute("stroke-linejoin", "round");
    t.setAttribute("stroke-linecap", "round");
  });
}

/* ---------- Station animation ---------- */
function animateStation(station, index) {
  const svg = station.querySelector("svg.type-headline");
  if (!svg) return;
  setInitialStrokeState(svg);
  const texts = svg.querySelectorAll("text");
  if (!texts.length) return;

  if (reduce) {
    // Render fully drawn immediately
    texts.forEach((t) => gsap.set(t, { drawSVG: "0% 100%" }));
    return;
  }

  if (coarse) {
    // Mobile: one-shot when in view
    gsap.set(texts, { drawSVG: 0 });
    ScrollTrigger.create({
      trigger: station,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(texts, {
          drawSVG: "0% 100%",
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.15,
        });
      },
    });
    return;
  }

  // Desktop: scrub across the section
  gsap.set(texts, { drawSVG: 0 });
  gsap.to(texts, {
    drawSVG: "0% 100%",
    ease: "none",
    stagger: 0.08,
    scrollTrigger: {
      trigger: station,
      start: "top 80%",
      end: "bottom 40%",
      scrub: 0.6,
    },
  });
}

/* ---------- Motif morph ---------- */
function setupMotifMorph(stations) {
  const motifPath = document.querySelector("#motif-shape");
  const progressEl = document.querySelector(".motif-progress .count");
  if (!motifPath) return;

  // Baseline: hero shape
  motifPath.setAttribute("d", MOTIF_PATHS[0]);
  if (progressEl) progressEl.textContent = `00 / 0${stations.length - 1}`;

  stations.forEach((station, i) => {
    ScrollTrigger.create({
      trigger: station,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => enterStation(i),
      onEnterBack: () => enterStation(i),
    });
  });

  function enterStation(i) {
    const targetD = MOTIF_PATHS[i] || MOTIF_PATHS[0];
    if (progressEl) {
      const idx = String(i).padStart(2, "0");
      const total = String(stations.length - 1).padStart(2, "0");
      progressEl.textContent = `${idx} / ${total}`;
    }
    if (reduce) {
      motifPath.setAttribute("d", targetD);
      return;
    }
    gsap.to(motifPath, {
      duration: 0.8,
      ease: "power2.inOut",
      morphSVG: targetD,
    });
  }
}

/* ---------- Masthead fade-on-scroll ---------- */
function setupMasthead() {
  const mh = document.querySelector(".masthead");
  if (!mh) return;
  ScrollTrigger.create({
    start: 20,
    end: 99999,
    onUpdate: (self) => {
      mh.style.boxShadow = self.scroll() > 8 ? "0 1px 0 rgba(20,20,20,0.08)" : "none";
    },
  });
}

/* ---------- Boot ---------- */
function boot() {
  const stations = Array.from(document.querySelectorAll(".station"));
  stations.forEach((s, i) => animateStation(s, i));
  setupMotifMorph(stations);
  setupMasthead();
  ScrollTrigger.refresh();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
