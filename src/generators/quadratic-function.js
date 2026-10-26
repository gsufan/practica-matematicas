// Quadratic function generator: vertex, roots, intercept, direction, extreme value, graph reading.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const P = (x, y) => `(${x}, ${y})`;
  const std = (a, b, c) => polyTex({ "x^2": a, x: b, "": c });
  const vertexForm = (a, h, k) => `${a === 1 ? "" : a === -1 ? "-" : a}(x ${h < 0 ? "+" : "-"} ${Math.abs(h)})^{2} ${k < 0 ? "-" : "+"} ${Math.abs(k)}`.replace("(x - 0)", "x").replace("(x + 0)", "x");

  function pair(label, equation, answer, steps, figure) {
    return { kind: "pair", labels: ["x", "y"], placeholder: "ej. 2, -3", label, equation, answer, steps, figure };
  }

  const BUILDERS = {
    vertexForm() {
      const a = sign() * randInt(1, 3), h = nz(-6, 6), k = nz(-8, 8);
      return pair(
        "Esta parábola está escrita en forma de vértice. ¿Cuál es su vértice? (escribe x, y)",
        `f(x) = ${vertexForm(a, h, k)}`, [h, k],
        [
          "\\text{Forma de vértice: } f(x) = a(x - h)^2 + k \\text{, con vértice } (h, k)",
          `h = ${h} \\text{ (cuidado: el signo dentro del paréntesis se invierte)}`,
          `k = ${k}`,
          `\\text{Vértice: } ${P(h, k)}`,
        ]
      );
    },

    vertexStandard() {
      const a = sign() * randInt(1, 3), h = nz(-5, 5), k = nz(-9, 9);
      const b = -2 * a * h, c = a * h * h + k;
      return pair(
        "Encuentra el vértice de la parábola (escribe x, y)",
        `f(x) = ${std(a, b, c)}`, [h, k],
        [
          "x_v = \\frac{-b}{2a}",
          `x_v = \\frac{${-b}}{${2 * a}} = ${h}`,
          `y_v = f(${h}) = ${a}${parenNum(h)}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${parenNum(h)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${k}`,
          `\\text{Vértice: } ${P(h, k)}`,
        ]
      );
    },

    roots() {
      let p, q;
      do { p = nz(-7, 7); q = nz(-7, 7); } while (p === q);
      const a = Math.random() < 0.4 ? sign() * randInt(2, 3) : 1;
      const b = -a * (p + q), c = a * p * q;
      return {
        kind: "pair", unordered: true, placeholder: "ej. -2, 5",
        label: "¿En qué dos valores de x corta la parábola al eje horizontal? (escríbelos separados por coma)",
        equation: `f(x) = ${std(a, b, c)}`,
        answer: [p, q],
        steps: [
          "\\text{Cortar el eje } x \\text{ significa } f(x) = 0",
          `${std(a, b, c)} = 0`,
          `${a === 1 ? "" : a}(x ${-p < 0 ? "-" : "+"} ${Math.abs(p)})(x ${-q < 0 ? "-" : "+"} ${Math.abs(q)}) = 0`,
          `x = ${p} \\text{ o } x = ${q}`,
        ],
      };
    },

    intercept() {
      const a = sign() * randInt(1, 4), b = nz(-8, 8), c = nz(-9, 9);
      return {
        kind: "integer", placeholder: `ej. ${c}`,
        label: "¿En qué valor corta la parábola al eje y?",
        equation: `f(x) = ${std(a, b, c)}`,
        answer: c,
        steps: [
          "\\text{Cortar el eje } y \\text{ significa } x = 0",
          `f(0) = ${a} \\times 0^2 + ${b} \\times 0 ${c < 0 ? "-" : "+"} ${Math.abs(c)}`,
          `f(0) = ${c}`,
        ],
      };
    },

    direction() {
      const a = sign() * randInt(1, 5), b = nz(-8, 8), c = nz(-9, 9);
      return {
        kind: "integer", placeholder: "1 (arriba) o 0 (abajo)",
        label: "¿Hacia dónde abre la parábola? Escribe 1 si abre hacia arriba y 0 si abre hacia abajo",
        equation: `f(x) = ${std(a, b, c)}`,
        answer: a > 0 ? 1 : 0,
        steps: [
          "\\text{Solo importa el signo del coeficiente de } x^2",
          `a = ${a}`,
          a > 0 ? "a > 0 \\Rightarrow \\text{abre hacia arriba (tiene un mínimo)}" : "a < 0 \\Rightarrow \\text{abre hacia abajo (tiene un máximo)}",
          `\\text{Respuesta: } ${a > 0 ? 1 : 0}`,
        ],
      };
    },

    extreme() {
      const a = sign() * randInt(1, 3), h = nz(-6, 6), k = nz(-9, 9);
      return {
        kind: "integer", placeholder: `ej. ${k}`,
        label: a > 0 ? "¿Cuál es el valor mínimo de la función?" : "¿Cuál es el valor máximo de la función?",
        equation: `f(x) = ${vertexForm(a, h, k)}`,
        answer: k,
        steps: [
          a > 0 ? "\\text{Abre hacia arriba: el punto más bajo es el vértice}" : "\\text{Abre hacia abajo: el punto más alto es el vértice}",
          `\\text{Vértice: } ${P(h, k)}`,
          `\\text{El ${a > 0 ? "mínimo" : "máximo"} vale } ${k}`,
        ],
      };
    },

    graph() {
      for (let attempt = 0; attempt < 100; attempt++) {
        const a = sign(), h = randInt(-4, 4), k = randInt(-5, 5);
        if (Math.abs(k) > 5) continue;
        return pair(
          "Observa la gráfica. ¿Cuál es el vértice de la parábola? (escribe x, y)",
          "\\text{Vértice} = (x, y)", [h, k],
          [
            "\\text{El vértice es el punto más alto o más bajo de la curva}",
            `\\text{Leemos sus coordenadas: } ${P(h, k)}`,
          ],
          FIG.plot({ fns: [{ f: (x) => a * (x - h) * (x - h) + k }], xmin: -7, xmax: 7, ymin: -8, ymax: 8 })
        );
      }
      return BUILDERS.vertexForm();
    },
  };

  GENERATORS["quadratic-function"] = {
    id: "quadratic-function",
    name: "Función cuadrática",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "vertexForm", label: "Vértice (forma de vértice)" },
          { value: "vertexStandard", label: "Vértice (forma general)" },
          { value: "roots", label: "Raíces" },
          { value: "intercept", label: "Corte con el eje y" },
          { value: "direction", label: "Hacia dónde abre" },
          { value: "extreme", label: "Máximo o mínimo" },
          { value: "graph", label: "Leer una gráfica" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["vertexForm", "vertexStandard", "roots", "intercept", "direction", "extreme", "graph"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 6)] : type]();
    },
  };
})();
