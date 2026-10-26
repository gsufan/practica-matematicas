// Composition and inverse functions generator.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const add = (k) => `${k < 0 ? "-" : "+"} ${Math.abs(k)}`;
  const lin = (a, b) => polyTex({ x: a, "": b });

  const BUILDERS = {
    composeEval() {
      const a = sign() * randInt(1, 4), b = nz(-6, 6);
      const p = sign() * randInt(1, 4), q = nz(-6, 6);
      const x = nz(-4, 5);
      const useSquare = Math.random() < 0.4;
      const f = useSquare ? (t) => t * t + b : (t) => a * t + b;
      const fTex = useSquare ? polyTex({ "x^2": 1, "": b }) : lin(a, b);
      const g = (t) => p * t + q;
      const inner = g(x);
      return {
        kind: "integer", placeholder: "ej. 7",
        label: "Calcula la composición de funciones",
        equation: `f(x) = ${fTex}, \\quad g(x) = ${lin(p, q)} \\qquad (f \\circ g)(${x}) = ?`,
        answer: f(inner),
        steps: [
          "(f \\circ g)(x) = f(g(x)) \\text{: primero se aplica } g \\text{ y luego } f",
          `g(${x}) = ${p} \\times ${parenNum(x)} ${add(q)} = ${inner}`,
          useSquare ? `f(${inner}) = ${parenNum(inner)}^2 ${add(b)} = ${f(inner)}` : `f(${inner}) = ${a} \\times ${parenNum(inner)} ${add(b)} = ${f(inner)}`,
        ],
      };
    },

    composeExpr() {
      if (Math.random() < 0.5) {
        const a = sign() * randInt(2, 4), b = nz(-6, 6), p = sign() * randInt(1, 3), q = nz(-6, 6);
        // f(g(x)) = a(px + q) + b
        const result = { x: a * p, "": a * q + b };
        return {
          kind: "expression", placeholder: "ej. 6x - 1",
          label: "Escribe la función compuesta (f ∘ g)(x), reducida",
          equation: `f(x) = ${lin(a, b)}, \\quad g(x) = ${lin(p, q)}`,
          answer: result,
          steps: [
            `(f \\circ g)(x) = f(g(x)) = f(${lin(p, q)})`,
            `= ${a}(${lin(p, q)}) ${add(b)}`,
            `= ${polyTex({ x: a * p, "": a * q })} ${add(b)}`,
            `= ${polyTex(result)}`,
          ],
        };
      }
      const c = nz(-5, 5);
      const result = { "x^2": 1, x: 2 * c, "": c * c };
      return {
        kind: "expression", placeholder: "ej. x^2 + 4x + 4",
        label: "Escribe la función compuesta (f ∘ g)(x), desarrollada",
        equation: `f(x) = x^2, \\quad g(x) = ${lin(1, c)}`,
        answer: result,
        steps: [
          `(f \\circ g)(x) = f(g(x)) = f(${lin(1, c)}) = (${lin(1, c)})^2`,
          `= (${lin(1, c)})(${lin(1, c)})`,
          `= ${polyTex(result)}`,
        ],
      };
    },

    inverseEval() {
      const a = sign() * randInt(2, 6), b = nz(-8, 8), x = nz(-5, 6);
      const k = a * x + b;
      return {
        kind: "integer", placeholder: `ej. ${x}`,
        label: `Calcula la inversa evaluada en ${k}`,
        equation: `f(x) = ${lin(a, b)} \\qquad f^{-1}(${k}) = ?`,
        answer: x,
        steps: [
          `f^{-1}(${k}) \\text{ es el valor de } x \\text{ tal que } f(x) = ${k}`,
          `${lin(a, b)} = ${k}`,
          `${polyTex({ x: a })} = ${k - b} \\Rightarrow x = ${x}`,
          `f^{-1}(${k}) = ${x}`,
        ],
      };
    },

    inverseFormula() {
      const a = [2, 4, 5, -2][randInt(0, 3)], b = nz(-8, 8);
      // y = a x + b  ->  x = (y - b) / a
      const result = { x: 1 / a, "": -b / a };
      const tex = (c) => (Number.isInteger(c) ? `${c}` : `${String(c).replace(".", "{,}")}`);
      return {
        kind: "expression", placeholder: "ej. x/2 - 3/2",
        label: "Encuentra la función inversa f⁻¹(x). Puedes escribir fracciones (x/2) o decimales (0,5x)",
        equation: `f(x) = ${lin(a, b)}`,
        answer: result,
        steps: [
          `y = ${lin(a, b)}`,
          "\\text{Intercambiamos } x \\text{ e } y\\text{: } x = " + lin(a, b).replace(/x/, "y"),
          `x ${add(-b)} = ${a}y \\Rightarrow y = \\frac{x ${add(-b)}}{${a}}`,
          `f^{-1}(x) = ${tex(result.x)}x ${result[""] < 0 ? "-" : "+"} ${tex(Math.abs(result[""]))}`,
        ],
      };
    },
  };

  GENERATORS["composition-inverse"] = {
    id: "composition-inverse",
    name: "Composición e inversa",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "composeEval", label: "Evaluar (f ∘ g)(a)" },
          { value: "composeExpr", label: "Escribir (f ∘ g)(x)" },
          { value: "inverseEval", label: "Evaluar la inversa" },
          { value: "inverseFormula", label: "Hallar la inversa" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["composeEval", "composeExpr", "inverseEval", "inverseFormula"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 3)] : type]();
    },
  };
})();
