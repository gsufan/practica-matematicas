// Factoring generator: common factor, trinomials x^2 + bx + c, difference of squares.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const binom = (p) => `(x ${p < 0 ? "-" : "+"} ${Math.abs(p)})`;

  const BUILDERS = {
    // Greatest common factor of a binomial
    gcf() {
      const g = randInt(2, 9), a = randInt(1, 6), b = randInt(1, 6);
      if (gcd(a, b) !== 1) return BUILDERS.gcf();
      const withX = Math.random() < 0.5;
      const sa = sign(), sb = sign();
      const poly = withX ? { "x^2": g * a * sa, x: g * b * sb } : { x: g * a * sa, "": g * b * sb };
      return {
        kind: "expression",
        placeholder: withX ? "ej. 3x" : "ej. 3",
        label: "Encuentra el mayor factor común de todos los términos",
        equation: `${polyTex(poly)}`,
        answer: withX ? { x: g } : { "": g },
        steps: [
          polyTex(poly),
          `\\text{Coeficientes: } ${g * a} \\text{ y } ${g * b} \\text{; el mayor divisor común es } ${g}`,
          withX ? "\\text{Las dos partes tienen } x \\text{, y el menor exponente es 1: el factor común incluye } x" : "\\text{Solo uno de los términos tiene } x \\text{: no entra en el factor común}",
          `\\text{Factor común: } ${withX ? `${g}x` : g}`,
          withX
            ? `${polyTex(poly)} = ${g}x(${polyTex({ x: a * sa, "": b * sb })})`
            : `${polyTex(poly)} = ${g}(${polyTex({ x: a * sa, "": b * sb })})`,
        ],
      };
    },

    // What is left inside the parentheses
    inside() {
      const g = randInt(2, 9);
      let a, b;
      do { a = randInt(1, 6); b = randInt(1, 6); } while (gcd(a, b) !== 1);
      const sa = sign(), sb = sign();
      const poly = { x: g * a * sa, "": g * b * sb };
      const inner = { x: a * sa, "": b * sb };
      return {
        kind: "expression",
        placeholder: "ej. 2x + 3",
        label: `Saca ${g} como factor común. ¿Qué queda dentro del paréntesis?`,
        equation: `${polyTex(poly)} = ${g}(\\ ?\\ )`,
        answer: inner,
        steps: [
          `${polyTex(poly)} = ${g}(\\ ?\\ )`,
          `\\text{Dividimos cada término entre } ${g}`,
          `\\frac{${poly.x}x}{${g}} = ${polyTex({ x: inner.x })} \\qquad \\frac{${poly[""]}}{${g}} = ${inner[""]}`,
          `${polyTex(poly)} = ${g}(${polyTex(inner)})`,
        ],
      };
    },

    // x^2 + bx + c = (x + p)(x + q): find p and q
    trinomial() {
      let p, q;
      do { p = nz(-9, 9); q = nz(-9, 9); } while (p + q === 0);
      const b = p + q, c = p * q;
      return {
        kind: "pair",
        unordered: true,
        placeholder: "ej. 2, 5",
        label: "Factoriza: encuentra los dos números p y q (escríbelos separados por coma)",
        equation: `${polyTex({ "x^2": 1, x: b, "": c })} = (x + p)(x + q)`,
        answer: [p, q],
        steps: [
          `${polyTex({ "x^2": 1, x: b, "": c })} = (x + p)(x + q)`,
          `\\text{Buscamos dos números que multipliquen } ${c} \\text{ y sumen } ${b}`,
          `p \\times q = ${c} \\qquad p + q = ${b}`,
          `p = ${p},\\ q = ${q} \\text{ porque } ${parenNum(p)} \\times ${parenNum(q)} = ${c} \\text{ y } ${parenNum(p)} + ${parenNum(q)} = ${b}`,
          `${polyTex({ "x^2": 1, x: b, "": c })} = ${binom(p)}${binom(q)}`,
        ],
      };
    },

    // x^2 - a^2 = (x - a)(x + a): find a
    squares() {
      const a = randInt(2, 15);
      return {
        kind: "integer",
        placeholder: "ej. 7",
        label: "Diferencia de cuadrados: encuentra a (positivo)",
        equation: `${polyTex({ "x^2": 1, "": -a * a })} = (x - a)(x + a)`,
        answer: a,
        steps: [
          `${polyTex({ "x^2": 1, "": -a * a })} = (x - a)(x + a)`,
          "\\text{Recordamos: } (x - a)(x + a) = x^2 - a^2",
          `a^2 = ${a * a} \\Rightarrow a = ${a}`,
          `${polyTex({ "x^2": 1, "": -a * a })} = (x - ${a})(x + ${a})`,
        ],
      };
    },
  };

  GENERATORS["factoring"] = {
    id: "factoring",
    name: "Factorización",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "gcf", label: "Factor común" },
          { value: "inside", label: "Lo que queda dentro" },
          { value: "trinomial", label: "Trinomio x² + bx + c" },
          { value: "squares", label: "Diferencia de cuadrados" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["gcf", "inside", "trinomial", "squares"][randInt(0, 3)] : type;
      return BUILDERS[kind]();
    },
  };
})();
