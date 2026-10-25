// Integers generator: addition, subtraction, multiplication and exact division with signs.
const integersGenerator = {
  id: "integers",
  name: "Enteros y negativos",

  controls: [
    {
      id: "op", type: "select", label: "Operación",
      choices: [
        { value: "all", label: "Todas" },
        { value: "add", label: "Suma" },
        { value: "sub", label: "Resta" },
        { value: "mul", label: "Multiplicación" },
        { value: "div", label: "División" },
      ],
    },
    {
      id: "range", type: "radio", label: "Tamaño",
      choices: [{ value: "9", label: "Hasta 9" }, { value: "20", label: "Hasta 20" }],
    },
  ],

  generate({ op, range }) {
    const max = Number(range);
    const kind = op === "all" ? ["add", "sub", "mul", "div"][randInt(0, 3)] : op;
    return BUILDERS[kind](max);
  },
};

// Signed number: random sign, value in [1, max]
const signedInt = (max) => (Math.random() < 0.5 ? -1 : 1) * randInt(1, max);
// Negative operand goes in parentheses
const paren = (n) => (n < 0 ? `(${n})` : `${n}`);

function addSteps(a, b) {
  const r = a + b;
  const steps = [`${a} + ${paren(b)}`];
  if (a === -b) {
    steps.push("\\text{Son opuestos: se anulan}", "= 0");
  } else if (a < 0 === b < 0) {
    steps.push(
      "\\text{Mismo signo: se suman los valores absolutos}",
      `${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(r)}`,
      `\\text{Se conserva el signo común (${a < 0 ? "negativo" : "positivo"})}`,
      `= ${r}`
    );
  } else {
    const big = Math.max(Math.abs(a), Math.abs(b));
    const small = Math.min(Math.abs(a), Math.abs(b));
    const winner = Math.abs(a) > Math.abs(b) ? a : b;
    steps.push(
      "\\text{Signos distintos: se resta el valor absoluto menor al mayor}",
      `${big} - ${small} = ${big - small}`,
      `\\text{Gana el signo del mayor valor absoluto (${winner < 0 ? "negativo" : "positivo"})}`,
      `= ${r}`
    );
  }
  return steps;
}

function pair(max) {
  // at least one negative, so the signs matter
  let a, b;
  do { a = signedInt(max); b = signedInt(max); } while (a > 0 && b > 0);
  return [a, b];
}

const BUILDERS = {
  add(max) {
    const [a, b] = pair(max);
    return {
      label: "Suma",
      equation: `${a} + ${paren(b)} = ?`,
      answer: a + b,
      steps: addSteps(a, b),
    };
  },

  sub(max) {
    const [a, b] = pair(max);
    return {
      label: "Resta",
      equation: `${a} - ${paren(b)} = ?`,
      answer: a - b,
      steps: [
        `${a} - ${paren(b)}`,
        "\\text{Restar es sumar el opuesto}",
        `= ${a} + ${paren(-b)}`,
        ...addSteps(a, -b).slice(1),
      ],
    };
  },

  mul(max) {
    const [a, b] = pair(Math.min(max, 12));
    const product = a * b;
    const same = a < 0 === b < 0;
    return {
      label: "Multiplica",
      equation: `${a} \\times ${paren(b)} = ?`,
      answer: product,
      steps: [
        `${a} \\times ${paren(b)}`,
        `\\text{Se multiplican los valores absolutos: } ${Math.abs(a)} \\times ${Math.abs(b)} = ${Math.abs(product)}`,
        same
          ? "\\text{Signos iguales: el resultado es positivo}"
          : "\\text{Signos distintos: el resultado es negativo}",
        `= ${product}`,
      ],
    };
  },

  div(max) {
    const d = signedInt(Math.min(max, 12));
    const q = signedInt(Math.min(max, 12));
    const n = d * q;
    const same = n < 0 === d < 0;
    return {
      label: "Divide",
      equation: `${n} \\div ${paren(d)} = ?`,
      answer: q,
      steps: [
        `${n} \\div ${paren(d)}`,
        `\\text{Se dividen los valores absolutos: } ${Math.abs(n)} \\div ${Math.abs(d)} = ${Math.abs(q)}`,
        same
          ? "\\text{Signos iguales: el resultado es positivo}"
          : "\\text{Signos distintos: el resultado es negativo}",
        `= ${q}`,
        `\\text{Comprobación: } ${paren(d)} \\times ${paren(q)} = ${n}`,
      ],
    };
  },
};

GENERATORS[integersGenerator.id] = integersGenerator;
