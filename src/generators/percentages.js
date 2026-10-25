// Percentages and proportions generator. Answers are exact (scaled integers over 100).
const percentagesGenerator = {
  id: "percentages",
  name: "Porcentajes y proporciones",
  keyboard: "decimal",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "of", label: "Porcentaje de una cantidad" },
        { value: "which", label: "Qué porcentaje es" },
        { value: "change", label: "Aumentos y descuentos" },
        { value: "ratio", label: "Proporciones" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["of", "which", "change", "ratio"][randInt(0, 3)] : type;
    return { kind: "decimal", placeholder: "ej. 12,5", ...PERCENT_BUILDERS[kind]() };
  },
};

const PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75];

const PERCENT_BUILDERS = {
  of() {
    const p = PERCENTS[randInt(0, PERCENTS.length - 1)];
    const total = randInt(2, 40) * 10;
    const product = p * total;
    return {
      label: "Calcula el porcentaje de la cantidad",
      equation: `${p}\\% \\text{ de } ${total} = ?`,
      answer: { n: product, d: 100 },
      steps: [
        `${p}\\% = \\frac{${p}}{100}`,
        `${p}\\% \\text{ de } ${total} = \\frac{${p}}{100} \\times ${total} = \\frac{${product}}{100}`,
        `= ${decTex(product, 2)}`,
      ],
    };
  },

  which() {
    const options = [20, 25, 40, 50, 60, 80, 120, 200, 250, 400];
    const base = options[randInt(0, options.length - 1)];
    const candidates = [5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 70, 75, 80, 90].filter((p) => (base * p) % 100 === 0);
    const p = candidates[randInt(0, candidates.length - 1)];
    const part = (base * p) / 100;
    return {
      label: "Encuentra el porcentaje",
      equation: `${part} \\text{ es el } ? \\% \\text{ de } ${base}`,
      answer: p,
      steps: [
        `\\text{Dividimos la parte entre el total: } \\frac{${part}}{${base}}`,
        `\\frac{${part}}{${base}} = ${decTex(p, 2)}`,
        `\\text{Multiplicamos por } 100 \\text{ para expresarlo en porcentaje}`,
        `= ${p}\\%`,
      ],
    };
  },

  change() {
    const price = randInt(2, 50) * 10;
    const p = [5, 10, 15, 20, 25, 30, 40, 50][randInt(0, 7)];
    const up = Math.random() < 0.5;
    const delta = price * p; // scaled by 100
    const finalScaled = price * 100 + (up ? delta : -delta);
    return {
      label: up ? "Valor final después del aumento" : "Precio final después del descuento",
      equation: `${price} \\text{ con } ${p}\\% \\text{ de } ${up ? "aumento" : "descuento"} = ?`,
      answer: { n: finalScaled, d: 100 },
      steps: [
        `${p}\\% \\text{ de } ${price} = \\frac{${p}}{100} \\times ${price} = ${decTex(delta, 2)}`,
        up ? `${price} + ${decTex(delta, 2)}` : `${price} - ${decTex(delta, 2)}`,
        `= ${decTex(finalScaled, 2)}`,
        `\\text{Otra forma: multiplicar por } ${up ? 100 + p : 100 - p}\\% = ${decTex(up ? 100 + p : 100 - p, 2)} \\text{, es decir } ${price} \\times ${decTex(up ? 100 + p : 100 - p, 2)}`,
      ],
    };
  },

  ratio() {
    let a, b;
    do { a = randInt(2, 9); b = randInt(2, 9); } while (a === b);
    const m = randInt(2, 9);
    const c = a * m, x = b * m;
    return {
      label: "Encuentra el término que falta",
      equation: `\\frac{${a}}{${b}} = \\frac{${c}}{?}`,
      answer: x,
      steps: [
        `\\frac{${a}}{${b}} = \\frac{${c}}{?}`,
        `\\text{Multiplicamos en cruz: } ${a} \\times ? = ${b} \\times ${c}`,
        `? = \\frac{${b} \\times ${c}}{${a}} = \\frac{${b * c}}{${a}}`,
        `? = ${x}`,
        `\\text{Comprobación: } ${c} \\div ${a} = ${m} \\text{ y } ${x} \\div ${b} = ${m}`,
      ],
    };
  },
};

GENERATORS[percentagesGenerator.id] = percentagesGenerator;
