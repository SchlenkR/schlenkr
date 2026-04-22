# CONTENT-DIRECTIVES-V3.md — Rebalance + YouTube + Lead-Gen

Addendum to [`CONTENT-CUSTOMER.md`](./CONTENT-CUSTOMER.md). Applies to
Batch 4 onwards. If these directives conflict with the earlier file,
**these win**.

Stand: 2026-04-22 (Ronald)

---

## Directive 1 — PXL Clock is a **curiosity trail**, not a billboard

**Change:** In Batches 1–3 the PXL Clock appeared in the featured-
projects block early on the page, with equal weight to FsHttp /
TypeFighter / TheBlunt / Trulla. That is wrong for lead-gen.

**New rule:**

> The customer lands because they want **training · consulting ·
> engineering**. They stay because the page speaks to their pain.
> *If they then get curious about who is behind the page*, **that**
> is the moment PXL Clock + TypeFighter + YouTube show up — as a
> "what does this guy actually do when he's not consulting?" trail.

Operationalised in every new variant:

- PXL Clock may be **mentioned once** in the main proof block as a
  line item among equals (or omitted entirely and deferred to the
  curiosity trail).
- The **curiosity trail** is a dedicated section near the end — after
  the engagement shapes, before the CTA — titled something like:
  - *"If you're curious who's behind this page"*
  - *"What this guy actually builds"*
  - *"For the curious"*
- In the curiosity trail, show **two or three** deep dives:
  1. **PXL Clock** — the two-person maker-journey (link to pxlclock.com
     + optionally a YouTube video).
  2. **TypeFighter** — *"I build my own programming language with
     modern type inference"* — link to the repo + the YouTube video.
  3. **@ThePureState YouTube** — channel link + named video titles.

`v14 The Making` is the **exception** — it is the deep-dive landing
for the PXL story itself. All other variants demote PXL to the trail.

---

## Directive 2 — YouTube is first-class. Link it explicitly.

