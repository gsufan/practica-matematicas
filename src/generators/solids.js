// Solids generator: volumes and surface areas. Round solids give the number that multiplies pi.
(() => {
  const piNote = "Escribe solo el número que acompaña a π";
  const fracTex = (n, d) => {
    const r = reduceRational(n, d);
    return r.d === 1 ? `${r.n}` : `\\frac{${r.n}}{${r.d}}`;
  };
  const piAnswer = (n, d = 1) => reduceRational(n, d);

  // --- figures (simple, not to scale) ---
  function boxFig(l, w, h, labels) {
    const x = 70, y = 40, W = 150, H = 95, D = 52;
    const front = [[x, y + D], [x + W, y + D], [x + W, y + D + H], [x, y + D + H]];
    const top = [[x, y + D], [x + D, y], [x + W + D, y], [x + W, y + D]];
    const side = [[x + W, y + D], [x + W + D, y], [x + W + D, y + H], [x + W, y + D + H]];
    return FIG.svg([
      FIG.poly(front), FIG.poly(top, "fill2"), FIG.poly(side, "fill3"),
      FIG.text(x + W / 2, y + D + H + 16, labels[0], "middle", "text"),
      FIG.text(x + W + D + 14, y + D / 2 + H / 2, labels[1], "start", "text"),
      FIG.text(x - 12, y + D + H / 2, labels[2], "end", "text"),
    ].join(""), "Prisma rectangular", 320, 210);
  }

  function cylinderFig(r, h) {
    const cx = 160, top = 36, rx = 62, ry = 16, H = 110;
    return FIG.svg([
      `<path class="f-fill" d="M ${cx - rx} ${top} L ${cx - rx} ${top + H} A ${rx} ${ry} 0 0 0 ${cx + rx} ${top + H} L ${cx + rx} ${top} Z"/>`,
      FIG.ellipse([cx, top], rx, ry, "fill2"), FIG.line([cx, top], [cx + rx, top], "accent"),
      FIG.text(cx + rx / 2, top - 26, `r = ${r}`, "middle", "accent-text"), FIG.text(cx + rx + 12, top + H / 2, `h = ${h}`, "start", "text"),
    ].join(""), "Cilindro", 320, 200);
  }

  function coneFig(r, h) {
    const cx = 160, top = 24, rx = 66, ry = 16, H = 125;
    return FIG.svg([
      `<path class="f-fill" d="M ${cx} ${top} L ${cx - rx} ${top + H} A ${rx} ${ry} 0 0 0 ${cx + rx} ${top + H} Z"/>`,
      FIG.line([cx, top], [cx, top + H], "mark"), FIG.line([cx, top + H], [cx + rx, top + H], "accent"),
      FIG.text(cx + rx / 2, top + H + 24, `r = ${r}`, "middle", "accent-text"), FIG.text(cx + 12, top + H / 2, `h = ${h}`, "start", "text"),
    ].join(""), "Cono", 320, 200);
  }

  function sphereFig(r) {
    const c = [160, 100], R = 70;
    return FIG.svg([
      FIG.circle(c, R), FIG.ellipse(c, R, 20, "mark"), FIG.line(c, [c[0] + R, c[1]], "accent"), FIG.dot(c),
      FIG.text(c[0] + R / 2, c[1] - 12, `r = ${r}`, "middle", "accent-text"),
    ].join(""), "Esfera", 320, 200);
  }

  function pyramidFig(a, h) {
    const base = [[70, 150], [210, 150], [270, 118], [130, 118]], apex = [170, 22];
    return FIG.svg([
      FIG.poly(base, "fill2"), FIG.poly([base[0], base[1], apex]), FIG.poly([base[1], base[2], apex], "fill3"),
      FIG.line(apex, [apex[0], 134], "mark"),
      FIG.text(140, 170, `lado ${a}`, "middle", "text"), FIG.text(apex[0] + 12, 80, `h = ${h}`, "start", "accent-text"),
    ].join(""), "Pirámide de base cuadrada", 320, 190);
  }

  const BUILDERS = {
    cube() {
      const a = randInt(2, 12);
      if (Math.random() < 0.5) {
        return {
          kind: "decimal", placeholder: `ej. ${a ** 3}`, label: "Calcula el volumen del cubo (en cm³)",
          figure: boxFig(a, a, a, [`${a} cm`, `${a} cm`, `${a} cm`]),
          equation: "V = ?", answer: a ** 3,
          steps: ["V = a^3", `V = ${a}^3 = ${a} \\times ${a} \\times ${a}`, `V = ${a ** 3}`],
        };
      }
      return {
        kind: "decimal", placeholder: `ej. ${6 * a * a}`, label: "Calcula el área total de la superficie del cubo (en cm²)",
        figure: boxFig(a, a, a, [`${a} cm`, `${a} cm`, `${a} cm`]),
        equation: "A = ?", answer: 6 * a * a,
        steps: ["\\text{Un cubo tiene 6 caras cuadradas iguales}", `A = 6a^2 = 6 \\times ${a}^2`, `A = ${6 * a * a}`],
      };
    },

    prism() {
      const l = randInt(3, 14), w = randInt(2, 10), h = randInt(2, 12);
      if (Math.random() < 0.5) {
        return {
          kind: "decimal", placeholder: `ej. ${l * w * h}`, label: "Calcula el volumen del prisma (en cm³)",
          figure: boxFig(l, w, h, [`${l} cm`, `${w} cm`, `${h} cm`]),
          equation: "V = ?", answer: l * w * h,
          steps: ["V = \\text{largo} \\times \\text{ancho} \\times \\text{alto}", `V = ${l} \\times ${w} \\times ${h}`, `V = ${l * w * h}`],
        };
      }
      const area = 2 * (l * w + l * h + w * h);
      return {
        kind: "decimal", placeholder: `ej. ${area}`, label: "Calcula el área total de la superficie del prisma (en cm²)",
        figure: boxFig(l, w, h, [`${l} cm`, `${w} cm`, `${h} cm`]),
        equation: "A = ?", answer: area,
        steps: ["A = 2(lw + lh + wh)", `A = 2(${l * w} + ${l * h} + ${w * h})`, `A = 2 \\times ${l * w + l * h + w * h} = ${area}`],
      };
    },

    cylinder() {
      const r = randInt(2, 9), h = randInt(3, 14);
      if (Math.random() < 0.5) {
        return {
          kind: "fraction", placeholder: "ej. 48", label: `Calcula el volumen del cilindro. ${piNote}`,
          figure: cylinderFig(r, h),
          equation: "V = \\square \\, \\pi", answer: piAnswer(r * r * h),
          steps: ["V = \\pi r^2 h", `V = \\pi \\times ${r}^2 \\times ${h}`, `V = ${r * r * h}\\pi`],
        };
      }
      return {
        kind: "fraction", placeholder: "ej. 60", label: `Calcula el área total de la superficie del cilindro. ${piNote}`,
        figure: cylinderFig(r, h),
        equation: "A = \\square \\, \\pi", answer: piAnswer(2 * r * (r + h)),
        steps: ["A = 2\\pi r(r + h)", `A = 2\\pi \\times ${r} \\times (${r} + ${h})`, `A = ${2 * r * (r + h)}\\pi`],
      };
    },

    cone() {
      const r = randInt(2, 9), h = randInt(3, 15);
      return {
        kind: "fraction", placeholder: "ej. 12 o 20/3", label: `Calcula el volumen del cono. ${piNote} (si es fracción, simplificada)`,
        figure: coneFig(r, h),
        equation: "V = \\square \\, \\pi", answer: piAnswer(r * r * h, 3),
        steps: ["V = \\frac{1}{3}\\pi r^2 h", `V = \\frac{1}{3} \\pi \\times ${r}^2 \\times ${h} = \\frac{${r * r * h}}{3}\\pi`, `V = ${fracTex(r * r * h, 3)}\\pi`],
      };
    },

    sphere() {
      const r = randInt(2, 9);
      if (Math.random() < 0.5) {
        return {
          kind: "fraction", placeholder: "ej. 36 o 32/3", label: `Calcula el volumen de la esfera. ${piNote} (si es fracción, simplificada)`,
          figure: sphereFig(r),
          equation: "V = \\square \\, \\pi", answer: piAnswer(4 * r ** 3, 3),
          steps: ["V = \\frac{4}{3}\\pi r^3", `V = \\frac{4}{3}\\pi \\times ${r}^3 = \\frac{${4 * r ** 3}}{3}\\pi`, `V = ${fracTex(4 * r ** 3, 3)}\\pi`],
        };
      }
      return {
        kind: "fraction", placeholder: "ej. 36", label: `Calcula el área de la superficie de la esfera. ${piNote}`,
        figure: sphereFig(r),
        equation: "A = \\square \\, \\pi", answer: piAnswer(4 * r * r),
        steps: ["A = 4\\pi r^2", `A = 4\\pi \\times ${r}^2`, `A = ${4 * r * r}\\pi`],
      };
    },

    pyramid() {
      const a = randInt(3, 12), h = randInt(3, 12);
      return {
        kind: "fraction", placeholder: "ej. 48 o 25/3", label: "Calcula el volumen de la pirámide de base cuadrada (en cm³; si es fracción, simplificada)",
        figure: pyramidFig(a, h),
        equation: "V = ?", answer: piAnswer(a * a * h, 3),
        steps: [
          "V = \\frac{1}{3} \\times \\text{área de la base} \\times \\text{altura}",
          `V = \\frac{1}{3} \\times ${a}^2 \\times ${h} = \\frac{${a * a * h}}{3}`,
          `V = ${fracTex(a * a * h, 3)}`,
        ],
      };
    },
  };

  GENERATORS["solids"] = {
    id: "solids",
    name: "Cuerpos geométricos",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Cuerpo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "cube", label: "Cubo" },
          { value: "prism", label: "Prisma rectangular" },
          { value: "cylinder", label: "Cilindro" },
          { value: "cone", label: "Cono" },
          { value: "sphere", label: "Esfera" },
          { value: "pyramid", label: "Pirámide" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["cube", "prism", "cylinder", "cone", "sphere", "pyramid"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 5)] : type]();
    },
  };
})();
