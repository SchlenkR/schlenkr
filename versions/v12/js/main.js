/* ============================================================
   v12 — Mesh. Cursor-attracted WebGL fluid-gradient hero.
   Stack: Three.js r184, plain WebGLRenderer, OrthographicCamera,
   single full-screen PlaneGeometry + ShaderMaterial.

   - Caps DPR at 2.
   - Stops rendering when tab hidden (visibilitychange).
   - Stops rendering when hero is scrolled past (IntersectionObserver).
   - prefers-reduced-motion: renders a single frame then freezes
     (no animation loop).
   - WebGL failure: CSS fallback remains (never hidden until canvas
     proven working).
   ============================================================ */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js';

const canvas   = document.getElementById('mesh-canvas');
const stage    = document.getElementById('mesh-stage');
const fallback = document.getElementById('mesh-fallback');
const hero     = document.getElementById('hero');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------
   Shaders
   ------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/* Fragment shader:
   - 2D simplex-ish noise (Ashima-style).
   - Mixes 4 color fields through noise-driven weights.
   - Mouse attraction: shifts the UV toward the cursor, falling off
     with distance, so the gradient "pulls" to where you point.
   - Time-animated: noise evolves slowly so no seizure-inducing motion.
*/
const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;        // in UV space (0..1), smoothed
  uniform float uMouseStrength;// 0..1 presence — fades when mouse leaves
  uniform float uIntensity;    // 0..1 global intensity (e.g. lighter on mobile)

  uniform vec3 uColorA;        // indigo
  uniform vec3 uColorB;        // magenta
  uniform vec3 uColorC;        // teal
  uniform vec3 uColorD;        // amber
  uniform vec3 uColorBg;       // deep base

  // --- Ashima simplex noise 2D ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal noise (2 octaves — cheap).
  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.60 * snoise(p);
    v += 0.30 * snoise(p * 2.07 + 3.14);
    return v;
  }

  void main() {
    // Aspect-corrected UV so the mesh doesn't squash on wide screens.
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    // Mouse-attracted displacement: bend UV toward cursor, stronger when close.
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;
    vec2 toMouse = mouse - p;
    float d = length(toMouse);
    float pull = exp(-d * 2.2) * 0.22 * uMouseStrength;
    p += toMouse * pull;

    // Slow-evolving time.
    float t = uTime * 0.08;

    // Four noise fields with different phases — the weights of each color.
    float n1 = fbm(p * 1.15 + vec2( t * 0.9,  t * 0.5));
    float n2 = fbm(p * 1.35 + vec2(-t * 0.7,  t * 1.1) + 10.0);
    float n3 = fbm(p * 0.95 + vec2( t * 0.4, -t * 0.8) + 20.0);
    float n4 = fbm(p * 1.55 + vec2(-t * 1.1, -t * 0.3) + 30.0);

    // Remap to 0..1 weights and normalize.
    float w1 = smoothstep(-0.6, 0.9, n1);
    float w2 = smoothstep(-0.5, 0.9, n2);
    float w3 = smoothstep(-0.5, 0.9, n3);
    float w4 = smoothstep(-0.6, 0.9, n4);
    float wSum = w1 + w2 + w3 + w4 + 1e-4;
    w1 /= wSum; w2 /= wSum; w3 /= wSum; w4 /= wSum;

    vec3 col = uColorA * w1 + uColorB * w2 + uColorC * w3 + uColorD * w4;

    // Mix toward deep base in low-luminance zones — keeps the mesh
    // sitting on dark, never washing out the text.
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    float dim  = smoothstep(0.65, 0.15, luma);
    col = mix(col, uColorBg, dim * 0.55);

    // Cursor halo: tiny brightening spike right at the cursor.
    float halo = exp(-d * 5.0) * 0.25 * uMouseStrength;
    col += vec3(halo);

    // Subtle edge darken (vignette is layered over in CSS too — double belt).
    vec2 q = uv - 0.5;
    float vig = smoothstep(0.9, 0.35, length(q));
    col *= mix(0.82, 1.0, vig);

    // Intensity tuning (mobile lighter variant sets this lower).
    col = mix(uColorBg, col, uIntensity);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */

function sizeOfStage() {
  const r = stage.getBoundingClientRect();
  return { w: Math.max(1, Math.floor(r.width)), h: Math.max(1, Math.floor(r.height)) };
}

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
      stencil: false,
      depth: false,
    });
  } catch (err) {
    console.warn('[v12/mesh] WebGL init failed — keeping CSS fallback.', err);
    return;
  }

  // Cap device pixel ratio at 2. On mobile we go even lower for battery.
  const isMobile = matchMedia('(max-width: 640px)').matches;
  const dprCap = isMobile ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const intensity = isMobile ? 0.88 : 1.0;

  const uniforms = {
    uTime:          { value: 0 },
    uResolution:    { value: new THREE.Vector2(1, 1) },
    uMouse:         { value: new THREE.Vector2(0.5, 0.5) },
    uMouseStrength: { value: 0.0 },
    uIntensity:     { value: intensity },
    uColorA:        { value: new THREE.Color('#4338ca') }, // indigo
    uColorB:        { value: new THREE.Color('#d946ef') }, // magenta
    uColorC:        { value: new THREE.Color('#06b6d4') }, // teal
    uColorD:        { value: new THREE.Color('#f59e0b') }, // amber
    uColorBg:       { value: new THREE.Color('#0a0812') }, // deep base
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  // --- Resize ---
  const resize = () => {
    const { w, h } = sizeOfStage();
    renderer.setSize(w, h, false);
    uniforms.uResolution.value.set(w, h);
  };
  resize();

  // --- Mouse tracking (smoothed) ---
  // Mouse is in UV space (0..1); y is flipped (WebGL origin at bottom).
  const target = new THREE.Vector2(0.5, 0.5);
  let targetStrength = 0.0;

  const onPointerMove = (ev) => {
    const r = stage.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width;
    const y = 1.0 - (ev.clientY - r.top) / r.height;
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
      target.set(x, y);
      targetStrength = 1.0;
    }
  };
  const onPointerLeave = () => { targetStrength = 0.0; };
  const onTouchMove = (ev) => {
    if (ev.touches && ev.touches.length) {
      onPointerMove(ev.touches[0]);
    }
  };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  stage.addEventListener('pointerleave', onPointerLeave, { passive: true });
  stage.addEventListener('touchmove', onTouchMove, { passive: true });

  // --- Render gates ---
  let heroVisible = true;
  let pageVisible = !document.hidden;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) heroVisible = e.isIntersecting;
    },
    { threshold: 0 }
  );
  io.observe(hero);

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
  });

  window.addEventListener('resize', resize);

  // --- Show canvas / hide fallback once first frame drawn ---
  let ready = false;
  const reveal = () => {
    if (ready) return;
    ready = true;
    canvas.classList.add('is-ready');
    // Keep fallback in DOM (underneath) so any render hiccup still looks ok.
  };

  // --- Reduced motion: single frame, no loop ---
  if (reducedMotion) {
    uniforms.uTime.value = 3.0;      // a nice-looking static frame
    uniforms.uMouse.value.set(0.35, 0.55);
    uniforms.uMouseStrength.value = 0.5;
    renderer.render(scene, camera);
    reveal();
    return;
  }

  // --- Animation loop ---
  const clock = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop);

    // Gate rendering: pause when hidden / scrolled past.
    if (!heroVisible || !pageVisible) return;

    const dt = Math.min(0.05, clock.getDelta());
    uniforms.uTime.value += dt;

    // Smooth mouse toward target (springy).
    uniforms.uMouse.value.lerp(target, 0.08);
    uniforms.uMouseStrength.value +=
      (targetStrength - uniforms.uMouseStrength.value) * 0.06;

    renderer.render(scene, camera);
    if (!ready) reveal();
  };
  loop();
}

/* ------------------------------------------------------------
   Feature-detect WebGL before we import Three.
   (If unavailable, the CSS fallback just stays on screen.)
   ------------------------------------------------------------ */

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch (_) {
    return false;
  }
}

if (!hasWebGL()) {
  // Leave the CSS fallback visible; hide the canvas.
  canvas.style.display = 'none';
  console.info('[v12/mesh] No WebGL — using CSS fallback.');
} else {
  try {
    init();
  } catch (err) {
    console.warn('[v12/mesh] init error — using CSS fallback.', err);
    canvas.style.display = 'none';
  }
}
