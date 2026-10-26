// Perimeter and area generator for plane figures. Answers are numbers (decimals allowed).
(() => {
  const dec = (n) => String(n).replace(".", "{,}");

  // Draw a polygon given in drawing units; labels = [{ from, to, text }] by vertex index; extras = lines
  function shapeFig(points, labels, extras = [], extra = []) {
    const map = FIG.fit(points.concat(extra), 320, 200, 44);
    const p = points.map(map);
    const parts = [FIG.poly(p)];
    const inside = FIG.centroid(p);
    extras.forEach((e) => parts.push(FIG.line(map(e[0]), map(e[1]), e[2] || "mark")));
    labels.forEach((l) => {
      const a = l.points ? map(l.points[0]) : p[l.from], b = l.points ? map(l.points[1]) : p[l.to];
      parts.push(FIG.sideLabel(a, b, l.text, l.points ? null : inside, l.gap || 15));
    });
    return FIG.svg(parts.join(""), "Figura plana con sus medidas", 320, 200);
  }

  const unit = () => ["cm", "m"][randInt(0, 1)];

  // A whole number, or an exact fraction when the area is a half
  function answerOf(n, d = 1) { return d === 1 ? n : { n, d }; }

  const BUILDERS = {
    rectangle() {
      const w = randInt(3, 20), h = randInt(2, 14), u = unit();
      const wantArea = Math.random() < 0.5;
      return {
        kind: "decimal", placeholder: "ej. 24",
        label: `${wantArea ? "Calcula el área" : "Calcula el perímetro"} del rectángulo (en ${wantArea ? u + "²" : u})`,
        figure: shapeFig([[0, 0], [w, 0], [w, h], [0, h]], [{ from: 0, to: 1, text: `${w} ${u}` }, { from: 1, to: 2, text: `${h} ${u}` }]),
        equation: wantArea ? "A = ?" : "P = ?",
        answer: wantArea ? w * h : 2 * (w + h),
        steps: wantArea
          ? ["A = \\text{base} \\times \\text{altura}", `A = ${w} \\times ${h}`, `A = ${w * h}`]
          : ["P = 2(\\text{base} + \\text{altura})", `P = 2(${w} + ${h})`, `P = 2 \\times ${w + h} = ${2 * (w + h)}`],
      };
    },

    square() {
      const side = randInt(2, 15), u = unit();
      const fromPerimeter = Math.random() < 0.5;
      if (fromPerimeter) {
        return {
          kind: "decimal", placeholder: "ej. 36",
          label: `Un cuadrado tiene perímetro ${4 * side} ${u}. Calcula su área (en ${u}²)`,
          equation: "A = ?",
          answer: side * side,
          steps: [`\\text{Lado} = \\frac{${4 * side}}{4} = ${side}`, `A = \\text{lado}^2 = ${side}^2`, `A = ${side * side}`],
        };
      }
      return {
        kind: "decimal", placeholder: "ej. 64",
        label: `Calcula el área del cuadrado (en ${u}²)`,
        figure: shapeFig([[0, 0], [1, 0], [1, 1], [0, 1]], [{ from: 0, to: 1, text: `${side} ${u}` }]),
        equation: "A = ?",
        answer: side * side,
        steps: ["A = \\text{lado}^2", `A = ${side}^2`, `A = ${side * side}`],
      };
    },

    triangle() {
      const b = randInt(3, 18), h = randInt(Math.ceil(b / 3), 14), u = unit();
      const shift = randInt(0, b);
      const area = (b * h) / 2;
      return {
        kind: "decimal", placeholder: "ej. 12,5",
        label: `Calcula el área del triángulo (en ${u}²)`,
        figure: shapeFig([[0, 0], [b, 0], [shift, h]], [{ from: 0, to: 1, text: `base ${b} ${u}` }, { points: [[shift, 0], [shift, h]], text: `h = ${h} ${u}`, gap: 18 }], [[[shift, 0], [shift, h]]]),
        equation: "A = ?",
        answer: answerOf((b * h) % 2 === 0 ? area : b * h, (b * h) % 2 === 0 ? 1 : 2),
        steps: [
          "A = \\frac{\\text{base} \\times \\text{altura}}{2}",
          `A = \\frac{${b} \\times ${h}}{2} = \\frac{${b * h}}{2}`,
          `A = ${dec(area)}`,
        ],
      };
    },

    parallelogram() {
      const b = randInt(4, 18), h = randInt(3, 12), side = h + randInt(1, 4), u = unit();
      const skew = randInt(2, 5);
      return {
        kind: "decimal", placeholder: "ej. 54",
        label: `Calcula el área del paralelogramo (en ${u}²). Ojo: usa la altura, no el lado inclinado`,
        figure: shapeFig([[0, 0], [b, 0], [b + skew, h], [skew, h]], [{ from: 0, to: 1, text: `${b} ${u}` }, { from: 1, to: 2, text: `${side} ${u}` }, { points: [[skew, 0], [skew, h]], text: `h = ${h} ${u}`, gap: 18 }], [[[skew, 0], [skew, h]]]),
        equation: "A = ?",
        answer: b * h,
        steps: ["A = \\text{base} \\times \\text{altura}", `\\text{El lado inclinado de } ${side} \\text{ no se usa en el área}`, `A = ${b} \\times ${h} = ${b * h}`],
      };
    },

    trapezoid() {
      const B = randInt(8, 18), b = randInt(3, B - 2), h = randInt(Math.ceil(B / 3), 12), u = unit();
      const off = (B - b) / 2;
      const area = ((B + b) * h) / 2;
      const odd = ((B + b) * h) % 2 !== 0;
      return {
        kind: "decimal", placeholder: "ej. 45",
        label: `Calcula el área del trapecio (en ${u}²)`,
        figure: shapeFig([[0, 0], [B, 0], [B - off, h], [off, h]], [{ from: 0, to: 1, text: `B = ${B} ${u}` }, { from: 2, to: 3, text: `b = ${b} ${u}` }, { points: [[off, 0], [off, h]], text: `h = ${h}`, gap: 16 }], [[[off, 0], [off, h]]]),
        equation: "A = ?",
        answer: answerOf(odd ? (B + b) * h : area, odd ? 2 : 1),
        steps: [
          "A = \\frac{(B + b) \\times h}{2}",
          `A = \\frac{(${B} + ${b}) \\times ${h}}{2} = \\frac{${B + b} \\times ${h}}{2}`,
          `A = ${dec(area)}`,
        ],
      };
    },

    rhombus() {
      const d1 = randInt(4, 20), d2 = randInt(3, 16), u = unit();
      const area = (d1 * d2) / 2;
      const odd = (d1 * d2) % 2 !== 0;
      return {
        kind: "decimal", placeholder: "ej. 36",
        label: `Calcula el área del rombo a partir de sus diagonales (en ${u}²)`,
        figure: shapeFig([[d1 / 2, 0], [d1, d2 / 2], [d1 / 2, d2], [0, d2 / 2]], [{ points: [[0, d2 / 2], [d1, d2 / 2]], text: `D = ${d1} ${u}`, gap: -12 }, { points: [[d1 / 2, 0], [d1 / 2, d2]], text: `d = ${d2} ${u}`, gap: 18 }], [[[0, d2 / 2], [d1, d2 / 2]], [[d1 / 2, 0], [d1 / 2, d2]]]),
        equation: "A = ?",
        answer: answerOf(odd ? d1 * d2 : area, odd ? 2 : 1),
        steps: ["A = \\frac{D \\times d}{2}", `A = \\frac{${d1} \\times ${d2}}{2}`, `A = ${dec(area)}`],
      };
    },

    // L-shape: big rectangle minus a corner
    composite() {
      const W = randInt(8, 18), H = randInt(7, 14), w = randInt(2, W - 3), h = randInt(2, H - 3), u = unit();
      const area = W * H - w * h;
      const points = [[0, 0], [W, 0], [W, H - h], [W - w, H - h], [W - w, H], [0, H]];
      return {
        kind: "decimal", placeholder: "ej. 100",
        label: `Calcula el área de esta figura en L (en ${u}²)`,
        figure: shapeFig(points, [
          { from: 0, to: 1, text: `${W} ${u}` }, { from: 5, to: 0, text: `${H} ${u}` },
          { from: 4, to: 3, text: `${w} ${u}` }, { from: 2, to: 3, text: `${h} ${u}` },
        ]),
        equation: "A = ?",
        answer: area,
        steps: [
          "\\text{Rectángulo completo menos el trozo que falta}",
          `${W} \\times ${H} = ${W * H}`,
          `\\text{Trozo que falta: } ${w} \\times ${h} = ${w * h}`,
          `A = ${W * H} - ${w * h} = ${area}`,
        ],
      };
    },
  };

  GENERATORS["area-perimeter"] = {
    id: "area-perimeter",
    name: "Perímetro y área",
    keyboard: "decimal",
    controls: [
      {
        id: "type", type: "select", label: "Figura",
        choices: [
          { value: "all", label: "Todas" },
          { value: "rectangle", label: "Rectángulo" },
          { value: "square", label: "Cuadrado" },
          { value: "triangle", label: "Triángulo" },
          { value: "parallelogram", label: "Paralelogramo" },
          { value: "trapezoid", label: "Trapecio" },
          { value: "rhombus", label: "Rombo" },
          { value: "composite", label: "Figura compuesta" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["rectangle", "square", "triangle", "parallelogram", "trapezoid", "rhombus", "composite"];
      return BUILDERS[type === "all" ? kinds[randInt(0, kinds.length - 1)] : type]();
    },
  };
})();
