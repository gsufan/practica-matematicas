// Fractions generator: simplify, add, subtract, multiply, divide.
// Answers are fractions in lowest terms; "6/8" is flagged as not simplified.
const fractionsGenerator = {
  id: "fractions",
  name: "Fracciones",
  keyboard: "text",

  controls: [
    {
      id: "op", type: "select", label: "Operación",
      choices: [
        { value: "all", label: "Todas" },
        { value: "simplify", label: "Simplificar" },
        { value: "add", label: "Suma" },
        { value: "sub", label: "Resta" },
        { value: "mul", label: "Multiplicación" },
        { value: "div", label: "División" },
      ],
    },
  ],

  generate({ op }) {
    const kind = op === "all" ? ["simplify", "add", "sub", "mul", "div"][randInt(0, 4)] : op;
    const problem = FRACTION_BUILDERS[kind]();
    return { kind: "fraction", placeholder: "ej. 3/4", ...problem };
  },
};

const tf = (n, d) => `\\frac{${n}}{${d}}`;

// Steps that reduce n/d to lowest terms; the answer is a {n, d} fraction
function reduceSteps(n, d) {
  const g = gcd(n, d);
  const r = reduceRational(n, d);
  const steps = [];
  if (g > 1) {
    steps.push(`\\text{Simplificamos: el mayor divisor común de } ${n} \\text{ y } ${d} \\text{ es } ${g}`);
    steps.push(`${tf(n, d)} = ${tf(`${n} \\div ${g}`, `${d} \\div ${g}`)} = ${r.d === 1 ? r.n : tf(r.n, r.d)}`);
  } else {
    steps.push(`\\text{Ya está simplificada: no tienen divisores comunes}`);
  }
  return { steps, answer: r };
}

// Two different fractions, not whole numbers
function twoFractions() {
  let a, b, c, d;
  do {
    b = randInt(2, 12); d = Math.random() < 0.2 ? b : randInt(2, 12);
    a = randInt(1, b + 3); c = randInt(1, d + 3);
  } while (a === b || c === d || a % b === 0 || c % d === 0);
  return [a, b, c, d];
}

const FRACTION_BUILDERS = {
  simplify() {
    let a, b;
    do { b = randInt(2, 10); a = randInt(1, 12); } while (gcd(a, b) !== 1 || a === b);
    const g = randInt(2, 9);
    const { steps, answer } = reduceSteps(a * g, b * g);
    return {
      label: "Simplifica la fracción",
      equation: `${tf(a * g, b * g)} = ?`,
      answer,
      steps: [tf(a * g, b * g), ...steps],
    };
  },

  add() {
    const [a, b, c, d] = twoFractions();
    return combine(a, b, c, d, "+", "Suma las fracciones");
  },

  sub() {
    let [a, b, c, d] = twoFractions();
    if (a * d < c * b) [a, b, c, d] = [c, d, a, b]; // keep the result positive
    if (a * d === c * b) return FRACTION_BUILDERS.sub();
    return combine(a, b, c, d, "-", "Resta las fracciones");
  },

  mul() {
    const [a, b, c, d] = twoFractions();
    const steps = [
      `${tf(a, b)} \\times ${tf(c, d)}`,
      "\\text{Multiplicamos numeradores entre sí y denominadores entre sí}",
      `= ${tf(`${a} \\times ${c}`, `${b} \\times ${d}`)} = ${tf(a * c, b * d)}`,
    ];
    const r = reduceSteps(a * c, b * d);
    return {
      label: "Multiplica las fracciones",
      equation: `${tf(a, b)} \\times ${tf(c, d)} = ?`,
      answer: r.answer,
      steps: [...steps, ...r.steps],
    };
  },

  div() {
    const [a, b, c, d] = twoFractions();
    const steps = [
      `${tf(a, b)} \\div ${tf(c, d)}`,
      "\\text{Dividir entre una fracción es multiplicar por su inversa}",
      `= ${tf(a, b)} \\times ${tf(d, c)}`,
      `= ${tf(`${a} \\times ${d}`, `${b} \\times ${c}`)} = ${tf(a * d, b * c)}`,
    ];
    const r = reduceSteps(a * d, b * c);
    return {
      label: "Divide las fracciones",
      equation: `${tf(a, b)} \\div ${tf(c, d)} = ?`,
      answer: r.answer,
      steps: [...steps, ...r.steps],
    };
  },
};

// Add or subtract using the least common denominator
function combine(a, b, c, d, sign, label) {
  const L = lcm(b, d);
  const x = a * (L / b), y = c * (L / d);
  const num = sign === "+" ? x + y : x - y;
  const symbol = sign === "+" ? "+" : "-";
  const steps = [`${tf(a, b)} ${symbol} ${tf(c, d)}`];

  if (b === d) {
    steps.push("\\text{Mismo denominador: se opera solo con los numeradores}");
  } else {
    steps.push(`\\text{Denominador común: el mínimo común múltiplo de } ${b} \\text{ y } ${d} \\text{ es } ${L}`);
    steps.push(`= ${tf(`${a} \\times ${L / b}`, `${b} \\times ${L / b}`)} ${symbol} ${tf(`${c} \\times ${L / d}`, `${d} \\times ${L / d}`)} = ${tf(x, L)} ${symbol} ${tf(y, L)}`);
  }
  steps.push(`= ${tf(`${x} ${symbol} ${y}`, L)} = ${tf(num, L)}`);

  const r = reduceSteps(num, L);
  return {
    label,
    equation: `${tf(a, b)} ${symbol} ${tf(c, d)} = ?`,
    answer: r.answer,
    steps: [...steps, ...r.steps],
  };
}

GENERATORS[fractionsGenerator.id] = fractionsGenerator;
