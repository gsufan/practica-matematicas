// Similarity and Thales generator: proportional sides, parallel cuts, shadows and map scales.
(() => {
  // Triangle drawn from its three sides (drawing units, y up): base c along the x axis
  function fromSides(a, b, c) {
    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
    return [[0, 0], [c, 0], [b * cosA, b * sinA]];
  }

  function twoTrianglesFig(s1, s2, labels1, labels2) {
    const t1 = fromSides(...s1), t2 = fromSides(...s2);
    // both triangles side by side, drawn at their real relative size
    const gap = 0.35 * s2[2];
    const shifted2 = t2.map((p) => [p[0] + s1[2] + gap, p[1]]);
    const map = FIG.fit(t1.concat(shifted2), 320, 200, 40);
    const draw = (pts, labels) => {
      const p = pts.map(map), inside = FIG.centroid(p);
      return [FIG.poly(p), FIG.sideLabel(p[0], p[1], labels[2], inside, 13), FIG.sideLabel(p[1], p[2], labels[0], inside, 13), FIG.sideLabel(p[2], p[0], labels[1], inside, 13)].join("");
    };
    return FIG.svg(draw(t1, labels1) + draw(shifted2, labels2), "Dos triángulos semejantes", 320, 200);
  }

  const BASES = [[4, 5, 6], [3, 4, 5], [5, 6, 7], [6, 7, 9], [4, 6, 8], [5, 7, 9], [6, 8, 10], [7, 8, 10]];

  const BUILDERS = {
    triangles() {
      const base = BASES[randInt(0, BASES.length - 1)];
      const k = randInt(2, 4);
      const big = base.map((n) => n * k);
      const ask = randInt(0, 2);
      const l1 = base.map(String), l2 = big.map(String);
      l2[ask] = "x";
      // sides in each triangle: [a (opposite A), b, c]; x is the side corresponding to base[ask]
      return {
        kind: "integer", placeholder: `ej. ${big[ask]}`,
        label: "Los dos triángulos son semejantes. Encuentra x",
        figure: twoTrianglesFig(base, big, l1, l2),
        equation: "x = ?",
        answer: big[ask],
        steps: [
          "\\text{En triángulos semejantes, los lados correspondientes son proporcionales}",
          `\\text{Razón de semejanza: } \\frac{${big[(ask + 1) % 3]}}{${base[(ask + 1) % 3]}} = ${k}`,
          `x = ${base[ask]} \\times ${k}`,
          `x = ${big[ask]}`,
        ],
      };
    },

    thales() {
      const a = randInt(2, 8), b = randInt(2, 9), m = randInt(2, 4);
      const c = a * m, x = b * m;
      // Triangle ABC, segment DE parallel to BC
      const A = [160, 20], B = [40, 170], C = [280, 170];
      const t = a / (a + b);
      const D = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
      const E = [A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t];
      const fig = FIG.svg([
        FIG.poly([A, B, C]), FIG.line(D, E, "accent"), FIG.dot(D), FIG.dot(E),
        FIG.text(D[0] - 26, (A[1] + D[1]) / 2, `${a}`, "middle", "text"), FIG.text(D[0] - 26, (D[1] + B[1]) / 2, `${b}`, "middle", "text"),
        FIG.text(E[0] + 26, (A[1] + E[1]) / 2, `${c}`, "middle", "text"), FIG.text(E[0] + 26, (E[1] + C[1]) / 2, "x", "middle", "accent-text"),
        FIG.text(160, 190, "DE ∥ BC", "middle", "muted"),
      ].join(""), "Triángulo cortado por una paralela a la base", 320, 200);
      return {
        kind: "integer", placeholder: `ej. ${x}`,
        label: "Teorema de Tales: DE es paralela a BC. Encuentra x",
        figure: fig,
        equation: "x = ?",
        answer: x,
        steps: [
          "\\text{Tales: una paralela a un lado divide a los otros dos en partes proporcionales}",
          `\\frac{${a}}{${b}} = \\frac{${c}}{x}`,
          `${a} \\times x = ${b} \\times ${c}`,
          `x = \\frac{${b * c}}{${a}} = ${x}`,
        ],
      };
    },

    shadow() {
      const stick = randInt(1, 3), shadow = randInt(2, 4), m = randInt(3, 12);
      const treeShadow = shadow * m, height = stick * m;
      return {
        kind: "integer", placeholder: `ej. ${height}`,
        label: "Problema",
        statement: `A la misma hora del día, un poste de ${stick} m proyecta una sombra de ${shadow} m. Un árbol proyecta una sombra de ${treeShadow} m. ¿Cuánto mide el árbol (en metros)?`,
        equation: "\\text{Altura (m): } ?",
        answer: height,
        steps: [
          "\\text{Los rayos del sol forman triángulos semejantes: altura y sombra son proporcionales}",
          `\\frac{${stick}}{${shadow}} = \\frac{x}{${treeShadow}}`,
          `x = \\frac{${stick} \\times ${treeShadow}}{${shadow}} = ${height}`,
        ],
      };
    },

    scale() {
      const k = [10000, 20000, 25000, 50000, 100000][randInt(0, 4)];
      const cm = randInt(2, 15);
      const km = (cm * k) / 100000;
      return {
        kind: "decimal", placeholder: "ej. 1,5",
        label: "Problema",
        statement: `En un mapa a escala 1 : ${k.toLocaleString("es-CL")}, dos ciudades están separadas por ${cm} cm. ¿Qué distancia real hay entre ellas (en kilómetros)?`,
        equation: "\\text{Distancia (km): } ?",
        answer: { n: cm * k, d: 100000 },
        steps: [
          `\\text{Escala 1 : ${k}: cada cm del mapa son } ${k} \\text{ cm reales}`,
          `${cm} \\times ${k} = ${cm * k} \\text{ cm}`,
          `\\text{Convertimos a km: } ${cm * k} \\div 100\\,000 = ${String(km).replace(".", "{,}")}`,
        ],
      };
    },
  };

  GENERATORS["similarity"] = {
    id: "similarity",
    name: "Semejanza y Tales",
    keyboard: "decimal",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "triangles", label: "Triángulos semejantes" },
          { value: "thales", label: "Teorema de Tales" },
          { value: "shadow", label: "Sombras" },
          { value: "scale", label: "Escalas de mapas" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["triangles", "thales", "shadow", "scale"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 3)] : type]();
    },
  };
})();
