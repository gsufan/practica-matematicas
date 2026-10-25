// Shared helpers. Loaded before any generator or app code.

// Random integer in [min, max], both included
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Renders a LaTeX string to HTML with KaTeX.
// A "?" in the source becomes a blank box.
function renderMath(source) {
  const latex = source.replace(/\?/g, "\\square");
  return katex.renderToString(latex, { throwOnError: false });
}
