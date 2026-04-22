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

### Upcoming batches (not yet committed)

- Phase 2 mechanics (progressive disclosure, scroll-linked, sticky
  sidebar) — one per root.
- Phase 3 case-study: AI-Tutorial-Pipeline as opening story.
- Phase 4 interactive: Monaco-embedded F# snippet, TypeFighter AST
  visualizer, PXL-Clock live pixel toy.

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
