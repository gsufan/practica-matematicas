// Distributive property generator: expand products and reduce. The answer is a polynomial.
const distributiveGenerator = {
  id: "distributive",
  name: "Propiedad distributiva",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "one", label: "Un número por una suma" },
        { value: "two", label: "Con dos variables" },
        { value: "reduce", label: "Distribuir y reducir" },
        { value: "binomials", label: "Producto de binomios" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["one", "two", "reduce", "binomials"][randInt(0, 3)] : type;
    return { kind: "expression", placeholder: "ej. 3x + 12", ...DISTRIBUTIVE_BUILDERS[kind]() };
  },
};

const pick = (list) => list[randInt(0, list.length - 1)];
const anyCoef = (max) => (Math.random() < 0.5 ? -1 : 1) * randInt(1, max);
const wrapSum = (poly) => `(${polyTex(poly)})`;
// Outer factor: never 1 or -1
const factor = (max) => (Math.random() < 0.5 ? -1 : 1) * randInt(2, max);

// k·(sum of terms): the product of k with each term, written out
function productsLine(k, poly) {
  const kTex = k < 0 ? `(${k})` : `${k}`;
  return Object.keys(poly)
    .map((key) => {
      const c = poly[key];
      const body = `${kTex} \\times ${key === "" ? parenNum(c) : (Math.abs(c) === 1 ? (c < 0 ? "(-1)" : "") : parenNum(c)) + keyTex(key)}`;
      return body;
    })
    .join(" + ");
}

function scale(poly, k) {
  const out = {};
  Object.keys(poly).forEach((key) => (out[key] = poly[key] * k));
  return out;
}

const DISTRIBUTIVE_BUILDERS = {
  one() {
    const k = factor(9), inner = { x: anyCoef(6), "": anyCoef(9) };
    const result = scale(inner, k);
    return {
      label: "Desarrolla el producto",
      equation: `${k}${wrapSum(inner)} = ?`,
      answer: result,
      steps: [
        `${k}${wrapSum(inner)}`,
        "\\text{Multiplicamos el número de afuera por cada término de adentro}",
        `= ${productsLine(k, inner)}`,
        `= ${polyTex(result)}`,
      ],
    };
  },

  two() {
    const k = factor(7), inner = { x: anyCoef(6), y: anyCoef(6) };
    const result = scale(inner, k);
    return {
      label: "Desarrolla el producto",
      equation: `${k}${wrapSum(inner)} = ?`,
      answer: result,
      steps: [
        `${k}${wrapSum(inner)}`,
        "\\text{Cada término de adentro se multiplica por el de afuera}",
        `= ${productsLine(k, inner)}`,
        `= ${polyTex(result)}`,
      ],
    };
  },

  reduce() {
    const k = randInt(2, 7), m = factor(6);
    const a = { x: 1, "": anyCoef(8) }, b = { x: pick([1, 1, 2, 3]), "": anyCoef(8) };
    const first = scale(a, k), second = scale(b, m);
    const total = {};
    [first, second].forEach((p) => Object.keys(p).forEach((key) => (total[key] = (total[key] || 0) + p[key])));
    const mTex = m < 0 ? `- ${-m}` : `+ ${m}`;
    return {
      label: "Distribuye y reduce",
      equation: `${k}${wrapSum(a)} ${mTex}${wrapSum(b)} = ?`,
      answer: total,
      steps: [
        `${k}${wrapSum(a)} ${mTex}${wrapSum(b)}`,
        "\\text{Primero distribuimos cada paréntesis}",
        `= ${polyTex(first)} ${m < 0 ? "" : "+ "}${polyTex(second)}`,
        "\\text{Luego reducimos los términos semejantes}",
        `= ${polyTex(total)}`,
      ],
    };
  },

  binomials() {
    const m = pick([1, 1, 2, 3]);
    let a, b;
    do { a = anyCoef(8); b = anyCoef(8); } while (a === -b);
    const left = { x: m, "": a }, right = { x: 1, "": b };
    const total = { "x^2": m, x: m * b + a, "": a * b };
    return {
      label: "Multiplica los binomios",
      equation: `${wrapSum(left)}${wrapSum(right)} = ?`,
      answer: total,
      steps: [
        `${wrapSum(left)}${wrapSum(right)}`,
        "\\text{Cada término del primer paréntesis multiplica a los dos del segundo}",
        `= ${polyTex({ "x^2": m })} ${m * b < 0 ? "-" : "+"} ${Math.abs(m * b) === 1 ? "" : Math.abs(m * b)}x ${a < 0 ? "-" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}x ${a * b < 0 ? "-" : "+"} ${Math.abs(a * b)}`,
        "\\text{Reducimos los términos en } x",
        `= ${polyTex(total)}`,
      ],
    };
  },
};

GENERATORS[distributiveGenerator.id] = distributiveGenerator;
