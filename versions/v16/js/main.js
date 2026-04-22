/* ==========================================================================
   v16 — Image Sequence
   Self-contained scroll-scrubbed canvas hero.

   Concept (Option A): 24 particles begin on a ring (rotating), morph into
   a 24×24 dot grid, then compress into a typeset glyph "S" — a deliberate
   step-by-step visual metaphor for moving from stuck (scattered orbit) to
   shipping (resolved letterform).

   Tech:
   - GSAP 3.15 + ScrollTrigger (scrub) from jsdelivr
   - Lenis 1.3.23 for smooth scroll (desktop, fine pointer only)
   - 24 frames generated client-side; no external images
   - Hero pinned for ~200vh
   - IntersectionObserver pauses gsap ticker when hero off-screen
   - prefers-reduced-motion → static first frame
   - pointer: coarse or < 768px → fallback SVG, sequence disabled
   ========================================================================== */

// GSAP + ScrollTrigger + Lenis are loaded as UMD globals via <script> tags
// in index.html (jsdelivr CDN). We reference them as window globals so that
// Vite's build step doesn't try to bundle external https imports.
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const Lenis = window.Lenis;

if (!gsap || !ScrollTrigger) {
  console.warn("[v16] GSAP / ScrollTrigger not available — sequence disabled.");
}

if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 24;
const DOT_COUNT = 24 * 24; // 576 particles
const PALETTE = {
  bg: "#0d0d10",
  dot: "#f2f0ea",
  glow: "#f59e0b",
};

// ---------- Environment checks ----------

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarsePointer = matchMedia("(pointer: coarse)").matches;
const smallViewport = matchMedia("(max-width: 768px)").matches;

const canvas = document.getElementById("sequence");
const fallback = document.getElementById("heroFallback");
const hero = document.getElementById("hero");

// If we can't run the animation, show the static SVG fallback and exit.
const disabled = !canvas || prefersReducedMotion || coarsePointer || smallViewport || !gsap || !ScrollTrigger;
if (disabled) {
  if (canvas) canvas.style.display = "none";
  if (fallback) {
    fallback.hidden = false;
    renderStaticFallback(fallback);
  }
  // Also neutralise the pin height on small/reduced so the page flows.
  if (hero) hero.style.height = "auto";
} else {
  initSequence();
  if (Lenis) initLenisAndScroll();
}

// ==========================================================================
// Canvas sequence
// ==========================================================================

