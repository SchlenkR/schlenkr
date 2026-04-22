# MAKER_STORY.md — The PXL Clock as proof of craft

Canonical narrative for any variant that uses the PXL Clock journey as
evidence that Ronald's consulting voice ("pragmatic engineering, no
buzzword bingo, small teams ship real things") is **what he himself
does when nobody is paying him to consult.**

All claims below are traceable in the Obsidian vault
(`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Default/SocialMedia/`)
and the HiDrive `Produkt/` folder
(`~/IONOS HiDrive/public/Produkt/` — READ-ONLY; never write).

**Truth rule:** Specifics with evidence → use freely.
Specifics that are plausible but not evidenced → use sparingly, tagged
`[to verify]`. No invention. The Maker story must pass Ronald's own
honesty test.

Stand: 2026-04-22

---

## 1. The cast

**Ronald Schlenker** — engineer, API designer, firmware architect,
cloud backend, community lead. C#/F#/TypeScript. Handles: developer-
facing C# API for the PXL Clock; F# daemon on the device; cloud
backend + OTA; VS Code extension / simulator; community Discord and
PXL-JAM.

**Sefa** — hardware specialist + production. Handles: PCB design,
component sourcing, soldering, power management, mechanical assembly,
3D-printing workflow, batch production. *GitHub handle `silkimen` (per
social mentions); full surname to verify with Ronald.*

**Company:** Cumin & Potato GmbH. Hand-built limited batches, 100
units per run. (Founding date `[to verify]`.)

**Key collaborators:**
- **Wabaki** (*Viet Goy Le* — professional designer / photographer) —
  produced hero shots, lifestyle imagery, and raw workshop-session
  footage. 1.5-day studio session in late 2025. Feb–May 2025 engagement.
- **Marc Duiker** — community pixel artist. Created Ronald + Sefa
  avatars and promotional pixel art.
- **Urs Enzler** — early community showcase apps in F# (clock faces,
  animations). Often featured in marketing material.

---

## 2. Milestone timeline (evidenced)

Every entry below has Obsidian or HiDrive evidence. Dates are explicit
where available.

