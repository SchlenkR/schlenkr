// =============================================================================
// v18 — "Scrub Video" (Pure-type scrub variant)
//
// Approach chosen: Option C, driven via a CSS custom property --p (0..1).
// No real <video>, no canvas. The hero is a stack of serif phrases whose
// opacity & translate are derived from --p in CSS. This file's job is:
//
//   1. Load GSAP + ScrollTrigger from a CDN.
//   2. Pin .hero-pin for the duration of the hero section and scrub --p
//      on the parent .scrub-stage as scroll progress advances.
//   3. Load Lenis for inertial smooth scroll on desktop with a fine pointer.
//   4. Respect prefers-reduced-motion (bail out entirely, do nothing).
//   5. Stop scrubbing when the hero leaves the viewport (IntersectionObserver).
//
// No build tools needed — this file is loaded as <script type="module">.
// =============================================================================

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE_POINTER = matchMedia("(pointer: coarse)").matches;
const NARROW_VIEWPORT = matchMedia("(max-width: 760px)").matches;

const USE_SCRUB = !REDUCED_MOTION && !COARSE_POINTER && !NARROW_VIEWPORT;

const GSAP_URL = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/index.js";
const ST_URL = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger.js";
const LENIS_URL = "https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm";

// -----------------------------------------------------------------------------
// Small helpers
// -----------------------------------------------------------------------------

const qs = (sel, root = document) => root.querySelector(sel);

function setProgress(p) {
  const clamped = Math.max(0, Math.min(1, p));
  const stage = qs(".scrub-stage");
  if (stage) stage.style.setProperty("--p", clamped.toFixed(4));
  const fill = qs("#scrubFill");
  // fill is driven by --p through CSS, nothing needed here — but keep the
  // setter future-proof if we wire a JS-driven progress bar later.
  if (fill && !stage) fill.style.setProperty("--p", clamped.toFixed(4));
}

// Freeze at the first meaningful frame whenever the scrub is disabled.
function freezeAtFirstFrame() {
  setProgress(0);
}

// -----------------------------------------------------------------------------
// Boot
// -----------------------------------------------------------------------------

async function boot() {
  // Initial state — in all modes, the deck starts at phrase 0.
  freezeAtFirstFrame();

  if (!USE_SCRUB) {
    // Reduced motion / mobile / coarse pointer: we're done. CSS handles the
    // static layout. No GSAP, no Lenis.
    return;
  }

  // Lazy-load deps via the CDN. If anything fails, fall back to the static layout.
  let gsap, ScrollTrigger, Lenis;
  try {
    const gsapMod = await import(/* @vite-ignore */ GSAP_URL);
    gsap = gsapMod.gsap || gsapMod.default || gsapMod;
    const stMod = await import(/* @vite-ignore */ ST_URL);
    ScrollTrigger = stMod.ScrollTrigger || stMod.default || stMod;
    gsap.registerPlugin(ScrollTrigger);

    const lenisMod = await import(/* @vite-ignore */ LENIS_URL);
    Lenis = lenisMod.default || lenisMod.Lenis || lenisMod;
  } catch (err) {
    console.warn("[v18] scrub deps failed to load, falling back to static.", err);
    return;
  }

  // ---------------------------------------------------------------------------
  // Lenis — smooth inertial scroll on desktop only.
  // ---------------------------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Bridge Lenis into ScrollTrigger so they agree on scroll position.
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ---------------------------------------------------------------------------
  // Pin the hero and scrub --p from 0 to 1 across its height.
  // The hero section is 200vh tall; we pin the .hero-pin for its duration.
  // ---------------------------------------------------------------------------
  const hero = qs(".hero");
  const pin = qs(".hero-pin");
  const stage = qs(".scrub-stage");

  if (!hero || !pin || !stage) return;

  // We use the native sticky for layout but let ScrollTrigger drive the scrub.
  // sticky + scrub cooperate fine as long as we only *write* --p here.
  const st = ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      setProgress(self.progress);
    },
  });

  // ---------------------------------------------------------------------------
  // Pause work when hero is off-screen (per brief).
  //
  // The scrub itself only fires via scroll, so the GPU cost is effectively
  // zero when out of view. But we still disable the ScrollTrigger to avoid
  // needlessly recomputing progress, and we park --p at its last value.
  // ---------------------------------------------------------------------------
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          st.enable();
        } else {
          st.disable(false); // keep current progress
        }
      }
    },
    { threshold: 0, rootMargin: "10% 0px 10% 0px" }
  );
  io.observe(hero);

  // ---------------------------------------------------------------------------
  // Resize resilience — recompute triggers on orientation changes / resizes.
  // ---------------------------------------------------------------------------
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);
  });
}

// Kick off
boot();
