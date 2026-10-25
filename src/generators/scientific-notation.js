// Scientific notation generator: expand a number, or find the exponent.
const scientificNotationGenerator = {
  id: "scientific-notation",
  name: "Notación científica",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "expand", label: "De científica a decimal" },
        { value: "exponent", label: "Hallar el exponente" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["expand", "exponent"][randInt(0, 1)] : type;
    return SCI_BUILDERS[kind]();
  },
};

// Integer digits grouped in threes with a thin space, for long numbers
function groupDigits(text) {
  return text.length < 5 ? text : text.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
}

// Value c10 / 10 * 10^e as LaTeX. c10 is the coefficient times 10 (11..99).
function expandedTex(c10, e) {
  if (e >= 1) return groupDigits(String(c10 * 10 ** (e - 1)));
  return decTex(c10, 1 - e);
}

function randomCoefficient() {
  // mostly with one decimal (3,2), sometimes whole (5)
  return Math.random() < 0.25 ? randInt(2, 9) * 10 : randInt(11, 99);
}

function randomExponent() {
  const e = randInt(2, 8) * (Math.random() < 0.4 ? -1 : 1);
  return e === 1 || e === -1 ? 3 : e;
}

const SCI_BUILDERS = {
  expand() {
    const c10 = randomCoefficient();
    const e = randomExponent();
    const value = e >= 1 ? { n: c10 * 10 ** (e - 1), d: 1 } : { n: c10, d: 10 ** (1 - e) };
    return {
      kind: "decimal",
      placeholder: e >= 1 ? "ej. 32000" : "ej. 0,0032",
      label: "Escribe el número en forma decimal",
      equation: `${decTex(c10, 1)} \\times 10^{${e}} = ?`,
      answer: value,
      steps: [
        `${decTex(c10, 1)} \\times 10^{${e}}`,
        e > 0
          ? `\\text{Exponente positivo: la coma se corre } ${e} \\text{ lugares a la derecha}`
          : `\\text{Exponente negativo: la coma se corre } ${-e} \\text{ lugares a la izquierda}`,
        "\\text{Se completa con ceros donde hagan falta}",
        `= ${expandedTex(c10, e)}`,
      ],
    };
  },

  exponent() {
    const c10 = randomCoefficient();
    const e = randomExponent();
    return {
      kind: "integer",
      label: "Encuentra el exponente",
      equation: `${expandedTex(c10, e)} = ${decTex(c10, 1)} \\times 10^{?}`,
      answer: e,
      steps: [
        `${expandedTex(c10, e)}`,
        `\\text{Dejamos una sola cifra distinta de cero antes de la coma: } ${decTex(c10, 1)}`,
        e > 0
          ? `\\text{La coma se corrió ${e} lugares hacia la izquierda, así que el número era grande: el exponente es positivo}`
          : `\\text{La coma se corrió ${-e} lugares hacia la derecha, así que el número era pequeño: el exponente es negativo}`,
        `= ${decTex(c10, 1)} \\times 10^{${e}}`,
      ],
    };
  },
};

GENERATORS[scientificNotationGenerator.id] = scientificNotationGenerator;
