// Variables and expressions generator: evaluate an expression for given values.
const variablesExpressionsGenerator = {
  id: "variables-expressions",
  name: "Variables y expresiones",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "one", label: "Una variable" },
        { value: "two", label: "Dos variables" },
        { value: "power", label: "Con potencias" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["one", "two", "power"][randInt(0, 2)] : type;
    return { kind: "integer", ...EXPRESSION_BUILDERS[kind]() };
  },
};

const randSign = () => (Math.random() < 0.5 ? -1 : 1);
const nonZero = (min, max) => {
  let n = 0;
  while (n === 0) n = randInt(min, max);
  return n;
};
// "+ 5" or "- 5" for the substituted steps
const signedTail = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);

const EXPRESSION_BUILDERS = {
  one() {
    const a = randInt(2, 9), b = randSign() * randInt(1, 9), x = nonZero(-5, 8);
    const expr = polyTex({ x: a, "": b });
    return {
      label: "Evalúa la expresión",
      equation: `\\text{Si } x = ${x}\\text{: } \\quad ${expr} = ?`,
      answer: a * x + b,
      steps: [
        expr,
        `\\text{Sustituimos } x \\text{ por } ${parenNum(x)}`,
        `= ${a} \\times ${parenNum(x)} ${signedTail(b)}`,
        `= ${a * x} ${signedTail(b)}`,
        `= ${a * x + b}`,
      ],
    };
  },

  two() {
    const a = randInt(2, 6), b = randSign() * randInt(2, 6);
    const x = nonZero(-4, 6), y = nonZero(-4, 6);
    const expr = polyTex({ x: a, y: b });
    return {
      label: "Evalúa la expresión",
      equation: `\\text{Si } x = ${x} \\text{ y } y = ${y}\\text{: } \\quad ${expr} = ?`,
      answer: a * x + b * y,
      steps: [
        expr,
        `\\text{Sustituimos cada letra por su valor}`,
        `= ${a} \\times ${parenNum(x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${parenNum(y)}`,
        `= ${a * x} ${signedTail(b * y)}`,
        `= ${a * x + b * y}`,
      ],
    };
  },

  power() {
    const p = randSign() * randInt(1, 5), q = randSign() * randInt(1, 9), x = nonZero(-4, 6);
    const expr = polyTex({ "x^2": 1, x: p, "": q });
    const value = x * x + p * x + q;
    return {
      label: "Evalúa la expresión",
      equation: `\\text{Si } x = ${x}\\text{: } \\quad ${expr} = ?`,
      answer: value,
      steps: [
        expr,
        `\\text{Sustituimos } x \\text{ por } ${parenNum(x)}`,
        `= ${parenNum(x)}^{2} ${p < 0 ? "-" : "+"} ${Math.abs(p)} \\times ${parenNum(x)} ${signedTail(q)}`,
        `\\text{Primero la potencia, luego los productos}`,
        `= ${x * x} ${signedTail(p * x)} ${signedTail(q)}`,
        `= ${value}`,
      ],
    };
  },
};

GENERATORS[variablesExpressionsGenerator.id] = variablesExpressionsGenerator;
