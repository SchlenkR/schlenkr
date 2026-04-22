// Live Playground — Type-Inference Demo (v11)
// Regex-driven shape/type inference for F# and C#. Not a real compiler —
// a reactive illustration of what tooling *feels* like.

const SAMPLES = {
  fsharp: `// Edit the code. See the inferred shape on the right.
let name = "Ada"
let count = 42
let price = 19.95
let active = true

let greet person =
    "Hello, " + person + "!"

let numbers = [1; 2; 3; 4; 5]

type Customer = {
    Id: int
    Name: string
    Signed: bool
}

let firstCustomer =
    { Id = 1; Name = "Acme GmbH"; Signed = true }
`,
  csharp: `// Edit the code. See the inferred shape on the right.
var name = "Ada";
var count = 42;
var price = 19.95;
var active = true;

string Greet(string person) =>
    $"Hello, {person}!";

var numbers = new[] { 1, 2, 3, 4, 5 };

record Customer(int Id, string Name, bool Signed);

var firstCustomer = new Customer(1, "Acme GmbH", true);
`
};

// ------------------------------------------------------------------
// Fake inference

function inferValueType(expr, lang) {
  const e = expr.trim();
  if (!e) return "unit";
  if (/^".*"$/.test(e) || /^\$".*"$/.test(e)) return "string";
  if (/^'.'$/.test(e)) return "char";
  if (/^(true|false)$/.test(e)) return "bool";
  if (/^-?\d+$/.test(e)) return "int";
  if (/^-?\d+\.\d+(m|f|d)?$/i.test(e)) {
    if (/m$/i.test(e)) return "decimal";
    if (/f$/i.test(e)) return "float32";
    return lang === "fsharp" ? "float" : "double";
  }
  // F# list literal
  if (/^\[.*\]$/.test(e) && lang === "fsharp") {
    const inner = e.slice(1, -1).split(";").map(s => s.trim()).filter(Boolean);
    if (inner.length) {
      const t = inferValueType(inner[0], lang);
      return `${t} list`;
    }
    return "'a list";
  }
  // C# array literal
  if (/^new\[\]\s*\{.*\}$/.test(e) && lang === "csharp") {
    const m = e.match(/\{([^}]*)\}/);
    if (m) {
      const inner = m[1].split(",").map(s => s.trim()).filter(Boolean);
      if (inner.length) {
        const t = inferValueType(inner[0], lang);
        return `${t}[]`;
      }
    }
    return "T[]";
  }
  // Record construction F#
  if (/^\{.*\}$/.test(e) && lang === "fsharp") return "record";
  // Constructor C#
  const newMatch = e.match(/^new\s+([A-Z][A-Za-z0-9_]*)\b/);
  if (newMatch) return newMatch[1];
  // Identifier lookup — unknown for now
  return "?";
}

