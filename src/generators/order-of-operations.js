// Order of operations generator. An expression is a token list:
// numbers, "+", "-", "×", "÷", "(" and ")". Steps come from reducing one operation at a time.
const orderOfOperationsGenerator = {
  id: "order-of-operations",
  name: "Orden de operaciones",

  controls: [
    {
      id: "level", type: "radio", label: "Nivel",
      choices: [{ value: "basic", label: "Sin paréntesis" }, { value: "parens", label: "Con paréntesis" }],
    },
  ],

  generate({ level }) {
    for (let attempt = 0; attempt < 500; attempt++) {
      const tokens = buildExpression(level);
      const run = reduceAll(tokens, true);
      if (!run) continue;
      if (level === "parens") {
        // parentheses must matter: the result changes if they are removed
        const loose = reduceAll(tokens.filter((t) => t !== "(" && t !== ")"), false);
        if (!loose || loose.answer === run.answer) continue;
      }
      return {
        label: "Calcula siguiendo el orden de operaciones",
        equation: `${showTokens(tokens)} = ?`,
        answer: run.answer,
        steps: run.steps,
      };
    }
    const fallback = [3, "+", 4, "×", 2];
    return { label: "Calcula siguiendo el orden de operaciones", equation: `${showTokens(fallback)} = ?`, answer: 11, steps: reduceAll(fallback, true).steps };
  },
};

const OP_NAME = { "×": "la multiplicación", "÷": "la división", "+": "la suma", "-": "la resta" };
const OP_LATEX = { "×": " \\times ", "÷": " \\div ", "+": " + ", "-": " - " };
const isHigh = (t) => t === "×" || t === "÷";
const isLow = (t) => t === "+" || t === "-";

function buildExpression(level) {
  const count = randInt(3, 4);
  let ops;
  do {
    ops = Array.from({ length: count - 1 }, () => ["+", "-", "×", "÷"][randInt(0, 3)]);
  } while (!(ops.some(isHigh) && ops.some(isLow)));

  const nums = Array.from({ length: count }, () => randInt(2, 12));
  // right to left, so each dividend is a multiple of its final divisor
  for (let i = ops.length - 1; i >= 0; i--) {
    if (ops[i] === "÷") nums[i] = nums[i + 1] * randInt(2, 6);
  }

  const tokens = [];
  nums.forEach((n, i) => {
    tokens.push(n);
    if (i < ops.length) tokens.push(ops[i]);
  });

  if (level !== "parens") return tokens;
  // wrap 2 or more consecutive numbers, never the whole expression
  const size = randInt(2, count - 1);
  const first = randInt(0, count - size);
  tokens.splice(2 * (first + size - 1) + 1, 0, ")");
  tokens.splice(2 * first, 0, "(");
  return tokens;
}

function showTokens(tokens) {
  return tokens
    .map((t, i) => {
      if (typeof t === "number") return t < 0 && i > 0 && tokens[i - 1] !== "(" ? `(${t})` : `${t}`;
      return OP_LATEX[t] || t;
    })
    .join("");
}

const wrapNeg = (n) => (n < 0 ? `(${n})` : `${n}`);

// Reduces the expression one operation at a time. Strict mode rejects
// inexact division, division by zero and big numbers; returns null then.
function reduceAll(start, strict) {
  const tokens = start.slice();
  const steps = [showTokens(tokens)];

  while (tokens.length > 1) {
    let lo = 0, hi = tokens.length, inParens = false;
    const close = tokens.indexOf(")");
    if (close !== -1) {
      lo = tokens.lastIndexOf("(", close) + 1;
      hi = close;
      inParens = true;
    }

    const scope = tokens.slice(lo, hi);
    let idx = scope.findIndex(isHigh);
    const tier = idx !== -1 ? scope.filter(isHigh) : scope.filter(isLow);
    if (idx === -1) idx = scope.findIndex(isLow);
    idx += lo;

    const a = tokens[idx - 1], op = tokens[idx], b = tokens[idx + 1];
    let result;
    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "×") result = a * b;
    else {
      if (b === 0) return null;
      if (strict && a % b !== 0) return null;
      result = a / b;
    }
    if (strict && Math.abs(result) > 500) return null;

    const lead = inParens ? "En el paréntesis, " + OP_NAME[op] : OP_NAME[op][0].toUpperCase() + OP_NAME[op].slice(1);
    const tie = tier.length > 1 ? " (de izquierda a derecha)" : "";
    tokens.splice(idx - 1, 3, result);
    if (inParens && tokens[lo - 1] === "(" && tokens[lo + 1] === ")") tokens.splice(lo - 1, 3, result);

    steps.push(`\\text{${lead}${tie}: } ${wrapNeg(a)}${OP_LATEX[op]}${wrapNeg(b)} = ${result}`);
    steps.push(`= ${showTokens(tokens)}`);
  }
  return { answer: tokens[0], steps };
}

GENERATORS[orderOfOperationsGenerator.id] = orderOfOperationsGenerator;
