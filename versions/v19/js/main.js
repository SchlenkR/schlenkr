/* =====================================================================
   v19 — Reverse Typewriter
   GSAP 3.15 + ScrollTrigger + SplitText (CDN, ESM) + Lenis 1.3.23.
   Chapter headlines scatter out and re-assemble char-by-char on scroll.
   Accessibility: a visually-hidden clean copy of every headline is always
   present in the DOM; SplitText only transforms the decorative span.
   Reduced-motion and coarse-pointer fallbacks: plain fade in.
   ===================================================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger.js";
import SplitText from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/SplitText.js";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/+esm";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

const rand = (min, max) => Math.random() * (max - min) + min;
const isCoarse =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

/* ------------------------------------------------------------------ */
/* Smooth scroll (Lenis) — desktop + fine-pointer only                 */
/* ------------------------------------------------------------------ */

const prefersReduced =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
if (!prefersReduced && !isCoarse) {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    smoothWheel: true
  });
  document.documentElement.classList.add("lenis");

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ------------------------------------------------------------------ */
/* Chapter animation                                                   */
/* ------------------------------------------------------------------ */

const chapters = Array.from(document.querySelectorAll(".chapter"));

gsap.matchMedia().add(
  {
    // FULL motion: fine-pointer, no reduced-motion preference.
    full: "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    // REDUCED motion: fade-only.
    reduced: "(prefers-reduced-motion: reduce), (pointer: coarse)"
  },
  (ctx) => {
    const { full, reduced } = ctx.conditions;

    chapters.forEach((chapter, idx) => {
      const visual = chapter.querySelector(".chapter-visual");
      const body = chapter.querySelector(".chapter-body");
      const kicker = chapter.querySelector(".chapter-kicker");
      if (!visual) return;

      /* ----------------------- REDUCED PATH ----------------------- */
      if (reduced) {
        gsap.fromTo(
          chapter.querySelectorAll(".chapter-kicker, .chapter-visual, .chapter-body, .chapter-foot"),
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 80%",
              once: true
            }
          }
        );
        return;
      }

      /* ----------------------- FULL PATH -------------------------- */
      // Split by char. The decorative span is aria-hidden; a sibling
      // .sr-only copy contains the clean line for assistive tech.
      const split = new SplitText(visual, {
        type: "chars",
        charsClass: "char"
      });

      // Initial state: chars hidden + scattered.
      gsap.set(split.chars, { opacity: 0 });
      split.chars.forEach((c) => {
        gsap.set(c, {
          x: rand(-140, 140),
          y: rand(-80, 80),
          rotate: rand(-18, 18)
        });
      });

      // Kicker, body, foot: simple fade lanes.
      gsap.set([kicker, body, chapter.querySelector(".chapter-foot")], {
        autoAlpha: 0,
        y: 18
      });

      // ASSEMBLE IN: triggers as the chapter enters the viewport centre.
      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 72%",
          end: "top 18%",
          scrub: false,
          toggleActions: "play none none reverse"
        }
      });

      tlIn
        .to(
          kicker,
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
          0
        )
        .to(
          split.chars,
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: {
              each: 0.012,
              from: "random"
            }
          },
          0.05
        )
        .to(
          [body, chapter.querySelector(".chapter-foot")],
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          0.25
        );

      // SCATTER OUT: triggers as the chapter leaves the top of viewport.
      // Skip the scatter-out on the last chapter so it stays readable
      // until the user scrolls into the following block.
      const isLast = idx === chapters.length - 1;
      if (!isLast) {
        const tlOut = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "bottom 75%",
            end: "bottom 15%",
            scrub: false,
            toggleActions: "play none none reverse"
          }
        });

        tlOut
          .to(
            split.chars,
            {
              x: () => rand(-200, 200),
              y: () => rand(-140, 140),
              rotate: () => rand(-24, 24),
              opacity: 0,
              duration: 0.55,
              ease: "power2.in",
              stagger: {
                each: 0.01,
                from: "random"
              }
            },
            0
          )
          .to(
            [kicker, body, chapter.querySelector(".chapter-foot")],
            { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" },
            0
          );
      }
    });

    /* ------------------------------------------------------------ */
    /* Reveal the post-chapter blocks (engage, proof, faq, about, cta) */
    /* ------------------------------------------------------------ */

    document.querySelectorAll(".block").forEach((block) => {
      const targets = block.querySelectorAll(
        ".block-kicker, .block-h, .block-lede, .card, .artefact, .faqs details, .about-lede, .cta-lede, .cta-row"
      );
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: full ? 0.6 : 0.5,
          ease: "power2.out",
          stagger: full ? 0.06 : 0.04,
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            once: true
          }
        }
      );
    });

    // Refresh after fonts load so measurements are post-metric.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      // matchMedia cleanup: ScrollTriggers are collected automatically.
    };
  }
);
