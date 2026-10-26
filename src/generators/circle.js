// Circle generator. Answers are the number that multiplies pi (exact, no decimals of pi).
(() => {
  const ANGLES = [30, 45, 60, 90, 120, 135, 150, 180, 240, 270];

  // Circle with radius r drawn; optional sector from angle 0 to theta
  function circleFig(label, theta) {
    const c = [160, 100], R = 75;
    const parts = [FIG.circle(c, R, "fill")];
    if (theta) {
      const e = FIG.at(c, R, theta);
      const large = theta > 180 ? 1 : 0;
      parts.push(`<path class="f-sector" d="M ${c[0]} ${c[1]} L ${c[0] + R} ${c[1]} A ${R} ${R} 0 ${large} 0 ${e[0]} ${e[1]} Z"/>`);
      parts.push(FIG.arc(c, 22, 0, theta), FIG.angleLabel(c, 38, 0, theta, `${theta}°`));
    }
    parts.push(FIG.line(c, theta ? FIG.at(c, R, 0) : FIG.at(c, R, 40), "accent"), FIG.dot(c));
    const mid = theta ? FIG.at(c, R * 0.6, -25) : FIG.at(c, R * 0.55, 62);
    parts.push(FIG.text(mid[0], mid[1], label, "middle", "accent-text"));
    return FIG.svg(parts.join(""), "Círculo con su radio", 320, 200);
  }

  const piLabel = "Escribe solo el número que acompaña a π (por ejemplo, para 12π escribe 12)";
  const piQuestion = (symbol) => `${symbol} = \\square \\, \\pi`;

  function result(label, equation, value, steps, figure) {
    // value is an integer or a { n, d } fraction
    return { kind: "fraction", placeholder: "ej. 12 o 5/3", label, figure, equation, answer: value, steps };
  }
  const fracTex = (n, d) => {
    const r = reduceRational(n, d);
    return r.d === 1 ? `${r.n}` : `\\frac{${r.n}}{${r.d}}`;
  };

  const BUILDERS = {
    circumference() {
      const r = randInt(2, 15);
      if (Math.random() < 0.5) {
        return result(`Calcula la longitud de la circunferencia. ${piLabel}`, piQuestion("C"), 2 * r,
          ["C = 2\\pi r", `C = 2 \\times ${r} \\times \\pi`, `C = ${2 * r}\\pi`], circleFig(`r = ${r}`));
      }
      const d = 2 * r;
      return result(`Calcula la longitud de la circunferencia de diámetro ${d}. ${piLabel}`, piQuestion("C"), d,
        ["C = \\pi d", `C = ${d}\\pi`], circleFig(`d = ${d}`));
    },

    area() {
      const r = randInt(2, 14);
      if (Math.random() < 0.6) {
        return result(`Calcula el área del círculo. ${piLabel}`, piQuestion("A"), r * r,
          ["A = \\pi r^2", `A = \\pi \\times ${r}^2`, `A = ${r * r}\\pi`], circleFig(`r = ${r}`));
      }
      return result(`Calcula el área del círculo de diámetro ${2 * r}. ${piLabel}`, piQuestion("A"), r * r,
        [`\\text{El radio es la mitad del diámetro: } r = \\frac{${2 * r}}{2} = ${r}`, "A = \\pi r^2", `A = ${r * r}\\pi`], circleFig(`d = ${2 * r}`));
    },

    radius() {
      const r = randInt(2, 15);
      if (Math.random() < 0.5) {
        return {
          kind: "integer", placeholder: `ej. ${r}`,
          label: "Encuentra el radio de la circunferencia",
          equation: `C = ${2 * r}\\pi`,
          answer: r,
          steps: ["C = 2\\pi r", `${2 * r}\\pi = 2\\pi r`, `r = \\frac{${2 * r}\\pi}{2\\pi} = ${r}`],
        };
      }
      return {
        kind: "integer", placeholder: `ej. ${r}`,
        label: "Encuentra el radio del círculo",
        equation: `A = ${r * r}\\pi`,
        answer: r,
        steps: ["A = \\pi r^2", `${r * r}\\pi = \\pi r^2`, `r^2 = ${r * r}`, `r = ${r}`],
      };
    },

    arc() {
      const theta = ANGLES[randInt(0, ANGLES.length - 1)], r = randInt(3, 12);
      const n = theta * r;
      return result(`Calcula la longitud del arco señalado. ${piLabel}`, piQuestion("L"), reduceRational(n, 180),
        [
          "L = \\frac{\\theta}{360} \\times 2\\pi r",
          `L = \\frac{${theta}}{360} \\times 2\\pi \\times ${r} = \\frac{${theta * 2 * r}}{360}\\pi`,
          `L = ${fracTex(n, 180)}\\pi`,
        ], circleFig(`r = ${r}`, theta));
    },

    sector() {
      const theta = ANGLES[randInt(0, ANGLES.length - 1)], r = randInt(3, 12);
      const n = theta * r * r;
      return result(`Calcula el área del sector señalado. ${piLabel}`, piQuestion("A"), reduceRational(n, 360),
        [
          "A = \\frac{\\theta}{360} \\times \\pi r^2",
          `A = \\frac{${theta}}{360} \\times \\pi \\times ${r}^2 = \\frac{${n}}{360}\\pi`,
          `A = ${fracTex(n, 360)}\\pi`,
        ], circleFig(`r = ${r}`, theta));
    },
  };

  GENERATORS["circle"] = {
    id: "circle",
    name: "Circunferencia y círculo",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "circumference", label: "Longitud de la circunferencia" },
          { value: "area", label: "Área del círculo" },
          { value: "radius", label: "Hallar el radio" },
          { value: "arc", label: "Longitud de un arco" },
          { value: "sector", label: "Área de un sector" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["circumference", "area", "radius", "arc", "sector"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
