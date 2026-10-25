// Linear equations generator. The answer is the value of x, built from a known solution.
const linearEquationsGenerator = {
  id: "linear-equations",
  name: "Ecuaciones lineales",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "one", label: "Un paso" },
        { value: "two", label: "Dos pasos" },
        { value: "both", label: "x en ambos lados" },
        { value: "paren", label: "Con paréntesis" },
        { value: "fraction", label: "Solución fraccionaria" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["one", "two", "both", "paren", "fraction"][randInt(0, 4)] : type;
    const problem = EQUATION_BUILDERS[kind]();
    return { kind: problem.kind || "integer", placeholder: "ej. x = 4", ...problem };
  },
};

const rsign = () => (Math.random() < 0.5 ? -1 : 1);
const nz = (min, max) => {
  let n = 0;
  while (n === 0) n = randInt(min, max);
  return n;
};
// Sum written as "+ n" or "- n"
const addTex = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);
// Coefficient of x as text: 1 -> "x", -1 -> "-x"
const xTex = (a) => (a === 1 ? "x" : a === -1 ? "-x" : `${a}x`);
// a x + b as text
const linTex = (a, b) => (b === 0 ? xTex(a) : `${xTex(a)} ${addTex(b)}`);

const EQUATION_BUILDERS = {
  one() {
    const x = nz(-9, 12);
    const variant = randInt(0, 3);
    if (variant === 0) {
      const a = randInt(1, 12);
      return {
        label: "Resuelve la ecuación",
        equation: `x + ${a} = ${x + a}`,
        answer: x,
        steps: [`x + ${a} = ${x + a}`, `\\text{Restamos } ${a} \\text{ a los dos lados}`, `x = ${x + a} - ${a}`, `x = ${x}`, `\\text{Comprobación: } ${parenNum(x)} + ${a} = ${x + a}`],
      };
    }
    if (variant === 1) {
      const a = randInt(1, 12);
      return {
        label: "Resuelve la ecuación",
        equation: `x - ${a} = ${x - a}`,
        answer: x,
        steps: [`x - ${a} = ${x - a}`, `\\text{Sumamos } ${a} \\text{ a los dos lados}`, `x = ${parenNum(x - a)} + ${a}`, `x = ${x}`, `\\text{Comprobación: } ${parenNum(x)} - ${a} = ${x - a}`],
      };
    }
    if (variant === 2) {
      const a = rsign() * randInt(2, 9);
      return {
        label: "Resuelve la ecuación",
        equation: `${xTex(a)} = ${a * x}`,
        answer: x,
        steps: [`${xTex(a)} = ${a * x}`, `\\text{Dividimos los dos lados entre } ${a}`, `x = \\frac{${a * x}}{${a}}`, `x = ${x}`, `\\text{Comprobación: } ${a} \\times ${parenNum(x)} = ${a * x}`],
      };
    }
    const a = randInt(2, 9);
    return {
      label: "Resuelve la ecuación",
      equation: `\\frac{x}{${a}} = ${x}`,
      answer: a * x,
      steps: [`\\frac{x}{${a}} = ${x}`, `\\text{Multiplicamos los dos lados por } ${a}`, `x = ${x} \\times ${a}`, `x = ${a * x}`, `\\text{Comprobación: } \\frac{${a * x}}{${a}} = ${x}`],
    };
  },

  two() {
    const x = nz(-9, 12), a = rsign() * randInt(2, 9), b = nz(-12, 12), c = a * x + b;
    return {
      label: "Resuelve la ecuación",
      equation: `${linTex(a, b)} = ${c}`,
      answer: x,
      steps: [
        `${linTex(a, b)} = ${c}`,
        `\\text{${b < 0 ? "Sumamos" : "Restamos"} } ${Math.abs(b)} \\text{ a los dos lados}`,
        `${xTex(a)} = ${c - b}`,
        `\\text{Dividimos los dos lados entre } ${a}`,
        `x = \\frac{${c - b}}{${a}} = ${x}`,
        `\\text{Comprobación: } ${a} \\times ${parenNum(x)} ${addTex(b)} = ${c}`,
      ],
    };
  },

  both() {
    let x, a, c, b, d;
    do {
      x = nz(-8, 10); a = nz(-7, 9); c = nz(-7, 9); b = nz(-10, 10);
      d = a * x + b - c * x;
    } while (a === c || Math.abs(d) > 30 || d === 0 || Math.abs(a) === 1 && Math.abs(c) === 1);
    const diff = a - c;
    return {
      label: "Resuelve la ecuación",
      equation: `${linTex(a, b)} = ${linTex(c, d)}`,
      answer: x,
      steps: [
        `${linTex(a, b)} = ${linTex(c, d)}`,
        `\\text{Pasamos los términos con } x \\text{ a un lado y los números al otro}`,
        `${xTex(a)} ${c < 0 ? "+" : "-"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}x = ${d} ${b < 0 ? "+" : "-"} ${Math.abs(b)}`,
        `${xTex(diff)} = ${d - b}`,
        `x = \\frac{${d - b}}{${diff}} = ${x}`,
        `\\text{Comprobación: } ${parenNum(a * x + b)} = ${parenNum(c * x + d)}`,
      ],
    };
  },

  paren() {
    const x = nz(-8, 10), a = rsign() * randInt(2, 6), b = nz(-9, 9), e = nz(-9, 9);
    const inside = a * (x + b);
    const rhs = inside + e;
    return {
      label: "Resuelve la ecuación",
      equation: `${a}(${linTex(1, b)}) ${addTex(e)} = ${rhs}`,
      answer: x,
      steps: [
        `${a}(${linTex(1, b)}) ${addTex(e)} = ${rhs}`,
        `\\text{Distribuimos el } ${a}`,
        `${linTex(a, a * b)} ${addTex(e)} = ${rhs}`,
        `${linTex(a, a * b + e)} = ${rhs}`,
        `${xTex(a)} = ${rhs - (a * b + e)}`,
        `x = \\frac{${rhs - (a * b + e)}}{${a}} = ${x}`,
      ],
    };
  },

  fraction() {
    let a, b, c;
    do {
      a = rsign() * randInt(2, 9); b = nz(-9, 9); c = nz(-15, 15);
    } while ((c - b) % a === 0);
    const numer = c - b;
    const r = reduceRational(numer, a);
    const answerTex = r.d === 1 ? `${r.n}` : `${r.n < 0 ? "-" : ""}\\frac{${Math.abs(r.n)}}{${r.d}}`;
    return {
      kind: "fraction",
      placeholder: "ej. 3/2",
      label: "Resuelve la ecuación (la solución es una fracción)",
      equation: `${linTex(a, b)} = ${c}`,
      answer: { n: r.n, d: r.d },
      steps: [
        `${linTex(a, b)} = ${c}`,
        `\\text{${b < 0 ? "Sumamos" : "Restamos"} } ${Math.abs(b)} \\text{ a los dos lados}`,
        `${xTex(a)} = ${numer}`,
        `\\text{Dividimos entre } ${a}`,
        `x = \\frac{${numer}}{${a}} = ${answerTex}`,
        `\\text{Simplificada: } ${answerTex}`,
      ],
    };
  },
};

GENERATORS[linearEquationsGenerator.id] = linearEquationsGenerator;
