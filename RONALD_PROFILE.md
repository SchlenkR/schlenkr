# RONALD_PROFILE.md

> Interne Faktenlage, destilliert aus öffentlichen Quellen (GitHub, alter
> Blog-Stand, Repo-READMEs) und lokalen Notizen (Obsidian Vault, VideoProduction).
> Grundlage für alle Content-Entscheidungen der Landing-Page-Varianten.
> **Keine Erfindungen.** Lücken siehe §8.

Stand: 2026-04-22

---

## 1. Kurzportrait

Ronald Schlenker (**SchlenkR** auf GitHub, Frankfurt am Main) ist
selbstständiger Software-Entwickler, OSS-Autor und Tech-Consultant mit
starkem Schwerpunkt auf **funktionaler Programmierung (F#)** und seit ca.
2024/25 zunehmend auf **KI-gestützten Entwickler-Workflows**. Er firmiert
unter der Marke **PureState IT Consulting** (Company-Feld seines GitHub-
Profils; in Social Posts als `#ThePureState`, YouTube-Kanal
`@ThePureState`). Parallel baut er mit der **Cumin & Potato GmbH** das
Hardware/Software-Produkt **PXL Clock**.

Die drei sichtbaren Rollen in einem Atemzug: **F#-Developer · Tech
Consultant · OSS-Creator**. Der eigene Claim aus dem alten Blog war
länger: *"F# ❤️ Developer | Tech Consultant | OSS Creator | Conference
Speaker"*. Auszeichnung als **Recognized F# Expert** (F# Foundation
"Applied F# 2019").

---

## 2. Kompetenzprofil

### Kern-Stack

| Bereich | Stack / Tools | Tiefe-Beleg |
|---|---|---|
| **.NET / F#** | F#, C#, Fable, Avalonia, MAUI, ASP.NET | Mehrere größere OSS-Libs, 2019 vom F# Foundation als "Recognized F# Expert" anerkannt. |
| **Sprach-/Compiler-Design** | Type Inference (Hindley-Milner), strukturelle Typen, Parser-Combinators, Row-Polymorphism | Eigenentwicklungen: Trulla (Template-TP/Source-Generator), TypeFighter (Research-Sprache), TheBlunt (Parser-Combinator Lib). |
| **State-aware / FP-Architektur** | Stateful stream processing, Monoide, Signal-Blöcke | Vide (UIs + DSP), LocSta (fsprojects). |
| **HTTP-APIs / Tooling** | F#-/C#-DX, CE-Syntax, Fluent API | FsHttp (499 Stars, 128 dependents, fsprojects-Org). |
| **Creative Coding / Embedded** | LED-Matrix 24×24, Hot-Reload-Simulator, OTA | PXL Clock: F# 55.7 %, C# 34.4 %, WebSocket-Live-Preview, VSCode-Extension. |
| **Web / Frontend** | TypeScript, JavaScript, HTML/CSS, Vite, Remotion | AI-Tutorial-Pipeline (Remotion + TS), Barbara-Sailer-Site (Vite MPA), Post-Dashboard (vanilla JS). |
| **AI / LLM-Engineering** | Claude-Agent-SDK/Skills, Prompt-Pipelines, Code→Video-Automation, Agent-Architekturen | siehe §2.1. |

### 2.1 KI-Schwerpunkt — **mit Belegen**

Ronald ist **nicht** Konsument von ChatGPT-Prompts. Er baut Pipelines, in
denen LLMs *Teil* einer deterministisch orchestrierten Toolchain sind:

- **AI-Tutorial-Pipeline** (VideoProduction, Projekt 15, Script + Produktion
  komplett): Code → LLM-Dekomposition in Schritte (250-zeilige Skill-Datei
  als Spec) → Remotion/TypeScript-Rendering → fertige Reels. Leitmotiv:
  *"Vibe coding != not paying attention."*
- **docs.pxlclock.com**: Eigener Static-Site-Generator mit Claude Sonnet 4
  im "Vibe-Coding"-Modus, aber mit expliziter Aufsicht.
- **TypeFighter-Reboot** (April 2026): Sprach-Design **zusammen** mit KI —
  nicht nur Code-Generierung, sondern konzeptionelle Co-Exploration.
