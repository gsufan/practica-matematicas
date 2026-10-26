// Function basics generator: evaluate f(x), solve f(x) = k, is this relation a function, read a graph.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const pick = (list) => list[randInt(0, list.length - 1)];

  const BUILDERS = {
    evaluate() {
      if (Math.random() < 0.5) {
        const a = sign() * randInt(1, 6), b = nz(-9, 9), x = nz(-5, 6);
        const f = polyTex({ x: a, "": b });
        return {
          kind: "integer", placeholder: "ej. 7",
          label: "Evalúa la función",
          equation: `f(x) = ${f} \\qquad f(${x}) = ?`,
          answer: a * x + b,
          steps: [
            `f(x) = ${f}`,
            `\\text{Sustituimos } x \\text{ por } ${parenNum(x)}`,
            `f(${x}) = ${a} \\times ${parenNum(x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`,
            `f(${x}) = ${a * x + b}`,
          ],
        };
      }
      const a = sign() * randInt(1, 3), b = nz(-6, 6), c = nz(-9, 9), x = nz(-4, 5);
      const f = polyTex({ "x^2": a, x: b, "": c });
      const v = a * x * x + b * x + c;
      return {
        kind: "integer", placeholder: "ej. 12",
        label: "Evalúa la función",
        equation: `f(x) = ${f} \\qquad f(${x}) = ?`,
        answer: v,
        steps: [
          `f(x) = ${f}`,
          `f(${x}) = ${a}${parenNum(x)}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${parenNum(x)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}`,
          `f(${x}) = ${a * x * x} ${b * x < 0 ? "-" : "+"} ${Math.abs(b * x)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}`,
          `f(${x}) = ${v}`,
        ],
      };
    },

    solve() {
      const a = sign() * randInt(2, 7), b = nz(-9, 9), x = nz(-6, 8), k = a * x + b;
      const f = polyTex({ x: a, "": b });
      return {
        kind: "integer", placeholder: "ej. 3",
        label: `¿Para qué valor de x se cumple f(x) = ${k}?`,
        equation: `f(x) = ${f} \\qquad f(x) = ${k}`,
        answer: x,
        steps: [
          `${f} = ${k}`,
          `${polyTex({ x: a })} = ${k - b}`,
          `x = \\frac{${k - b}}{${a}} = ${x}`,
          `\\text{Comprobación: } f(${x}) = ${k}`,
        ],
      };
    },

    table() {
      const xs = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 4).sort((p, q) => p - q);
      const ys = xs.map(() => randInt(1, 9));
      const isFunction = Math.random() < 0.5;
      const pairs = xs.map((x, i) => [x, ys[i]]);
      if (!isFunction) {
        const dup = randInt(0, 2);
        pairs[dup + 1] = [pairs[dup][0], pairs[dup][1] + randInt(1, 3)];
      }
      const shown = pairs.map((p) => `(${p[0]},\\ ${p[1]})`).join(",\\ ");
      const xsShown = pairs.map((p) => p[0]);
      const repeated = xsShown.find((x, i) => xsShown.indexOf(x) !== i);
      return {
        kind: "integer", placeholder: "1 (sí) o 0 (no)",
        label: "¿Esta relación es una función? Escribe 1 si lo es y 0 si no",
        equation: `\\{ ${shown} \\}`,
        answer: isFunction ? 1 : 0,
        steps: [
          "\\text{Es función si cada entrada } x \\text{ tiene una sola salida } y",
          `\\text{Entradas: } ${xsShown.join(",\\ ")}`,
          isFunction
            ? "\\text{Ninguna entrada se repite: sí es función}"
            : `\\text{La entrada } ${repeated} \\text{ aparece con dos salidas distintas: no es función}`,
          `\\text{Respuesta: } ${isFunction ? 1 : 0}`,
        ],
      };
    },

    graph() {
      for (let attempt = 0; attempt < 100; attempt++) {
        const m = sign() * randInt(1, 2), b = randInt(-3, 3), a = nz(-3, 3);
        const y = m * a + b;
        if (Math.abs(y) > 6) continue;
        const f = (x) => m * x + b;
        return {
          kind: "integer", placeholder: "ej. 4",
          label: `Observa la gráfica de f. ¿Cuánto vale f(${a})?`,
          figure: FIG.plot({ fns: [{ f }], vlines: [a], xmin: -6, xmax: 6, ymin: -7, ymax: 7, points: [{ x: a, y, hollow: true }] }),
          equation: `f(${a}) = ?`,
          answer: y,
          steps: [
            `\\text{Buscamos } x = ${a} \\text{ en el eje horizontal}`,
            "\\text{Subimos (o bajamos) hasta tocar la curva}",
            `\\text{Leemos la altura del punto: } f(${a}) = ${y}`,
          ],
        };
      }
      return BUILDERS.evaluate();
    },
  };

  GENERATORS["function-basics"] = {
    id: "function-basics",
    name: "Qué es una función",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "evaluate", label: "Evaluar f(x)" },
          { value: "solve", label: "Hallar x si f(x) = k" },
          { value: "table", label: "¿Es una función?" },
          { value: "graph", label: "Leer una gráfica" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["evaluate", "solve", "table", "graph"];
      return BUILDERS[type === "all" ? pick(kinds) : type]();
    },
  };
})();
