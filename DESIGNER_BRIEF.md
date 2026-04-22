# Design Brief — schlenkr (Ronald Schlenker)

Living log for the variant playground. Paired with:

- [`AI_BRIEFING.md`](./AI_BRIEFING.md) — process.
- [`RONALD_PROFILE.md`](./RONALD_PROFILE.md) — Phase-0 research.
- [`POSITIONING.md`](./POSITIONING.md) — Phase-1 strategy + locked decisions (§6a).
- [`CONTENT.md`](./CONTENT.md) — **canonical copy block for every variant**.
- [`TEMPLATES/`](./TEMPLATES/) — Impressum / Datenschutz dummy HTML skeletons.

---

## 1. Client / Content basis

Ronald Schlenker, independent consultant, PureState IT Consulting,
Frankfurt. Offering: **Training · Consulting · Engineering** around
AI-assisted development and functional programming in .NET.

**All variant content comes verbatim from [`CONTENT.md`](./CONTENT.md).**
Do not translate, rewrite, or abridge. Differ by style only.

**Mandatory pages per variant:**
- `index.html`
- `impressum.html` (use [`TEMPLATES/impressum.html`](./TEMPLATES/impressum.html) as starting point, restyle to match)
- `datenschutz.html` (same, from [`TEMPLATES/datenschutz.html`](./TEMPLATES/datenschutz.html))

**Mandatory entry in `versions/manifest.json`:**
- `"num": N` — stable, never recomputed from git log.
- `"title"`, `"desc"`, `"style"`, `"phaseTag"`, `"by"`.
- `"parent"` only for sub-variants.

---

## 2. Tech setup

- **Repo**: `/Users/ronald/repos/github/schlenkr`
- **Dev server**: `npm run dev` → Vite on port 8080.
- **MPA auto-discovery**: Vite scans `versions/` for folders matching
  `/^v\d+/`. Vite config is stable — **don't touch**.
- **Base path**: `/schlenkr/` on build (GitHub Pages), `/` in dev.
- **Self-contained rule**: every `versions/v<N>[-<label>]/` folder is a
  complete island. No shared code. CDN-only deps (unpkg, jsdelivr,
  Google Fonts). No `npm install` for variant-level libraries.

---

## 3. Naming

- Root versions: `v<N>` (no label).
- Sub-variants: `v<N>-<label>`, deeper: `v<N>-<label>-<twist>`.
- `parent` field references the immediate parent folder.

---

## 4. Phase strategy

- **Phase 1 — Roots**: 5–6 stylistic base drafts, identical content.
- **Phase 2 — Mechanics**: per-root interaction / IA sharpening.
- **Phase 3 — Storytelling**: narrative landings.
- **Phase 4 — Extended interaction**: Canvas, WebGL, physics, WebAudio,
  Monaco, client-side small models.
- **Phase 5 — Cross-pollination**: hybrids, provocative formats.

Current phase: **Phase 1 — Roots**.

---

## 5. Variant register

All shipped variants, sorted by stable `num`.

