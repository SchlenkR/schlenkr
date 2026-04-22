# CONTENT.md — Canonical copy block for all Root variants

All Phase-1 Root variants (v1–v5) **must use this exact copy**. Variants
differ by style only, not by content. Translate or abridge nothing.
If a section doesn't fit your layout, drop it — do not rewrite.

Language: English. Tone: direct, technically grounded, no buzzwords.

---

## Identity

**Name:** Ronald Schlenker
**Location:** Frankfurt, Germany
**Working as:** Independent tech consultant
**Company:** PureState IT Consulting
**Also behind:** Cumin & Potato GmbH (makers of the PXL Clock)

---

## Hero tagline (pick one or show together)

Primary:
> **AI-era engineering, built on fifteen years of functional craft.**

Alternate short lines (for subheads or rotating greetings):
- *Structure wins — in types, and in AI workflows.*
- *Vibe coding, without the "vibe" excuse.*
- *I build tools. Train teams. Ship software that survives the quarter.*

---

## One-paragraph positioning

> I help technically ambitious teams build AI-assisted workflows that
> stay reproducible, maintainable, and honest about their limits.
> I bring F#, .NET, and compiler-level thinking to problems most people
> try to solve with prompt templates. You get craft, not hype.

---

## Three services (equal weight, same order across every variant)

### Training

Workshops, live-coding sessions, and conference talks on
AI-augmented development, functional programming in .NET, type inference,
and language-/DSL-design. Delivered in-house or remote.

### Consulting

Audits, architecture reviews, and sparring for teams deciding how (and
whether) to bring AI into their engineering process — or whether F# / a
functional architecture would pay off.

### Engineering

Hands-on work on AI pipelines, developer tooling, typed templates,
reactive UI frameworks, and embedded creative-coding systems. I say no
to generic CRUD. I say yes to problems where ten years of compiler and
FP habits actually matter.

---

## About (second-level detail)

- Recognized F# Expert — F# Foundation, *Applied F# 2019*.
- Maintainer / creator on the `fsprojects` organization (FsHttp, LocSta).
- Speaker at BobKonf 2024 (*Monads in the Wilderness*).
- Co-founder of the PXL Clock — a 24×24 programmable LED display
  shipping through Cumin & Potato GmbH.
- YouTube channel [@ThePureState](https://youtube.com/@ThePureState):
  language design, functional programming, AI workflows.

---

## Featured projects

All variants list these five projects in this exact order. Keep the
one-liners verbatim; feel free to vary layout (cards, rows, list).

1. **PXL Clock** — A 24×24 programmable LED display you code in C# or
   F#. VS Code extension, hot-reload simulator, over-the-air updates.
   [pxlclock.com](https://www.pxlclock.com/?ref=RONALD) · code `RONALD`
   for €25 off.

2. **FsHttp** — A hackable HTTP client for .NET. Reads like `.http`
   files, scales to any edge case. 499★ on GitHub, 128 dependent
   packages. [fsprojects/FsHttp](https://github.com/fsprojects/FsHttp).

3. **TypeFighter** — An experimental language built around an
   inference-first, structural type system: records match by shape, set-
   theoretic unions, minimal annotations.
   [github.com/SchlenkR/TypeFighter](https://github.com/SchlenkR/TypeFighter).

4. **TheBlunt** — A one-file recursive-descent parser-combinator library
   for F# and Fable. Small surface, serious power.
   [github.com/SchlenkR/TheBlunt](https://github.com/SchlenkR/TheBlunt).

5. **Trulla** — Templates that are type-safe at compile time. Ships as
   an F# Type Provider, a C# Source Generator, and a Node.js CLI.
   [github.com/SchlenkR/Trulla](https://github.com/SchlenkR/Trulla).

(*Vide — state-aware function composition — may be mentioned briefly as
"more OSS on GitHub" but should not take a featured slot in Roots.*)

---

## Five theses (usable as a manifesto, pull quotes, or scroll stations)

1. **Composition beats objects.** Lego, not Playmobil. Pure functions
   compose forever; object hierarchies are dead ends.
2. **Syntax should match how you think.** If a language makes you fight
   notation to express intent, it's the wrong language.
3. **Types make code obvious.** Hindley-Milner inference plus structural
   records replace paragraphs of documentation.
4. **AI drifts — discipline pays.** Reproducible AI output comes from
   small tools, tight specs, multi-turn loops, not heroic prompts.
5. **Build the tool, don't buy the SaaS.** Three hundred lines of code
   that do exactly what you need beat any feature-bloated platform.

---

## Contact / CTAs

**Primary CTA (every variant):**
- Text: *Start a conversation* (or *Get in touch*, whichever reads best
  in your layout).
- Target: `mailto:hello@schlenkr.dev` (dummy until Phase 5).

**Secondary links (every variant):**
- GitHub: [github.com/SchlenkR](https://github.com/SchlenkR)
- YouTube: [@ThePureState](https://youtube.com/@ThePureState)
- Bluesky: [@schlenkr.bsky.social](https://bsky.app/profile/schlenkr.bsky.social)
- X: [@schlenkr](https://x.com/schlenkr)

**Legal footer (every variant):**
- Link to `impressum.html`
- Link to `datenschutz.html`

Both legal pages are supplied separately (dummy data; see
`TEMPLATES/impressum.html` and `TEMPLATES/datenschutz.html`).

---

## Credit line (footer)

*Designed with Claude. Built with Vite. Self-contained.*
*Part of a design playground — see the
[version overview](../index.html).*

---

## Assets

**Projekt-Logos** available in `archive/old-blog` branch under `img/`:
`Vide_logo.png`, `FsHttp_logo.png`, `TheBlunt_logo.png`,
`Trulla_logo.png`, `LocSta_logo.png`, `banner.png`. Variants may use
them — or skip them entirely and go type-only.

**Portrait:** no canonical photo available yet. Use a placeholder
(neutral silhouette, initial monogram `RS`, or "no photo" as a design
decision).

**Fonts / colors:** free choice per variant. If your variant proposes a
brand system, document it briefly in the variant's own README or in a
comment at the top of `index.html`.

---

## Hard constraints (verbatim from Ronald, 2026-04-22)

- **No prices, no rate signals, no budget hints** — anywhere.
- **No live AI demo** in Phase-1 Roots.
- **No fabricated testimonials.** A social-proof section is optional;
  if included, draw only from the (pending) testimonial research file
  or skip it.
- **No real personal data** in Impressum / Datenschutz — dummies only.
- Respect `prefers-reduced-motion`. No audio autoplay. No scroll-
  hijacking above the fold.
