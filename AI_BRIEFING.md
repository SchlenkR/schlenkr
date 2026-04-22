# AI-Briefing · Homepage Ronald Schlenker

Dieses Dokument ist eine Arbeitsanweisung für eine KI (z. B. Claude), die in
diesem Repo eine neue Homepage für Ronald Schlenker bauen soll — nach dem
gleichen Versions- / Lanes-Pattern wie
[`barbaraseiler`](https://github.com/SchlenkR/barbaraseiler) (lokal:
`~/repos/github/barbaraseiler`).

Dieses Briefing ist **prozessual**. Es sagt, *wie vorzugehen* ist — nicht,
*was der Inhalt* ist. Inhalt und Fokus erarbeitest du (die KI) in
Phase 0/1 selbst, gestützt auf öffentliche Quellen + lokale
Obsidian-/Video-Notizen.

---

## Mission

Eine Landing-Page, die Ronald als Personenmarke für sein Consulting
positioniert. Geschäftsziel: **neue Consulting-Gigs gewinnen.**

Leistungs-Trio: **Schulung · Beratung · Entwicklung** — "auf höchstem
Niveau". Fachlicher Schwerpunkt aktuell: **KI** (Generative AI, Agents,
LLM-Engineering) — immer untermauert mit *konkreten* Projekten und
langjähriger Tätigkeit. Kein Buzzword-Bingo.

Form: viele Landing-Page-**Varianten** (einfach → experimentell),
zusammengehalten durch einen öffentlichen **Versions-Index** mit
Lanes/Flach-Toggle. Der Index ist Teil der Show — er zeigt Ronalds
Arbeitsweise: iterativ, viele Thesen, Spielraum, technische Vielfalt.

---

## Zustand des Repos beim Start

- Gerüst ist **fertig** (Vite MPA, `scripts/gen-overview.mjs`, leere
  `versions/manifest.json`, `DESIGNER_BRIEF.md`-Template, Impressum-/
  Datenschutz-Konvention aus `barbaraseiler` bekannt).
- Noch **keine** Varianten vorhanden. Du legst die erste selbst an.
- Alter Blog-Stand ist archiviert unter Branch `archive/old-blog`.

---

## Phase 0 — Research: Wer ist Ronald?

**Ziel**: `RONALD_PROFILE.md` im Repo-Root. Interne Faktenlage für alle
folgenden Content-Entscheidungen.

### Quellen (alle anzapfen, Lücken dokumentieren)

- **GitHub**:
  - <https://github.com/SchlenkR> (Haupt-Account, aktiv)
  - <https://github.com/ronaldschlenker> (alter/paralleler Account, ggf. 404)
  - Schlüssel-Repos: Vide, FsHttp, Trulla, TheBlunt, FluX, LocSta,
    pxl-clock, post-dashboard, barbaraseiler. README in jedem kurz
    scannen — Ronald schreibt dort oft das Narrativ.
- **X / Twitter**: <https://twitter.com/schlenkr>
- **Linktree**: <https://linktr.ee/SchlenkR>
- **LinkedIn**: URL suchen (Linktree, Obsidian, Tweets).
- **YouTube**: Channel-URL suchen (Linktree, Obsidian-Video-Skripte).
- **Obsidian Vault**
  (`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Default/`):
  - `SocialMedia/` — veröffentlichte + geplante Posts. Tonalität ablesen,
    wiederkehrende Themen zählen. Unterordner `_ideas_general`,
    `_ideas_pxl`, `_done`, `_done_scraped`.
  - Suche nach "Consulting", "Freelance", "Angebot", "Rate", "Workshop",
    "KI", "Agent".
- **VideoProduction**:
  `~/Library/Mobile Documents/com~apple~CloudDocs/VideoProduction/` —
  Skripte, Projekt-Notizen, Thumbnail-Versuche.

### Was extrahieren

`RONALD_PROFILE.md` mit diesen Sektionen:

1. **Kurzportrait** (1–2 Absätze) — "Wer bin ich in einem Atemzug".
2. **Kompetenzprofil** — Sprachen / Frameworks / Domänen, wo möglich
   mit Jahren. KI-Schwerpunkt **mit Belegen** (welche Projekte,
   welche Tools, welches Niveau: "baut Agents / Infrastruktur" vs.
   "nutzt LLM-Tools").
3. **Projekt-Portfolio** — Tabellarisch: Name · Kurzbeschreibung · Rolle
   · Tech-Stack · Link · Außensichtbarkeit (OSS / Kunde / persönlich).
4. **Stationen & Langjährigkeit** — chronologisches Gerüst (grob, auch
   wenn keine harten Daten findbar).
5. **Markenstimme** — Tonalität seiner Posts: belegen mit 3–5 Zitaten
   aus Posts / Tweets / Skripten.
6. **Wiederkehrende Denkfiguren** — Themen, die immer wiederkommen
   (du wirst Muster sehen).
7. **Zielgruppen-Signale** — wer reagiert? Welche Community? (F#-Welt,
   .NET, KI-Praktiker, Edu/Workshop-Leute …)
8. **Offene Fragen / Lücken** — alles, was nicht aus den Quellen zu
   holen war.

