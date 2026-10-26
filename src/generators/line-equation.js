// Line equation generator: from a point and slope, two points, parallel and perpendicular lines, intersections.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const P = (x, y) => `(${x}, ${y})`;
  const line = (m, b) => ({ x: m, "": b });
  const fracTex = (n, d) => {
    const r = reduceRational(n, d);
    return r.d === 1 ? `${r.n}` : `${r.n < 0 ? "-" : ""}\\frac{${Math.abs(r.n)}}{${r.d}}`;
  };

  function equationProblem(label, given, m, b, steps, figure) {
    return {
      kind: "expression", placeholder: "ej. y = 2x + 3",
      label, figure, equation: `${given} \\qquad y = ?`,
      answer: line(m, b), steps,
    };
  }

  const BUILDERS = {
    pointSlope() {
      const m = sign() * randInt(1, 5), b = nz(-8, 8), x1 = nz(-5, 5), y1 = m * x1 + b;
      return equationProblem(
        "Escribe la ecuación de la recta con esta pendiente que pasa por el punto dado",
        `m = ${m}, \\quad ${P(x1, y1)}`, m, b,
        [
          "y = mx + b",
          `${y1} = ${m} \\times ${parenNum(x1)} + b`,
          `${y1} = ${m * x1} + b \\Rightarrow b = ${y1} - ${parenNum(m * x1)} = ${b}`,
          `y = ${polyTex(line(m, b))}`,
        ]
      );
    },

    twoPoints() {
      let m, b, x1, x2;
      do { m = sign() * randInt(1, 4); b = nz(-6, 6); x1 = randInt(-4, 3); x2 = x1 + randInt(1, 4); } while (Math.abs(m * x2 + b) > 12);
      const y1 = m * x1 + b, y2 = m * x2 + b;
      const fig = FIG.plot({ fns: [{ f: (x) => m * x + b }], xmin: -8, xmax: 8, ymin: -12, ymax: 12, points: [{ x: x1, y: y1, label: P(x1, y1) }, { x: x2, y: y2, label: P(x2, y2) }] });
      return equationProblem(
        "Escribe la ecuación de la recta que pasa por los dos puntos",
        `${P(x1, y1)} \\text{ y } ${P(x2, y2)}`, m, b,
        [
          `m = \\frac{${y2} - ${parenNum(y1)}}{${x2} - ${parenNum(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}`,
          `${y1} = ${m} \\times ${parenNum(x1)} + b \\Rightarrow b = ${b}`,
          `y = ${polyTex(line(m, b))}`,
        ],
        fig
      );
    },

    parallel() {
      const m = sign() * randInt(1, 5), b0 = nz(-8, 8), x1 = nz(-5, 5), y1 = nz(-9, 9);
      const b = y1 - m * x1;
      return equationProblem(
        "Escribe la recta paralela a la dada que pasa por el punto indicado",
        `y = ${polyTex(line(m, b0))}, \\quad ${P(x1, y1)}`, m, b,
        [
          "\\text{Las rectas paralelas tienen la misma pendiente}",
          `m = ${m}`,
          `${y1} = ${m} \\times ${parenNum(x1)} + b \\Rightarrow b = ${y1} - ${parenNum(m * x1)} = ${b}`,
          `y = ${polyTex(line(m, b))}`,
        ]
      );
    },

    perpendicular() {
      const m = sign() * randInt(2, 7);
      const useFrac = Math.random() < 0.5;
      const given = useFrac ? { n: 1, d: m } : { n: m, d: 1 };
      const g = reduceRational(given.n, given.d);
      const perp = reduceRational(-g.d, g.n);
      const gTex = fracTex(g.n, g.d);
      return {
        kind: "fraction", placeholder: "ej. -1/2",
        label: "¿Cuál es la pendiente de una recta perpendicular a esta? (fracción simplificada)",
        equation: `y = ${gTex}x + 1`,
        answer: perp,
        steps: [
          "\\text{Dos rectas perpendiculares tienen pendientes opuestas e inversas: } m_1 \\times m_2 = -1",
          `m_1 = ${gTex}`,
          `m_2 = -\\frac{1}{m_1} = ${fracTex(perp.n, perp.d)}`,
        ],
      };
    },

    intersection() {
      let x, y, m1, m2, b1, b2;
      do {
        x = nz(-5, 6); y = nz(-6, 7);
        m1 = sign() * randInt(1, 4); m2 = sign() * randInt(1, 4);
        b1 = y - m1 * x; b2 = y - m2 * x;
      } while (m1 === m2 || Math.abs(b1) > 12 || Math.abs(b2) > 12);
      return {
        kind: "pair", labels: ["x", "y"], placeholder: "ej. 2, 5",
        label: "¿En qué punto se cortan estas dos rectas? (escribe x, y)",
        equation: `y = ${polyTex(line(m1, b1))} \\qquad y = ${polyTex(line(m2, b2))}`,
        answer: [x, y],
        steps: [
          "\\text{En el punto de corte los dos valores de } y \\text{ coinciden}",
          `${polyTex(line(m1, b1))} = ${polyTex(line(m2, b2))}`,
          `${polyTex({ x: m1 - m2 })} = ${b2 - b1} \\Rightarrow x = ${x}`,
          `y = ${m1}(${x}) ${b1 < 0 ? "-" : "+"} ${Math.abs(b1)} = ${y}`,
          `\\text{Punto de corte: } ${P(x, y)}`,
        ],
      };
    },
  };

  GENERATORS["line-equation"] = {
    id: "line-equation",
    name: "Ecuación de la recta",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "pointSlope", label: "Punto y pendiente" },
          { value: "twoPoints", label: "Dos puntos" },
          { value: "parallel", label: "Paralela" },
          { value: "perpendicular", label: "Pendiente perpendicular" },
          { value: "intersection", label: "Punto de corte" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["pointSlope", "twoPoints", "parallel", "perpendicular", "intersection"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
