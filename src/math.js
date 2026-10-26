// Shared helpers. Loaded before any generator or app code.

// Random integer in [min, max], both included
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Renders a LaTeX string to HTML with KaTeX.
// A "?" in the source becomes a blank box.
function renderMath(source, { display = false } = {}) {
  const latex = source.replace(/\?/g, "\\square");
  return katex.renderToString(latex, { throwOnError: false, displayMode: display });
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inline text with $math$ and **bold**
function renderInline(text) {
  return text
    .split(/(\$[^$]+\$)/)
    .map((part) =>
      part.startsWith("$") && part.endsWith("$") && part.length > 1
        ? renderMath(part.slice(1, -1))
        : escapeHtml(part).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    )
    .join("");
}

// Lesson markup: blank-line separated blocks.
//   ## Heading      - bullet list      > note      $$ display math $$
//   {{practice}}    placeholder where the practice widget is mounted
function renderRich(source) {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const text = block.trim();
      const lines = text.split("\n");
      if (text === "{{practice}}") return '<div data-practice></div>';
      if (text.startsWith("## ")) return `<h2>${renderInline(text.slice(3))}</h2>`;
      if (text.startsWith("$$") && text.endsWith("$$")) {
        // one display per line, so a derivation can be written on several lines
        const parts = lines.map((l) => l.trim().replace(/^\$\$|\$\$$/g, ""));
        return `<div class="display-math">${parts.map((p) => renderMath(p, { display: true })).join("")}</div>`;
      }
      if (lines.every((l) => l.startsWith("- "))) {
        return `<ul>${lines.map((l) => `<li>${renderInline(l.slice(2))}</li>`).join("")}</ul>`;
      }
      if (lines.every((l) => l.startsWith("> "))) {
        return `<aside class="note">${renderInline(lines.map((l) => l.slice(2)).join(" "))}</aside>`;
      }
      return `<p>${renderInline(lines.join(" "))}</p>`;
    })
    .join("\n");
}

// ---- Exact numbers: rationals are { n, d } with integer n and d > 0 ----

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

// Lowest terms, positive denominator
function reduceRational(n, d) {
  const g = gcd(n, d) || 1;
  const sign = d < 0 ? -1 : 1;
  return { n: (sign * n) / g, d: (sign * d) / g };
}

// Fraction as written, not reduced (keeps the sign in front)
function fracRaw(n, d) {
  return d === 1 ? `${n}` : `${n < 0 ? "-" : ""}\\frac{${Math.abs(n)}}{${d}}`;
}

// Scaled integer n with k decimals as LaTeX with a decimal comma, trailing zeros trimmed
function decTex(n, k) {
  const digits = String(Math.abs(n)).padStart(k + 1, "0");
  const whole = digits.slice(0, digits.length - k);
  const frac = digits.slice(digits.length - k).replace(/0+$/, "");
  return (n < 0 ? "-" : "") + whole + (frac ? `{,}${frac}` : "");
}

// Student input -> { value: {n,d}, simplified } or { error }.
// kind: "integer" accepts only whole numbers; "fraction" and "decimal" also accept
// a/b and decimals with comma or dot ("0,5" and "1/2" are the same value).
function parseAnswer(raw, kind) {
  const text = raw.replace(/\s+/g, "").replace(",", ".").replace(/%$/, "").replace(/^[a-z]=/i, "");
  if (/^-?\d+$/.test(text)) return { value: { n: Number(text), d: 1 }, simplified: true };
  if (kind === "integer") return { error: "Escribe solo un número entero." };

  const dec = text.match(/^(-?)(\d+)\.(\d+)$/);
  if (dec && dec[3].length <= 8) {
    const n = Number(dec[2] + dec[3]) * (dec[1] ? -1 : 1);
    return { value: reduceRational(n, 10 ** dec[3].length), simplified: true };
  }
  const frac = text.match(/^(-?\d+)\/(-?\d+)$/);
  if (frac) {
    const n = Number(frac[1]), d = Number(frac[2]);
    if (d === 0) return { error: "El denominador no puede ser cero." };
    return { value: reduceRational(n, d), simplified: gcd(n, d) === 1 && d > 0 };
  }
  return { error: kind === "fraction" ? "Escribe una fracción como 3/4 o un número." : "Escribe un número, por ejemplo 2,5." };
}

// Accepts an integer, a decimal number or a {n,d} answer
function toRational(x) {
  if (typeof x === "object") return reduceRational(x.n, x.d);
  if (Number.isInteger(x)) return { n: x, d: 1 };
  const text = x.toFixed(8).replace(/0+$/, "");
  const [whole, frac] = text.split(".");
  return reduceRational(Number(whole.replace("-", "") + frac) * (x < 0 ? -1 : 1), 10 ** frac.length);
}

function sameValue(a, b) {
  const x = toRational(a), y = toRational(b);
  return x.n === y.n && x.d === y.d;
}

// ---- Polynomials: plain objects { monomial: coefficient }, "" is the constant ----
// Monomial keys list variables alphabetically with exponents: "x", "x^2", "xy".