**Disziplin**: Keine Erfindungen. Unklar → "Offene Fragen", nicht
ausschmücken.

---

## Phase 1 — Positionierung & Content-Strategie

**Ziel**: `POSITIONING.md` im Repo-Root. Liefert die Content-Bausteine,
aus denen alle Varianten schöpfen.

### Inhalt

1. **Angebot** — Schulung / Beratung / Entwicklung. Pro Leistung:
   typische Formate · typischer Kundenprofil · **1 Satz
   Nutzenversprechen** · **1 Satz Abgrenzungsmerkmal**.
2. **KI-Schwerpunkt konkret** — was kann Ronald bei KI-Projekten, das
   andere nicht (so) können? Beweis aus Phase-0-Projekten.
3. **Zielkunden-Personas** — 2–3 Personas. Jede: Kontext · Schmerz ·
   warum ausgerechnet Ronald.
4. **Proof Points** — Referenzprojekte, geordnet nach Relevanz.
5. **CTAs** — primär + sekundär.
6. **No-gos** — was **nicht** kommuniziert werden soll.

**Disziplin**: Positioning muss fokussiert sein. Lieber schmal und klar
als breit und beliebig.

---

## Phase 2 — Repo-Setup

Das Gerüst liegt schon. Deine Aufgaben hier sind punktuell:

- Font- und Farb-Entscheidung (unten in "Offene Fragen" vermerkt).
- `manifest.json.lanes` wird **organisch** gefüllt — pro neu angelegter
  Hauptversion eine Lane-Farbe dazu. Keine vordefinierte Palette.
- Impressum- und Datenschutz-Templates aus `barbaraseiler` übernehmen,
  Verantwortliche Person / Dienste auf Ronalds Kontext umstellen
  (Cumin & Potato GmbH? privat? — klären).

### manifest.json — Pflichtfelder pro Version

```json
"v1": {
  "num": 1,
  "title": "…",
  "desc": "Ein-Satz-Beschreibung",
  "style": "Editorial / Brutalist / …",
  "phaseTag": "Root" | "Phase 1" | …,
  "by": "Claude · wow+convert",
  "parent": "v1"  // nur bei Sub-Varianten
}
```

- `num` ist **stabil**. Nie aus git log berechnen. Neue Variante →
  `num = max(existing) + 1`.
- Kein `intro`-Feld auf Top-Level (bei barbaraseiler als unnütz entfernt).

---

## Phase 3 — Variant-Strategie

**Grundprinzip**: *einfach → abgefahren.* Jede Variante hat eine klare
Design- oder Interaktions-**These**. Keine Copy-Paste-Variationen, kein
Zufallsgenerator. Vielfalt entsteht durch bewusste Thesen-Wahl.

### Phasen (spiegelbildlich zu barbaraseiler)

- **Phase 1 — Roots**: 5–6 stilistische Basis-Entwürfe mit **demselben
  Content**. Unterschied rein stilistisch. Zeigt Bandbreite.
- **Phase 2 — Mechaniken**: pro Root eine inhaltliche oder interaktive
  Schärfung (Scrolly, Snap, Progressive Disclosure, Sticky Sidebar, …).
- **Phase 3 — Storytelling**: narrative Landing Pages (Case-Study-First,
  Essay-First, Manifesto-Style).
- **Phase 4 — Extended Interaction**: 3D, Canvas, Web Audio, Physik,
  Monaco-Editor, client-seitige kleine Modelle. Muss Ronalds
  fachliche Range zeigen — **nicht** nur Tech-Demo.
- **Phase 5 — Cross-Pollination**: Root-Mix, mutige Hybride, provokante
  Formate.

### Inhaltliche Fokus-Lanes

**Nicht präskriptiv.** Lanes sind im Overview nur das Farb-/Grupping-Raster
pro Hauptversion (v1, v2, …). Welche inhaltlichen Schwerpunkte sich
herauskristallisieren, ergibt sich aus Positioning (Phase 1) und aus den
gebauten Varianten — analog zu `barbaraseiler`, wo Lanes organisch
gewachsen sind. Ideenfindung ist Teil deiner Arbeit, nicht meiner
Vorgabe.

---

## Phase 4 — Arbeitsweise

Dieser Abschnitt ist **Disziplin**, nicht Vorschlag. Er spart Ärger.

### Batch-Strategie (bewährt aus barbaraseiler)

1. Plane einen Batch von **3–5 Varianten** im Voraus. Schreibe sie ins
   Ideen-Log in `DESIGNER_BRIEF.md` (§6): **Parent · Idee · Twist**.
2. Für jede Variante: einen Sub-Agent mit `isolation: "worktree"` starten.
   Jeder Agent arbeitet in seinem eigenen Worktree an **einer** Variante.
3. Agents **committen nicht**. Sie bauen nur Dateien.
4. Parent-KI merged fertige Agents via
   `cp -r <worktree>/versions/vN <main-repo>/versions/vN`.
5. Im Parent: `manifest.json` + `DESIGNER_BRIEF.md` nachpflegen (neue
   `num` vergeben, Ideen-Log-Eintrag, ggf. neue Lane-Farbe).
