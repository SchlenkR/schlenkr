# POSITIONING.md

> Content-Strategie für die Landing-Page. Abgeleitet aus `RONALD_PROFILE.md`.
> Liefert die wiederverwendbaren Bausteine, aus denen alle Varianten
> schöpfen. Am Ende: offene Fragen an Ronald (§7).

Stand: 2026-04-22

---

## 0. Positionierung in einem Satz

> **Ronald Schlenker hilft technisch anspruchsvollen Teams, KI-gestützte
> Software-Workflows so zu bauen, dass Ergebnisse reproduzierbar,
> wartbar und nicht vom Glück abhängig sind — mit 15+ Jahren FP-/Sprach-
> Design-Erfahrung im Rücken.**

Kurz-Claims als Alternativen (pro Variante wählbar):
- *"Struktur gewinnt — bei Typen und bei KI."*
- *"Vibe coding, ja — aber nicht ohne Disziplin."*
- *"KI-Workflows, die am Montag noch genauso funktionieren wie am
  Freitag."*
- *"OSS-Creator, F#-Expert, KI-Pragmatiker. Hire me."*

**No-go-Sätze** (siehe §6): alles mit "transformieren", "empower",
"Synergien", "Agility-Coach" — passt nicht zur belegten Tonalität.

---

## 1. Angebot: Schulung · Beratung · Entwicklung

Drei Leistungen, ein Muster. Jede hat denselben Kern: **KI-gestützte
Entwicklung, gebaut auf stabiler FP-Denkweise**. Sie unterscheiden sich
nur darin, ob Ronald **lehrt**, **strategisch berät** oder **selber baut**.

### 1.1 Schulung

- **Formate**: Inhouse-Workshops (0.5–3 Tage), Live-Coding-Remote-Sessions,
  kuratierte Video-Lern-Serien, BobKonf-Style-Konferenz-Talks.
- **Themen (belegt durch Projekte / Videos)**:
  - KI-Workflows für Entwickler: Skills, Specs, Multi-Turn-Loops,
    deterministisches Post-Processing.
  - Funktionale Programmierung in .NET: F# als Denkwerkzeug, Piping,
    Pattern-Matching, Typ-Inferenz.
  - Sprach-/DSL-Design und Compiler-Basics (Parser-Combinators, HM-
    Inference).
  - DSP in F# (Vide, LocSta) — Nischenkompetenz, Referenz-Serie im alten
    Blog.
- **Typischer Kunde**: Dev-Team (5–30 Leute) in DACH, das KI-Tools
  ernsthaft einsetzen will — nicht als Spielerei, sondern als produktive
  Infrastruktur.
- **Nutzenversprechen (1 Satz)**: *Dein Team lernt, KI so zu orchestrieren,
  dass der Output am Montag noch den Review-Standard vom Freitag hält.*
- **Abgrenzung (1 Satz)**: *Kein Prompt-Engineering-Buzzword-Theater —
  sondern Handwerk, mit dem Ronald seit zehn Jahren OSS ausliefert.*

### 1.2 Beratung

- **Formate**: Discovery-Call → Kurz-Audit (1–3 Tage) → schriftliche
  Empfehlung · oder: Sparring-Retainer über Monate · oder: einmalige
  Architektur-Review.
- **Themen**:
  - KI-Integration in bestehende Dev-Prozesse (Codegen, Review, Test,
    Docs, Content-Pipelines).
  - Sprachwahl / Stack-Strategie, besonders wenn F# / funktionaler Ansatz
    erwogen wird.
  - Tool-statt-SaaS-Entscheidungen (sein wiederkehrendes Motiv: kleine
    eigene Tools schlagen Feature-Bloat).
  - Maintenance-Strategie für OSS-Libs / interne Frameworks.
- **Typischer Kunde**: CTO / Engineering-Lead in Produkt-Firmen, der
  nicht die zehnte "AI Coding Assistant"-Vendor-Demo will, sondern eine
  ehrliche Einschätzung, was im eigenen Team trägt.
