# schlenkr

Design-Playground + Homepage-Varianten für Ronald Schlenker.

**Struktur** (analog zu
[`barbaraseiler`](https://github.com/SchlenkR/barbaraseiler)):

- Self-contained Landing-Page-Varianten unter `versions/v<N>[-label]/`.
- Zentraler Versions-Index mit Lanes/Flach-Toggle unter `versions/index.html`
  (aus `scripts/gen-overview.mjs` generiert).
- Vite Multi-Page-Setup, Auto-Discovery per `/^v\d+/`.

## Getting started

```bash
npm install
npm run dev    # Vite auf http://localhost:8080
npm run build  # → dist/
```

## Für KIs / Agents

Lies zuerst [`AI_BRIEFING.md`](./AI_BRIEFING.md). Darin steht:
- **Phase 0**: Wie du Ronalds Profil recherchierst (`RONALD_PROFILE.md`).
- **Phase 1**: Wie du das Positionierungs-Dokument baust (`POSITIONING.md`).
- **Phase 2–5**: Repo-Setup, Varianten-Strategie, Arbeitsweise, Go-Live.

Das parallel gepflegte [`DESIGNER_BRIEF.md`](./DESIGNER_BRIEF.md) ist das
lebende Log: Content-Fakten, Varianten-Register, Ideen-Backlog.

Alter Blog-Stand (Markdown-Generator): Branch
[`archive/old-blog`](https://github.com/SchlenkR/schlenkr/tree/archive/old-blog).
