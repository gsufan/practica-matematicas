// Linear function generator: slope, intercept, value, zero, graph reading and models.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const fracTex = (n, d) => {
    const r = reduceRational(n, d);
    return r.d === 1 ? `${r.n}` : `${r.n < 0 ? "-" : ""}\\frac{${Math.abs(r.n)}}{${r.d}}`;
  };

  const BUILDERS = {
    parameter() {
      const m = sign() * randInt(1, 9), b = nz(-9, 9);
      const askSlope = Math.random() < 0.5;
      const f = `y = ${polyTex({ x: m, "": b })}`;
      return {
        kind: "integer", placeholder: askSlope ? `ej. ${m}` : `ej. ${b}`,
        label: askSlope ? "¿Cuál es la pendiente de esta recta?" : "¿Cuál es la ordenada en el origen (donde corta al eje y)?",
        equation: f,
        answer: askSlope ? m : b,
        steps: [
          "\\text{Forma pendiente-ordenada: } y = mx + b",
          f,
          askSlope ? `m = ${m} \\text{ (el número que multiplica a } x \\text{)}` : `b = ${b} \\text{ (el número que va solo, sin } x \\text{)}`,
        ],
      };
    },

    value() {
      const m = sign() * randInt(1, 8), b = nz(-9, 9), x = nz(-6, 7);
      const f = polyTex({ x: m, "": b });
      return {
        kind: "integer", placeholder: "ej. 5",
        label: "Evalúa la función lineal",
        equation: `f(x) = ${f} \\qquad f(${x}) = ?`,
        answer: m * x + b,
        steps: [`f(${x}) = ${m} \\times ${parenNum(x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`, `f(${x}) = ${m * x} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`, `f(${x}) = ${m * x + b}`],
      };
    },

    zero() {
      const m = sign() * randInt(2, 7), b = nz(-12, 12);
      const r = reduceRational(-b, m);
      return {
        kind: "fraction", placeholder: "ej. 3 o -5/2",
        label: "¿Dónde corta la recta al eje x? Escribe el valor de x (fracción simplificada si hace falta)",
        equation: `f(x) = ${polyTex({ x: m, "": b })}`,
        answer: r,
        steps: [
          "\\text{Cortar el eje } x \\text{ significa } f(x) = 0",
          `${polyTex({ x: m, "": b })} = 0`,
          `${polyTex({ x: m })} = ${-b}`,
          `x = \\frac{${-b}}{${m}} = ${fracTex(-b, m)}`,
        ],
      };
    },

    graph() {
      for (let attempt = 0; attempt < 100; attempt++) {
        const num = sign() * randInt(1, 3), den = Math.random() < 0.5 ? 1 : randInt(2, 3);
        const b = randInt(-3, 3);
        if (den > 1 && b % 1 !== 0) continue;
        const m = num / den;
        const f = (x) => m * x + b;
        // two lattice points on the line that are inside the view
        const x1 = den > 1 ? -den : -2, y1 = f(x1), x2 = x1 + den * 2, y2 = f(x2);
        if (![y1, y2].every((v) => Number.isInteger(v) && Math.abs(v) <= 6)) continue;
        const askSlope = Math.random() < 0.6;
        const mr = reduceRational(num, den);
        return {
          kind: "fraction", placeholder: askSlope ? "ej. 2 o 1/2" : "ej. 3",
          label: askSlope ? "Observa la recta. ¿Cuál es su pendiente? (fracción simplificada si hace falta)" : "Observa la recta. ¿En qué valor corta al eje y?",
          figure: FIG.plot({ fns: [{ f }], xmin: -6, xmax: 6, ymin: -7, ymax: 7, points: [{ x: x1, y: y1, label: `(${x1}, ${y1})` }, { x: x2, y: y2, label: `(${x2}, ${y2})` }] }),
          equation: askSlope ? "m = ?" : "b = ?",
          answer: askSlope ? mr : b,
          steps: askSlope
            ? [
                `\\text{Tomamos dos puntos marcados: } (${x1}, ${y1}) \\text{ y } (${x2}, ${y2})`,
                `m = \\frac{${y2} - ${parenNum(y1)}}{${x2} - ${parenNum(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}}`,
                `m = ${fracTex(num, den)}`,
              ]
            : [`\\text{La ordenada en el origen es donde la recta cruza el eje } y`, `b = ${b}`],
        };
      }
      return BUILDERS.parameter();
    },

    model() {
      const start = randInt(3, 12) * 10, rate = randInt(2, 9), t = randInt(2, 9);
      if (Math.random() < 0.5) {
        const v = start - rate * t;
        if (v < 0) return BUILDERS.model();
        return {
          kind: "integer", placeholder: `ej. ${v}`,
          label: "Problema",
          statement: `Un estanque tiene ${start} litros de agua y pierde ${rate} litros cada minuto. La cantidad de agua es V(t) = ${start} − ${rate}t. ¿Cuántos litros quedan después de ${t} minutos?`,
          equation: `V(${t}) = ?`,
          answer: v,
          steps: [`V(t) = ${start} - ${rate}t`, `V(${t}) = ${start} - ${rate} \\times ${t}`, `V(${t}) = ${start} - ${rate * t} = ${v}`],
        };
      }
      const fixed = randInt(2, 9) * 100, perKm = randInt(2, 8) * 50, km = randInt(3, 20);
      const cost = fixed + perKm * km;
      return {
        kind: "integer", placeholder: `ej. ${cost}`,
        label: "Problema",
        statement: `El costo de un viaje en taxi es C(x) = ${fixed} + ${perKm}x pesos, donde x son los kilómetros recorridos. ¿Cuánto cuesta un viaje de ${km} km?`,
        equation: `C(${km}) = ?`,
        answer: cost,
        steps: [`C(x) = ${fixed} + ${perKm}x`, `C(${km}) = ${fixed} + ${perKm} \\times ${km}`, `C(${km}) = ${fixed} + ${perKm * km} = ${cost}`],
      };
    },
  };

  GENERATORS["linear-function"] = {
    id: "linear-function",
    name: "Función lineal",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "parameter", label: "Pendiente y ordenada" },
          { value: "value", label: "Evaluar" },
          { value: "zero", label: "Corte con el eje x" },
          { value: "graph", label: "Leer una recta" },
          { value: "model", label: "Problemas" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["parameter", "value", "zero", "graph", "model"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