function initSequence() {
  const ctx = canvas.getContext("2d", { alpha: false });
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;

  // Pre-computed target positions for each of the 24 "stages"
  // Each stage is a Float32Array of [x0, y0, x1, y1, ...] in a normalised
  // -1..1 square, then mapped to pixels at draw time.
  const stages = buildStages(FRAME_COUNT, DOT_COUNT);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw(currentFrame);
  }, { passive: true });

  // ---------- Drawing ----------

  let currentFrame = 0;

  function draw(frameFloat) {
    const idx = Math.max(0, Math.min(FRAME_COUNT - 1, frameFloat));
    const i0 = Math.floor(idx);
    const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
    const t = idx - i0;

    const a = stages[i0];
    const b = stages[i1];

    // Paint background
    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(0, 0, w, h);

    // Scale: map [-1..1] → centered square occupying 78% of min(w,h)
    const size = Math.min(w, h) * 0.78;
    const cx = w / 2;
    const cy = h / 2;

    // Dot size grows slightly as we approach final frame (resolution)
    const phase = idx / (FRAME_COUNT - 1);
    const dotR = lerp(1.1, 2.2, phase) * (dpr > 1 ? 1 : 1);

    // Amber glow layer — accent pulses in as sequence resolves
    const glowAlpha = easeInOut(phase) * 0.7;
    if (glowAlpha > 0.02) {
      const grd = ctx.createRadialGradient(cx, cy, 10, cx, cy, size * 0.7);
      grd.addColorStop(0, `rgba(245,158,11,${glowAlpha * 0.35})`);
      grd.addColorStop(1, "rgba(245,158,11,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.fillStyle = PALETTE.dot;

    // Slight overall rotation for early frames — orbit feeling
    const rotation = (1 - easeInOut(phase)) * 0.35 * Math.PI * 2 + phase * 0.05;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    for (let p = 0; p < DOT_COUNT; p++) {
      const ax = a[p * 2];
      const ay = a[p * 2 + 1];
      const bx = b[p * 2];
      const by = b[p * 2 + 1];

      const nx = ax + (bx - ax) * t;
      const ny = ay + (by - ay) * t;

      const rx = nx * cos - ny * sin;
      const ry = nx * sin + ny * cos;

      const px = cx + rx * size * 0.5;
      const py = cy + ry * size * 0.5;

      // Amber tint for a subset of particles to emphasise resolution
      if (phase > 0.75 && (p % 11 === 0)) {
        ctx.fillStyle = PALETTE.glow;
        ctx.beginPath();
        ctx.arc(px, py, dotR * 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = PALETTE.dot;
      } else {
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Initial paint
  draw(0);

  // ---------- Scroll drive ----------

  const st = ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      currentFrame = self.progress * (FRAME_COUNT - 1);
    },
  });

  // ---------- Pause off-screen ----------

  let visible = true;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) visible = e.isIntersecting;
    if (visible) gsap.ticker.wake();
  }, { threshold: 0.01 });
  io.observe(canvas);

  // Paint on each ticker frame, but only when visible.
  gsap.ticker.add(() => {
    if (!visible) return;
    draw(currentFrame);
  });

  // Expose for debugging
  window.__v16 = { st, draw, stages, setFrame: (i) => { currentFrame = i; draw(i); } };
}

// ==========================================================================
// Lenis smooth scroll + ScrollTrigger sync
// ==========================================================================

function initLenisAndScroll() {
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ==========================================================================
// Stage builders — each returns Float32Array of normalised [-1..1] points
// ==========================================================================

function buildStages(nFrames, nDots) {
  const stages = new Array(nFrames);

  // Frame 0: single ring of 24 "primaries" + 552 satellites orbiting them
  // Frames 1..8: ring rotates and expands; satellites fan out
  // Frames 9..15: particles collapse onto 24×24 grid
  // Frames 16..22: grid holds, slight jitter reduces
  // Frame 23: particles form an "S" silhouette within the grid footprint
  //
  // Strategy: compute four keypose arrays — ring, ring-expanded, grid, letter.
  // Then interpolate between them with easing along the frame axis.

  const pose = {
    ring: ringPose(nDots),
    expanded: expandedRingPose(nDots),
    grid: gridPose(nDots),
    letter: letterSPose(nDots),
  };

  // Permutation that maps each dot-index onto its grid slot / letter slot
  // so particles don't cross-wire (minimises visual chaos).
  const permGrid = canonicalMap(pose.ring, pose.grid);
  const permLetter = canonicalMap(pose.grid, pose.letter);

  pose.grid = applyPerm(pose.grid, permGrid);
  pose.letter = applyPerm(pose.letter, permLetter);
  pose.letter = applyPerm(pose.letter, permGrid); // chain through grid mapping

  for (let f = 0; f < nFrames; f++) {
    const t = f / (nFrames - 1); // 0..1

    // Segment weights
    let a, b, seg;
    if (t < 0.35) { // ring -> expanded ring
      seg = t / 0.35;
      a = pose.ring;
      b = pose.expanded;
    } else if (t < 0.7) { // expanded -> grid
      seg = (t - 0.35) / 0.35;
      a = pose.expanded;
      b = pose.grid;
    } else { // grid -> letter
      seg = (t - 0.7) / 0.3;
      a = pose.grid;
      b = pose.letter;
    }

    const e = easeInOut(seg);
    const arr = new Float32Array(nDots * 2);
    for (let i = 0; i < nDots * 2; i++) {
      arr[i] = a[i] + (b[i] - a[i]) * e;
    }
    stages[f] = arr;
  }

  return stages;
}

function ringPose(n) {
  // 24 primary points on a circle, remaining 552 points spiralling close
  const out = new Float32Array(n * 2);
  const primaries = 24;
  const rPrimary = 0.95;

  for (let i = 0; i < n; i++) {
    if (i < primaries) {
      const a = (i / primaries) * Math.PI * 2 - Math.PI / 2;
      out[i * 2] = Math.cos(a) * rPrimary;
      out[i * 2 + 1] = Math.sin(a) * rPrimary;
    } else {
      // satellite — tight cluster near the nearest primary
      const primary = i % primaries;
      const a = (primary / primaries) * Math.PI * 2 - Math.PI / 2;
      const jitterA = (Math.sin(i * 12.9898) * 0.5 + Math.cos(i * 78.233) * 0.5) * 0.22;
      const jitterR = (Math.sin(i * 37.719) * 0.5 + 0.5) * 0.12;
      out[i * 2] = Math.cos(a + jitterA) * (rPrimary - jitterR);
      out[i * 2 + 1] = Math.sin(a + jitterA) * (rPrimary - jitterR);
    }
  }
  return out;
}

function expandedRingPose(n) {
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const band = 0.7 + 0.28 * (((i * 7.13) % 7) / 7);
    out[i * 2] = Math.cos(a) * band;
    out[i * 2 + 1] = Math.sin(a) * band;
  }
  return out;
}

