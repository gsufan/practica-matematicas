// Powers and roots generator: powers, roots, exponent laws and negative exponents.
const powersRootsGenerator = {
  id: "powers-roots",
  name: "Potencias y raíces",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "pow", label: "Potencias" },
        { value: "root", label: "Raíces" },
        { value: "laws", label: "Propiedades" },
        { value: "neg", label: "Exponentes negativos" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["pow", "root", "laws", "neg"][randInt(0, 3)] : type;
    return POWER_BUILDERS[kind]();
  },
};

const baseTex = (a) => (a < 0 ? `(${a})` : `${a}`);

const POWER_BUILDERS = {
  pow() {
    let a, e;
    do {
      a = randInt(2, 10) * (Math.random() < 0.2 ? -1 : 1);
      e = randInt(2, 5);
    } while (Math.abs(a) ** e > 20000 || (a < 0 && e > 3));
    if (Math.random() < 0.1) e = [0, 1][randInt(0, 1)];
    const value = a ** e;
    const steps = [`${baseTex(a)}^{${e}}`];
    if (e === 0) {
      steps.push("\\text{Todo número distinto de cero elevado a } 0 \\text{ vale } 1");
    } else if (e === 1) {
      steps.push("\\text{Elevar a } 1 \\text{ deja el número igual}");
    } else {
      steps.push(`= ${Array(e).fill(baseTex(a)).join(" \\times ")}`);
      if (e > 2) {
        let acc = a;
        const parts = [`${acc}`];
        for (let i = 1; i < e; i++) { acc *= a; parts.push(`${acc}`); }
        steps.push(`\\text{Vamos multiplicando de a dos: } ${parts.join(" \\to ")}`);
      }
      if (a < 0) {
        steps.push(`\\text{Exponente ${e % 2 === 0 ? "par: el resultado es positivo" : "impar: el resultado es negativo"}}`);
      }
    }
    steps.push(`= ${value}`);
    return {
      kind: "integer",
      label: "Calcula la potencia",
      equation: `${baseTex(a)}^{${e}} = ?`,
      answer: value,
      steps,
    };
  },

  root() {
    if (Math.random() < 0.6) {
      const k = randInt(2, 20);
      return {
        kind: "integer",
        label: "Calcula la raíz cuadrada",
        equation: `\\sqrt{${k * k}} = ?`,
        answer: k,
        steps: [
          `\\sqrt{${k * k}}`,
          `\\text{Buscamos un número positivo que elevado al cuadrado dé } ${k * k}`,
          `${k}^2 = ${k} \\times ${k} = ${k * k}`,
          `\\sqrt{${k * k}} = ${k}`,
        ],
      };
    }
    const k = randInt(2, 10) * (Math.random() < 0.3 ? -1 : 1);
    return {
      kind: "integer",
      label: "Calcula la raíz cúbica",
      equation: `\\sqrt[3]{${k ** 3}} = ?`,
      answer: k,
      steps: [
        `\\sqrt[3]{${k ** 3}}`,
        `\\text{Buscamos un número que elevado al cubo dé } ${k ** 3}`,
        `${baseTex(k)}^3 = ${k ** 3}`,
        `\\sqrt[3]{${k ** 3}} = ${k}`,
      ],
    };
  },

  laws() {
    const a = [2, 3, 5, 10][randInt(0, 3)];
    const type = randInt(0, 2);
    let m, n;
    if (type === 0) {
      do { m = randInt(2, 6); n = randInt(2, 6); } while (a ** (m + n) > 100000);
      return lawProblem(`${a}^{${m}} \\times ${a}^{${n}}`, `\\text{Misma base: se suman los exponentes}`, `${a}^{${m} + ${n}} = ${a}^{${m + n}}`, a ** (m + n));
    }
    if (type === 1) {
      do { m = randInt(4, 8); n = randInt(2, m - 1); } while (a ** m > 100000);
      return lawProblem(`\\frac{${a}^{${m}}}{${a}^{${n}}}`, `\\text{Misma base: se restan los exponentes}`, `${a}^{${m} - ${n}} = ${a}^{${m - n}}`, a ** (m - n));
    }
    do { m = randInt(2, 4); n = randInt(2, 3); } while (a ** (m * n) > 100000);
    return lawProblem(`(${a}^{${m}})^{${n}}`, `\\text{Potencia de una potencia: se multiplican los exponentes}`, `${a}^{${m} \\times ${n}} = ${a}^{${m * n}}`, a ** (m * n));
  },

  neg() {
    const a = randInt(2, 6);
    const n = randInt(1, a <= 3 ? 4 : 2);
    const den = a ** n;
    return {
      kind: "fraction",
      placeholder: "ej. 1/8",
      label: "Calcula la potencia con exponente negativo",
      equation: `${a}^{-${n}} = ?`,
      answer: { n: 1, d: den },
      steps: [
        `${a}^{-${n}}`,
        "\\text{Un exponente negativo invierte la base}",
        `= \\frac{1}{${a}^{${n}}}`,
        `= \\frac{1}{${den}}`,
      ],
    };
  },
};

function lawProblem(expr, rule, collapsed, value) {
  return {
    kind: "integer",
    label: "Aplica las propiedades de las potencias y calcula",
    equation: `${expr} = ?`,
    answer: value,
    steps: [expr, rule, `= ${collapsed}`, `= ${value}`],
  };
}

GENERATORS[powersRootsGenerator.id] = powersRootsGenerator;