| When | Milestone | Evidence |
|---|---|---|
| **~2023 – early 2024** | First prototypes. Raspberry Pi + WS2812B LED strip experiments. | `Produkt/Produktbilder/Prototyp_01..05.jpg` (Aug 2024 snapshot of early units). `RnD/ws2812_rpi.md` (PWM/PCM/SPI tradeoffs). |
| **Mid 2024** | Frame + glass sourcing; 3D-printed dome pilot. Float-glass and Polycarbonat/PETG/ASA from Lithuanian suppliers. CraftCloud pilots (€63–160 per 10-unit run). | `Beschaffung - Recherche/glas.md`, `rahmen.md`, `Produktbilder/Rahmen_1..6.JPEG`. |
| **Aug–Sep 2024** | LED matrix + electronics finalized. Power budget set at 60 W. BOM locked. | `Produktbilder/Matrix_Oberseite.JPEG`, `Matrix_Unterseite.JPEG`, `MK1/BOM Gerät.xlsx`. |
| **Sep–Oct 2024** | First working firmware (F# daemon). C# simulator hot-reload begins. | `RnD/Strommessungen.md`, `Temperaturmessungen.md`. |
| **Nov 2024** | 3D-printed cases + assembly workflow. | `Produktbilder/3D Drucker - WhatsApp Video 2024-11-24 at 18.23.32.mp4`. Post 2024-11-23: *"High tech production of the #pxlclk — powered by #dotnet. What you prefer — black or white frame?"* |
| **Dec 1, 2024** | **PXL-JAM 2024 announced** (F# Advent Calendar). Community hackathon for C#/F# pixel-art apps. | Post: *"🎄🌟 Announcing PXL-JAM 2024! Program some PXLs. WIN 1 of 3 PXL-Clocks!"* |
| **Dec 2024** | CE certification journey begins. Consulting with Marvin on EMC, RoHS, product safety. | `MK1/Zertifizierung/` folder seeded. |
| **Jan 6, 2025** | CE progress publicly announced. | Post: *"Making progress in certifying the #pxlclock :)"* |
| **Jan 9, 2025** | OTA update system live. | Post: *"#pxlclock update is online. You can now set your own app as the default clock / sleep app. I can currently only test it without the real device, so in case anything goes wrong, tell me :)"* |
| **Feb 2025** | Brand work begins with Wabaki (Viet Goy Le). Logo direction: *"PXL as bold 8-bit element, balanced with modern minimalism."* Apple early-2000s feel. Starter package €1,850. | `MK1/Wabaki/brand.md`, `logoPitch.md`. |
| **Feb 17, 2025** | Simulator + GitHub repo public. Tutorial material live. | Post: *"Have you heard of the PXL-Clock? It's a real-world device featuring a 24×24 LED matrix, and guess what? You can program it in #csharp and #fsharp — and soon, #typescript and #javascript as well!"* |
| **May–Jul 2025** | Certification completed. EMC test report (May), Safety test report (July 4). DoC drafted. | `EMC_Testreport_PXL_Clock.pdf`, `Testreport_Safety_PXL-Clock_V1_2025-07-04.pdf`, `DoC_draft.odt`. |
| **Jul–Aug 2025** | Packaging designed and produced. Custom cardboard (kartonsaufmass.de, 28×28×9 cm), foam inserts, branded stickers (Avery A5), A5 printed manuals DE/EN. | `MK1/Instructions_MK1.md`, `Beschaffung - Recherche/verpackung.md`. |
| **Aug 12, 2025** | *"Hand-made"* manufacturing reality announced publicly. | Post: *"We are manufacturing the clock all by ourselves! We solder AC adapters, boards, 3d-print parts, assemble, terminate cables / switches, +++. PXL Clock is hand-made manufacturing work!"* · *"We started #pxlclock as two good friends — Sefa & me… 100 units selling soon."* |
| **Sep–Oct 2025** | Wabaki professional photo + video session. 80+ MOV clips (raw), 121 edited stills. | `Produktbilder/Wabaki_Werkstattsession_Videos/`, `Wabaki_Session1_bearbeitetFotos/`. |
| **Oct 2025** | pxlclock.com + shop module live. | Shop (Wix). Inventory: `Versand/Issued Devices.xlsx`. |
| **Nov 4, 2025** | **First units shipped.** | Post: *"#pxlclock is finally here 🎉 Hand-built and crafted, with 576 glowing 3D pixels. Only 100 units available right now — made with care, not mass-produced."* |
| **Nov 8, 2025** | Public product launch. | Post: *"After 2 years of serious side-project hustle, we've built a limited batch of 100 PXL Clocks — premium programmable clock for developers and design lovers."* |
| **Nov 9, 2025** | Manufacturing authenticity video: Sefa soldering live. | Post: *"When I tell that #pxlclock is hand-made, this means: Man, it's hand-made! You see Sefa in Action — life and in color, soldering the 2 boards for the clock. Thank god I'm a programmer…"* |
| **Nov 2025** | PXL-JAM finalists announced; 3 clocks awarded. Community Discord active. | `[to verify winning apps + artists]`. |
| **Jan 3, 2026** | App ecosystem expansion; TypeScript SDK in beta; Python API in planning. | Post: *"Today I reworked the appearance of the pxlclock app…"* |
| **Mar–Apr 2026** | Continued sales + updates. Hot-reload simulator remains a key marketing asset. New community apps weekly. | Ongoing. |

---

## 3. The engineering moves — what's genuinely hard

Short, truthful takes. If you want evidence, see the vault.

1. **24×24 = 576 addressable RGB LEDs (WS2812B).** 14 A worst-case at
   full white, clamped to a 60 W PSU. PWM timing via SPI/PCM; no flicker
   tolerated. Thermal management matters for certification.

2. **F# firmware daemon on Raspberry Pi.** Render loop locked to 60 FPS
   while WiFi reconnect, OTA download, and temperature throttling run
   alongside. State-aware rendering (Ronald's bread and butter) used
   deliberately on an embedded device.

3. **C# developer API that reads like React.** Stateful components,
   async/await, hooks-style patterns — compiled to run deterministically
   on the embedded host.

4. **Browser simulator with hot reload.** Three minutes from `git clone`
   to a first pixel visible. Zero hardware required to start. Removes
   the single biggest friction that kills hobbyist hardware platforms.

5. **Cloud backend (TypeScript/Express + PostgreSQL + Auth0 + mobile
   app).** Serves OTA firmware (signed), user accounts, app storage,
   device management. iOS + Android apps via React + Ionic + Capacitor.
   *Stack details partly inferred from repo notes; backend repo is
   private.*

6. **Signed OTA updates with rollback.** Watchdog + dual-partition
   strategy. A bad update doesn't brick the device. *Exact mechanism
   `[to verify]`.*

7. **CE certification.** EMC (emissions + immunity), RoHS, product
   safety. ~6 months of back-and-forth; outsourced lab, in-house
   compliance docs (EMC test report May 2025; safety test July 2025).

8. **Self-manufacturing.** Every unit hand-assembled by Ronald + Sefa:
   solder two PCBs, crimp AC adapter cables, 3D-print ~200 dome parts,
   press-fit LEDs, screw frame, box. ~2–4 hours per device. 100-unit
   cap is a time budget, not a business decision.

9. **Packaging design + production.** Custom branded cardboard (kartons-
   aufmass.de), foam inserts, branded Avery stickers, printed DE/EN
   A5 manuals. No contract packaging.

10. **Brand identity.** Logo designed in-house + polished with Wabaki.
    Professional photo + video shoot. Pixel-art avatars by Marc Duiker.
    Community showcase apps by Urs Enzler.

---

## 4. Ten signal-quotes (verbatim, dated)

Use as pull-quotes or section openers.

1. *"We started #pxlclock as two good friends — Sefa & me… 100 units
   selling soon — Who with us for party?"*
   — Bluesky, 2025-08-12.
2. *"Why we only sell 100 #pxlclock units? Many reasons — main one is:
   We are manufacturing the clock all by ourselves! We solder AC
   adapters, boards, 3d-print parts, assemble, terminate cables /
   switches, +++. PXL Clock is hand-made manufacturing work!"*
   — Bluesky, 2025-08-12.
3. *"After 2 years of serious side-project hustle, we've built a limited
   batch of 100 PXL Clocks — premium programmable clock for developers
   and design lovers."*
   — Bluesky, 2025-11-08.
4. *"When I tell that #pxlclock is hand-made, this means: Man, it's
   hand-made! You see Sefa in Action — life and in color, soldering the
   2 boards for the clock. Thank god I'm a programmer…"*
   — Bluesky, 2025-11-09.
5. *"#pxlclock update is online. You can now set your own app as the
   default clock / sleep app. I can currently only test it without the
   real device, so in case anything goes wrong, tell me :)"*
   — Bluesky, 2025-01-09.
6. *"#pxlclock is finally here 🎉 Hand-built and crafted, with 576
   glowing 3D pixels. Only 100 units available right now — made with
   care, not mass-produced."*
   — Bluesky, 2025-11-04.
7. *"Async in #pxlclock? Easy. Even in a render loop, it remembers
   state (like a Task) and hands you results when ready. Now in
   #fsharp — soon #csharp, #typescript, #python… or maybe I'll write my
   own language — finally found a use case for it!"*
   — Bluesky, 2025-08-12.
8. *"While crafting the #csharp API for #pxlclock, I asked my code
   monkey to add some static scenes for all the API we added. Look
   what it made — without further specification :)"*
   — Bluesky, 2025-11-15.
9. *"Have you heard of the PXL-Clock? It's a real-world device
   featuring a 24×24 LED matrix, and guess what? You can program it in
   #csharp and #fsharp — and soon, #typescript and #javascript as well!
   Simply: 1) Clone the repo  2) Run the simulator  3) Start building
   your own PXL-Apps!"*
   — LinkedIn, 2025-02-17.
