// Angles generator: complementary, supplementary, vertical, parallel lines, and algebra with angles.
(() => {
  const C = [160, 128];

  // Arc + label for one angular region of a figure
  const region = (c, a, b, text, r = 30) =>
    text == null ? "" : FIG.arc(c, r, a, b) + FIG.angleLabel(c, r + 24, a, b, text);

  function straightFig(ray, la, lb) {
    const parts = [
      FIG.line([45, C[1]], [275, C[1]]), FIG.line(C, FIG.at(C, 100, ray)), FIG.dot(C),
      region(C, 0, ray, la, 28), region(C, ray, 180, lb, 28),
    ];
    return FIG.svg(parts.join(""), "Dos ángulos sobre una línea recta", 320, 160);
  }

  function rightFig(ray, la, lb) {
    const parts = [
      FIG.line(C, FIG.at(C, 110, 0)), FIG.line(C, FIG.at(C, 110, 90)), FIG.line(C, FIG.at(C, 110, ray)), FIG.dot(C),
      FIG.rightMark(C, 0, 90, 14), region(C, 0, ray, la, 34), region(C, ray, 90, lb, 34),
    ];
    return FIG.svg(parts.join(""), "Dos ángulos que forman un ángulo recto", 320, 160);
  }

  // Two crossing lines; labels = text for regions R1..R4 (or null)
  function crossFig(t, labels) {
    const c = [160, 100];
    const parts = [
      FIG.line(FIG.at(c, 105, t + 180), FIG.at(c, 105, t)), FIG.line(FIG.at(c, 120, 180), FIG.at(c, 120, 0)), FIG.dot(c),
      region(c, 0, t, labels[0], 22), region(c, t, 180, labels[1], 22),
      region(c, 180, 180 + t, labels[2], 22), region(c, 180 + t, 360, labels[3], 22),
    ];
    return FIG.svg(parts.join(""), "Dos rectas que se cruzan", 320, 200);
  }

  // Two parallel lines cut by a transversal at angle phi; labels for the 4 regions on each line
  function parallelFig(phi, top, bottom) {
    const y1 = 62, y2 = 142, dx = (y2 - y1) / Math.tan(FIG.rad(phi));
    const p1 = [190, y1], p2 = [190 - dx, y2];
    const up = FIG.at(p1, 78, phi), down = FIG.at(p2, 78, phi + 180);
    const parts = [
      FIG.line([20, y1], [300, y1]), FIG.line([20, y2], [300, y2]), FIG.line(down, up),
      FIG.text(34, y1 - 14, "paralelas", "start", "muted"),
    ];
    const regions = (p, labels) => [
      region(p, 0, phi, labels[0], 18), region(p, phi, 180, labels[1], 18),
      region(p, 180, 180 + phi, labels[2], 18), region(p, 180 + phi, 360, labels[3], 18),
    ].join("");
    parts.push(regions(p1, top), regions(p2, bottom));
    return FIG.svg(parts.join(""), "Dos rectas paralelas cortadas por una transversal", 320, 200);
  }

  const lin = (a, b) => `${a === 1 ? "" : a}x${b ? ` + ${b}` : ""}`;
  const deg = "^{\\circ}";

  const BUILDERS = {
    complementary() {
      const a = randInt(10, 80), x = 90 - a;
      const givenFirst = Math.random() < 0.5;
      return {
        kind: "integer", placeholder: "ej. 35",
        label: "Estos dos ángulos son complementarios (suman 90°). Encuentra x, en grados",
        figure: givenFirst ? rightFig(a, `${a}°`, "x") : rightFig(90 - a, "x", `${a}°`),
        equation: `x = ?`,
        answer: x,
        steps: ["\\text{Complementarios: suman } 90^{\\circ}", `${a} + x = 90`, `x = 90 - ${a}`, `x = ${x}`],
      };
    },

    supplementary() {
      const a = randInt(20, 160), x = 180 - a;
      const ray = Math.random() < 0.5 ? a : x;
      return {
        kind: "integer", placeholder: "ej. 110",
        label: "Estos dos ángulos forman una línea recta (suplementarios, suman 180°). Encuentra x, en grados",
        figure: ray === a ? straightFig(a, `${a}°`, "x") : straightFig(x, "x", `${a}°`),
        equation: `x = ?`,
        answer: x,
        steps: ["\\text{Suplementarios: suman } 180^{\\circ}", `${a} + x = 180`, `x = 180 - ${a}`, `x = ${x}`],
      };
    },

    vertical() {
      let t;
      do { t = randInt(30, 150); } while (Math.abs(t - 90) < 8);
      const m = [t, 180 - t, t, 180 - t];
      const i = randInt(0, 3);
      const opposite = Math.random() < 0.5;
      const j = opposite ? (i + 2) % 4 : (i + (Math.random() < 0.5 ? 1 : 3)) % 4;
      const labels = [null, null, null, null];
      labels[i] = `${m[i]}°`;
      labels[j] = "x";
      return {
        kind: "integer", placeholder: "ej. 65",
        label: "Dos rectas se cruzan. Encuentra x, en grados",
        figure: crossFig(t, labels),
        equation: `x = ?`,
        answer: m[j],
        steps: opposite
          ? ["\\text{Los ángulos opuestos por el vértice son iguales}", `x = ${m[i]}`]
          : ["\\text{Los ángulos adyacentes forman una línea recta: suman } 180^{\\circ}", `x = 180 - ${m[i]}`, `x = ${m[j]}`],
      };
    },

    parallel() {
      let phi;
      do { phi = randInt(40, 140); } while (Math.abs(phi - 90) < 10);
      const m = [phi, 180 - phi, phi, 180 - phi];
      // [top region, bottom region, name, relation]
      const pairs = [
        [0, 0, "correspondientes", "equal"], [1, 1, "correspondientes", "equal"],
        [2, 0, "alternos internos", "equal"], [3, 1, "alternos internos", "equal"],
        [3, 0, "conjugados internos", "supp"], [2, 1, "conjugados internos", "supp"],
      ];
      const [ti, bi, name, relation] = pairs[randInt(0, pairs.length - 1)];
      const givenTop = Math.random() < 0.5;
      const top = [null, null, null, null], bottom = [null, null, null, null];
      if (givenTop) { top[ti] = `${m[ti]}°`; bottom[bi] = "x"; } else { bottom[bi] = `${m[bi]}°`; top[ti] = "x"; }
      const given = givenTop ? m[ti] : m[bi];
      const answer = givenTop ? m[bi] : m[ti];
      return {
        kind: "integer", placeholder: "ej. 70",
        label: `Las dos rectas horizontales son paralelas. Los ángulos son ${name}. Encuentra x, en grados`,
        figure: parallelFig(phi, top, bottom),
        equation: `x = ?`,
        answer,
        steps: [
          `\\text{Ángulos ${name}}`,
          relation === "equal"
            ? "\\text{Entre paralelas, estos ángulos son iguales}"
            : "\\text{Entre paralelas, estos ángulos son suplementarios: suman } 180^{\\circ}",
          relation === "equal" ? `x = ${given}` : `x = 180 - ${given} = ${answer}`,
        ],
      };
    },

    // Angles written with x: solve the equation
    algebra() {
      const total = Math.random() < 0.5 ? 180 : 90;
      for (let attempt = 0; attempt < 200; attempt++) {
        const a = randInt(1, 3), c = randInt(1, 3), b = randInt(0, 30);
        const x = randInt(5, total === 180 ? 40 : 20);
        const d = total - (a + c) * x - b;
        if (d < 0 || d > 40) continue;
        const first = a * x + b;
        if (first < 12 || first > total - 12) continue;
        const e1 = lin(a, b), e2 = lin(c, d);
        return {
          kind: "integer", placeholder: "ej. 25",
          label: total === 180
            ? "Estos dos ángulos forman una línea recta (suman 180°). Encuentra x"
            : "Estos dos ángulos forman un ángulo recto (suman 90°). Encuentra x",
          figure: total === 180 ? straightFig(first, `(${e1})°`, `(${e2})°`) : rightFig(first, `(${e1})°`, `(${e2})°`),
          equation: `(${e1})${deg} + (${e2})${deg} = ${total}${deg}`,
          answer: x,
          steps: [
            `(${e1}) + (${e2}) = ${total}`,
            `${lin(a + c, b + d)} = ${total}`,
            `${a + c === 1 ? "" : a + c}x = ${total - b - d}`,
            `x = ${x}`,
            `\\text{Comprobación: } ${first} + ${total - first} = ${total}`,
          ],
        };
      }
      return BUILDERS.supplementary();
    },
  };

  GENERATORS["angles"] = {
    id: "angles",
    name: "Puntos, rectas y ángulos",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "complementary", label: "Complementarios" },
          { value: "supplementary", label: "Suplementarios" },
          { value: "vertical", label: "Rectas que se cruzan" },
          { value: "parallel", label: "Paralelas y transversal" },
          { value: "algebra", label: "Con álgebra" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["complementary", "supplementary", "vertical", "parallel", "algebra"][randInt(0, 4)] : type;
      return BUILDERS[kind]();
    },
  };
})();
