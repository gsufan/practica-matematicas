// Logarithmic function generator: evaluate, solve exponential equations, domain, asymptote, graph.
(() => {
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const argTex = (c, d) => polyTex({ x: c, "": -d });

  const BUILDERS = {
    evaluate() {
      const b = [2, 3, 4, 5, 10][randInt(0, 4)];
      const maxExp = { 2: 8, 3: 5, 4: 4, 5: 4, 10: 4 }[b];
      const n = randInt(0, maxExp), x = b ** n;
      return {
        kind: "integer", placeholder: `ej. ${n}`,
        label: "Evalúa la función logarítmica",
        equation: `f(x) = \\log_{${b}} x \\qquad f(${x}) = ?`,
        answer: n,
        steps: [`f(${x}) = \\log_{${b}} ${x}`, `\\text{Buscamos el exponente al que hay que elevar } ${b} \\text{ para obtener } ${x}`, `${b}^{${n}} = ${x}`, `f(${x}) = ${n}`],
      };
    },

    solveExp() {
      const b = [2, 3, 4, 5][randInt(0, 3)];
      const n = randInt(1, { 2: 8, 3: 5, 4: 4, 5: 4 }[b]);
      if (Math.random() < 0.55) {
        return {
          kind: "integer", placeholder: `ej. ${n}`,
          label: "Resuelve la ecuación exponencial",
          equation: `${b}^{x} = ${b ** n}`,
          answer: n,
          steps: [`${b}^{x} = ${b ** n}`, `\\text{Escribimos } ${b ** n} \\text{ como potencia de } ${b}\\text{: } ${b ** n} = ${b}^{${n}}`, `${b}^{x} = ${b}^{${n}} \\Rightarrow x = ${n}`, `\\text{También: } x = \\log_{${b}} ${b ** n} = ${n}`],
        };
      }
      const k = nz(-4, 4);
      return {
        kind: "integer", placeholder: `ej. ${n + k}`,
        label: "Resuelve la ecuación exponencial",
        equation: `${b}^{x ${k < 0 ? "+" : "-"} ${Math.abs(k)}} = ${b ** n}`,
        answer: n + k,
        steps: [
          `${b ** n} = ${b}^{${n}}`,
          `x ${k < 0 ? "+" : "-"} ${Math.abs(k)} = ${n}`,
          `x = ${n} ${k < 0 ? "-" : "+"} ${Math.abs(k)} = ${n + k}`,
        ],
      };
    },

    inverseValue() {
      const b = [2, 3, 5][randInt(0, 2)];
      const n = randInt(2, { 2: 7, 3: 4, 5: 3 }[b]);
      return {
        kind: "integer", placeholder: `ej. ${b ** n}`,
        label: `La función f(x) = log_${b}(x) vale ${n} para cierto x. ¿Cuánto vale x?`,
        equation: `\\log_{${b}}(x) = ${n}`,
        answer: b ** n,
        steps: [`\\log_{${b}}(x) = ${n} \\Longleftrightarrow ${b}^{${n}} = x`, `x = ${b ** n}`],
      };
    },

    domain() {
      const variant = randInt(0, 1);
      if (variant === 0) {
        const a = nz(-7, 8);
        return {
          kind: "inequality", placeholder: "ej. x > 3",
          label: "¿Cuál es el dominio de la función? Escribe la condición sobre x",
          equation: `f(x) = \\log(${argTex(1, a)})`,
          answer: { op: ">", value: a },
          steps: [
            "\\text{El logaritmo solo existe para argumentos positivos}",
            `${argTex(1, a)} > 0`,
            `x > ${a}`,
          ],
        };
      }
      const c = randInt(2, 4), x0 = nz(-5, 6);
      return {
        kind: "inequality", placeholder: "ej. x > 3",
        label: "¿Cuál es el dominio de la función? Escribe la condición sobre x",
        equation: `f(x) = \\log(${argTex(c, c * x0)})`,
        answer: { op: ">", value: x0 },
        steps: [
          "\\text{El argumento del logaritmo debe ser positivo}",
          `${argTex(c, c * x0)} > 0 \\Rightarrow ${c}x > ${c * x0}`,
          `x > ${x0}`,
        ],
      };
    },

    asymptote() {
      const a = nz(-7, 8), b = [2, 3, 10][randInt(0, 2)];
      return {
        kind: "integer", placeholder: `ej. ${a}`,
        label: "La gráfica se acerca a una recta vertical x = c sin tocarla (asíntota). ¿Cuánto vale c?",
        equation: `f(x) = \\log_{${b}}(${argTex(1, a)})`,
        answer: a,
        steps: [
          `\\text{La asíntota está donde el argumento vale } 0`,
          `${argTex(1, a)} = 0 \\Rightarrow x = ${a}`,
        ],
      };
    },

    graph() {
      const b = [2, 3][randInt(0, 1)];
      const options = b === 2 ? [1, 2, 4, 8] : [1, 3, 9];
      const x = options[randInt(0, options.length - 1)];
      const n = Math.round(Math.log(x) / Math.log(b));
      return {
        kind: "integer", placeholder: `ej. ${n}`,
        label: `Observa la gráfica de f(x) = log_${b}(x). ¿Cuánto vale f(${x})?`,
        figure: FIG.plot({ fns: [{ f: (t) => (t > 0 ? Math.log(t) / Math.log(b) : NaN), from: 0.05 }], vlines: [x], xmin: -1, xmax: b === 2 ? 10 : 11, ymin: -3, ymax: 5, points: [{ x, y: n, hollow: true }] }),
        equation: `f(${x}) = ?`,
        answer: n,
        steps: [`\\text{Subimos desde } x = ${x} \\text{ hasta la curva y leemos la altura}`, `f(${x}) = \\log_{${b}} ${x} = ${n}`],
      };
    },
  };

  GENERATORS["logarithmic-function"] = {
    id: "logarithmic-function",
    name: "Función logarítmica",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "evaluate", label: "Evaluar" },
          { value: "solveExp", label: "Ecuaciones exponenciales" },
          { value: "inverseValue", label: "Hallar x" },
          { value: "domain", label: "Dominio" },
          { value: "asymptote", label: "Asíntota vertical" },
          { value: "graph", label: "Leer una gráfica" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["evaluate", "solveExp", "inverseValue", "domain", "asymptote", "graph"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 5)] : type]();
    },
  };
})();