- **Barbara-Sailer-Landing-Page** (barbaraseiler-Repo): 38 Iterationen,
  KI als *Researcher + Brief-Generator* ("summarize this as a brief for a
  real designer"). Das Meta-Muster ist Ronalds eigentliche These.
- **Post Dashboard**: 300 LOC C# + 500 LOC Vanilla JS, Markdown+YAML als
  Storage, lokaler Server, Claude Code als Draft-Tool.
- **HALloDave / Agenty-Framework** (Video-Ideen, nicht veröffentlicht):
  "We build ourselves agents in C#", "Build an AI with only 30 words",
  "Security-Agent Setup" — geplante Tutorial-Serie.

**Niveau**: baut Agents/Pipelines/Tooling, nicht nur "nutzt Tools". KI
wird als *drifty, aber produktives Werkzeug* behandelt — mit expliziten
Safety-Nets (Skills, Specs, Multi-Turn-Loops, deterministisches Post-
Processing). Zitat Bluesky 2025: *"AI is amazing… but it can't deliver
what I'd expect as minimum from a 'real' coworker."*

### 2.2 Sekundär-Stack / Nennungen

- JavaScript, TypeScript, HTML/CSS — täglicher Gebrauch (alter Blog).
- DSP / Audio: `01_fsharp_dsp`-Serie (Blog-Archiv, 12 Teile), BOB-Konf
  2024 Vortrag *"Monads"*, Vide-DSP.
- Video-Produktion: Skript, Remotion, Thumbnail-Sourcing (Fiverr/Upwork),
  Live-Coding-Setup (OBS, VSCode-Setup, Checklisten).

---

## 3. Projekt-Portfolio

| Projekt | Kurzbeschreibung | Rolle | Tech-Stack | Link | Außensichtbarkeit |
|---|---|---|---|---|---|
| **FsHttp** | "Hackable HTTP client" — F#/C# mit CE + Fluent API | Creator + Maintainer (fsprojects-Org) | F# | [fsprojects/FsHttp](https://github.com/fsprojects/FsHttp) | **OSS** · 499 ★, 128 dependents |
| **Vide** | State-aware function composition für UIs (Fable/Avalonia/MAUI) + DSP | Creator | F#, Fable | [SchlenkR/Vide](https://github.com/SchlenkR/Vide) | **OSS** · 93 ★ · derzeit nicht aktiv maintained |
| **Trulla** | Typsichere Text-Templates als F# Type Provider / C# Source Generator / Node CLI | Creator | F# | [SchlenkR/Trulla](https://github.com/SchlenkR/Trulla) | **OSS** · 71 ★ |
| **TypeFighter** | Research-Sprache: strukturelle Records, Set-Theory-Union-Types, Inference-first | Creator | F# + TS (AST Visualizer) | [SchlenkR/TypeFighter](https://github.com/SchlenkR/TypeFighter) | **OSS** · 22 ★ · 2026 rebootet, z. T. mit KI-Co-Design · Lizenz restriktiv |
| **LocSta** | Stateful Stream-Processing für F# (Composable Signal Blocks, Auto-State-Threading) | Creator | F# | [fsprojects/LocSta](https://github.com/fsprojects/LocSta) | **OSS** (fsprojects) · Live-Demo vorhanden |
| **TheBlunt** | One-File Recursive-Descent Parser-Combinator-Lib für F# / Fable | Creator | F# | [SchlenkR/TheBlunt](https://github.com/SchlenkR/TheBlunt) | **OSS** |
| **FluX** | (genannt im AI-Briefing) | — | — | — | TODO: Repo prüfen |
| **PXL Clock** | 24×24 RGB-LED-Matrix, programmierbar in C#/F# via VSCode-Extension mit Hot-Reload-Simulator | Mit-Gründer · Cumin & Potato GmbH | F# 55.7 %, C# 34.4 % | [SchlenkR/pxl-clock](https://github.com/SchlenkR/pxl-clock), [pxlclock.com](https://www.pxlclock.com/?ref=RONALD) | **Produkt** · Shop live · Discord-Community · PXL-JAM-Hackathon |
| **post-dashboard** | Eigenes Social-Media-Workflow-Tool (Markdown → Dashboard) | Creator | C# + Vanilla JS | — (GitHub) | **persönlich/intern** |
| **barbaraseiler** | 44-Varianten-Landing-Page als Live-Methodik für KI-gestütztes Web-Design | Creator | Vite MPA, CDN-only | [SchlenkR/barbaraseiler](https://github.com/SchlenkR/barbaraseiler) | **Kunden-/Showcase-Projekt** |
| **AI-Tutorial-Pipeline** | Code → KI-dekomponiert → Remotion-Reels-Rendering | Creator | C#, F#, Remotion, TS, Claude-Skills | in VideoProduction, Showcase | **persönlich/WIP** |

Brand-Assets (vorhanden im `archive/old-blog`-Branch unter `img/`):
Logo-PNGs für Vide, FsHttp, TheBlunt, Trulla, LocSta + `banner.png`. Kein
Personen-Logo / keine Wortmarke für "Ronald Schlenker" oder "PureState"
in diesem Ordner belegt → siehe §8.

---

## 4. Stationen & Langjährigkeit

Chronologie ist grob — harte Daten (Beschäftigung, Kunden) nicht im
gescannten Material. Nur was belegt ist:

- **vor 2017** (spätestens): F# DSP-Serie `01_fsharp_dsp` (12-teilig) im
  Blog — zeigt bereits tiefes Verständnis für stateful composition,
  Monoide, Funktions-Pipelines. Zeitpunkt erster Commits im alten Blog-
  Repo wäre via `git log` auf `archive/old-blog` zu rekonstruieren (TODO).
- **2019**: Anerkennung als *Recognized F# Expert* durch die F#
  Foundation ("Applied F# 2019").
- **2019–2024**: FsHttp wächst zur fsprojects-Lib, 499 ★. LocSta wandert
  ebenfalls nach fsprojects. Vide, Trulla, TheBlunt entstehen parallel.
  Conference-Auftritt **BobKonf 2024 — Monads** (Berlin).
- **2024**: Gründung **PXL-JAM** (erstmals Dezember 2024, siehe
  VideoProduction/Projekt 12 — Announcement-Script).
- **2025–2026**: Verschiebung Richtung **KI-Engineering** — AI-Tutorial-
  Pipeline, Claude-Skills, barbaraseiler-Methodik, TypeFighter-Reboot.
  Parallel: PXL Clock geht in Verkauf (Discord, Shop, Code `RONALD`).

Aussagen zum Selbstständigen-Status:
- Alter Blog-Claim: *"As a freelancer, you can hire me."*
- GitHub-Bio: *"You can hire me!"*
- Firma: **PureState IT Consulting** (GitHub-Profil-Company-Feld).

---

## 5. Markenstimme

Beobachtete Tonalitäts-Achse: **technisch-präzise × sachlich-warm ×
streitbar-humorvoll**. Deutsch (reflektierter, wärmer) und Englisch
(strukturierter, pitchiger) gleichermaßen souverän. Kein Buzzword-Speak.
Gibt eigene Kosten/Fehler zu.

Belegende Zitate:

1. *"Even with the best model at max effort — the AI drifts sooner or
   later. It adds things you didn't ask for, code quality decreases…
   'Vibe' doesn't mean 'don't pay attention'. Quite the opposite."*
   — LinkedIn (Worm Promo, 04/2026)

2. *"#csharp is a BRAIN SUCKER! It requires thinking about things that a
   good language should already know."*
   — Bluesky, 01/2025

3. *"Objects are not composable. They are like Playmobil… Lego is
   composable."*
   — VideoProduction, Script "Monads in the Wilderness"

4. *"Build small tools. Give the AI a structure to work in. That's when
   you get reproducible results — and that's when AI gets actually
   useful."*
   — VideoProduction, Script "15 – AI-Tutorial-Pipeline"

5. *"How do you end up at 38? By refusing to commit to a direction too
   early… when you build with AI, it's the better strategy anyway."*
   — LinkedIn, zum barbaraseiler-Projekt, 04/2026

6. Alt-Claim, ungeschönt: *"Build software that is performant,
   maintainable over years, scalable and affordable."*
   — altes Blog-README

Stil-Invarianten:
- **Belegen statt behaupten**: liefert Code/Projekte/Zahlen statt
  Adjektiven.
- **Siezen/Duzen**: deutsche Texte wirken konsistent **duzend** und
  kollegial (VideoProduction-Scripts, Obsidian), englische Posts
  casual-professional. Offizielle Haltung noch offen — siehe §8.
- **Emoji-Spar-Einsatz**: ❤️, ⚡, 👉🏼 im alten Blog; insgesamt dezent.
- **Keine Rage-Bait-Tonlage**, auch bei starken Thesen. Humor ist
  beobachtend, nicht zynisch.

---

## 6. Wiederkehrende Denkfiguren

Muster, die quer durch Obsidian, VideoProduction und Repo-READMEs
auftauchen — jede als eigenständige These verwertbar:

1. **"Komposition schlägt Objekte"** — Lego vs. Playmobil. Pure Functions
   lassen sich unbegrenzt neu zusammenstecken; Objekt-Hierarchien sind
   Sackgassen.
2. **"Syntax spiegelt Kognition"** — eine Sprache taugt, wenn ihre
   Notation zum Denken passt. F#-Pipes, Pattern-Matching, DUs als
   Evidenz.
3. **"Typ-Inferenz macht Code offensichtlich"** — HM-Inference +
   strukturelle Typen ersparen Boilerplate *und* Erklärungen. Trulla,
   TypeFighter, `This is My Result Type` (3 Zeilen statt 35).
4. **"KI driftet — Disziplin rettet"** — LLMs produktiv machen = Struktur
   geben (Skills, Specs, kleine Tools, Multi-Turn-Loops). Ohne Aufsicht
   entsteht nur Zufall.
5. **"Tools bauen statt SaaS kaufen"** — Post Dashboard, AI-Tutorial-
   Pipeline, Static-Site-Generator: lokal, minimal, *tut genau was nötig
   ist, nichts mehr*.
6. **"Erklären durch Bauen"** — Didaktik via echtes Produkt. PXL Clock
   als Lehrmaterial, BobKonf-Monaden, "Sendung mit der Maus"-Style
   (A Hackable Frame).
7. **"F# hat's schon gelöst"** — was Mainstream-Sprachen nachbauen
   (Pattern-Matching, Records, Pipes), gibt's in F# seit Jahrzehnten.
8. **"Honest about cost"** — PXL Clock "cost us a lot of time and
   money", AI "drifts", Scrum-Dogma "teach needs, not rituals".
   Transparenz als Signal.

Das mögliche Dach-Motiv, das sich aus diesen Figuren ergibt: **"Struktur
gewinnt — sowohl bei Typen als auch bei KI-Workflows."**

---

## 7. Zielgruppen-Signale

Wer reagiert / zu wem passt das Profil (aus Posts, Communities, Projekt-
Audiences):

- **F#-/.NET-Community** (primär): fsprojects-Org-Membership, BobKonf-
  Auftritt, F# Foundation Recognition, F# Advent Calendar, Vide/LocSta-
  Userbase.
- **Funktionale-Programmierung-Lehrige & Umsteiger**: Blog-DSP-Serie,
  Piping-Vergleiche TS/C#/F#, "Monads in the Wilderness" — explizit für
  Skeptiker/Neugierige.
- **KI-Praktiker (Developer-Seite)**: Claude-Skill-Autoren, Leute die
  Pipelines bauen (nicht Prompt-Kiddies). AI-Tutorial-Pipeline,
  barbaraseiler-Methodik.
- **Creative-Coding / Maker**: PXL Clock + PXL-JAM-Community (Discord,
  Hardware-Käufer, Hackathon-Teilnehmer).
- **Workshop-/Konferenz-Teilnehmer** (latent, weniger Beleg): Ton aus
  VideoProduction signalisiert Lehr-Ambition; expliziter Workshop-
  Auftritt ist bisher nur via "Schulungen"-Erwähnung in Projekt-10-
  Production-Notiz belegt.

Was **nicht** zur Zielgruppe passt:
- "No-Code"-Publikum.
- Enterprise-Compliance-getriebene Einkäufer, die nur Namen von Big-Four
  akzeptieren.
- Reine Frontend-Design-Community ohne technischen Anspruch.

---

## 8. Offene Fragen / Lücken

Alles, was nicht aus den Quellen zu holen war und für Positioning
(Phase 1) oder Go-Live (Phase 5) geklärt werden muss:

**Faktenbasis:**
1. **Kundenliste / Referenzen / Testimonials**: keine belegten
   Kundennamen in Obsidian/VideoProduction/Blog-Archiv. Gibt es zitier-
   fähige Kundenprojekte oder ist der Proof rein OSS?
2. **Rate / Engagement-Modell**: Tagessatz, Projektpreise, Retainer,
   Workshops? Nicht belegt.
3. **Früher beruflicher Werdegang**: vor 2019 keine belegten Stationen
   — Angestelltenverhältnis? Ausbildung? Studium (vermutlich, aber nicht
   belegt)?
4. **Rechtsform für Consulting**: "PureState IT Consulting" ist Company-
   Feld auf GitHub — ist das eine registrierte Firma (UG/GmbH/
   Einzelunternehmer)? Adresse, Sitz? Cumin & Potato GmbH ist für PXL-
   Clock, nicht fürs Consulting?
5. **Sprach-Präferenz für Kunden-Akquise**: DE-Markt (Frankfurt), DE/EN
   beides? Remote weltweit oder D-A-CH?

**Marken-Assets:**
6. **Logo / Wortmarke**: kein Personen-Logo und keine "PureState"-
   Wortmarke im `archive/old-blog/img/` (nur Projekt-Logos). Existiert
   eins?
7. **Foto / Porträt**: kein Bild im Repo. Auf LinkedIn/X vermutlich
   vorhanden — Recht zur Verwendung?
8. **Farb- / Typo-Vorgaben**: "PureState" als Brand — gibt's eine
   bestehende Farbwelt? YouTube-Kanal-Branding als Referenz?

**Strategische Vorgaben** (kommen in POSITIONING.md §Abschluss nochmal
explizit als Block zurück an Ronald — dort sind die 8 Phase-1-Fragen aus
AI_BRIEFING §240–258 gebündelt).

**Nachzuziehen** (Nice-to-have, selbst machbar aber bislang nicht
priorisiert):
- Chronologie via `git log` über alle wichtigen Repos für ein Zeitstrahl-
  Grundgerüst (erste Commits, Release-Zeiten).
- LinkedIn-/YouTube-URLs: YouTube ist `@ThePureState`, LinkedIn nicht
  explizit in den Quellen gelistet (Posts verweisen auf LinkedIn, URL
  nicht vermerkt).
- X/Twitter `@schlenkr` ist inzwischen hinter Paywall erreichbar —
  Bluesky `@schlenkr.bsky.social` ist die aktive Alternative.
- Der alte Account **github.com/ronaldschlenker** ist **404**
  (Bestätigung: AI_BRIEFING-Vermutung korrekt).

---

## 9. Quellenverzeichnis

Öffentliche Quellen:
- GitHub-Profil `SchlenkR` (Pinned: Vide, FsHttp, Trulla, TypeFighter).
- Repo-READMEs: Vide, FsHttp, Trulla, TypeFighter, PXL Clock.
- Alter Blog (Branch `archive/old-blog`, `README.md`, `src/content/`).
- Linktree `linktr.ee/SchlenkR` (geblockt bei WebFetch — Inhalt
  stattdessen aus GitHub-Bio + Obsidian-Verlinkungen rekonstruiert).
- X / Bluesky: Bio via GitHub-Profil-Links bestätigt, direkter X-Fetch
  hinter Paywall.

Lokale Quellen:
- Obsidian Vault:
  `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Default/`
  (SocialMedia/, Listen/).
- VideoProduction:
  `~/Library/Mobile Documents/com~apple~CloudDocs/VideoProduction/`
  (Projects/00 – 15, _done/, _ideas and scripts/).
- Repo `schlenkr`, Branch `origin/archive/old-blog` (alter Blog-Stand mit
  img/-Logos).

Nicht erreichbar / nicht genutzt:
- `github.com/ronaldschlenker` — 404.
- `twitter.com/schlenkr` — Paywall/402.
- `linktr.ee/SchlenkR` — 403.
