// Exponential function generator: evaluate, find the base, growth and decay, compound interest, asymptote.
(() => {
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const add = (k) => `${k < 0 ? "-" : "+"} ${Math.abs(k)}`;
  const money = (n) => `$${n.toLocaleString("es-CL")}`;

  const BUILDERS = {
    evaluate() {
      if (Math.random() < 0.65) {
        const b = randInt(2, 5), a = randInt(1, 4), x = randInt(1, b === 2 ? 6 : b === 3 ? 4 : 3);
        const coef = a === 1 ? "" : `${a} \\cdot `;
        return {
          kind: "integer", placeholder: `ej. ${a * b ** x}`,
          label: "Evalúa la función exponencial",
          equation: `f(x) = ${coef}${b}^{x} \\qquad f(${x}) = ?`,
          answer: a * b ** x,
          steps: [`f(${x}) = ${coef}${b}^{${x}}`, `${b}^{${x}} = ${Array(x).fill(b).join(" \\times ")} = ${b ** x}`, `f(${x}) = ${a * b ** x}`],
        };
      }
      // base 1/2: pick x and a so that the result is a whole number
      const x = randInt(1, 5), k = randInt(1, 4), a = k * 2 ** x;
      return {
        kind: "integer", placeholder: `ej. ${k}`,
        label: "Evalúa la función exponencial (decae a la mitad en cada paso)",
        equation: `f(x) = ${a} \\cdot \\left(\\frac{1}{2}\\right)^{x} \\qquad f(${x}) = ?`,
        answer: k,
        steps: [`f(${x}) = ${a} \\cdot \\left(\\frac{1}{2}\\right)^{${x}} = ${a} \\cdot \\frac{1}{${2 ** x}}`, `f(${x}) = \\frac{${a}}{${2 ** x}} = ${k}`],
      };
    },

    base() {
      const b = randInt(2, 6), a = randInt(1, 5), n = randInt(2, 3);
      return {
        kind: "integer", placeholder: `ej. ${b}`,
        label: `La función f(x) = a · b^x pasa por los puntos (0, ${a}) y (${n}, ${a * b ** n}). ¿Cuánto vale la base b?`,
        equation: `f(0) = ${a} \\qquad f(${n}) = ${a * b ** n}`,
        answer: b,
        steps: [
          `f(0) = a \\cdot b^0 = a \\Rightarrow a = ${a}`,
          `f(${n}) = ${a} \\cdot b^{${n}} = ${a * b ** n} \\Rightarrow b^{${n}} = ${b ** n}`,
          `b = ${b}`,
        ],
      };
    },

    growth() {
      if (Math.random() < 0.5) {
        const n0 = randInt(1, 9) * 10, t = randInt(2, 6), grow = randInt(2, 3);
        const word = grow === 2 ? "se duplica" : "se triplica";
        return {
          kind: "integer", placeholder: `ej. ${n0 * grow ** t}`,
          label: "Problema",
          statement: `Un cultivo de bacterias tiene ${n0} bacterias y ${word} cada hora. El número de bacterias es N(t) = ${n0} · ${grow}^t. ¿Cuántas bacterias hay después de ${t} horas?`,
          equation: `N(${t}) = ?`,
          answer: n0 * grow ** t,
          steps: [`N(${t}) = ${n0} \\cdot ${grow}^{${t}}`, `${grow}^{${t}} = ${grow ** t}`, `N(${t}) = ${n0} \\times ${grow ** t} = ${n0 * grow ** t}`],
        };
      }
      const t = randInt(2, 5), n0 = randInt(2, 9) * 2 ** t;
      return {
        kind: "integer", placeholder: `ej. ${n0 / 2 ** t}`,
        label: "Problema",
        statement: `Una sustancia radiactiva tiene ${n0} gramos y se reduce a la mitad cada año. La cantidad es M(t) = ${n0} · (1/2)^t. ¿Cuántos gramos quedan después de ${t} años?`,
        equation: `M(${t}) = ?`,
        answer: n0 / 2 ** t,
        steps: [`M(${t}) = ${n0} \\cdot \\left(\\frac{1}{2}\\right)^{${t}} = \\frac{${n0}}{${2 ** t}}`, `M(${t}) = ${n0 / 2 ** t}`],
      };
    },

    interest() {
      const p = randInt(1, 5) * 1000, rate = [10, 20][randInt(0, 1)], t = randInt(2, 3);
      const factor = (100 + rate) / 100;
      const amount = Math.round(p * factor ** t);
      return {
        kind: "integer", placeholder: `ej. ${amount}`,
        label: "Problema",
        statement: `Se invierten ${money(p)} con un interés compuesto de ${rate}% anual. El monto después de t años es A(t) = ${p} · ${String(factor).replace(".", ",")}^t. ¿Cuánto dinero hay después de ${t} años?`,
        equation: `A(${t}) = ?`,
        answer: amount,
        steps: [
          `A(${t}) = ${p} \\cdot ${String(factor).replace(".", "{,}")}^{${t}}`,
          `${String(factor).replace(".", "{,}")}^{${t}} = ${String(factor ** t).replace(/(\.\d{4})\d+/, "$1").replace(".", "{,}")}`,
          `A(${t}) = ${amount}`,
        ],
      };
    },

    asymptote() {
      const a = randInt(1, 4), b = randInt(2, 4), c = nz(-6, 6);
      return {
        kind: "integer", placeholder: `ej. ${c}`,
        label: "La gráfica de esta función se acerca a una recta horizontal y = c sin tocarla (asíntota). ¿Cuánto vale c?",
        equation: `f(x) = ${a === 1 ? "" : a + " \\cdot "}${b}^{x} ${add(c)}`,
        answer: c,
        steps: [
          `\\text{Cuando } x \\text{ es muy negativo, } ${b}^{x} \\text{ se acerca a } 0`,
          `f(x) \\to 0 ${add(c)} = ${c}`,
          `\\text{La asíntota es } y = ${c}`,
        ],
      };
    },

    graph() {
      const b = [2, 3][randInt(0, 1)];
      const xs = b === 2 ? [1, 2, 3, 4] : [1, 2, 3];
      const x = xs[randInt(0, xs.length - 1)];
      const ymax = b === 2 ? 18 : 30;
      return {
        kind: "integer", placeholder: `ej. ${b ** x}`,
        label: `Observa la gráfica de f(x) = ${b}^x. ¿Cuánto vale f(${x})?`,
        figure: FIG.plot({ fns: [{ f: (t) => b ** t }], vlines: [x], xmin: -3, xmax: 5, ymin: -2, ymax, points: [{ x, y: b ** x, hollow: true }] }),
        equation: `f(${x}) = ?`,
        answer: b ** x,
        steps: [`\\text{Subimos desde } x = ${x} \\text{ hasta la curva}`, `f(${x}) = ${b}^{${x}} = ${b ** x}`],
      };
    },
  };

  GENERATORS["exponential-function"] = {
    id: "exponential-function",
    name: "Función exponencial",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "evaluate", label: "Evaluar" },
          { value: "base", label: "Hallar la base" },
          { value: "growth", label: "Crecimiento y decaimiento" },
          { value: "interest", label: "Interés compuesto" },
          { value: "asymptote", label: "Asíntota" },
          { value: "graph", label: "Leer una gráfica" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["evaluate", "base", "growth", "interest", "asymptote", "graph"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 5)] : type]();
    },
  };
})();
