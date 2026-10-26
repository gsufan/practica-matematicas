// Pythagorean theorem generator. Sides come from Pythagorean triples, so answers are integers.
(() => {
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  const unit = () => ["cm", "m"][randInt(0, 1)];

  function triple(maxHyp = 60) {
    let t, k;
    do {
      t = TRIPLES[randInt(0, TRIPLES.length - 1)];
      k = randInt(1, 6);
    } while (t[2] * k > maxHyp);
    return t.map((n) => n * k);
  }

  // Right triangle with the right angle at the bottom left; labels for a (vertical), b (horizontal), c (slanted)
  function rightFig(a, b, la, lb, lc) {
    const pts = [[0, 0], [b, 0], [0, a]];
    const map = FIG.fit(pts, 320, 200, 46);
    const [p0, p1, p2] = pts.map(map);
    const inside = FIG.centroid([p0, p1, p2]);
    return FIG.svg([
      FIG.poly([p0, p1, p2]), FIG.rightMark(p0, 0, 90, 13),
      FIG.sideLabel(p0, p1, lb, inside), FIG.sideLabel(p0, p2, la, inside), FIG.sideLabel(p1, p2, lc, inside),
    ].join(""), "Triángulo rectángulo con sus lados", 320, 200);
  }

  const BUILDERS = {
    hypotenuse() {
      const [a, b, c] = triple();
      const u = unit();
      return {
        kind: "integer", placeholder: `ej. ${c}`,
        label: `Calcula la hipotenusa x (en ${u})`,
        figure: rightFig(a, b, `${a}`, `${b}`, "x"),
        equation: "x = ?",
        answer: c,
        steps: [
          "x^2 = a^2 + b^2",
          `x^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${a * a + b * b}`,
          `x = \\sqrt{${a * a + b * b}}`,
          `x = ${c}`,
        ],
      };
    },

    leg() {
      const [a, b, c] = triple();
      const askA = Math.random() < 0.5;
      const known = askA ? b : a, unknown = askA ? a : b;
      return {
        kind: "integer", placeholder: `ej. ${unknown}`,
        label: "Calcula el cateto x",
        figure: askA ? rightFig(a, b, "x", `${b}`, `${c}`) : rightFig(a, b, `${a}`, "x", `${c}`),
        equation: "x = ?",
        answer: unknown,
        steps: [
          "\\text{La hipotenusa } c \\text{ es el lado opuesto al ángulo recto: } c^2 = a^2 + b^2",
          `x^2 = c^2 - \\text{(otro cateto)}^2 = ${c}^2 - ${known}^2`,
          `x^2 = ${c * c} - ${known * known} = ${unknown * unknown}`,
          `x = \\sqrt{${unknown * unknown}} = ${unknown}`,
        ],
      };
    },

    diagonal() {
      const [a, b, c] = triple(50);
      const w = Math.max(a, b), h = Math.min(a, b);
      const map = FIG.fit([[0, 0], [w, 0], [w, h], [0, h]], 320, 200, 46);
      const [p0, p1, p2, p3] = [[0, 0], [w, 0], [w, h], [0, h]].map(map);
      const inside = FIG.centroid([p0, p1, p2, p3]);
      return {
        kind: "integer", placeholder: `ej. ${c}`,
        label: "Calcula la diagonal x del rectángulo",
        figure: FIG.svg([
          FIG.poly([p0, p1, p2, p3]), FIG.line(p0, p2, "accent"), FIG.rightMark(p0, 0, 90, 12),
          FIG.sideLabel(p0, p1, `${w}`, inside), FIG.sideLabel(p1, p2, `${h}`, inside),
          FIG.text((p0[0] + p2[0]) / 2 - 10, (p0[1] + p2[1]) / 2 - 12, "x", "middle", "accent-text"),
        ].join(""), "Rectángulo con su diagonal", 320, 200),
        equation: "x = ?",
        answer: c,
        steps: [
          "\\text{La diagonal divide al rectángulo en dos triángulos rectángulos}",
          `x^2 = ${w}^2 + ${h}^2 = ${w * w} + ${h * h} = ${c * c}`,
          `x = ${c}`,
        ],
      };
    },

    converse() {
      const [a, b, c] = triple(40);
      const right = Math.random() < 0.5;
      const cc = right ? c : c + [-2, -1, 1, 2][randInt(0, 3)];
      const sides = [a, b, cc].sort((x, y) => x - y);
      return {
        kind: "integer", placeholder: "1 (sí) o 0 (no)",
        label: "¿Es rectángulo un triángulo con estos lados? Escribe 1 si lo es y 0 si no",
        equation: `${sides.join(",\\ ")}`,
        answer: a * a + b * b === cc * cc ? 1 : 0,
        steps: [
          "\\text{Un triángulo es rectángulo si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos}",
          `${sides[0]}^2 + ${sides[1]}^2 = ${sides[0] ** 2 + sides[1] ** 2}`,
          `${sides[2]}^2 = ${sides[2] ** 2}`,
          sides[0] ** 2 + sides[1] ** 2 === sides[2] ** 2 ? "\\text{Son iguales: sí es rectángulo}" : "\\text{No son iguales: no es rectángulo}",
        ],
      };
    },

    ladder() {
      const [h, d, L] = triple(40);
      return {
        kind: "integer", placeholder: `ej. ${h}`,
        label: "Problema",
        statement: `Una escalera de ${L} metros se apoya en una pared. Su base está a ${d} metros de la pared. ¿A qué altura de la pared llega la escalera (en metros)?`,
        figure: rightFig(h, d, "altura", `${d} m`, `${L} m`),
        equation: `\\text{Altura (m): } ?`,
        answer: h,
        steps: [
          "\\text{La pared, el suelo y la escalera forman un triángulo rectángulo; la escalera es la hipotenusa}",
          `h^2 = ${L}^2 - ${d}^2 = ${L * L} - ${d * d} = ${h * h}`,
          `h = \\sqrt{${h * h}} = ${h}`,
        ],
      };
    },
  };

  GENERATORS["pythagoras"] = {
    id: "pythagoras",
    name: "Teorema de Pitágoras",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "hypotenuse", label: "Hallar la hipotenusa" },
          { value: "leg", label: "Hallar un cateto" },
          { value: "diagonal", label: "Diagonal de un rectángulo" },
          { value: "converse", label: "¿Es rectángulo?" },
          { value: "ladder", label: "Problema de la escalera" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["hypotenuse", "leg", "diagonal", "converse", "ladder"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