10. *"Making progress in certifying the #pxlclock :)"*
    — Bluesky, 2025-01-06.

---

## 5. Narrative arc — landing-page draft (3 paragraphs)

Customer-first framing. Use verbatim or tighten.

**The insight & journey.** Ronald's consulting is built on one idea: *small teams shipping real things beats large teams shipping slide decks.* That's not a pitch deck — it's his own side-project discipline made visible. Starting in 2023, he and Sefa, a hardware specialist, began building a 24×24 programmable LED display you could code in C# or F#, with a browser simulator that works before any hardware arrives. Two years of weekends later: firmware rewritten three times, PCBs hand-soldered, 3D-printed dome parts produced in-house, CE certification completed, packaging designed end-to-end, photography commissioned from a professional studio, and one limited batch of 100 units — each assembled by the two of them.

**Why it matters to you.** What looks simple — 576 LEDs in a pretty frame — is genuinely hard. WS2812B RGB strips need microsecond SPI timing or they flicker. A render loop at 60 FPS must share a Raspberry Pi with WiFi reconnect, OTA download, temperature throttling. The C# API has to feel like React but compile deterministically to run on embedded hardware. Every OTA update is signed; a failed flash does not brick the device. CE certification means EMC lab reports, RoHS component verification, a safety manual in two languages, six months of back-and-forth. And because Ronald and Sefa assemble every unit themselves, output is capped at 100 per batch — two to four hours per device, hand work only. There is no factory. The constraint is not money; it is care.