6. `npm run build` — **muss grün sein**. Sonst Batch nicht committen.
7. **Ein Commit pro Batch**, mit prägnanter Zusammenfassung.
8. Push.

### Harte Regeln (aus barbaraseiler-Erfahrung)

- `num` **nie** aus git log berechnen — immer explizit im Manifest.
- Keine echten PII (Dummy-Adresse, Dummy-Telefon, generische Mail).
  Echtdaten erst kurz vor Go-Live, in eigenem Commit, nicht hart in
  Varianten-Code.
- **Ideen-Log in `DESIGNER_BRIEF.md` bei jeder neuen Variante pflegen** —
  Parent, Idee, Twist. Das ist kein Beiwerk, es ist Teil des Deliverables.
- Overview-Footer **minimal**: nur Deploy-Stand. Keine Live-Uhr, kein
  Intro, keine "cp -r"-Hilfe.
- Overview hat *immer* den Lanes/Flach-Toggle. Lanes ist Default.

### Fehlermodi, die vermieden werden müssen

- "Zu ähnliche Varianten" — wenn zwei Varianten nur in Farbe + Font
  differieren, ist das keine Variante. Vor Batch-Start prüfen: hat jede
  einen eigenen **Satz**, der sie unterscheidet?
- "Tech-Demo ohne Botschaft" — Phase-4-Interaktionen müssen Ronalds
  Angebot dienen, nicht "schaut, was alles geht".
- "Positioning verwässert" — wenn eine Variante vom Positioning-Doc
  abweicht, ist entweder die Variante oder das Doc falsch. Klären.

---

## Phase 5 — Privacy, Legal, Go-Live

- Impressum / Datenschutz aus `barbaraseiler` übernehmen, auf Ronald
  umstellen (Verantwortliche Person, eingesetzte Dienste).
- Wenn Varianten unterschiedliche Dienste nutzen (z. B. Monaco via unpkg):
  im Datenschutz abdecken.
- DSGVO-Check. Cookie-Banner nur falls nötig.
- Deployment-Pipeline (`vite build` → Hoster). Deploy-Stamp im Footer ist
  Build-Time, nicht Laufzeit.
- Finaler Domain-Name klären (schlenkr.de? ronaldschlenker.com?
  SchlenkR.github.io?).

---

## Was dieses Briefing NICHT vorgibt

Absichtlich offen — hier muss Ronald entscheiden oder du als KI
**explizit nachfragen** (nicht raten):

1. **Deployment-Ziel**: GitHub Pages / Cloudflare Pages / eigener Server?
2. **Farb- und Font-Entscheidung**: frei wählen oder bestehende Brand-Assets
   nutzen (Logo? Wortmarke? — Obsidian + `img/`-Ordner im alten Branch
   `archive/old-blog` prüfen)?
3. **Priorisierung der Leistung**: wenn eine Variante nur **eine**
   Leistung betonen darf — ist Schulung, Beratung oder Entwicklung der Kern?
4. **Persönliche Projekte als Referenz**: PXL Clock, Vide, FsHttp prominent
   (zeigt Breite) oder dezent (zeigt Fokus)?
5. **KI-Demos auf der Site selbst**: Live-Chatbot / Agent-Demo okay? Wenn
   ja: lokal (WebLLM / transformers.js) oder über API-Endpoint?
6. **Social Proof**: gibt's zitierfähige Kunden-Testimonials? Oder
   OSS-Stars + Community-Rollen als Ersatz?
7. **Tonalität**: Siezen oder Duzen?
8. **Rate / Budget-Signale**: transparent, oder bewusst nicht?

Diese Fragen bekommst du als KI am **Ende von Phase 1** zu beantworten —
zurück an Ronald, in einem Block.

---

## Referenzen — Schnell-Links

- **barbaraseiler-Repo** (lokal): `~/repos/github/barbaraseiler`
  - `DESIGNER_BRIEF.md` — Phasen + Ideen-Log-Format
  - `scripts/gen-overview.mjs` — Overview-Generator mit Toggle
  - `versions/manifest.json` — Manifest-Schema, Lanes
  - `versions/v1/` — Root-Struktur-Beispiel
  - `versions/v44-ton-treffen/` — Advanced-Interaction-Beispiel
- **Obsidian Vault**:
  `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Default/`
- **VideoProduction**:
  `~/Library/Mobile Documents/com~apple~CloudDocs/VideoProduction/`
- **Alter Blog-Stand (Branch)**:
  <https://github.com/SchlenkR/schlenkr/tree/archive/old-blog>

---

## Reihenfolge (dein Einstieg)

1. Phase 0 → `RONALD_PROFILE.md` committen.
2. Phase 1 → `POSITIONING.md` committen + Offene Fragen (§) an Ronald zurück.
3. Auf Antwort warten — nicht blind raten.
4. Phase 2 → punktuelle Anpassungen (Font/Farbe, Impressum/Datenschutz).
5. Phase 3 → Roots-Batch starten.
6. Iteration: Phasen 2 → 5 der Variant-Strategie, in Batches.
7. Phase 5 erst kurz vor Go-Live scharf stellen.