function gridPose(n) {
  // 24×24 grid in [-1..1]
  const out = new Float32Array(n * 2);
  const cols = 24;
  const step = 2 / (cols - 1);
  const span = 0.85; // keep margin
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    out[i * 2] = (-1 + col * step) * span;
    out[i * 2 + 1] = (-1 + row * step) * span;
  }
  return out;
}

function letterSPose(n) {
  // Generate an "S" shape sampled onto a 24×24 lattice, then place n points
  // inside the lit cells. Any extras orbit the silhouette softly.
  const cols = 24;
  const rows = 24;
  const mask = new Uint8Array(cols * rows);

  // Procedurally draw an "S" into the mask using two circular arcs + connector
  // Top arc: centre ~ (0.5, 0.28), r ~ 0.22 (normalised 0..1), opens down-right
  // Bottom arc: centre ~ (0.5, 0.72), r ~ 0.22, opens up-left
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const v = r / (rows - 1);
      if (inSShape(u, v)) mask[r * cols + c] = 1;
    }
  }

  // Collect lit cells
  const lit = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mask[r * cols + c]) lit.push([c, r]);
    }
  }

  const out = new Float32Array(n * 2);
  const span = 0.85;
  const step = 2 / (cols - 1);

  if (lit.length === 0) {
    // Fallback — shouldn't happen
    for (let i = 0; i < n; i++) { out[i * 2] = 0; out[i * 2 + 1] = 0; }
    return out;
  }

  for (let i = 0; i < n; i++) {
    if (i < lit.length) {
      const [c, r] = lit[i];
      out[i * 2] = (-1 + c * step) * span;
      out[i * 2 + 1] = (-1 + r * step) * span;
    } else {
      // extras — tuck into least-dense lit cells (cycle through)
      const [c, r] = lit[i % lit.length];
      const jx = (Math.sin(i * 1.234) * 0.5) * (step * 0.5);
      const jy = (Math.cos(i * 2.345) * 0.5) * (step * 0.5);
      out[i * 2] = (-1 + c * step) * span + jx;
      out[i * 2 + 1] = (-1 + r * step) * span + jy;
    }
  }
  return out;
}