- **Nutzenversprechen**: *Klarheit statt Hype — eine ehrliche Einordnung,
  wo KI produktiv ist und wo sie dich teuer zu stehen kommt.*
- **Abgrenzung**: *Ronald baut selber Pipelines, die in Produktion laufen
  — er berät nicht aus Foliensätzen.*

### 1.3 Entwicklung

- **Formate**: Festpreis-Prototyp, Time-&-Material-Projekte, OSS-
  Contracting (Open-Source-Lib als Lieferobjekt), Pairing mit internem
  Team.
- **Themen**:
  - KI-Pipelines (wie AI-Tutorial-Pipeline: Code → LLM → deterministisches
    Rendering).
  - Entwickler-Tooling (Dashboards, DSL-basierte Config, Code-Generation
    wie Trulla).
  - Reaktive / state-aware UI-Komponenten (Vide-Stack: Fable, Avalonia).
  - Embedded / Creative-Coding-Beratung auf PXL-Clock-Niveau (C#/F#
    für eingeschränkte Hardware).
- **Typischer Kunde**: Startup / Product-Team, das eine ungewöhnliche
  technische Herausforderung hat — KI + FP + DSL + Tooling-Mix, nicht
  "noch ein CRUD".
- **Nutzenversprechen**: *Du bekommst Code, der sich in fünf Jahren noch
  lesen lässt — weil derjenige, der ihn geschrieben hat, ihn auch selbst
  noch lesen will.*
- **Abgrenzung**: *Ronald sagt "nein" zu Standard-Aufgaben, bei denen er
  keinen Unterschied macht. Dafür zu 100 % "ja" bei Projekten, die seine
  Nische treffen.*

---

## 2. KI-Schwerpunkt konkret — Was kann Ronald, was andere nicht (so) können

Drei Alleinstellungen, jede mit direktem Beleg aus Phase 0:

1. **KI + deterministische Toolchain**.
   Ronald behandelt LLMs als *eine* Komponente, die von stabilen Tools
   (Skills, Specs, Remotion-Rendering, Compiler, Test-Harness) umrahmt
   ist. Beleg: AI-Tutorial-Pipeline (Code → LLM-Dekomposition → Remotion-
   Reels); barbaraseiler (44 Varianten mit KI als Researcher + Brief-
   Generator); TypeFighter-Reboot als KI-Co-Design.

2. **FP-/Typ-Denke als Safety-Net gegen LLM-Drift**.
   Die gleiche Diszplin, die ein Typ-Inference-Solver braucht, hilft
   LLM-Workflows: enge Schnittstellen, klare Verträge, wenig Boilerplate
   zum Nachdenken. Beleg: Trulla (typsichere Templates), TypeFighter
   (strukturelle Records), Vide (state-aware functions). Die Übertragung
   "das, was Typen leisten, übernehmen Skills/Specs bei KI" ist Ronalds
   eigene These.

3. **Lehrbar**.
   Ronald kann nicht nur liefern, er kann es auch **zeigen**:
   BobKonf-Monaden-Talk, 12-teilige DSP-Serie, PXL-Clock-Tutorials,
   AI-Tutorial-Pipeline als Live-Beispiel für reproduzierbare AI-Docs.
   Beleg: VideoProduction-Ordner mit 11+ Projekt-Skripten, Lehr-Duktus
   auch in Social Posts.

Das Gegenbild (was *nicht* belegt ist und daher **nicht** behauptet werden
darf):
- Keine Erfahrung mit Foundation-Model-Training, RLHF, Eval-Benchmarks
  auf Research-Niveau.
- Keine belegbare Enterprise-LLM-Compliance-Beratung (SOC2, EU-AI-Act-
  Audits).
- Kein Massen-Data-Pipeline-Hintergrund (Spark, Databricks, Kafka).

---

## 3. Zielkunden-Personas

Drei Schärfungen. Jede soll sich in mindestens einer Variante spiegeln
lassen.

### Persona A — *"Pragmatischer CTO einer Mid-Size-Produktfirma"*

