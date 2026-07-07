<h1 align="center">Hi - I'm Ronald 👋</h1>
<h4 align="center">Pragmatic engineering consulting · F#, .NET, AI workflows · Frankfurt & Remote EU</h4>

<p align="center">
  <a href="https://schlenkr.github.io/schlenkr/"><strong>Homepage playground</strong></a>
  &nbsp;·&nbsp;
  <a href="https://youtube.com/@ThePureState">YouTube&nbsp;@ThePureState</a>
  &nbsp;·&nbsp;
  <a href="https://linktr.ee/SchlenkR">Linktree</a>
</p>

<p align="center">
  <a href="https://foundation.fsharp.org/results_applied_fsharp_2019">Recognized F# Expert · Applied F# 2019</a>
</p>

---

## What I do

> **Training · Consulting · Engineering.**
> I help technically ambitious teams build AI-assisted workflows that stay
> reproducible, maintainable, and honest about their limits - with fifteen
> years of functional-programming habit in the back pocket.
>
> Based in Frankfurt. Work across DACH and remote EU.

📫 Reach out on [Bluesky](https://bsky.app/profile/schlenkr.bsky.social) or LinkedIn.

---

## 🧪 Homepage playground

Rather than a single landing page, I've been exploring **27 variants** of a
consulting homepage in parallel - same content, wildly different design and
structure theses. It's a live demonstration of how I iterate with AI on real
work (Vite MPA, CDN-only, no framework lock-in).

🔗 **Live**: [schlenkr.github.io/schlenkr](https://schlenkr.github.io/schlenkr/) · [Repo](https://github.com/SchlenkR/schlenkr)

## 🕒 PXL Clock

With Sefa I co-founded the **PXL Clock** - a 24×24 programmable LED display
you code in C# or F#. Hand-assembled in Frankfurt, limited batches.

🔗 [pxlclock.com](https://www.pxlclock.com) · [Repo](https://github.com/SchlenkR/pxl-clock) · [Discord](https://discord.gg/KDbVdKQh5j)

---

## 📦 Open Source (selected)

<table>
<tr>
<td width="96" valign="top"><img src="./img/FsHttp_logo.png" width="72" alt="FsHttp logo" /></td>
<td valign="top">

#### FsHttp

A hackable HTTP client for .NET (F# / C#) - write and run requests directly
in F# Interactive or C# scripts, no Postman required. Used by **128+**
dependent packages in the .NET ecosystem.

🔗 [Repo](https://github.com/fsprojects/FsHttp) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/fsprojects/FsHttp?style=flat-square&label=stars)

</td>
</tr>
</table>

---

<table>
<tr>
<td width="96" valign="top"><img src="./img/Vide_logo.png" width="72" alt="Vide logo" /></td>
<td valign="top">

#### Vide

State-aware function composition for building UIs (web, desktop, mobile) and
for digital signal processing - the same core idea drives both a
component tree and a sample-accurate audio pipeline.

🔗 [Repo](https://github.com/SchlenkR/Vide) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/SchlenkR/Vide?style=flat-square&label=stars)

</td>
</tr>
</table>

---

<table>
<tr>
<td width="96" valign="top"><img src="./img/Trulla_logo.png" width="72" alt="Trulla logo" /></td>
<td valign="top">

#### Trulla

Type-safe text templates - like Handlebars or Mustache, but statically
checked against your data at compile time. Ships as an F# Type Provider, a
C# Source Generator, and a Node CLI.

🔗 [Repo](https://github.com/SchlenkR/Trulla) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/SchlenkR/Trulla?style=flat-square&label=stars)

</td>
</tr>
</table>

---

<table>
<tr>
<td width="96" valign="top"><img src="./img/TheBlunt_logo.png" width="72" alt="TheBlunt logo" /></td>
<td valign="top">

#### TheBlunt

A one-file recursive-descent parser-combinator library for F# and Fable -
drop it into any project, no package dependency graph to manage, and build
real parsers (including a full JSON parser) from a handful of combinators.

🔗 [Repo](https://github.com/SchlenkR/TheBlunt) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/SchlenkR/TheBlunt?style=flat-square&label=stars)

</td>
</tr>
</table>

---

<table>
<tr>
<td width="96" valign="top"><img src="./img/LocSta_logo.png" width="72" alt="LocSta logo" /></td>
<td valign="top">

#### LocSta

**Loc**al **Sta**te - stateful stream processing for F#. Each block (latch,
EMA, biquad filter, RMS, ...) is a pure function that threads its own state
automatically, so you compose signal pipelines like you compose ordinary
functions - from simple counters to full audio DSP chains.

🔗 [Repo](https://github.com/fsprojects/LocSta) &nbsp;·&nbsp; [Live Demo](https://fsprojects.github.io/LocSta/) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/fsprojects/LocSta?style=flat-square&label=stars)

</td>
</tr>
</table>

<table>
<tr>
<td width="20%"><img src="./img/screenshots/locsta-latch.png" alt="LocSta Latch example" /><br/><sub>Latch</sub></td>
<td width="20%"><img src="./img/screenshots/locsta-ema.png" alt="LocSta Ema example" /><br/><sub>Ema</sub></td>
<td width="20%"><img src="./img/screenshots/locsta-timesince.png" alt="LocSta TimeSince example" /><br/><sub>TimeSince</sub></td>
<td width="20%"><img src="./img/screenshots/locsta-biquadlowpass.png" alt="LocSta BiquadLowPass example" /><br/><sub>BiquadLowPass</sub></td>
<td width="20%"><img src="./img/screenshots/locsta-rms.png" alt="LocSta Rms example" /><br/><sub>Rms</sub></td>
</tr>
</table>

---

<table>
<tr>
<td width="96" valign="top"><img src="./img/TypeFighter_logo.svg" width="72" alt="TypeFighter logo" /></td>
<td valign="top">

#### TypeFighter

An experimental programming language - **inference-first**, with structural
records, set-theoretic union types, row polymorphism, and classical
polymorphic functions, almost all figured out by the type checker without
annotations. Includes a browser playground with live compilation to
JavaScript and a step-by-step constraint-solver visualizer that shows how
type inference actually converges.

🔗 [Repo](https://github.com/SchlenkR/TypeFighter) &nbsp;·&nbsp; [YouTube: Type Inference Explained](https://www.youtube.com/watch?v=fSRTVrjvo70) &nbsp;·&nbsp; ![GitHub Repo stars](https://img.shields.io/github/stars/SchlenkR/TypeFighter?style=flat-square&label=stars)

</td>
</tr>
</table>

<table>
<tr>
<td width="50%"><img src="./img/screenshots/typefighter-playground.png" alt="TypeFighter playground" /><br/><sub>Playground: F#-like source, compiled live to JavaScript</sub></td>
<td width="50%"><img src="./img/screenshots/typefighter-solver.png" alt="TypeFighter constraint solver" /><br/><sub>Constraint solver: type inference, step by step</sub></td>
</tr>
</table>

---

## 🎨 Design & Tools

Smaller experiments and utilities outside the F# core.

### stil-recherche

A moodboard site collecting illustration and design-trend research - style
references sorted by theme (post-AI authenticity, neo-traditionalism,
grainy textures, bold minimalism, ...), each with source and a short note
on what defines it. Used as a shared reference point when briefing design
work.

<img src="./img/screenshots/stil-recherche.png" alt="stil-recherche moodboard" width="700" />

🔗 [Live](https://schlenkr.github.io/stil-recherche/) · [Repo](https://github.com/SchlenkR/stil-recherche)

### arbeit-vs-buergergeld

A calculator comparing net income from employment against Bürgergeld
(Germany, 2026 rules) - household composition, housing costs and region
feed into a side-by-side comparison with a Sankey breakdown of where the
money actually goes on each side.

<img src="./img/screenshots/arbeit-vs-buergergeld.png" alt="arbeit-vs-buergergeld calculator" width="700" />

🔗 [Live](https://schlenkr.github.io/arbeit-vs-buergergeld/) · [Repo](https://github.com/SchlenkR/arbeit-vs-buergergeld)

### barbarasailer2

Design playground for a client site - self-contained layout variants,
iterated the same way as the homepage playground above.

🔗 [Repo](https://github.com/SchlenkR/barbarasailer2)

---

## 🎙️ Talks & content

- **BobKonf 2024** - *Computation Expressions in F#* (with David Schaefer).
- **BobKonf 2024** - *Monads in the Wilderness*.
- [*Type Inference Explained*](https://www.youtube.com/watch?v=fSRTVrjvo70) - building TypeFighter's type checker from scratch.
- *This is My Result Type* - F# discriminated unions demystified.
- *A Hackable Frame* (Pt. 1) - PXL Clock hands-on intro.
- Long-form on YouTube: [@ThePureState](https://youtube.com/@ThePureState).

---

<p align="center">
  <a href="https://github.com/SchlenkR"><img src="https://img.shields.io/badge/GitHub-SchlenkR-181717?style=flat-square&logo=github" alt="GitHub"></a>
  <a href="https://bsky.app/profile/schlenkr.bsky.social"><img src="https://img.shields.io/badge/Bluesky-@schlenkr-0285FF?style=flat-square" alt="Bluesky"></a>
  <a href="https://x.com/schlenkr"><img src="https://img.shields.io/badge/X-@schlenkr-000000?style=flat-square&logo=x" alt="X"></a>
  <a href="https://youtube.com/@ThePureState"><img src="https://img.shields.io/badge/YouTube-@ThePureState-FF0000?style=flat-square&logo=youtube" alt="YouTube"></a>
</p>
