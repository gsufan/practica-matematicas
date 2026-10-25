// Decimals generator. Numbers are scaled integers (value = n / 10^k), so results are exact.
const decimalsGenerator = {
  id: "decimals",
  name: "Decimales",
  keyboard: "decimal",

  controls: [
    {
      id: "op", type: "select", label: "Operación",
      choices: [
        { value: "all", label: "Todas" },
        { value: "add", label: "Suma" },
        { value: "sub", label: "Resta" },
        { value: "mul", label: "Multiplicación" },
        { value: "div", label: "División" },
        { value: "frac", label: "Fracción a decimal" },
      ],
    },
  ],

  generate({ op }) {
    const kind = op === "all" ? ["add", "sub", "mul", "div", "frac"][randInt(0, 4)] : op;
    return { kind: "decimal", placeholder: "ej. 2,5", ...DECIMAL_BUILDERS[kind]() };
  },
};

// Every decimal place shown, trailing zeros included
function fixedTex(n, k) {
  if (k === 0) return `${n}`;
  const digits = String(Math.abs(n)).padStart(k + 1, "0");
  return (n < 0 ? "-" : "") + digits.slice(0, digits.length - k) + "{,}" + digits.slice(digits.length - k);
}

const decValue = (n, k) => ({ n, d: 10 ** k });

// Random decimal with 1 or 2 places: { n, k }
function randDecimal(maxInt) {
  const k = randInt(1, 2);
  return { n: randInt(11, maxInt * 10 ** k), k };
}

// Shows the trimmed value only when it differs from the fixed one
function trimmedStep(n, k) {
  return fixedTex(n, k) === decTex(n, k) ? null : `= ${decTex(n, k)}`;
}

const DECIMAL_BUILDERS = {
  add() { return addSub("+"); },
  sub() { return addSub("-"); },

  mul() {
    const a = randDecimal(20);
    const b = Math.random() < 0.4 ? { n: randInt(2, 12), k: 0 } : { n: randInt(11, 99), k: 1 };
    const product = a.n * b.n, k = a.k + b.k;
    const steps = [
      `${decTex(a.n, a.k)} \\times ${decTex(b.n, b.k)}`,
      `\\text{Multiplicamos sin las comas: } ${a.n} \\times ${b.n} = ${product}`,
      `\\text{Los factores tienen } ${a.k} + ${b.k} = ${k} \\text{ decimales en total}`,
      `\\text{Ponemos la coma ${k} lugares desde la derecha: } ${fixedTex(product, k)}`,
    ];
    const trimmed = trimmedStep(product, k);
    if (trimmed) steps.push(trimmed);
    return {
      label: "Multiplica",
      equation: `${decTex(a.n, a.k)} \\times ${decTex(b.n, b.k)} = ?`,
      answer: decValue(product, k),
      steps,
    };
  },

  div() {
    const q = { n: randInt(2, 99), k: randInt(0, 2) };
    const d = Math.random() < 0.5 ? { n: randInt(2, 12), k: 0 } : { n: randInt(2, 9), k: 1 };
    const dividend = q.n * d.n, kd = q.k + d.k;
    const steps = [`${decTex(dividend, kd)} \\div ${decTex(d.n, d.k)}`];
    if (d.k > 0) {
      steps.push(`\\text{Multiplicamos dividendo y divisor por 10 para que el divisor sea entero}`);
      steps.push(`= ${fixedTex(dividend, q.k)} \\div ${d.n}`);
    }
    steps.push(`= ${decTex(q.n, q.k)}`);
    steps.push(`\\text{Comprobación: } ${decTex(q.n, q.k)} \\times ${decTex(d.n, d.k)} = ${decTex(dividend, kd)}`);
    return {
      label: "Divide",
      equation: `${decTex(dividend, kd)} \\div ${decTex(d.n, d.k)} = ?`,
      answer: decValue(q.n, q.k),
      steps,
    };
  },

  frac() {
    const d = [2, 4, 5, 8, 10, 20, 25, 50][randInt(0, 7)];
    let n;
    do { n = randInt(1, d * 2 - 1); } while (n % d === 0 || gcd(n, d) !== 1);
    let k = 1;
    while ((10 ** k) % d !== 0) k++;
    const m = 10 ** k / d, scaled = n * m;
    return {
      label: "Escribe la fracción como decimal",
      equation: `\\frac{${n}}{${d}} = ?`,
      answer: decValue(scaled, k),
      steps: [
        `\\frac{${n}}{${d}}`,
        `\\text{Buscamos una fracción equivalente con denominador } ${10 ** k}`,
        `= \\frac{${n} \\times ${m}}{${d} \\times ${m}} = \\frac{${scaled}}{${10 ** k}}`,
        `= ${decTex(scaled, k)}`,
        `\\text{Comprobación: } ${n} \\div ${d} = ${decTex(scaled, k)}`,
      ],
    };
  },
};

function addSub(sign) {
  const a = randDecimal(50), b = randDecimal(50);
  const K = Math.max(a.k, b.k);
  const scale = (x) => x.n * 10 ** (K - x.k);
  // subtraction keeps the larger number first, so the result is positive
  const [first, second] = sign === "-" && scale(a) < scale(b) ? [b, a] : [a, b];
  const result = sign === "+" ? scale(first) + scale(second) : scale(first) - scale(second);
  const steps = [
    `${decTex(first.n, first.k)} ${sign} ${decTex(second.n, second.k)}`,
    "\\text{Alineamos las comas, completando con ceros}",
    `${fixedTex(scale(first), K)} ${sign} ${fixedTex(scale(second), K)}`,
    `= ${fixedTex(result, K)}`,
  ];
  const trimmed = trimmedStep(result, K);
  if (trimmed) steps.push(trimmed);
  return {
    label: sign === "+" ? "Suma" : "Resta",
    equation: `${decTex(first.n, first.k)} ${sign} ${decTex(second.n, second.k)} = ?`,
    answer: decValue(result, K),
    steps,
  };
}

GENERATORS[decimalsGenerator.id] = decimalsGenerator;