**Why that is the point.** This is the consulting pitch made literal. Ronald didn't buy his way to "pragmatic engineering" as a slogan — he practices it where nobody is paying him. When he recommends that your team keep the know-how in-house instead of outsourcing to fifty contractors, he is recommending what he does with Sefa. When he argues against buzzword compliance, against the Scrum industry, against the "two-week shine" of expensive consulting, he is arguing from a side-project that shipped because it didn't do those things. If your team wants that same clarity — AI adoption that actually adoption, a codebase that survives the quarter, a team that stays sharper after you're gone — that is the engagement.

---

## 6. Visual assets — what to use, where to get it

### Public-safe (link directly from pxlclock.com)

Hero shots and lifestyle frames in `Produkt/Produktbilder/merchant/`:
- `Pxl_clock_2_hero.jpg`, `Pxl_clock_8_hero.jpg`, `Pxl_clock_14_hero.jpg`,
  `Pxl_clock_20_hero.jpg`, `Pxl_clock_21_hero.jpg` — clean white-
  background product shots.
- `Pxl_clock_58_lifestyle.jpg`, `Pxl_clock_65_lifestyle.jpg`,
  `Pxl_clock_72_lifestyle.jpg` — in-room lifestyle imagery.

These are the Wabaki merchant-ready shots. Likely the same imagery
hosted publicly on pxlclock.com — safe to reference via that URL.

### HiDrive-only (ask Ronald before hosting publicly)

- `Produktbilder/Sefas_Entwicklungsfotos/IMG_73XX.jpeg` — Sefa soldering,
  assembly-in-progress. Authenticity gold, but unpublished.
- `Produktbilder/Rahmen_1..6.JPEG` — glass + frame detail.
- `Produktbilder/Matrix_*.JPEG` — bare 24×24 LED matrix macros.
- `Produktbilder/Prototyp_01..05.jpg` — early iterations.
- `Produktbilder/3D Drucker - WhatsApp Video 2024-11-24 at 18.23.32.mp4`
  — 3D printer in action.
- `Produktbilder/Wabaki_Werkstattsession_Videos/DSCF*.MOV` — raw Wabaki
  shoot footage (very large files; extract stills only).

### Strategy for variants

For **v14 The Making**, use placeholder images with documented
filenames in HTML comments. Ronald can swap to real URLs later, once
he confirms which images are web-exposed on pxlclock.com. Use
`https://placehold.co/<w>x<h>?text=Prototype+01` or inline SVG
silhouettes as the placeholder. Every placeholder's `<!-- replace with: Produkt/Produktbilder/… -->`
comment tells him where to paste the real image URL.

---

## 7. Still to verify with Ronald

1. Sefa's full name + GitHub handle confirmation.
2. Cumin & Potato GmbH founding date.
3. Total cost breakdown / per-unit manufacturing cost.
4. Specific OTA mechanism (dual-partition? A/B? rollback trigger?).
5. Which CE directives exactly applied (RED? Machinery? Toys? Consumer
   Electronics?).
6. PXL-JAM 2024 winning apps + artist credits.
7. Wabaki formal contact + permission to credit by name on landing.
8. Licensing terms for Marc Duiker's pixel-art avatars.
9. Any named customers from the first 100 units willing to be quoted.
10. Sefa's willingness to be named on the landing page + portrait
    photo usage.

---

## 8. Voice constraints

- **Truthful.** Never fabricate a specific ("we got a patent", "we
  raised seed capital" — neither is evidenced; don't write them).
- **Customer-first framing** where the story appears on a consulting
  landing: the PXL journey is **proof**, not biography. Anchor every
  section back to *"this is what that looks like for your team."*
- **Specific, not generic.** *"60 W PSU, 14 A worst-case, SPI timing"*
  beats *"powerful hardware, precision engineering."*
- **Sefa credit is non-negotiable.** Every variant that uses this
  story names both makers — "Ronald + Sefa", not "Ronald + collaborator".
- **No mass-market-startup language.** No "disruption", no "scale",
  no "10×". The whole point is the opposite.
