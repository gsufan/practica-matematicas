// Quadratic equations generator. Answers are pairs of roots, or an integer.
(() => {
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const binom = (p) => `(x ${p < 0 ? "-" : "+"} ${Math.abs(p)})`;
  const quad = (a, b, c) => polyTex({ "x^2": a, x: b, "": c });

  function rootsProblem(label, equation, p, q, steps) {
    return { kind: "pair", unordered: true, placeholder: "ej. 2, -5", label, equation, answer: [p, q], steps };
  }

  const BUILDERS = {
    // x^2 + bx + c = 0 with integer roots, solved by factoring
    factor() {
      let p, q;
      do { p = nz(-9, 9); q = nz(-9, 9); } while (p === 0 || q === 0);
      const b = -(p + q), c = p * q;
      return rootsProblem(
        "Resuelve la ecuación (escribe las dos soluciones, separadas por coma)",
        `${quad(1, b, c)} = 0`, p, q,
        [
          `${quad(1, b, c)} = 0`,
          `\\text{Buscamos dos números que multipliquen } ${c} \\text{ y sumen } ${b}`,
          `${parenNum(-p)} \\times ${parenNum(-q)} = ${c} \\text{ y } ${parenNum(-p)} + ${parenNum(-q)} = ${b}`,
          `${binom(-p)}${binom(-q)} = 0`,
          "\\text{Un producto es cero cuando uno de sus factores es cero}",
          `x ${-p < 0 ? "-" : "+"} ${Math.abs(p)} = 0 \\Rightarrow x = ${p} \\qquad x ${-q < 0 ? "-" : "+"} ${Math.abs(q)} = 0 \\Rightarrow x = ${q}`,
        ]
      );
    },

    // (x + a)^2 = k^2, or x^2 = k^2
    root() {
      const k = randInt(2, 12);
      if (Math.random() < 0.5) {
        return rootsProblem(
          "Resuelve la ecuación (dos soluciones)",
          `x^{2} = ${k * k}`, -k, k,
          [
            `x^{2} = ${k * k}`,
            "\\text{Sacamos la raíz cuadrada de los dos lados: hay una solución positiva y una negativa}",
            `x = \\pm \\sqrt{${k * k}} = \\pm ${k}`,
            `x = ${-k} \\qquad x = ${k}`,
          ]
        );
      }
      const a = nz(-8, 8);
      return rootsProblem(
        "Resuelve la ecuación (dos soluciones)",
        `${binom(a)}^{2} = ${k * k}`, -a - k, -a + k,
        [
          `${binom(a)}^{2} = ${k * k}`,
          "\\text{Sacamos la raíz cuadrada de los dos lados}",
          `x ${a < 0 ? "-" : "+"} ${Math.abs(a)} = \\pm ${k}`,
          `x = ${-a} \\pm ${k}`,
          `x = ${-a - k} \\qquad x = ${-a + k}`,
        ]
      );
    },

    // a x^2 + bx + c = 0 with integer roots, solved with the quadratic formula
    formula() {
      let p, q, a;
      do { p = nz(-7, 7); q = nz(-7, 7); a = randInt(1, 3); } while (p === 0);
      const b = -a * (p + q), c = a * p * q;
      const disc = b * b - 4 * a * c;
      const s = Math.sqrt(disc);
      return rootsProblem(
        "Resuelve con la fórmula general (escribe las dos soluciones)",
        `${quad(a, b, c)} = 0`, p, q,
        [
          `${quad(a, b, c)} = 0 \\qquad a = ${a},\\ b = ${b},\\ c = ${c}`,
          "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          `\\Delta = b^2 - 4ac = ${parenNum(b)}^2 - 4(${a})(${parenNum(c)}) = ${disc}`,
          `\\sqrt{${disc}} = ${s}`,
          `x = \\frac{${-b} \\pm ${s}}{${2 * a}}`,
          `x = \\frac{${-b + s}}{${2 * a}} = ${(-b + s) / (2 * a)} \\qquad x = \\frac{${-b - s}}{${2 * a}} = ${(-b - s) / (2 * a)}`,
        ]
      );
    },

    // The discriminant as a number
    discriminant() {
      const a = nz(-4, 5), b = nz(-8, 8), c = nz(-8, 8);
      const disc = b * b - 4 * a * c;
      return {
        kind: "integer",
        placeholder: "ej. 25",
        label: "Calcula el discriminante Δ = b² − 4ac",
        equation: `${quad(a, b, c)} = 0`,
        answer: disc,
        steps: [
          `${quad(a, b, c)} = 0 \\qquad a = ${a},\\ b = ${b},\\ c = ${c}`,
          `\\Delta = b^2 - 4ac = ${parenNum(b)}^2 - 4(${parenNum(a)})(${parenNum(c)})`,
          `\\Delta = ${b * b} - (${4 * a * c})`,
          `\\Delta = ${disc}`,
        ],
      };
    },

    // How many real solutions
    count() {
      const target = randInt(0, 2); // 0: none, 1: one, 2: two
      if (target === 1) {
        // a(x + m)^2 expanded has discriminant 0
        const a = randInt(1, 4) * sign(), m = randInt(1, 6) * sign();
        return countProblem(a, 2 * a * m, a * m * m);
      }
      for (let attempt = 0; attempt < 200; attempt++) {
        const a = nz(-4, 5), b = nz(-8, 8), c = nz(-8, 8);
        const disc = b * b - 4 * a * c;
        if (target === 0 ? disc < 0 : disc > 0) return countProblem(a, b, c);
      }
      return target === 0 ? countProblem(1, 2, 5) : countProblem(1, -3, 2);
    },
  };

  function countProblem(a, b, c) {
    const disc = b * b - 4 * a * c;
    const answer = disc > 0 ? 2 : disc === 0 ? 1 : 0;
    return {
      kind: "integer",
      placeholder: "0, 1 o 2",
      label: "¿Cuántas soluciones reales tiene la ecuación? (0, 1 o 2)",
      equation: `${quad(a, b, c)} = 0`,
      answer,
      steps: [
        `${quad(a, b, c)} = 0 \\qquad a = ${a},\\ b = ${b},\\ c = ${c}`,
        `\\Delta = b^2 - 4ac = ${parenNum(b)}^2 - 4(${parenNum(a)})(${parenNum(c)}) = ${disc}`,
        disc > 0
          ? "\\Delta > 0 \\text{: hay dos soluciones reales distintas}"
          : disc === 0
            ? "\\Delta = 0 \\text{: hay una sola solución real (doble)}"
            : "\\Delta < 0 \\text{: no hay soluciones reales}",
        `\\text{Respuesta: } ${answer}`,
      ],
    };
  }

  GENERATORS["quadratics"] = {
    id: "quadratics",
    name: "Ecuaciones cuadráticas",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "factor", label: "Por factorización" },
          { value: "root", label: "Con raíz cuadrada" },
          { value: "formula", label: "Fórmula general" },
          { value: "discriminant", label: "Discriminante" },
          { value: "count", label: "Cuántas soluciones" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["factor", "root", "formula", "discriminant", "count"][randInt(0, 4)] : type;
      return BUILDERS[kind]();
    },
  };
})();
