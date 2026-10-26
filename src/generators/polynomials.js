// Polynomials generator (one variable x): add, subtract, multiply, degree.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const coef = (max) => sign() * randInt(1, max);
  const expo = (k) => (k === "" ? 0 : k === "x" ? 1 : Number(k.slice(2)));
  const key = (e) => (e === 0 ? "" : e === 1 ? "x" : `x^${e}`);

  // Random polynomial with the given exponents, every coefficient nonzero
  function randPoly(exponents, max = 7) {
    const p = {};
    exponents.forEach((e) => (p[key(e)] = coef(max)));
    return p;
  }

  function mul(p, q) {
    const out = {};
    Object.keys(p).forEach((a) =>
      Object.keys(q).forEach((b) => {
        const k = key(expo(a) + expo(b));
        out[k] = (out[k] || 0) + p[a] * q[b];
      })
    );
    return out;
  }

  function combine(p, q, factor) {
    const out = { ...p };
    Object.keys(q).forEach((k) => (out[k] = (out[k] || 0) + factor * q[k]));
    return out;
  }

  const wrap = (p) => `(${polyTex(p)})`;
  const negate = (p) => combine({}, p, -1);
  const degree = (p) => Math.max(...Object.keys(p).filter((k) => p[k] !== 0).map(expo));

  const BUILDERS = {
    add() {
      const p = randPoly([3, 2, 0].slice(0, 2 + randInt(0, 1)).concat(randInt(0, 1) ? [1] : []));
      const q = randPoly([2, 1, 0]);
      const total = combine(p, q, 1);
      return expression("Suma los polinomios", `${wrap(p)} + ${wrap(q)}`, total, [
        `${wrap(p)} + ${wrap(q)}`,
        "\\text{Quitamos los paréntesis (sumar no cambia ningún signo)}",
        `= ${polyTex(p)} ${polyTex(q).startsWith("-") ? "" : "+ "}${polyTex(q)}`,
        "\\text{Juntamos los términos semejantes}",
        `= ${polyTex(total)}`,
      ]);
    },

    subtract() {
      const p = randPoly([3, 2, 1, 0].slice(randInt(0, 1)));
      const q = randPoly([2, 1, 0]);
      const total = combine(p, q, -1);
      const flipped = negate(q);
      return expression("Resta los polinomios", `${wrap(p)} - ${wrap(q)}`, total, [
        `${wrap(p)} - ${wrap(q)}`,
        "\\text{Restar es sumar el opuesto: el signo de cada término del segundo cambia}",
        `= ${polyTex(p)} ${polyTex(flipped).startsWith("-") ? "" : "+ "}${polyTex(flipped)}`,
        "\\text{Juntamos los términos semejantes}",
        `= ${polyTex(total)}`,
      ]);
    },

    monomial() {
      const m = { [key(randInt(1, 2))]: coef(5) };
      const q = randPoly([2, 1, 0], 6);
      const total = mul(m, q);
      const parts = Object.keys(q).map((k) => `(${polyTex(m)})(${polyTex({ [k]: q[k] })})`);
      return expression("Multiplica el monomio por el polinomio", `${polyTex(m)}${wrap(q)}`, total, [
        `${polyTex(m)}${wrap(q)}`,
        "\\text{Multiplicamos el monomio por cada término: coeficientes se multiplican, exponentes se suman}",
        `= ${parts.join(" + ")}`,
        `= ${polyTex(total)}`,
      ]);
    },

    product() {
      const left = { x: 1, "": coef(6) };
      const right = randPoly([2, 1, 0], 5);
      const total = mul(left, right);
      const byX = mul({ x: 1 }, right), byConst = mul({ "": left[""] }, right);
      return expression("Multiplica los polinomios", `${wrap(left)}${wrap(right)}`, total, [
        `${wrap(left)}${wrap(right)}`,
        "\\text{Cada término del primer paréntesis multiplica a todo el segundo}",
        `= x${wrap(right)} ${left[""] < 0 ? "-" : "+"} ${Math.abs(left[""])}${wrap(right)}`,
        `= ${polyTex(byX)} ${polyTex(byConst).startsWith("-") ? "" : "+ "}${polyTex(byConst)}`,
        "\\text{Juntamos los términos semejantes}",
        `= ${polyTex(total)}`,
      ]);
    },

    degree() {
      const exps = [randInt(2, 5), randInt(1, 1), 0];
      const p = randPoly(exps);
      return {
        kind: "integer",
        label: "¿Cuál es el grado del polinomio?",
        equation: `${polyTex(p)}`,
        answer: degree(p),
        steps: [
          polyTex(p),
          "\\text{El grado es el mayor exponente de la variable}",
          `\\text{Los exponentes son } ${Object.keys(p).map((k) => expo(k)).join(",\\ ")}`,
          `\\text{El mayor es } ${degree(p)}`,
        ],
      };
    },
  };

  function expression(label, equation, answer, steps) {
    return { kind: "expression", placeholder: "ej. 2x^2 - 3x + 1", label, equation: `${equation} = ?`, answer, steps };
  }

  GENERATORS["polynomials"] = {
    id: "polynomials",
    name: "Polinomios",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Operación",
        choices: [
          { value: "all", label: "Todas" },
          { value: "add", label: "Suma" },
          { value: "subtract", label: "Resta" },
          { value: "monomial", label: "Monomio por polinomio" },
          { value: "product", label: "Producto de polinomios" },
          { value: "degree", label: "Grado" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["add", "subtract", "monomial", "product", "degree"][randInt(0, 4)] : type;
      return BUILDERS[kind]();
    },
  };
})();