| num | Folder | Parent | Style | Phase | Idea |
|----:|--------|--------|-------|-------|------|
|   1 | `v1/`  | —      | Editorial         | Root | Magazine-style, serif display, cream + ink + ochre. |
|   2 | `v2/`  | —      | Terminal / Monospace | Root | Amber-CRT tmux session feel, ASCII dividers, blinking caret. |
|   3 | `v3/`  | —      | Manifesto / Big Type | Root | Five theses as full-viewport statements, electric red accent. |
|   4 | `v4/`  | —      | Swiss / Modernist | Root | Strict 12-col grid, numbered sections, Swiss red marker. |
|   5 | `v5/`  | —      | Pixel / Retro     | Root | 24×24 pixel motif from PXL Clock, LED palette, CRT overlay. |
|   6 | `v6/`  | —      | Editorial / Customer-First | Phase 2 | **Pragmatic Core** — Basecamp-structural reference implementation. Question hero, empathy, six frames, engagement shapes, proof-as-artefacts, about last. |
|   7 | `v7/`  | —      | Manifesto / Critique       | Phase 2 | **Industrial Complex** — anti-Scrum-industry manifesto with Fowler/Jeffries/Thomas/Hunt/Holub pull-quotes. Dark, sharp, provocative. |
|   8 | `v8/`  | —      | Diagnostic / Diagram       | Phase 2 | **AI Foundations** — AI-focused landing, three-foundations diagram, Thoughtworks tone. |
|   9 | `v9/`  | —      | Craft / Empowerment        | Phase 2 | **In-House Muscle** — warm sage/moss/teal, Clearleft-inspired, your-team-stays-sharp pitch. |
|  10 | `v10/` | —      | Q&A / Disclosure           | Phase 2 | **Questions** — whole page is the customer asking, Ronald answering. `<details>` disclosure. |
|  11 | `v11/` | —      | Interactive / Dev          | Phase 2 | **Live Playground** — CodeMirror 6 editor hero, live inferred-shape panel. |
|  12 | `v12/` | —      | WebGL / Shader             | Phase 2 | **Mesh** — Three.js cursor-attracted WebGL fluid gradient hero, customer-first copy layered. |
|  13 | `v1-pragmatic/` | v1 | Editorial / Customer-First | Phase 2 | **Editorial · Pragmatic** — v1's magazine shell, new customer-first content. Same designer, different article. |
|  14 | `v14/` | —      | Storytelling / Maker       | Phase 3 | **The Making** — PXL Clock two-person maker-journey as proof-of-craft. Timeline + pinned milestones + 16 image slots. |
|  15 | `v15/` | —      | Horizontal Scroll          | Phase 2 | **Horizontal Tour** — pinned viewport, five engagement shapes slide horizontally. GSAP ScrollTrigger pin. |
|  16 | `v16/` | —      | Scroll-Scrub Canvas        | Phase 2 | **Image Sequence** — 576 canvas particles morph ring → grid → letterform across 24 scroll-scrubbed frames. |
|  17 | `v17/` | —      | SVG / DrawSVG              | Phase 2 | **Type Atlas** — six customer-frames as huge stroked SVG-text stations, drawn on scroll. Motif morphs between. |
|  18 | `v18/` | —      | Scroll-Scrub Type          | Phase 2 | **Scrub Video** — pinned hero scrubs five customer-pain phrases via CSS custom property. No real video. |
|  19 | `v19/` | —      | SplitText Chapters         | Phase 2 | **Reverse Typewriter** — six full-viewport chapters scatter out and assemble in between frames. GSAP SplitText. |
|  20 | `v20/` | —      | Parallax / Illustration    | Phase 2 | **Cursor Diorama** — 2.5D workshop in six stacked SVG layers, cursor XY parallax + scroll Z dolly. Desktop-only. |

---

## 6. Ideas log

Every variant gets an entry **before** it is built: Parent · Idea ·
Twist. Discipline, not optional.

### Batch 1 — Phase 1 Roots (2026-04-22)

Five Root variants, identical content, five distinct stylistic theses.
Each becomes its own main version with its own lane.

| Folder | Parent | Idea · Twist |
|---|---|---|
| `v1/` | — (root) | **Editorial.** Calm authority, long-form magazine feel. Serif display + sans body, warm cream + deep ink + ochre accent. Twist: reads like a Stripe Press landing page — substance over flash, no motion hero, type does the work. Portrait slot left as a subtle placeholder monogram. |
| `v2/` | — (root) | **Terminal.** Developer-terminal aesthetic. Monospace everything, dark background with amber/green text, ASCII dividers, prompt-style navigation, blinking caret. Twist: the whole page pretends to be a live `tmux`/`less` session — reading it feels like browsing a well-organized `man` page. |
| `v3/` | — (root) | **Manifesto.** Big declarative type. The five theses from CONTENT.md §Five theses become full-viewport statements you scroll through. Ultra-high contrast, one saturated accent, no images. Twist: the site argues for itself — the case for hiring Ronald is the typography itself. |
| `v4/` | — (root) | **Swiss grid.** Strict modernist grid, Helvetica-like sans, numbered sections, abundant whitespace, tiny body type. Twist: treat Ronald's services and projects as a rigorous catalog — the design restraint signals the rigor of the work. |
| `v5/` | — (root) | **Pixel.** 24×24-pixel motif borrowed from PXL Clock. Chunky CSS-box pixel headlines, retro-game palette, playful but still credible. Twist: the brand ties directly to Ronald's own hardware product without being juvenile — a modern pixel-art landing that hints at what you can build on his clock. |

