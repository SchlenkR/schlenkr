// v7 — Industrial Complex
// Lightweight motion. All effects gated on prefers-reduced-motion.
// CDN deps (loaded dynamically so the page is self-contained and still
// works if the CDN is blocked):
//   - GSAP 3.13 + ScrollTrigger (pull-quote emphasis on scroll)
//   - Lenis 1.3.23 (smooth scroll, gentle)

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ------------------------------------------------------------------
   1. Reveal-on-scroll via IntersectionObserver (always on, cheap).
      Under reduced-motion we still add the class so content is shown
      (CSS forces opacity:1 in that case).
------------------------------------------------------------------ */
(function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  targets.forEach((el) => io.observe(el));
})();

/* ------------------------------------------------------------------
   2. GSAP pull-quote emphasis. Loaded dynamically; failure is silent.
      The pull-quotes have a gentle scale/letter-spacing emphasis as they
      enter, nothing scroll-hijacking.
------------------------------------------------------------------ */
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

async function initGsap() {
  if (prefersReducedMotion) return;
  try {
    await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js");
    await loadScript(
      "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"
    );
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Pull-quote emphasis: subtle scale-in as each quote enters
    const quotes = gsap.utils.toArray(".quote");
    quotes.forEach((q) => {
      const body = q.querySelector(".quote__body");
      const index = q.querySelector(".quote__index");
      const attr = q.querySelector(".quote__attr");
      if (!body) return;

      gsap.from(body, {
        scrollTrigger: {
          trigger: q,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.4,
        },
        y: 40,
        opacity: 0.2,
        ease: "power1.out",
      });

      gsap.from([index, attr].filter(Boolean), {
        scrollTrigger: {
          trigger: q,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    // Hero title parallax (very subtle)
    const heroTitle = document.querySelector(".hero__title");
    if (heroTitle) {
      gsap.to(heroTitle, {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -60,
        ease: "none",
      });
    }
  } catch (_) {
    /* silent: page works fine without GSAP */
  }
}

/* ------------------------------------------------------------------
   3. Lenis smooth scroll (optional). Loaded dynamically; disabled under
      reduced-motion. Non-hijacking: uses native wheel events, no
      forced snapping.
------------------------------------------------------------------ */
async function initLenis() {
  if (prefersReducedMotion) return;
  try {
    await loadScript("https://unpkg.com/lenis@1.3.23/dist/lenis.min.js");
    const Lenis = window.Lenis;
    if (!Lenis) return;
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.12,
    });

    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger in sync
    if (window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap &&
        window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap && window.gsap.ticker.lagSmoothing(0);
    }
  } catch (_) {
    /* silent */
  }
}

/* ------------------------------------------------------------------
   Bootstrap
------------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", async () => {
  await initGsap();
  await initLenis();
});
