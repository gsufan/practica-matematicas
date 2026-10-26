// Coordinate plane generator: distance, midpoint, slope, quadrant.
(() => {
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };

  // Plane with grid; points = [{ p: [x, y], name }], segment = [pa, pb] or null
  function planeFig(points, segment, extent = 9) {
    const S = 88 / extent, ox = 160, oy = 100;
    const map = (p) => [ox + p[0] * S, oy - p[1] * S].map((n) => Math.round(n * 10) / 10);
    const parts = [];
    for (let i = -extent; i <= extent; i++) {
      parts.push(FIG.line(map([i, -extent]), map([i, extent]), "mark").replace('class="f-mark"', 'class="f-grid"'));
      parts.push(FIG.line(map([-extent, i]), map([extent, i]), "mark").replace('class="f-mark"', 'class="f-grid"'));
    }
    parts.push(FIG.line(map([-extent, 0]), map([extent + 0.4, 0])), FIG.line(map([0, -extent]), map([0, extent + 0.4])));
    parts.push(FIG.text(map([extent + 0.9, 0])[0], map([0, 0])[1], "x", "middle", "muted"), FIG.text(map([0, 0])[0], map([0, extent + 1])[1] - 2, "y", "middle", "muted"));
    for (let i = -extent + 1; i < extent; i += extent > 6 ? 2 : 1) {
      if (i === 0) continue;
      parts.push(FIG.text(map([i, 0])[0], map([0, 0])[1] + 11, String(i), "middle", "muted"));
      parts.push(FIG.text(map([0, 0])[0] - 10, map([0, i])[1], String(i), "middle", "muted"));
    }
    if (segment) parts.push(FIG.line(map(segment[0]), map(segment[1]), "accent"));
    points.forEach((pt) => {
      const m = map(pt.p);
      parts.push(FIG.dot(m), FIG.text(m[0] + (pt.dx ?? 12), m[1] + (pt.dy ?? -12), pt.name, "middle", "accent-text"));
    });
    return FIG.svg(parts.join(""), "Plano cartesiano", 320, 200);
  }

  const P = (p) => `(${p[0]}, ${p[1]})`;

  const BUILDERS = {
    distance() {
      const [dx, dy, d] = TRIPLES[randInt(0, TRIPLES.length - 1)];
      const sx = sign(), sy = sign();
      let x1, y1;
      do { x1 = randInt(-8, 8); y1 = randInt(-8, 8); } while (Math.abs(x1 + sx * dx) > 9 || Math.abs(y1 + sy * dy) > 9);
      const a = [x1, y1], b = [x1 + sx * dx, y1 + sy * dy];
      return {
        kind: "integer", placeholder: `ej. ${d}`,
        label: "Calcula la distancia entre los dos puntos",
        figure: planeFig([{ p: a, name: "A" }, { p: b, name: "B" }], [a, b]),
        equation: `A${P(a)}, \\quad B${P(b)} \\qquad d(A, B) = ?`,
        answer: d,
        steps: [
          "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
          `d = \\sqrt{(${b[0]} - ${parenNum(a[0])})^2 + (${b[1]} - ${parenNum(a[1])})^2}`,
          `d = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${d * d}}`,
          `d = ${d}`,
        ],
      };
    },

    midpoint() {
      const x1 = randInt(-8, 8), y1 = randInt(-8, 8);
      const x2 = x1 + 2 * nz(-4, 4), y2 = y1 + 2 * nz(-4, 4);
      const m = [(x1 + x2) / 2, (y1 + y2) / 2];
      return {
        kind: "pair", placeholder: "ej. 2, -3",
        label: "Encuentra el punto medio del segmento AB (escribe x, y)",
        figure: planeFig([{ p: [x1, y1], name: "A" }, { p: [x2, y2], name: "B" }], [[x1, y1], [x2, y2]]),
        equation: `A${P([x1, y1])}, \\quad B${P([x2, y2])}`,
        answer: m,
        steps: [
          "M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)",
          `M = \\left(\\frac{${parenNum(x1)} + ${parenNum(x2)}}{2},\\ \\frac{${parenNum(y1)} + ${parenNum(y2)}}{2}\\right)`,
          `M = ${P(m)}`,
        ],
      };
    },

    slope() {
      let x1, y1, x2, y2;
      do { x1 = randInt(-7, 7); y1 = randInt(-7, 7); x2 = randInt(-7, 7); y2 = randInt(-7, 7); } while (x1 === x2 || y1 === y2);
      const r = reduceRational(y2 - y1, x2 - x1);
      const tex = r.d === 1 ? `${r.n}` : `${r.n < 0 ? "-" : ""}\\frac{${Math.abs(r.n)}}{${r.d}}`;
      return {
        kind: "fraction", placeholder: "ej. 2 o -3/4",
        label: "Calcula la pendiente de la recta que pasa por A y B (fracción simplificada)",
        figure: planeFig([{ p: [x1, y1], name: "A" }, { p: [x2, y2], name: "B" }], [[x1, y1], [x2, y2]]),
        equation: `A${P([x1, y1])}, \\quad B${P([x2, y2])} \\qquad m = ?`,
        answer: r,
        steps: [
          "m = \\frac{y_2 - y_1}{x_2 - x_1}",
          `m = \\frac{${parenNum(y2)} - ${parenNum(y1)}}{${parenNum(x2)} - ${parenNum(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}}`,
          `m = ${tex}`,
        ],
      };
    },

    quadrant() {
      const x = nz(-8, 8), y = nz(-8, 8);
      const q = x > 0 && y > 0 ? 1 : x < 0 && y > 0 ? 2 : x < 0 && y < 0 ? 3 : 4;
      return {
        kind: "integer", placeholder: "1, 2, 3 o 4",
        label: "¿En qué cuadrante está el punto? Escribe 1, 2, 3 o 4",
        figure: planeFig([{ p: [x, y], name: "P" }], null),
        equation: `P${P([x, y])}`,
        answer: q,
        steps: [
          "\\text{Los cuadrantes se numeran en sentido contrario a las agujas del reloj, empezando arriba a la derecha}",
          `x ${x > 0 ? "> 0" : "< 0"} \\text{ e } y ${y > 0 ? "> 0" : "< 0"}`,
          `\\text{Cuadrante } ${q}`,
        ],
      };
    },
  };

  GENERATORS["coordinate-plane"] = {
    id: "coordinate-plane",
    name: "Plano cartesiano",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "distance", label: "Distancia entre puntos" },
          { value: "midpoint", label: "Punto medio" },
          { value: "slope", label: "Pendiente" },
          { value: "quadrant", label: "Cuadrante" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["distance", "midpoint", "slope", "quadrant"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 3)] : type]();
    },
  };
})();