// Parse editor text into a list of "shape lines".
function analyze(source, lang) {
  const lines = source.split(/\r?\n/);
  const results = [];
  const recordFields = {}; // recordName -> [{ name, type }]

  if (lang === "fsharp") {
    // Collect record types spanning multiple lines
    let currentRecord = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const stripped = line.replace(/\/\/.*$/, "").trim();
      if (!stripped) continue;

      // Record type definition
      const typeMatch = stripped.match(/^type\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\{?/);
      if (typeMatch && /\{/.test(stripped)) {
        currentRecord = typeMatch[1];
        recordFields[currentRecord] = [];
        results.push({ kind: "type", name: currentRecord, detail: "record" });
        continue;
      }
      if (currentRecord) {
        const fieldMatch = stripped.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_<>\[\]]*)/);
        if (fieldMatch) {
          recordFields[currentRecord].push({ name: fieldMatch[1], type: fieldMatch[2] });
          results.push({ kind: "field", parent: currentRecord, name: fieldMatch[1], type: fieldMatch[2] });
          continue;
        }
        if (/^\}/.test(stripped)) {
          currentRecord = null;
          continue;
        }
      }

      // let binding single-line value
      const letVal = stripped.match(/^let\s+([A-Za-z_][A-Za-z0-9_']*)\s*=\s*(.+)$/);
      if (letVal) {
        const [, name, rhs] = letVal;
        // Check if rhs looks like a record construction using known record
        const recCon = rhs.match(/^\{\s*([^}]*)\}\s*$/);
        if (recCon) {
          const fields = recCon[1].split(";").map(s => s.trim()).filter(Boolean);
          const fieldPairs = fields.map(f => f.split("=")[0].trim());
          const matchedType = Object.keys(recordFields).find(rn => {
            const want = recordFields[rn].map(f => f.name).sort().join(",");
            const have = fieldPairs.slice().sort().join(",");
            return want === have;
          });
          results.push({ kind: "value", name, type: matchedType || "record" });
          continue;
        }
        results.push({ kind: "value", name, type: inferValueType(rhs, lang) });
        continue;
      }

      // let function
      const letFun = stripped.match(/^let\s+([A-Za-z_][A-Za-z0-9_']*)\s+([A-Za-z_][A-Za-z0-9_'\s]*)\s*=\s*(.*)$/);
      if (letFun) {
        const [, name, params] = letFun;
        const paramList = params.trim().split(/\s+/).filter(Boolean);
        // peek ahead for body if empty
        let body = letFun[3].trim();
        if (!body && i + 1 < lines.length) body = lines[i + 1].trim();
        // very rough: if body uses "+ person +" with string literals -> string
        let retType = "'b";
        if (/"/.test(body)) retType = "string";
        else if (/\btrue\b|\bfalse\b/.test(body)) retType = "bool";
        else if (/^-?\d/.test(body)) retType = "int";
        const paramTypes = paramList.map(() => "'a");
        const sig = paramTypes.concat(retType).join(" -> ");
        results.push({ kind: "fn", name, type: sig });
        continue;
      }
    }
  } else {
    // C#
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const stripped = line.replace(/\/\/.*$/, "").replace(/;\s*$/, "").trim();
      if (!stripped) continue;

      // record Foo(int Id, string Name, bool Signed)
      const recMatch = stripped.match(/^record\s+([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)/);
      if (recMatch) {
        const [, name, params] = recMatch;
        results.push({ kind: "type", name, detail: "record" });
        const fields = params.split(",").map(s => s.trim()).filter(Boolean);
        for (const f of fields) {
          const parts = f.split(/\s+/);
          if (parts.length >= 2) {
            recordFields[name] = recordFields[name] || [];
            recordFields[name].push({ name: parts[1], type: parts[0] });
            results.push({ kind: "field", parent: name, name: parts[1], type: parts[0] });
          }
        }
        continue;
      }

      // var name = expr
      const varMatch = stripped.match(/^var\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
      if (varMatch) {
        const [, name, rhs] = varMatch;
        results.push({ kind: "value", name, type: inferValueType(rhs, lang) });
        continue;
      }

      // string Name(params) => body
      const fnMatch = stripped.match(/^([A-Za-z_][A-Za-z0-9_<>]*)\s+([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*=>\s*(.*)$/);
      if (fnMatch) {
        const [, retType, name, params] = fnMatch;
        const paramTypes = params.split(",").map(s => s.trim()).filter(Boolean).map(p => {
          const parts = p.split(/\s+/);
          return parts[0] || "T";
        });
        const sig = `(${paramTypes.join(", ")}) => ${retType}`;
        results.push({ kind: "fn", name, type: sig });
        continue;
      }
    }
  }

  return results;
}

// ------------------------------------------------------------------
// Renderer

function renderOutput(container, results, lang) {
  container.innerHTML = "";
  const heading = document.createElement("h4");
  heading.textContent = lang === "fsharp" ? "Inferred shape (F#)" : "Inferred shape (C#)";
  container.appendChild(heading);

  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "output-empty";
    empty.textContent = "Start typing a let / var / type definition.";
    container.appendChild(empty);
    return;
  }

  let currentType = null;
  for (const r of results) {
    const row = document.createElement("div");
    row.className = "output-line";

    if (r.kind === "type") {
      currentType = r.name;
      row.innerHTML = `<span class="kw">${lang === "fsharp" ? "type" : "record"}</span> <span class="name">${escapeHtml(r.name)}</span> <span class="op">=</span> <span class="type">${r.detail}</span>`;
    } else if (r.kind === "field") {
      row.innerHTML = `&nbsp;&nbsp;<span class="op">·</span> <span class="name">${escapeHtml(r.name)}</span> <span class="op">:</span> <span class="type">${escapeHtml(r.type)}</span>`;
    } else if (r.kind === "fn") {
      row.innerHTML = `<span class="kw">fn</span> <span class="name">${escapeHtml(r.name)}</span> <span class="op">:</span> <span class="type">${escapeHtml(r.type)}</span>`;
    } else if (r.kind === "value") {
      row.innerHTML = `<span class="kw">val</span> <span class="name">${escapeHtml(r.name)}</span> <span class="op">:</span> <span class="type">${escapeHtml(r.type)}</span>`;
    } else {
      row.textContent = JSON.stringify(r);
    }
    container.appendChild(row);
  }

  const note = document.createElement("p");
  note.className = "output-empty";
  note.style.marginTop = "14px";
  note.textContent = "Fake inference — pattern-based, not a real compiler. Demonstrates the feel of type-driven tooling.";
  container.appendChild(note);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ------------------------------------------------------------------
// Setup

const state = {
  lang: "fsharp",
  view: null,
  fallbackEl: null,
  editorHost: document.getElementById("editor-host"),
  outputHost: document.getElementById("editor-output"),
  langButtons: document.querySelectorAll(".playground-lang button"),
  resetButton: document.querySelector(".hint-reset")
};

function getSource() {
  if (state.view) return state.view.state.doc.toString();
  if (state.fallbackEl) return state.fallbackEl.value;
  return "";
}

function setSource(text) {
  if (state.view) {
    state.view.dispatch({
      changes: { from: 0, to: state.view.state.doc.length, insert: text }
    });
  } else if (state.fallbackEl) {
    state.fallbackEl.value = text;
  }
  rerender();
}

function rerender() {
  const src = getSource();
  const res = analyze(src, state.lang);
  renderOutput(state.outputHost, res, state.lang);
}

function setLanguage(lang) {
  state.lang = lang;
  for (const b of state.langButtons) {
    b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
  }
  setSource(SAMPLES[lang]);
}

async function initEditor() {
  const host = state.editorHost;
  if (!host) return;

  // Always build a fallback first (progressive enhancement)
  const fallback = document.createElement("textarea");
  fallback.className = "fallback";
  fallback.setAttribute("aria-label", "Code editor (fallback). Edit to see inferred shape on the right.");
  fallback.spellcheck = false;
  fallback.value = SAMPLES[state.lang];
  fallback.addEventListener("input", () => rerender());
  host.appendChild(fallback);
  state.fallbackEl = fallback;
  rerender();

  // Try to upgrade to CodeMirror 6
  try {
    const cmCore = await import("https://esm.sh/@codemirror/state@6.4.1");
    const cmView = await import("https://esm.sh/@codemirror/view@6.26.3");
    const cmCommands = await import("https://esm.sh/@codemirror/commands@6.5.0");
    const cmLanguage = await import("https://esm.sh/@codemirror/language@6.10.1");

    const { EditorState } = cmCore;
    const { EditorView, keymap, highlightActiveLine, lineNumbers } = cmView;
    const { defaultKeymap, history, historyKeymap } = cmCommands;
    const { bracketMatching, indentOnInput } = cmLanguage;

    const doc = fallback.value;

    // Remove fallback only after CM is ready
    host.removeChild(fallback);
    state.fallbackEl = null;

    const updateListener = EditorView.updateListener.of(u => {
      if (u.docChanged) rerender();
    });

    const editorTheme = EditorView.theme({
      "&": { height: "100%", fontSize: "14px" },
      ".cm-scroller": { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
      ".cm-content": { caretColor: "#15151c" },
      "&.cm-focused .cm-cursor": { borderLeftColor: "#2563eb" },
      ".cm-activeLine": { backgroundColor: "rgba(37, 99, 235, 0.04)" },
      ".cm-gutters": { backgroundColor: "#f4f3ee", color: "#6b6b78", border: "none" }
    }, { dark: false });

    const startState = EditorState.create({
      doc,
      extensions: [
        lineNumbers(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightActiveLine(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        updateListener,
        editorTheme,
        EditorView.contentAttributes.of({
          "aria-label": "Code editor. Edit to see inferred shape on the right.",
          "role": "textbox",
          "aria-multiline": "true"
        })
      ]
    });

    state.view = new EditorView({ state: startState, parent: host });
    rerender();
  } catch (err) {
    // CodeMirror failed — keep the fallback, surface a note in output.
    const note = document.createElement("p");
    note.className = "output-empty";
    note.style.color = "var(--warn)";
    note.textContent = "The live editor couldn't load (CDN blocked or offline). The text area still works; shape is still computed.";
    state.outputHost.appendChild(note);
    console.warn("CodeMirror load failed — staying on fallback textarea.", err);
  }
}

// Language toggle
for (const b of state.langButtons) {
  b.addEventListener("click", () => setLanguage(b.dataset.lang));
}
// Reset
if (state.resetButton) {
  state.resetButton.addEventListener("click", () => setSource(SAMPLES[state.lang]));
}

initEditor();
