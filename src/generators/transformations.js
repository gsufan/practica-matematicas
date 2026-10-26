// Graph transformations generator: shifts, reflections, stretches, evaluating a transformed function.
(() => {
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const P = (x, y) => `(${x}, ${y})`;
  const shiftTex = (v, h) => `x ${h < 0 ? "+" : "-"} ${Math.abs(h)}`;
  const addTex = (k) => `${k < 0 ? "-" : "+"} ${Math.abs(k)}`;

  function pairProblem(label, equation, answer, steps, figure) {
    return { kind: "pair", placeholder: "ej. 3, -2", label, equation, answer, steps, figure };
  }

  const BUILDERS = {
    // Vertex of g(x) = f(x - h) + k, with f the parabola x^2 or the V of |x|
    shift() {
      const useAbs = Math.random() < 0.5;
      const h = nz(-4, 4), k = nz(-4, 4);
      const base = useAbs ? (x) => Math.abs(x) : (x) => x * x;
      const g = (x) => base(x - h) + k;
      const gTex = useAbs ? `|${shiftTex("x", h)}| ${addTex(k)}` : `(${shiftTex("x", h)})^{2} ${addTex(k)}`;
      return pairProblem(
        `La gráfica en azul es la de g; la punteada es la de ${useAbs ? "f(x) = |x|" : "f(x) = x²"}. ¿Cuáles son las coordenadas del vértice de g? (escribe x, y)`,
        `g(x) = ${gTex}`, [h, k],
        [
          "\\text{Desplazar la gráfica de } f \\text{ a la derecha } h \\text{ y hacia arriba } k \\text{ da } g(x) = f(x - h) + k",
          `\\text{El vértice de } f \\text{ es } (0, 0)`,
          `h = ${h} \\text{ (el signo dentro se invierte)},\\quad k = ${k}`,
          `\\text{Vértice de } g\\text{: } ${P(h, k)}`,
        ],
        FIG.plot({ fns: [{ f: base, cls: "dash" }, { f: g }], xmin: -8, xmax: 8, ymin: -8, ymax: 10, points: [{ x: h, y: k, hollow: true }] })
      );
    },

    // Image of a point under g(x) = f(x - h) + k
    point() {
      const a = nz(-5, 5), b = nz(-6, 6), h = nz(-4, 4), k = nz(-4, 4);
      return pairProblem(
        "El punto indicado está en la gráfica de f. ¿Qué punto de la gráfica de g le corresponde? (escribe x, y)",
        `${P(a, b)} \\in f \\qquad g(x) = f(${shiftTex("x", h)}) ${addTex(k)}`, [a + h, b + k],
        [
          "\\text{Con } g(x) = f(x - h) + k \\text{ todos los puntos se desplazan } h \\text{ en horizontal y } k \\text{ en vertical}",
          `h = ${h},\\quad k = ${k}`,
          `${P(a, b)} \\to (${a} ${addTex(h)},\\ ${b} ${addTex(k)})`,
          `${P(a + h, b + k)}`,
        ]
      );
    },

    reflect() {
      const a = nz(-6, 6), b = nz(-6, 6);
      const kind = randInt(0, 2);
      const names = ["el eje x", "el eje y", "el origen"];
      const answers = [[a, -b], [-a, b], [-a, -b]];
      const rules = ["(x, y) \\to (x, -y)", "(x, y) \\to (-x, y)", "(x, y) \\to (-x, -y)"];
      return pairProblem(
        `Refleja el punto respecto de ${names[kind]}. ¿Cuáles son sus nuevas coordenadas? (escribe x, y)`,
        `${P(a, b)}`, answers[kind],
        [`\\text{Reflexión respecto de ${names[kind]}: } ${rules[kind]}`, `${P(a, b)} \\to ${P(answers[kind][0], answers[kind][1])}`]
      );
    },

    // g(x) = c f(x) stretches vertically; g(x) = f(c x) squeezes horizontally
    stretch() {
      if (Math.random() < 0.5) {
        const a = nz(-5, 5), b = nz(-5, 5), c = randInt(2, 4);
        return pairProblem(
          "El punto indicado está en la gráfica de f. ¿Qué punto de la gráfica de g le corresponde? (escribe x, y)",
          `${P(a, b)} \\in f \\qquad g(x) = ${c}\\,f(x)`, [a, c * b],
          ["\\text{Multiplicar la función por } c \\text{ estira la gráfica verticalmente: la } y \\text{ se multiplica por } c", `${P(a, b)} \\to (${a},\\ ${c} \\times ${parenNum(b)}) = ${P(a, c * b)}`]
        );
      }
      const c = randInt(2, 3), a = c * nz(-3, 3), b = nz(-5, 5);
      return pairProblem(
        "El punto indicado está en la gráfica de f. ¿Qué punto de la gráfica de g le corresponde? (escribe x, y)",
        `${P(a, b)} \\in f \\qquad g(x) = f(${c}x)`, [a / c, b],
        [
          `\\text{Con } g(x) = f(${c}x) \\text{ la gráfica se comprime horizontalmente: la } x \\text{ se divide entre } ${c}`,
          `${P(a, b)} \\to (${a} \\div ${c},\\ ${b}) = ${P(a / c, b)}`,
        ]
      );
    },

    // Evaluate g(a) where g(x) = f(x - h) + k and f(x) = x^2 or similar
    evalG() {
      const h = nz(-4, 4), k = nz(-5, 5), a = nz(-4, 5);
      const type = randInt(0, 1);
      const f = type === 0 ? (x) => x * x : (x) => Math.abs(x);
      const fTex = type === 0 ? "x^2" : "|x|";
      const inner = a - h;
      return {
        kind: "integer", placeholder: "ej. 5",
        label: "Evalúa la función transformada",
        equation: `f(x) = ${fTex}, \\quad g(x) = f(${shiftTex("x", h)}) ${addTex(k)} \\qquad g(${a}) = ?`,
        answer: f(inner) + k,
        steps: [
          `g(${a}) = f(${a} ${h < 0 ? "+" : "-"} ${Math.abs(h)}) ${addTex(k)} = f(${inner}) ${addTex(k)}`,
          `f(${inner}) = ${type === 0 ? `${parenNum(inner)}^2` : `|${inner}|`} = ${f(inner)}`,
          `g(${a}) = ${f(inner)} ${addTex(k)} = ${f(inner) + k}`,
        ],
      };
    },
  };

  GENERATORS["transformations"] = {
    id: "transformations",
    name: "Transformaciones de gráficas",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "shift", label: "Vértice tras un desplazamiento" },
          { value: "point", label: "Punto desplazado" },
          { value: "reflect", label: "Reflexiones" },
          { value: "stretch", label: "Estiramientos" },
          { value: "evalG", label: "Evaluar g(x)" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["shift", "point", "reflect", "stretch", "evalG"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