function inSShape(u, v) {
  // Stroke thickness (normalised)
  const t = 0.11;

  // Top bowl: arc of circle centred at (0.5, 0.28), radius 0.22
  // Keep only the upper portion (v <= 0.42) — that's the top curve of the S
  const dxT = u - 0.5;
  const dyT = v - 0.28;
  const dTop = Math.sqrt(dxT * dxT + dyT * dyT);
  const topArc = dTop > 0.22 - t && dTop < 0.22 + t && v < 0.35 + t;

  // Bottom bowl: arc centred at (0.5, 0.72), radius 0.22, lower portion
  const dxB = u - 0.5;
  const dyB = v - 0.72;
  const dBot = Math.sqrt(dxB * dxB + dyB * dyB);
  const botArc = dBot > 0.22 - t && dBot < 0.22 + t && v > 0.65 - t;

  // Right shoulder of top bowl (u > 0.5, above mid) — kept
  // Left side of top bowl (u < 0.5, above mid) — kept
  // For an S we want the top to curl from upper-right around to left-middle,
  // and bottom to curl from left-middle around to lower-right.

  const topKeep = topArc && !(u > 0.5 && v > 0.28);
  const botKeep = botArc && !(u < 0.5 && v < 0.72);

  // Middle diagonal connector from (0.3, 0.4) to (0.7, 0.6)
  const lx1 = 0.3, ly1 = 0.42, lx2 = 0.7, ly2 = 0.58;
  const vx = lx2 - lx1;
  const vy = ly2 - ly1;
  const wx = u - lx1;
  const wy = v - ly1;
  const len2 = vx * vx + vy * vy;
  const tt = Math.max(0, Math.min(1, (wx * vx + wy * vy) / len2));
  const px = lx1 + tt * vx;
  const py = ly1 + tt * vy;
  const dx = u - px;
  const dy = v - py;
  const distLine = Math.sqrt(dx * dx + dy * dy);
  const connector = distLine < t * 0.85 && tt > 0.05 && tt < 0.95;

  return topKeep || botKeep || connector;
}

// Map each index in `from` to its nearest match in `to` using a simple
// greedy assignment. Cheap (O(n²)) but runs once at startup for 576 points.
function canonicalMap(from, to) {
  const n = from.length / 2;
  const perm = new Int32Array(n);
  const used = new Uint8Array(n);
  // Simpler identity map — full nearest-neighbour is costly; identity gives
  // a consistent visual flow across poses since we designed them consistently.
  for (let i = 0; i < n; i++) perm[i] = i;
  return perm;
}

function applyPerm(arr, perm) {
  const n = perm.length;
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const src = perm[i];
    out[i * 2] = arr[src * 2];
    out[i * 2 + 1] = arr[src * 2 + 1];
  }
  return out;
}

// ==========================================================================
// Utilities
// ==========================================================================

function lerp(a, b, t) { return a + (b - a) * t; }

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ==========================================================================
// Static fallback (mobile + reduced-motion)
// ==========================================================================

function renderStaticFallback(host) {
  // Draw the "final frame" S silhouette as a 24×24 dot grid in SVG.
  const cols = 24;
  const rows = 24;
  const cell = 18;
  const r = 4;
  const pad = 16;
  const size = cols * cell + pad * 2;

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("aria-hidden", "true");

  for (let rr = 0; rr < rows; rr++) {
    for (let cc = 0; cc < cols; cc++) {
      const u = cc / (cols - 1);
      const v = rr / (rows - 1);
      const lit = inSShape(u, v);
      const cx = pad + cc * cell + cell / 2;
      const cy = pad + rr * cell + cell / 2;
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", cx);
      dot.setAttribute("cy", cy);
      dot.setAttribute("r", lit ? r : 1.2);
      dot.setAttribute("fill", lit ? "#f59e0b" : "#2a2a32");
      svg.appendChild(dot);
    }
  }

  host.innerHTML = "";
  host.appendChild(svg);
}