### Batch 2 — Customer-first pivot (2026-04-22)

Radical content rewrite: the customer is the hero, Ronald is the guide.
All variants in this batch use [`CONTENT-CUSTOMER.md`](./CONTENT-CUSTOMER.md)
(NOT the Phase-1 `CONTENT.md`). The rote Faden is *"The Pragmatic
Path"* with six customer-frames: AI-transfer gap, team-at-the-edge,
body-shop trap, two-week shine, metrics-on-a-dying-project, and the
Scrum-industry inversion.

Strategic sources: [`STRATEGY_PIVOT.md`](./STRATEGY_PIVOT.md) (Ronald's
raw voice), research findings folded into `CONTENT-CUSTOMER.md`
(Agile-manifesto signatories, Basecamp/Thoughtworks/Clearleft copy
models, visual-library shortlist).

| Folder | Parent | Idea · Twist |
|---|---|---|
| `v6/`  | — (root) | **Pragmatic Core.** Customer-first reference implementation. Basecamp-structural: question hero, empathy block, reframe, engagement shapes, proof-as-artefacts, about last. Calm, confident, disciplined. The golden-path Phase-2 root. |
| `v7/`  | — (root) | **Industrial Complex.** Provocative manifesto against the Scrum industry. Pull-quotes from Fowler, Jeffries, Thomas, Hunt as full-viewport statements. Dark palette, razor-sharp type. Owns the Agile critique as differentiator. |
| `v8/`  | — (root) | **AI Foundations.** Thoughtworks-style, AI-focused landing. Opener: "Leaders want AI by next Tuesday. You need three foundations first." Positions the AI-adoption review engagement. Technically minded, diagram-heavy. |
| `v9/`  | — (root) | **In-House Muscle.** Clearleft-inspired empowerment pitch. "Your team. Sharper. Kept." Soft, confident palette, craft-emphasis. Positions the upskilling-sprint engagement. Anti-body-shop hero. |
| `v10/` | — (root) | **Questions.** Whole page is the customer asking and Ronald answering. Interactive disclosures. Questions as hero. Low-design, high-copy — the anti-portfolio page. |
| `v11/` | — (root) | **Live Playground.** Monaco-editor embedded in the hero. Visitor edits a line of F#/C#; the page responds with live type-inference, or a rendered pixel toy. Demonstrates capability through the reader's fingers, not Ronald's claims. |
| `v12/` | — (root) | **Mesh.** Cursor-attracted WebGL fluid gradient hero (Three.js + GLSL shader, Lusion-style). Visual statement layered with customer-first copy. Proves we can do crazy without losing the thread. |
| `v1-pragmatic/` | v1 | **Sub-variant of Editorial.** Same magazine-style shell (Fraunces + Inter, cream + ochre), but content is swapped to the customer-first pragmatic-path narrative. Tests the principle: same design, better copy. |

Two more sub-variants are already queued for Batch 3, but not built in
this round:
- `v3-industry/` (parent v3): Manifesto shell + Scrum-industry content.
- `v4-catalog/` (parent v4): Swiss grid + customer-frame catalog.

### Batch 3 — Wild scroll + Maker story (2026-04-22)

