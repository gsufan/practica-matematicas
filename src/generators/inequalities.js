// Inequalities generator. The answer is a boundary and a direction, e.g. x > 3.
(() => {
  const OP_TEX = { "<": "<", ">": ">", "<=": "\\leq", ">=": "\\geq" };
  const OP_WORDS = { "<": "menor que", ">": "mayor que", "<=": "menor o igual que", ">=": "mayor o igual que" };
  const OPS = ["<", ">", "<=", ">="];

  const pickOp = () => OPS[randInt(0, 3)];
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const xTex = (a) => (a === 1 ? "x" : a === -1 ? "-x" : `${a}x`);
  const lin = (a, b) => (b === 0 ? xTex(a) : `${xTex(a)} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`);

  // Builds the problem from a known boundary x0
  function make(left, right, op, x0, final, steps) {
    return {
      kind: "inequality",
      placeholder: "ej. x > 3",
      label: "Resuelve la desigualdad",
      equation: `${left} ${OP_TEX[op]} ${right}`,
      answer: { op: final, value: x0 },
      steps: [
        `${left} ${OP_TEX[op]} ${right}`,
        ...steps,
        `x ${OP_TEX[final]} ${x0}`,
        `\\text{Es decir, x es ${OP_WORDS[final]} } ${x0}`,
      ],
    };
  }

  const BUILDERS = {
    one() {
      const x0 = nz(-9, 12), op = pickOp(), kind = randInt(0, 2);
      if (kind === 0) {
        const b = randInt(1, 12);
        return make(`x + ${b}`, `${x0 + b}`, op, x0, op, [`\\text{Restamos } ${b} \\text{ a los dos lados}`]);
      }
      if (kind === 1) {
        const b = randInt(1, 12);
        return make(`x - ${b}`, `${x0 - b}`, op, x0, op, [`\\text{Sumamos } ${b} \\text{ a los dos lados}`]);
      }
      const a = randInt(2, 9);
      return make(`${a}x`, `${a * x0}`, op, x0, op, [`\\text{Dividimos entre } ${a} \\text{ (positivo: la desigualdad no cambia)}`]);
    },

    two() {
      const x0 = nz(-8, 10), a = randInt(2, 8), b = nz(-12, 12), op = pickOp();
      const c = a * x0 + b;
      return make(lin(a, b), `${c}`, op, x0, op, [
        `\\text{${b < 0 ? "Sumamos" : "Restamos"} } ${Math.abs(b)} \\text{ a los dos lados}`,
        `${xTex(a)} ${OP_TEX[op]} ${c - b}`,
        `\\text{Dividimos entre } ${a} \\text{ (positivo: la desigualdad no cambia)}`,
      ]);
    },

    negative() {
      const x0 = nz(-8, 10), a = -randInt(2, 8), b = nz(-12, 12), op = pickOp();
      const c = a * x0 + b;
      return make(lin(a, b), `${c}`, op, x0, FLIP_OP[op], [
        `\\text{${b < 0 ? "Sumamos" : "Restamos"} } ${Math.abs(b)} \\text{ a los dos lados}`,
        `${xTex(a)} ${OP_TEX[op]} ${c - b}`,
        `\\text{Dividimos entre } ${a} \\text{: al dividir entre un número negativo, la desigualdad se invierte}`,
      ]);
    },

    both() {
      let x0, a, c, b, d;
      do {
        x0 = nz(-8, 10); a = nz(-6, 8); c = nz(-6, 8); b = nz(-10, 10);
        d = a * x0 + b - c * x0;
      } while (a === c || d === 0 || Math.abs(d) > 30);
      const op = pickOp(), diff = a - c;
      return make(lin(a, b), lin(c, d), op, x0, diff < 0 ? FLIP_OP[op] : op, [
        "\\text{Pasamos las x a un lado y los números al otro}",
        `${xTex(diff)} ${OP_TEX[op]} ${d - b}`,
        diff < 0
          ? `\\text{Dividimos entre } ${diff} \\text{: coeficiente negativo, la desigualdad se invierte}`
          : `\\text{Dividimos entre } ${diff} \\text{ (positivo: la desigualdad no cambia)}`,
      ]);
    },
  };

  GENERATORS["inequalities"] = {
    id: "inequalities",
    name: "Desigualdades",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "one", label: "Un paso" },
          { value: "two", label: "Dos pasos" },
          { value: "negative", label: "Coeficiente negativo" },
          { value: "both", label: "x en ambos lados" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["one", "two", "negative", "both"][randInt(0, 3)] : type;
      return BUILDERS[kind]();
    },
  };
})();
