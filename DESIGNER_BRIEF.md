# Design Brief — schlenkr.dev (Ronald Schlenker)

Dieses Dokument wird **von der KI** gefüllt, während sie am Projekt arbeitet.
Es ist das lebende Log: Content-Fakten, Tech-Setup, Varianten-Register,
Ideen-Backlog.

> **Hinweis**: Lies zuerst `AI_BRIEFING.md` im Repo-Root. Dort steht, wie
> du vorgehen sollst. Dieses Dokument befüllst du parallel zur Arbeit.

---

## 1. Kunde / Content-Basis

_In Phase 0/1 aus `RONALD_PROFILE.md` und `POSITIONING.md` hier
zusammenfassen: Wer ist Ronald, was bietet er, was sind die Pflicht-Fakten
pro Variante (Name, Kontakt, Kernbotschaften, CTAs)._

**Pflicht-Pages pro Variante:**
- `index.html`
- `impressum.html`
- `datenschutz.html`

**Pflicht-Eintrag in `versions/manifest.json`:**
- `"num": N` — fortlaufende Nummer, stabil, nicht aus git log berechnet.
- `"title"`, `"desc"`, `"style"`, `"phaseTag"`, `"by"`.
- `"parent"` nur bei Sub-Varianten.

Beispiel: `"v1-swiss": { "num": 2, "title": "Swiss Grid", "desc": "…", "style": "Swiss", "phaseTag": "Phase 1", "by": "Claude", "parent": "v1" }`

---

## 2. Tech-Setup

**Repo**: `/Users/ronald/repos/github/schlenkr`
**Dev-Server**: `npm run dev` → Vite auf Port 8080.
**MPA Auto-Discovery**: Vite scannt `versions/` nach Ordnern matching
`/^v\d+/`. Vite-Config nicht anfassen.

**Self-contained Regel**: Jeder `versions/v<N>-<label>/` Ordner ist
komplett eigenständig. Kein shared code. Dependencies via CDN (unpkg,
jsdelivr, Google Fonts). Kein `npm install` für Variant-Deps.

---

## 3. Naming-Konvention

- Hauptversionen: `v<N>`
- Sub-Varianten: `v<N>-<label>`, tiefere: `v<N>-<label>-<twist>`
- Parent-Feld im Manifest verweist auf die Hauptversion.

---

## 4. Phasen-Strategie

_Wird im Laufe der Arbeit gefüllt. Grobes Raster (aus AI_BRIEFING §3):_

- **Phase 1 — Roots**: 5–6 stilistische Basis-Entwürfe, gleicher Content.
- **Phase 2 — Mechaniken**: pro Root eine interaktive / strukturelle Schärfung.
- **Phase 3 — Storytelling**: narrative Landing Pages.
- **Phase 4 — Extended Interaction**: Canvas, Audio, 3D, ML im Browser.
- **Phase 5 — Cross-Pollination**: Hybride, mutige Formate.

---

## 5. Varianten-Register

_Tabelle aller bisher gebauten Varianten, chronologisch nach `num`. Wird
mit jedem Batch erweitert._

| num | Folder | Parent | Style | Phase | Idee |
|----:|--------|--------|-------|-------|------|
| —   | —      | —      | —     | —     | — (noch keine Variante) |

---

## 6. Ideen-Log

_Jede neue Variante bekommt **vor dem Bauen** einen Eintrag: Parent ·
Idee · Twist. Disziplin, nicht optional._

- _(leer — erste Idee kommt mit Phase 1)_