- **Kontext**: 30–120 Devs, .NET-lastig oder Polyglot, erwägt ernsthafte
  KI-Integration in Build-/Test-/Doc-Prozesse. Hat Vendor-Demos gesehen.
- **Schmerz**: Weiß nicht, ob er einem Copilot-Hype hinterherlaufen soll
  oder es selber baut. Jeder Vendor behauptet dasselbe. Er braucht eine
  unabhängige technische Stimme.
- **Warum Ronald**: kein Reseller-Interesse. Baut selbst. Sagt, was
  nicht geht. Kennt .NET-Ecosystem tief.

### Persona B — *"F#-/Funktionale-Team-Lead in Nischen-Produktfirma"*

- **Kontext**: Finanz-, DSP-, Gaming- oder Analytics-Firma mit F#/OCaml/
  Scala-Codebase. Sucht jemanden, der Architektur-Reviews fährt,
  DSL-Entwicklung leitet oder ein Maintenance-Problem in OSS-Deps
  adressiert.
- **Schmerz**: Findet selten jemanden, der funktionale Codebasen auf
  Senior-Level wirklich versteht. Big-Four-Consulting schickt Java-Leute.
- **Warum Ronald**: Recognized F# Expert, fsprojects-Maintainer,
  Compiler-/Sprach-Design-Hintergrund. Klarer Match.

### Persona C — *"Workshop-Einkäufer in Dev-getriebener Firma / Konferenz-Orga"*

- **Kontext**: Engineering-Manager, Konferenz-Track-Lead, Developer-
  Enablement. Sucht Sprecher / Trainer für: KI-Workflows, FP-
  Grundlagen, DSL-Design, DSP-Themen.
- **Schmerz**: Die üblichen Speaker liefern Folienschlachten ohne
  Substanz, oder reine Live-Coder ohne didaktische Linie.
- **Warum Ronald**: BobKonf-Track-Record, Video-Skripting-Disziplin,
  bereits PXL-JAM als Community-Format aufgebaut, Lehr-Tonlage belegt.

---

## 4. Proof Points — nach Relevanz

Reihenfolge ist absichtlich gewählt: KI-Belege zuerst (Positioning-
Schwerpunkt), dann FP-/OSS-Tiefen, dann Produkt-/Community-Beleg.

1. **AI-Tutorial-Pipeline** (VideoProduction-Projekt 15) — zeigt
   Orchestrierung LLM + Remotion + deterministische Specs.
2. **barbaraseiler-Site** (44 Varianten, KI-als-Researcher-Methodik) —
   zeigt iteratives Vorgehen *mit* KI.
3. **FsHttp** — 499 ★, 128 dependents, fsprojects-Org. Langfrist-OSS-
   Liefer-Nachweis.
4. **Vide** — state-aware composition. Demonstriert FP-Architektur-
   Denken über Plattformen hinweg (Web/Desktop/Mobile/DSP).
5. **Trulla / TypeFighter** — Sprach-/Compiler-Design-Tiefe.
6. **PXL Clock** — eigenes Produkt, C#/F# auf Hardware, Shop + Discord-
   Community + Hackathon.
7. **BobKonf 2024 Monads** — Speaker-Beleg.
8. **Recognized F# Expert 2019** (F# Foundation) — formale Anerkennung.

Was explizit **nicht** auf dem Proof-Pool steht, bis geklärt: Kunden-
Testimonials (siehe §7).

---

## 5. CTAs

**Primär**: *"Unverbindliches Kennenlern-Gespräch"* (Calendly-Link oder
Kontakt-Formular). Konsistent mit "hire me"-Tonalität im Bio.

**Sekundär** (je Variante wählbar):
- *"Zum GitHub-Profil"* — für Skeptiker, die Proof wollen, bevor sie
  schreiben.
- *"PXL Clock ansehen"* — bei Varianten, die das Produkt als Beweis
  inszenieren.
- *"Zum YouTube-Kanal"* / *"Zum Blog"* — Content-First-Funnel.
- *"Als Speaker anfragen"* — für Konferenz-/Workshop-Persona.

