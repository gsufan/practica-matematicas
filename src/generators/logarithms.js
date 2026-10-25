// Logarithms generator: evaluate, find the number, find the base, use the properties.
const logarithmsGenerator = {
  id: "logarithms",
  name: "Logaritmos",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "eval", label: "Calcular el logaritmo" },
        { value: "number", label: "Hallar el número" },
        { value: "base", label: "Hallar la base" },
        { value: "laws", label: "Propiedades" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["eval", "number", "base", "laws"][randInt(0, 3)] : type;
    return { kind: "integer", ...LOG_BUILDERS[kind]() };
  },
};

const logTex = (b, x) => `\\log_{${b}} ${x}`;

// Base and exponent so that base^exponent stays small
function baseAndExponent(minExp = 0) {
  const b = [2, 3, 4, 5, 10][randInt(0, 4)];
  const maxExp = { 2: 8, 3: 5, 4: 4, 5: 4, 10: 5 }[b];
  return [b, randInt(Math.max(minExp, 0), maxExp)];
}

const LOG_BUILDERS = {
  eval() {
    const [b, n] = baseAndExponent();
    const inverse = n > 0 && Math.random() < 0.25; // argument as 1 / b^n, answer -n
    const x = b ** n;
    const arg = inverse ? `\\frac{1}{${x}}` : `${x}`;
    const result = inverse ? -n : n;
    return {
      label: "Calcula el logaritmo",
      equation: `${logTex(b, arg)} = ?`,
      answer: result,
      steps: [
        `${logTex(b, arg)} = ?`,
        `\\text{Preguntamos: a qué exponente hay que elevar } ${b} \\text{ para obtener } ${arg}`,
        `${b}^{?} = ${arg}`,
        inverse ? `${b}^{${result}} = \\frac{1}{${b}^{${n}}} = \\frac{1}{${x}}` : `${b}^{${result}} = ${x}`,
        `${logTex(b, arg)} = ${result}`,
      ],
    };
  },

  number() {
    const [b, n] = baseAndExponent(1);
    const x = b ** n;
    return {
      label: "Encuentra el número",
      equation: `${logTex(b, "?")} = ${n}`,
      answer: x,
      steps: [
        `${logTex(b, "?")} = ${n}`,
        "\\text{Un logaritmo es un exponente: } \\log_{b} x = n \\text{ significa } b^{n} = x",
        `? = ${b}^{${n}}`,
        `? = ${x}`,
      ],
    };
  },

  base() {
    const b = randInt(2, 10);
    const n = randInt(2, b > 5 ? 3 : 4);
    const x = b ** n;
    return {
      label: "Encuentra la base",
      equation: `\\log_{?} ${x} = ${n}`,
      answer: b,
      steps: [
        `\\log_{?} ${x} = ${n}`,
        `\\text{Significa: } ?^{${n}} = ${x}`,
        `\\text{Buscamos un número que elevado a } ${n} \\text{ dé } ${x}`,
        `${b}^{${n}} = ${x} \\Rightarrow ? = ${b}`,
      ],
    };
  },

  laws() {
    const b = [2, 3, 5][randInt(0, 2)];
    const maxExp = { 2: 6, 3: 4, 5: 3 }[b];
    const m = randInt(1, maxExp - 1), n = randInt(1, maxExp - m);
    const type = randInt(0, 2);
    if (type === 0) {
      return {
        label: "Usa las propiedades de los logaritmos",
        equation: `${logTex(b, b ** m)} + ${logTex(b, b ** n)} = ?`,
        answer: m + n,
        steps: [
          `${logTex(b, b ** m)} + ${logTex(b, b ** n)}`,
          "\\text{Suma de logaritmos con la misma base: se multiplican los argumentos}",
          `= ${logTex(b, `(${b ** m} \\times ${b ** n})`)} = ${logTex(b, b ** (m + n))}`,
          `= ${m + n}`,
          `\\text{Comprobación: } ${m} + ${n} = ${m + n}`,
        ],
      };
    }
    if (type === 1) {
      const big = m + n;
      return {
        label: "Usa las propiedades de los logaritmos",
        equation: `${logTex(b, b ** big)} - ${logTex(b, b ** n)} = ?`,
        answer: big - n,
        steps: [
          `${logTex(b, b ** big)} - ${logTex(b, b ** n)}`,
          "\\text{Resta de logaritmos con la misma base: se dividen los argumentos}",
          `= ${logTex(b, `\\frac{${b ** big}}{${b ** n}}`)} = ${logTex(b, b ** (big - n))}`,
          `= ${big - n}`,
          `\\text{Comprobación: } ${big} - ${n} = ${big - n}`,
        ],
      };
    }
    const p = randInt(2, 4);
    return {
      label: "Usa las propiedades de los logaritmos",
      equation: `${logTex(b, `${b ** m}^{${p}}`)} = ?`,
      answer: m * p,
      steps: [
        logTex(b, `${b ** m}^{${p}}`),
        "\\text{El exponente del argumento baja multiplicando: } \\log_{b} x^{p} = p \\cdot \\log_{b} x",
        `= ${p} \\times ${logTex(b, b ** m)} = ${p} \\times ${m}`,
        `= ${m * p}`,
      ],
    };
  },
};

GENERATORS[logarithmsGenerator.id] = logarithmsGenerator;
