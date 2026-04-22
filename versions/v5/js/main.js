/* ============================================================
   v5 — Pixel
   Renders the 24x24 hero display from a color map, and the
   8x8 mini-portrait. No external deps.
   ============================================================ */

const PALETTE = {
  '.': null,              // off
  'P': '#ff3b7a',         // pink
  'M': '#7affd0',         // mint
  'Y': '#ffd400',         // yellow
  'B': '#4aa4ff',         // blue
  'O': '#ff6633',         // orange
};

/* ------------------------------------------------------------
   24x24 hero display — pixel-art "RS"
   Each string is one row. 24 characters per row, 24 rows.
   Letters drawn at rows 4..17, R at cols 3..10, S at cols 14..21.
   Small decorative LEDs in the corners.
------------------------------------------------------------ */
const HERO_RS = [
  /* col: 0         1111111111222222 */
  /*      0123456789012345678901234  */
  /* 00 */ 'B.......................',
  /* 01 */ '........................',
  /* 02 */ '........................',
  /* 03 */ '........................',
  /* 04 */ '...MMMMMM.....PPPPPPP...',
  /* 05 */ '...MMMMMMM...PPPPPPPPP..',
  /* 06 */ '...MM...MM...PP.....P...',
  /* 07 */ '...MM...MM...PP.........',
  /* 08 */ '...MM...MM...PP.........',
  /* 09 */ '...MM..MMM...PPPPPPP....',
  /* 10 */ '...MMMMMM.....PPPPPPP...',
  /* 11 */ '...MMMMMM...........PP..',
  /* 12 */ '...MM.MM............PP..',
  /* 13 */ '...MM..MM...........PP..',
  /* 14 */ '...MM..MM....P......PP..',
  /* 15 */ '...MM..MM....PPPPPPPPP..',
  /* 16 */ '...MM...MM....PPPPPPP...',
  /* 17 */ '........................',
  /* 18 */ '........................',
  /* 19 */ '........................',
  /* 20 */ '........................',
  /* 21 */ '........................',
  /* 22 */ '........................',
  /* 23 */ '.......................O',
];

/* ------------------------------------------------------------
   8x8 "mini-portrait" — an abstract pixel face / monogram slot.
   Not a literal portrait — a stylized RS monogram block.
------------------------------------------------------------ */
const MINI_RS = [
  'MMMM.PPP',
  'M..M.P.P',
  'M..M.P.P',
  'MMMM.PPP',
  'M.M..P..',
  'M..M..PP',
  'M..M...P',
  'M..M.PPP',
];

function renderGrid(container, rows, cellSize) {
  const frag = document.createDocumentFragment();
  for (const row of rows) {
    for (const ch of row) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const color = PALETTE[ch];
      if (color) {
        cell.classList.add('on');
        cell.style.backgroundColor = color;
        cell.style.color = color; // drives the glow
      }
      frag.appendChild(cell);
    }
  }
  container.replaceChildren(frag);
}

function init() {
  const hero = document.getElementById('hero-display');
  if (hero) renderGrid(hero, HERO_RS);

  const mini = document.getElementById('mini-portrait');
  if (mini) renderGrid(mini, MINI_RS);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
