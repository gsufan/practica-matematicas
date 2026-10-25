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
        return `<div class="display-math">${renderMath(text.slice(2, -2), { display: true })}</div>`;
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
  const text = raw.replace(/\s+/g, "").replace(",", ".").replace(/%$/, "");
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