**Anti-CTA**: kein Newsletter-Formular bis geklärt ist, dass es einen
gibt. Kein "Download Whitepaper" — nicht Ronalds Stil.

---

## 6. No-gos

Basierend auf belegter Tonalität und Phase-0-Beobachtung. Varianten, die
davon abweichen, sind Debatte wert — nicht gesetzt:

- **Buzzword-Bingo**: "transformieren", "empower", "digital journey",
  "Synergie", "nächste Stufe". Beleg: Ronald nennt C# einen "brain
  sucker" — er würde solche Marketing-Sprache selbst verspotten.
- **Agentur-Ästhetik** (Stock-Portraits, Hero-Slide mit Business-
  Handshake, "Wir sind ein Team von…" obwohl es Einzelfirma ist).
- **Fake-Social-Proof**: keine erfundenen Kunden-Logos. Nur was belegt
  werden kann.
- **Versprechungen ohne Beleg**: keine Zahlen-Behauptungen ("300 %
  Produktivität") ohne Quelle.
- **Politik / persönliche Meinungen**, die nicht klar zur Consulting-
  Marke gehören — ausgenommen die dokumentierte Haltung zu
  FP/AI-Craft. (Ronalds Bürgergeld-Rechner-Post ist stark, gehört aber
  in Content, nicht in den Hero.)
- **Kosten-Versteckerei**: wenn Rates transparent sind, nicht
  relativieren. Wenn nicht, nicht heucheln. (Entscheidung siehe §7.)

---

## 6a. Locked Decisions (2026-04-22, Ronald)

Ronald hat auf §7 geantwortet. Für alle folgenden Varianten gilt:

| # | Thema | Entscheidung |
|---:|---|---|
| 1 | Deployment | **GitHub Pages** zunächst, Vite-Build self-contained, später frei deploybar. Domain offen. |
| 2 | Brand-Assets | **Keine vorhanden.** Jede Variante erfindet eigene Farben/Fonts — Brand-Vorschläge willkommen. |
| 3 | Leistungs-Priorität | **Alle Varianten nennen alle drei Leistungen gleichwertig.** |
| 4 | Eigene Projekte prominent | **Ja**: PXL Clock, FsHttp, TheBlunt, TypeFighter, YouTube-Kanal. **Vide dezent** / optional. |
| 5 | Live-KI-Demo | **Nein** (vertagt; evtl. später als Memory-Experiment). |
| 6 | Social Proof | Keine Fake-Testimonials. **Deep Research auf echte öffentliche Lobpreisungen** (Tweets, Posts, auch prominente Leute). Zur Not Dummy als letzte Option. |
| 7 | Sprache | **Englisch** — Du/Sie-Frage obsolet. |
| 8 | Rates | **Keine Preise / Rate-Signale.** |
| 9 | Impressum | **Dummy-Daten** in Idee-Phase. Echte Angaben erst vor Go-Live. |
| 10 | Markt | **DACH + Remote EU**, Site-Sprache Englisch. DSGVO/Legal nicht in dieser Phase. |
| 11 | Foto | **Platzhalter / Demo-Fotos / ggf. generierte Bilder** nach YouTube-Referenz. "No-Photo" als Design-Entscheidung ist legitim. |

---

## 7. Offene Fragen an Ronald — beantwortet, siehe §6a

Diese acht Fragen stammen aus AI_BRIEFING §240–258, plus drei, die sich
aus Phase 0 zusätzlich ergeben haben. Ich bitte um je 1–2 Sätze Antwort
oder um explizites *"egal, entscheide du"*.

### Aus AI_BRIEFING

1. **Deployment-Ziel**: GitHub Pages (wie barbaraseiler) / Cloudflare
   Pages / eigener Server? Final-Domain: `schlenkr.de`,
   `ronaldschlenker.com`, `schlenkr.dev`, `purestate.de` —
   oder eine andere Domain?

2. **Farb-/Font-Entscheidung**: Gibt es bestehende Brand-Assets für
   **PureState** (YouTube-Kanal-Branding, Logo, Farbwelt), oder darf
   ich pro Variante frei wählen? Im `archive/old-blog/img/` liegen nur
   Projekt-Logos (Vide, FsHttp, TheBlunt, Trulla, LocSta), kein
   Personen-/PureState-Logo.

3. **Priorisierung der Leistungen**: Wenn eine Variante **eine** Leistung
   betonen *muss* — ist **Schulung**, **Beratung** oder **Entwicklung**
   das Kernangebot aktuell? Oder bewusst gleichgewichtig?

4. **Persönliche Projekte als Referenz**: PXL Clock, Vide, FsHttp
   **prominent** zeigen (Breite demonstrieren) oder **dezent** halten
   (Fokus wahren, damit Consulting nicht wie Hobby wirkt)?

5. **KI-Demos auf der Site selbst**: In Phase 4 könnten wir einen
   Live-Chatbot/Agent bauen. Okay — und wenn ja: **lokal**
   (WebLLM / transformers.js, aber Größen-/Qualitäts-Grenzen) oder
   **via API-Endpoint** (Claude/OpenAI-Proxy, dann aber Kosten und
   DSGVO-Aufwand)?

6. **Social Proof**: Gibt es zitierfähige Kunden-Testimonials
   (Name + Aussage + ggf. Logo-Erlaubnis)? Oder ersetzen wir Proof
   durch OSS-Zahlen (Stars, Dependents) + F#-Foundation-Anerkennung +
   Speaker-Track-Record?

7. **Tonalität**: **Du** oder **Sie**? Im alten Material überwiegt DU
   in deutschen Texten. Ich würde das übernehmen, wenn du nicht
   widersprichst.

8. **Rate-/Budget-Signale**: **transparent** (Tagessatz-Range nennen),
   **bewusst nicht** (Rates erst im Gespräch), oder **implizit**
   ("Premium-Engagements")?

### Zusätzlich aus Phase 0

9. **Rechtsform fürs Consulting**: Ist "PureState IT Consulting" eine
   registrierte Firma (UG/GmbH/Einzelunternehmer) oder nur Branding?
   Für Impressum brauche ich: Name, Adresse, Email, Tel, ggf.
   USt-ID. Cumin & Potato GmbH ist nur für PXL-Clock, richtig?

10. **Markt-Fokus**: DACH / Remote EU / Remote weltweit? Beeinflusst
    Sprache (nur DE, DE+EN, nur EN) und Compliance-Ebene (DSGVO-only
    oder auch EU-AI-Act-Hinweis nötig).

11. **Foto / Porträt**: Gibt's ein freigegebenes Bild, das ich nutzen
    darf? Sonst: "kein Foto" als bewusste Design-Entscheidung
    (funktioniert bei einigen Varianten sogar stärker)?

---

## 8. Sobald §7 beantwortet ist

Nächste Schritte (Phase 2 / 3):

1. Manifest-/Lanes-Setup und Impressum-/Datenschutz-Templates aus
   `barbaraseiler` übernehmen, Ronald-Kontext einsetzen.
2. **Roots-Batch** (Phase 3 § Phase 1): 5–6 stilistische Grund-Varianten
   mit demselben Content aus diesem Dokument. Erste Ideen (noch nicht
   ins Ideen-Log, weil §7 noch offen):
   - v1 "Editorial / Sachlich" — textgetrieben, seriöse Consulting-
     Grund-Note, Fokus auf das Drei-Leistungen-Raster.
   - v2 "Terminal / Technisch" — Monospace, Code-Snippets, OSS-Proof
     vorn.
   - v3 "Manifest / Thesen" — die 8 Denkfiguren aus §6 Profil als
     Headline-Schlachtplatte.
   - v4 "Case-First" — eröffnet mit AI-Tutorial-Pipeline als Story,
     Rest folgt daraus.
   - v5 "Visual / PXL-Inspired" — Pixel-Ästhetik als Brand-Anker.
3. Danach Phase-2-Mechaniken (Scrolly, Progressive Disclosure …) und
   Phase 4 (Live-KI-Demo, falls in §7.5 bejaht).
