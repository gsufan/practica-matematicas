// Systems of two linear equations. The answer is the pair (x, y).
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const eq = (a, b, c) => `${polyTex({ x: a, y: b })} = ${c}`;
  const system = (e1, e2) => `\\begin{cases} ${e1} \\\\ ${e2} \\end{cases}`;
  const pt = (x, y) => `(x, y) = (${x}, ${y})`;

  function done(e1, e2, x, y, steps) {
    return {
      kind: "pair",
      labels: ["x", "y"],
      placeholder: "ej. 3, -2",
      label: "Resuelve el sistema (escribe x, y)",
      equation: system(e1, e2),
      answer: [x, y],
      steps: [system(e1, e2), ...steps, `\\text{Solución: } ${pt(x, y)}`],
    };
  }

  const BUILDERS = {
    substitution() {
      let x, y, m, n, p, q;
      do {
        x = nz(-6, 8); y = nz(-6, 8);
        m = sign() * randInt(1, 4);
        n = y - m * x;
        p = nz(-5, 5); q = nz(-5, 5);
      } while (n === 0 || Math.abs(n) > 12 || p + q * m === 0);
      const r = p * x + q * y;
      const e1 = `y = ${polyTex({ x: m, "": n })}`;
      const e2 = eq(p, q, r);
      const reduced = { x: p + q * m, "": q * n };
      return done(e1, e2, x, y, [
        "\\text{La primera ecuación ya tiene } y \\text{ despejada: la sustituimos en la segunda}",
        `${polyTex({ x: p })} ${q < 0 ? "-" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}(${polyTex({ x: m, "": n })}) = ${r}`,
        `\\text{Distribuimos y reducimos: } ${polyTex(reduced)} = ${r}`,
        `${polyTex({ x: p + q * m })} = ${r - q * n}`,
        `x = ${x}`,
        `\\text{Volvemos a la primera: } y = ${m}(${x}) ${n < 0 ? "-" : "+"} ${Math.abs(n)} = ${y}`,
      ]);
    },

    add() {
      let x, y, a, b, d;
      do {
        x = nz(-6, 8); y = nz(-6, 8);
        a = nz(-5, 5); b = nz(-5, 5); d = nz(-5, 5);
      } while (a + d === 0);
      const c1 = a * x + b * y, c2 = d * x - b * y;
      return done(eq(a, b, c1), eq(d, -b, c2), x, y, [
        `\\text{Los coeficientes de } y \\text{ son opuestos } (${b} \\text{ y } ${-b}) \\text{: sumamos las dos ecuaciones}`,
        `${polyTex({ x: a + d })} = ${c1 + c2}`,
        `x = ${x}`,
        `\\text{Sustituimos en la primera: } ${a}(${x}) ${b < 0 ? "-" : "+"} ${Math.abs(b)}y = ${c1}`,
        `${polyTex({ y: b })} = ${c1 - a * x} \\Rightarrow y = ${y}`,
      ]);
    },

    multiply() {
      let x, y, a, b, d, k;
      do {
        x = nz(-6, 8); y = nz(-6, 8);
        a = nz(-4, 4); b = nz(-3, 3); d = nz(-4, 4); k = randInt(2, 3);
      } while (k * a + d === 0);
      const e = -k * b;
      const c1 = a * x + b * y, c2 = d * x + e * y;
      return done(eq(a, b, c1), eq(d, e, c2), x, y, [
        `\\text{Multiplicamos la primera ecuación por } ${k} \\text{ para que los coeficientes de } y \\text{ sean opuestos}`,
        eq(k * a, k * b, k * c1),
        `\\text{Sumamos con la segunda: } ${polyTex({ x: k * a + d })} = ${k * c1 + c2}`,
        `x = ${x}`,
        `\\text{Sustituimos en la primera: } ${a}(${x}) ${b < 0 ? "-" : "+"} ${Math.abs(b)}y = ${c1}`,
        `${polyTex({ y: b })} = ${c1 - a * x} \\Rightarrow y = ${y}`,
      ]);
    },
  };

  GENERATORS["systems"] = {
    id: "systems",
    name: "Sistemas de ecuaciones",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Método",
        choices: [
          { value: "all", label: "Todos" },
          { value: "substitution", label: "Sustitución" },
          { value: "add", label: "Eliminación (sumar)" },
          { value: "multiply", label: "Eliminación (multiplicar)" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["substitution", "add", "multiply"][randInt(0, 2)] : type;
      return BUILDERS[kind]();
    },
  };
})();