Two threads fused in one batch. Most variants use
[`CONTENT-CUSTOMER.md`](./CONTENT-CUSTOMER.md). The maker-story variant
uses [`MAKER_STORY.md`](./MAKER_STORY.md) as its dedicated content
source — the PXL Clock journey as proof-of-craft.

Scroll-library toolkit (all CDN-only, verified 2026-04-22):

- GSAP 3.15 + ScrollTrigger + SplitText + DrawSVG + MorphSVG
  (all free since 3.13 in April 2025).
- Lenis 1.3.23 for inertial smooth scroll.
- Native CSS scroll-driven animations (`animation-timeline: scroll()`/
  `view()`) where supported — Baseline across Chromium / Safari 26 /
  Firefox 144.

Hard constraint: every effect ships a `prefers-reduced-motion: reduce`
fallback AND a mobile / `pointer: coarse` opt-out. No scroll-hijacking
that breaks keyboard PageDown or native scrollbar position.

| Folder | Parent | Idea · Twist |
|---|---|---|
| `v14/` | — (root) | **The Making.** PXL Clock maker-journey as the landing. Content from `MAKER_STORY.md`. Vertical scroll-driven timeline, milestone-by-milestone, with image placeholders sourced from `Produkt/Produktbilder/merchant/`. Closes with the customer-first reframe: *"This is what the consulting pitch looks like in practice."* |
| `v15/` | — (root) | **Horizontal Tour.** Vertical scroll pins a viewport, 5 engagement shapes slide horizontally past. GSAP ScrollTrigger pin + translateX on inner track. Mobile falls back to native `scroll-snap-type: x mandatory`. |
| `v16/` | — (root) | **Image Sequence.** Canvas scroll-scrubbed hero. 60 frames drawn from a rotating product / engineering sequence keyed to scroll progress. Apple-style. Rest of page calm and customer-first. |
| `v17/` | — (root) | **Type Atlas.** A full-page SVG manifesto stroke-drawn as you scroll. The six customer-frames rendered as huge type; DrawSVG scrubbed by ScrollTrigger. Headline morphs via MorphSVG at section boundaries. |
| `v18/` | — (root) | **Scrub Video.** Pinned 10–15 s hero video whose `currentTime` is bound to scroll progress — a dolly-in or stop-motion workshop scene. Rest customer-first. Fallback: static poster + auto-play once on scroll-in. |
| `v19/` | — (root) | **Reverse Typewriter.** Full-viewport chapters that de-assemble and re-assemble character-by-character between the six frames. GSAP SplitText + ScrollTrigger per-chapter; screen-reader-safe hidden copy. |
| `v20/` | — (root) | **Cursor Diorama.** 5–6 stacked PNG/SVG layers forming a 2.5D scene of Ronald's workshop. Cursor drives XY parallax; scroll drives Z dolly. Hotspots open case-study pages via View Transitions. Gated on `(min-width: 1024px) and (pointer: fine)`. |

---

### Upcoming batches

- Phase 3 extended storytelling: AI-Tutorial-Pipeline as a concrete
  customer story; TypeFighter research narrative.
- Phase 4 interactive: TypeFighter AST visualizer, PXL-Clock live
  pixel toy, audio-reactive visualiser.

---

## 7. Operating rules (do not violate)

- **Manifest `num` is stable** — never recomputed from git log.
- **No real PII** in drafts. Use the dummy data in
  [`TEMPLATES/`](./TEMPLATES/).
- **No prices** anywhere.
- **No fabricated testimonials.** Social-proof section is optional
  and pulls only from a (pending) research file.
- **CDN-only dependencies** per variant.
- **Every variant ships all three pages**: `index.html`,
  `impressum.html`, `datenschutz.html`.
- **Relative links only** — `./`, `impressum.html`, never absolute
  paths to `/schlenkr/…`.
- **Respect `prefers-reduced-motion`**. No audio autoplay. No scroll-
  hijacking above the fold.
- **Mobile works at ≥ 375 px width.**
