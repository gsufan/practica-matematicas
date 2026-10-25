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
