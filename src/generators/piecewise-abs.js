// Piecewise functions and absolute value: evaluate, solve |x - a| = b, read a graph.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const add = (k) => `${k < 0 ? "-" : "+"} ${Math.abs(k)}`;

  const BUILDERS = {
    piecewise() {
      const m = nz(-3, 3), q = nz(-5, 5), c = randInt(-2, 2), s = nz(-5, 5), r = sign() * randInt(1, 2);
      const left = (x) => m * x + q, right = (x) => r * x * x + s;
      const a = randInt(c - 4, c + 4);
      const useLeft = a < c;
      const leftTex = polyTex({ x: m, "": q }), rightTex = polyTex({ "x^2": r, "": s });
      const value = useLeft ? left(a) : right(a);
      return {
        kind: "integer", placeholder: "ej. 4",
        label: "Evalúa la función por partes",
        equation: `f(x) = \\begin{cases} ${leftTex} & \\text{si } x < ${c} \\\\ ${rightTex} & \\text{si } x \\geq ${c} \\end{cases} \\qquad f(${a}) = ?`,
        answer: value,
        steps: [
          `\\text{Miramos en qué rama cae } x = ${a}\\text{: } ${a} ${useLeft ? "<" : "\\geq"} ${c}`,
          useLeft ? `\\text{Usamos } ${leftTex}` : `\\text{Usamos } ${rightTex}`,
          useLeft
            ? `f(${a}) = ${m} \\times ${parenNum(a)} ${add(q)} = ${value}`
            : `f(${a}) = ${r} \\times ${parenNum(a)}^2 ${add(s)} = ${value}`,
        ],
      };
    },

    absEval() {
      const a = nz(-4, 4), b = nz(-6, 6), c = nz(-6, 6), x = nz(-6, 6);
      const inside = a * x + b;
      return {
        kind: "integer", placeholder: "ej. 7",
        label: "Evalúa la función con valor absoluto",
        equation: `f(x) = |${polyTex({ x: a, "": b })}| ${add(c)} \\qquad f(${x}) = ?`,
        answer: Math.abs(inside) + c,
        steps: [
          `f(${x}) = |${a} \\times ${parenNum(x)} ${add(b)}| ${add(c)}`,
          `= |${inside}| ${add(c)}`,
          "\\text{El valor absoluto es la distancia al cero: nunca es negativo}",
          `= ${Math.abs(inside)} ${add(c)} = ${Math.abs(inside) + c}`,
        ],
      };
    },

    absEquation() {
      const a = nz(-8, 8), b = randInt(1, 7);
      return {
        kind: "pair", unordered: true, placeholder: "ej. -2, 6",
        label: "Resuelve la ecuación. Tiene dos soluciones: escríbelas separadas por coma",
        equation: `|x ${a < 0 ? "+" : "-"} ${Math.abs(a)}| = ${b}`,
        answer: [a - b, a + b],
        steps: [
          "\\text{|A| = b significa que A = b o A = -b}",
          `x ${a < 0 ? "+" : "-"} ${Math.abs(a)} = ${b} \\quad \\text{o} \\quad x ${a < 0 ? "+" : "-"} ${Math.abs(a)} = ${-b}`,
          `x = ${a + b} \\quad \\text{o} \\quad x = ${a - b}`,
        ],
      };
    },

    graph() {
      for (let attempt = 0; attempt < 100; attempt++) {
        const h = randInt(-3, 3), k = randInt(-3, 3), a = sign() * randInt(1, 2), x = nz(-5, 5);
        const f = (t) => a * Math.abs(t - h) + k;
        const y = f(x);
        if (Math.abs(y) > 6 || x === h) continue;
        return {
          kind: "integer", placeholder: `ej. ${y}`,
          label: `Observa la gráfica de f. ¿Cuánto vale f(${x})?`,
          figure: FIG.plot({ fns: [{ f }], vlines: [x], xmin: -7, xmax: 7, ymin: -7, ymax: 7, points: [{ x, y, hollow: true }] }),
          equation: `f(${x}) = ?`,
          answer: y,
          steps: [`\\text{Buscamos } x = ${x}\\text{ y subimos hasta la curva}`, `f(${x}) = ${y}`],
        };
      }
      return BUILDERS.absEval();
    },
  };

  GENERATORS["piecewise-abs"] = {
    id: "piecewise-abs",
    name: "Por partes y valor absoluto",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "piecewise", label: "Función por partes" },
          { value: "absEval", label: "Evaluar con valor absoluto" },
          { value: "absEquation", label: "Ecuación con valor absoluto" },
          { value: "graph", label: "Leer una gráfica" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["piecewise", "absEval", "absEquation", "graph"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 3)] : type]();
    },
  };
})();