// Student text -> { value, repeated } or { error }. `repeated` is true when two terms
// of the same kind were written (3x + 2x), that is, the answer is not reduced.
function parsePolynomial(raw) {
  const text = raw.toLowerCase().replace(/\s+/g, "").replace(/[−–]/g, "-")
    .replace(/[·*×]/g, "").replace(/²/g, "^2").replace(/³/g, "^3").replace(/,/g, ".");
  if (!text) return { error: "Escribe una respuesta." };
  if (/[()]/.test(text)) return { error: "Escribe la expresión sin paréntesis, ya desarrollada." };

  const terms = text.match(/[+-]?[^+-]+/g);
  if (!terms || terms.join("") !== text) return { error: "No entiendo esa expresión. Ejemplo: 5x + 4" };

  const value = {};
  const seen = {};
  for (const term of terms) {
    const m = term.match(/^([+-]?)(\d*\.?\d*)((?:[a-z](?:\^\d+)?)*)$/);
    if (!m || (m[2] === "" && m[3] === "") || m[2] === ".") return { error: "No entiendo esa expresión. Ejemplo: 5x + 4" };
    const coef = (m[2] === "" ? 1 : Number(m[2])) * (m[1] === "-" ? -1 : 1);

    const powers = {};
    for (const v of m[3].matchAll(/([a-z])(?:\^(\d+))?/g)) powers[v[1]] = (powers[v[1]] || 0) + Number(v[2] || 1);
    const key = Object.keys(powers).sort().map((l) => l + (powers[l] > 1 ? `^${powers[l]}` : "")).join("");

    value[key] = (value[key] || 0) + coef;
    seen[key] = (seen[key] || 0) + 1;
  }
  return { value, repeated: Object.values(seen).some((n) => n > 1) };
}

// ---- Inequalities and pairs of numbers ----

const FLIP_OP = { "<": ">", ">": "<", "<=": ">=", ">=": "<=" };

// "x > 3", "x<=5/2", "3 < x" -> { op, value: {n,d} } with the variable on the left
function parseInequality(raw) {
  const text = raw.replace(/\s+/g, "").replace(/≥/g, ">=").replace(/≤/g, "<=")
    .replace(/=>/g, ">=").replace(/=</g, "<=").toLowerCase();
  const hint = "Escribe una desigualdad, por ejemplo x > 3 o x <= 5/2.";
  let op, bound;
  let m = text.match(/^([a-z])(<=|>=|<|>)(.+)$/);
  if (m) {
    op = m[2];
    bound = m[3];
  } else {
    m = text.match(/^(.+?)(<=|>=|<|>)([a-z])$/);
    if (!m) return { error: hint };
    op = FLIP_OP[m[2]];
    bound = m[1];
  }
  const parsed = parseAnswer(bound, "fraction");
  if (parsed.error) return { error: hint };
  return { op, value: parsed.value };
}

// "2, 5", "(3; -2)", "x=3, y=-2" -> { values: [{n,d}, {n,d}] } or { error }.
// With labels (["x","y"]) a labeled answer may come in either order.
function parsePair(raw, labels) {
  const hint = "Escribe dos números separados por coma, por ejemplo 2, 5.";
  let parts = raw.replace(/[()]/g, "").split(/[,;]/);
  if (parts.length === 1) parts = raw.replace(/[()]/g, "").trim().split(/\s+/);
  if (parts.length !== 2) return { error: hint };

  const items = parts.map((part) => {
    const m = part.trim().match(/^([a-z])\s*=\s*(.+)$/i);
    const parsed = parseAnswer(m ? m[2] : part.trim(), "fraction");
    return { label: m ? m[1].toLowerCase() : null, parsed };
  });
  if (items.some((it) => it.parsed.error)) return { error: hint };

  let ordered = items;
  if (labels && items.every((it) => it.label) && items[0].label === labels[1] && items[1].label === labels[0]) {
    ordered = [items[1], items[0]];
  }
  return { values: ordered.map((it) => it.parsed.value) };
}

function pairEqual(values, answer, unordered) {
  const [a, b] = values;
  if (sameValue(a, answer[0]) && sameValue(b, answer[1])) return true;
  return Boolean(unordered) && sameValue(a, answer[1]) && sameValue(b, answer[0]);
}

function polyEqual(a, b) {
  const clean = (p) => Object.entries(p).filter(([, c]) => Math.abs(c) > 1e-9);
  const x = clean(a), y = clean(b);
  return x.length === y.length && x.every(([k, c]) => Math.abs(c - (b[k] || 0)) < 1e-9);
}

// Monomial key as LaTeX: "x^2y" -> x^{2}y
const keyTex = (key) => key.replace(/\^(\d+)/g, "^{$1}");

// Polynomial as LaTeX, highest degree first, constant last. Zero terms are skipped.
function polyTex(poly) {
  const degree = (k) => [...k.matchAll(/([a-z])(?:\^(\d+))?/g)].reduce((s, m) => s + Number(m[2] || 1), 0);
  const keys = Object.keys(poly).filter((k) => poly[k] !== 0)
    .sort((a, b) => degree(b) - degree(a) || (a < b ? -1 : 1));
  if (keys.length === 0) return "0";
  return keys.map((k, i) => {
    const c = poly[k], abs = Math.abs(c);
    const body = k === "" ? `${abs}` : (abs === 1 ? "" : `${abs}`) + keyTex(k);
    if (i === 0) return (c < 0 ? "-" : "") + body;
    return ` ${c < 0 ? "-" : "+"} ${body}`;
  }).join("");
}

// Same, but a negative number is wrapped in parentheses: used when substituting values
const parenNum = (n) => (n < 0 ? `(${n})` : `${n}`);