**Channel:** [@ThePureState](https://youtube.com/@ThePureState) — on
YouTube.

**The channel is Ronald's Cliff's-Notes.** If a prospect wants to
understand how he thinks, two videos beat an hour of reading. Every
Batch-4 variant links to the channel. Prominent variants may embed a
single `<iframe>` (lazy-loaded).

### Videos named in the channel (to reference by title where relevant)

*(Titles as Ronald documents them internally; URLs: agents should link
to the channel root and reference titles — not invent specific video
URLs. Where an embed is used, use the channel-page embed or the
channel handle's featured video.)*

- **"This is My Result Type"** — F# discriminated unions, three-line
  definition vs. 35-line explanations.
- **"Monads in the Wilderness"** — demystifying monads through
  everyday recognition (Playmobil-vs-Lego metaphor). BobKonf 2024.
- **"Computation Expressions in F#"** — BobKonf 2024 tutorial
  (with David Schaefer).
- **"A Hackable Frame" (Pt. 1)** — hands-on PXL Clock intro in the
  "Sendung mit der Maus" style.
- **"Pipe Operator"** — language-feature deep-dive across TS/C#/F#.
- **"VSCode REST Client"** — practical HTTP debugging workflow.
- **"How To Make a Programming Language"** — type-inference + solver
  from scratch (this is the TypeFighter video Ronald specifically
  wants linked).
- **"PXL-JAM 2024 Announcement"** — community hackathon launch.
- **"AI-Tutorial-Pipeline"** (upcoming / recent) — code → LLM → video
  automation.

### How to reference YouTube in a variant

1. Always: a **channel link** in the curiosity trail and/or footer.
2. Optional: **one embedded video** in the curiosity trail, lazy-
   loaded. Safe pattern — use `<iframe loading="lazy" srcdoc>` with
   a click-to-load poster to avoid YouTube's cookies until user opts
   in.
3. Optional: a **video-title list** ("If you want a ten-minute
   intro, watch: *How To Make a Programming Language*").
4. Variants focused on the YouTube channel (e.g. `v22 The Channel`)
   may make the channel the hero, but **still open with customer
   pain**, not with "watch my videos".

---

## Directive 3 — Lead-gen CTA discipline

**Change:** The original CTA *"Let's talk through your situation →
mailto:hello@schlenkr.dev"* is fine for a general-interest landing.
For a Google-Ads-driven lead-gen landing, more is needed:

- **The CTA must appear above the fold.** Even if the hero is
  question-driven, a visible button or clear link is reachable in the
  first viewport.
- **The CTA target is service-matched.** Options for the CTA target
  (pick per variant):
  - `mailto:hello@schlenkr.dev?subject=Training%20inquiry`
  - `mailto:hello@schlenkr.dev?subject=Consulting%20inquiry`
  - `mailto:hello@schlenkr.dev?subject=AI%20adoption%20review`
  - A plain `#contact` anchor to a contact block near the bottom.
- **One CTA, repeated.** Hero → mid-page → end. Same text or tight
  variants. Never two competing CTAs on one page.
- **No newsletter signup. No PDF download gate. No Calendly above the
  fold.** The goal is a conversation, not a list.

### Variant-specific CTA patterns

- **`v21 Direct Conversion`**: a visible button in the hero; service-
  matched subject line; ROI-lean copy.
- **`v23 Three Paths`**: each path has its own service-matched CTA;
  the three do not compete — the visitor picks one.
- **`v26 Minimal`**: one CTA, everything else orbits it.
- **Every other Batch-4 variant**: keep the canonical CTA, make sure
  it's reachable above the fold.

---

## Directive 4 — Services language

For lead-gen clarity, the **three top-level service names** on every
Batch-4 variant use this exact list:

- **Training** — workshops, live-coding, conference talks.
- **Consulting** — audits, architecture reviews, sparring, decision
  support.
- **Engineering** — hands-on AI pipelines, tooling, DSLs.

The "Engagement shapes" block from `CONTENT-CUSTOMER.md` stays — but
it sits *under* this three-word service menu, as detailed options.
Visitors from a Google Ads "AI consulting" search should see
*"Consulting"* labelled clearly within two seconds.

---

## Directive 5 — Content block for the curiosity trail

Paste-able, used verbatim in Batch-4 variants:

> ### If you're curious who's behind this page
>
> Outside client work, I build. **PXL Clock** is a 24×24 programmable
> LED display I co-founded with Sefa — engineered end-to-end by two
> people, shipping in limited batches from Frankfurt.
> [pxlclock.com](https://www.pxlclock.com/?ref=RONALD)
>
> **TypeFighter** is my experimental programming language — a modern,
> inference-first type system where records match by shape, not by
> declared name. Research-grade, explained end-to-end.
> [github.com/SchlenkR/TypeFighter](https://github.com/SchlenkR/TypeFighter)
>
> **@ThePureState** on YouTube is my channel for the longer arguments
> — language design, functional programming, AI workflows, the craft
> that underlies the consulting. A good place to start: *How To Make a
> Programming Language.*
> [youtube.com/@ThePureState](https://youtube.com/@ThePureState)
>
> And plenty of other work on
> [GitHub](https://github.com/SchlenkR) — FsHttp (499★, the F# HTTP
> library), Trulla (type-safe templates), TheBlunt (parser
> combinators), LocSta (stateful stream processing).

Variants may tighten this to two deep dives (PXL + YouTube, or
TypeFighter + YouTube) but must always include the YouTube channel.

---

## Directive 6 — Goal is lead generation

Every variant's hero must be scannable in **five seconds** by a
visitor arriving from a Google Ads search for *"AI consulting"*,
*"F# consulting"*, *"pragmatic engineering consultant"*, or *"Scrum
alternative"*. Within five seconds they should see:

1. A recognisable statement of their pain, OR a punchy statement of
   what's offered.
2. One of the three service words (Training / Consulting / Engineering).
3. A visible CTA.

If any variant fails any of those, fix it before shipping.

---

## Summary for agent briefings

Agents building Batch-4 variants must:

1. **Read `CONTENT-CUSTOMER.md` first** (canonical voice, frames,
   engagement shapes).
2. **Then read this file** (`CONTENT-DIRECTIVES-V3.md`) — these rules
   override any conflicting directive in the earlier file for Batch 4.
3. Keep the first-200-words customer-first rule.
4. Keep every hard constraint from `DESIGNER_BRIEF.md §7`.
5. Demote PXL from the main proof block; route it through the
   curiosity trail.
6. Link YouTube channel @ThePureState explicitly.
7. Put a visible CTA above the fold; use service-matched mailto
   subjects where appropriate.
