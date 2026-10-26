// Polygons generator: interior and exterior angles, diagonals, finding the number of sides.
(() => {
  const NAMES = { 3: "triángulo", 4: "cuadrilátero", 5: "pentágono", 6: "hexágono", 7: "heptágono", 8: "octógono", 9: "eneágono", 10: "decágono", 12: "dodecágono" };
  // Regular polygons whose interior angle is a whole number of degrees
  const REGULAR = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24];

  function polygonFig(n, label) {
    const c = [160, 100], R = 72;
    const pts = Array.from({ length: n }, (_, i) => FIG.at(c, R, 90 + (360 / n) * i));
    const parts = [FIG.poly(pts), FIG.dot(c)];
    if (label) parts.push(FIG.text(160, 100 + 18, label, "middle", "accent-text"));
    return FIG.svg(parts.join(""), `Polígono de ${n} lados`, 320, 200);
  }
  const name = (n) => NAMES[n] || `polígono de ${n} lados`;

  const BUILDERS = {
    sum() {
      const n = randInt(3, 12);
      const s = (n - 2) * 180;
      return {
        kind: "integer", placeholder: `ej. ${s}`,
        label: `¿Cuánto suman los ángulos interiores de un ${name(n)}? (en grados)`,
        figure: polygonFig(n, `${n} lados`),
        equation: "S = ?",
        answer: s,
        steps: [
          "\\text{Un polígono de } n \\text{ lados se divide en } n - 2 \\text{ triángulos}",
          `S = (n - 2) \\times 180 = (${n} - 2) \\times 180`,
          `S = ${n - 2} \\times 180 = ${s}`,
        ],
      };
    },

    interior() {
      const n = REGULAR[randInt(0, REGULAR.length - 1)];
      const a = 180 - 360 / n;
      return {
        kind: "integer", placeholder: `ej. ${a}`,
        label: `¿Cuánto mide cada ángulo interior de un ${name(n)} regular? (en grados)`,
        figure: polygonFig(n, `${n} lados`),
        equation: "\\alpha = ?",
        answer: a,
        steps: [
          `\\text{Suma de ángulos interiores: } (${n} - 2) \\times 180 = ${(n - 2) * 180}`,
          `\\text{Un polígono regular tiene } ${n} \\text{ ángulos iguales}`,
          `\\alpha = \\frac{${(n - 2) * 180}}{${n}} = ${a}`,
        ],
      };
    },

    exterior() {
      const n = REGULAR[randInt(0, REGULAR.length - 1)];
      return {
        kind: "integer", placeholder: `ej. ${360 / n}`,
        label: `¿Cuánto mide cada ángulo exterior de un ${name(n)} regular? (en grados)`,
        figure: polygonFig(n, `${n} lados`),
        equation: "\\beta = ?",
        answer: 360 / n,
        steps: [
          "\\text{Los ángulos exteriores de cualquier polígono suman } 360^{\\circ}",
          `\\beta = \\frac{360}{${n}} = ${360 / n}`,
        ],
      };
    },

    diagonals() {
      const n = randInt(4, 14);
      const d = (n * (n - 3)) / 2;
      return {
        kind: "integer", placeholder: `ej. ${d}`,
        label: `¿Cuántas diagonales tiene un polígono de ${n} lados?`,
        figure: polygonFig(Math.min(n, 12)),
        equation: "D = ?",
        answer: d,
        steps: [
          "\\text{Cada vértice se une con } n - 3 \\text{ vértices (no consigo mismo ni con sus 2 vecinos)}",
          "\\text{Cada diagonal se cuenta dos veces, por eso se divide entre 2}",
          `D = \\frac{n(n - 3)}{2} = \\frac{${n} \\times ${n - 3}}{2} = ${d}`,
        ],
      };
    },

    sides() {
      const n = REGULAR[randInt(0, REGULAR.length - 1)];
      const kind = randInt(0, 2);
      if (kind === 0) {
        return {
          kind: "integer", placeholder: `ej. ${n}`,
          label: "Un polígono regular tiene ángulos exteriores de esta medida. ¿Cuántos lados tiene?",
          equation: `${360 / n}^{\\circ}`,
          answer: n,
          steps: ["\\text{Ángulo exterior} = \\frac{360}{n}", `n = \\frac{360}{${360 / n}} = ${n}`],
        };
      }
      if (kind === 1) {
        const a = 180 - 360 / n;
        return {
          kind: "integer", placeholder: `ej. ${n}`,
          label: "Un polígono regular tiene ángulos interiores de esta medida. ¿Cuántos lados tiene?",
          equation: `${a}^{\\circ}`,
          answer: n,
          steps: [
            `\\text{El ángulo exterior es } 180 - ${a} = ${180 - a}`,
            `n = \\frac{360}{${180 - a}} = ${n}`,
          ],
        };
      }
      const s = (n - 2) * 180;
      return {
        kind: "integer", placeholder: `ej. ${n}`,
        label: "Los ángulos interiores de un polígono suman esta cantidad. ¿Cuántos lados tiene?",
        equation: `${s}^{\\circ}`,
        answer: n,
        steps: [`(n - 2) \\times 180 = ${s}`, `n - 2 = \\frac{${s}}{180} = ${n - 2}`, `n = ${n}`],
      };
    },
  };

  GENERATORS["polygons"] = {
    id: "polygons",
    name: "Polígonos",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "sum", label: "Suma de ángulos interiores" },
          { value: "interior", label: "Ángulo interior (regular)" },
          { value: "exterior", label: "Ángulo exterior (regular)" },
          { value: "diagonals", label: "Número de diagonales" },
          { value: "sides", label: "Hallar el número de lados" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["sum", "interior", "exterior", "diagonals", "sides"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
