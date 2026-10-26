// Trigonometry in the right triangle: sine, cosine, tangent as exact fractions.
(() => {
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  const NOTABLE = [
    ["\\sin 30^{\\circ}", 1, 2], ["\\cos 60^{\\circ}", 1, 2], ["\\tan 45^{\\circ}", 1, 1],
    ["\\sin 90^{\\circ}", 1, 1], ["\\cos 0^{\\circ}", 1, 1], ["\\sin 0^{\\circ}", 0, 1],
    ["\\cos 90^{\\circ}", 0, 1], ["\\tan 0^{\\circ}", 0, 1],
  ];
  const fracTex = (n, d) => {
    const r = reduceRational(n, d);
    return r.d === 1 ? `${r.n}` : `\\frac{${r.n}}{${r.d}}`;
  };

  // Right angle at the bottom left; alpha at the bottom right. opp = vertical side, adj = horizontal side
  function triangleFig(opp, adj, labels) {
    const pts = [[0, 0], [adj, 0], [0, opp]];
    const map = FIG.fit(pts, 320, 200, 50);
    const [p0, p1, p2] = pts.map(map);
    const inside = FIG.centroid([p0, p1, p2]);
    return FIG.svg([
      FIG.poly([p0, p1, p2]), FIG.rightMark(p0, 0, 90, 13),
      FIG.arc(p1, 26, FIG.dir(p1, p2), 180), FIG.angleLabel(p1, 44, FIG.dir(p1, p2), 180, labels.angle),
      labels.adj == null ? "" : FIG.sideLabel(p0, p1, labels.adj, inside),
      labels.opp == null ? "" : FIG.sideLabel(p0, p2, labels.opp, inside),
      labels.hyp == null ? "" : FIG.sideLabel(p1, p2, labels.hyp, inside),
    ].join(""), "Triángulo rectángulo con el ángulo alfa", 320, 200);
  }

  const BUILDERS = {
    ratio() {
      const [a, b, c] = TRIPLES[randInt(0, TRIPLES.length - 1)];
      const k = randInt(1, 3);
      const swap = Math.random() < 0.5;
      const opp = (swap ? a : b) * k, adj = (swap ? b : a) * k, hyp = c * k;
      const which = ["sen", "cos", "tan"][randInt(0, 2)];
      const num = { sen: opp, cos: adj, tan: opp }[which], den = { sen: hyp, cos: hyp, tan: adj }[which];
      const words = { sen: ["\\text{cateto opuesto}", "\\text{hipotenusa}"], cos: ["\\text{cateto adyacente}", "\\text{hipotenusa}"], tan: ["\\text{cateto opuesto}", "\\text{cateto adyacente}"] }[which];
      const r = reduceRational(num, den);
      return {
        kind: "fraction", placeholder: "ej. 3/5",
        label: `Calcula ${which === "sen" ? "el seno" : which === "cos" ? "el coseno" : "la tangente"} del ángulo α (fracción simplificada)`,
        figure: triangleFig(opp, adj, { angle: "α", adj: `${adj}`, opp: `${opp}`, hyp: `${hyp}` }),
        equation: `\\${which === "sen" ? "sin" : which === "cos" ? "cos" : "tan"}\\,\\alpha = ?`,
        answer: r,
        steps: [
          `\\${which === "sen" ? "sin" : which === "cos" ? "cos" : "tan"}\\,\\alpha = \\frac{${words[0]}}{${words[1]}}`,
          `\\text{Respecto de } \\alpha \\text{: opuesto } = ${opp},\\ \\text{adyacente } = ${adj},\\ \\text{hipotenusa } = ${hyp}`,
          `= \\frac{${num}}{${den}} = ${fracTex(num, den)}`,
        ],
      };
    },

    side() {
      const [a, b, c] = TRIPLES[randInt(0, TRIPLES.length - 1)];
      const k = randInt(2, 6), hyp = c * k;
      const useSin = Math.random() < 0.5;
      const opp = a * k, adj = b * k;
      if (useSin) {
        return {
          kind: "integer", placeholder: `ej. ${opp}`,
          label: "Usa la razón trigonométrica para hallar el cateto opuesto a α",
          figure: triangleFig(opp, adj, { angle: "α", adj: null, opp: "x", hyp: `${hyp}` }),
          equation: `\\sin\\alpha = \\frac{${a}}{${c}} \\qquad x = ?`,
          answer: opp,
          steps: [
            "\\sin\\alpha = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}}",
            `\\frac{${a}}{${c}} = \\frac{x}{${hyp}}`,
            `x = \\frac{${a} \\times ${hyp}}{${c}} = ${opp}`,
          ],
        };
      }
      return {
        kind: "integer", placeholder: `ej. ${adj}`,
        label: "Usa la razón trigonométrica para hallar el cateto adyacente a α",
        figure: triangleFig(opp, adj, { angle: "α", adj: "x", opp: null, hyp: `${hyp}` }),
        equation: `\\cos\\alpha = \\frac{${b}}{${c}} \\qquad x = ?`,
        answer: adj,
        steps: [
          "\\cos\\alpha = \\frac{\\text{cateto adyacente}}{\\text{hipotenusa}}",
          `\\frac{${b}}{${c}} = \\frac{x}{${hyp}}`,
          `x = \\frac{${b} \\times ${hyp}}{${c}} = ${adj}`,
        ],
      };
    },

    notable() {
      const [tex, n, d] = NOTABLE[randInt(0, NOTABLE.length - 1)];
      return {
        kind: "fraction", placeholder: "ej. 1/2",
        label: "Valor de esta razón trigonométrica (fracción simplificada o entero)",
        equation: `${tex} = ?`,
        answer: reduceRational(n, d),
        steps: [
          "\\text{Valores que conviene recordar:}",
          "\\sin 30^{\\circ} = \\cos 60^{\\circ} = \\frac{1}{2} \\qquad \\tan 45^{\\circ} = 1",
          "\\sin 0^{\\circ} = 0,\\ \\sin 90^{\\circ} = 1,\\ \\cos 0^{\\circ} = 1,\\ \\cos 90^{\\circ} = 0",
          `${tex} = ${fracTex(n, d)}`,
        ],
      };
    },

    complement() {
      const a = randInt(10, 80);
      const useSin = Math.random() < 0.5;
      return {
        kind: "integer", placeholder: `ej. ${90 - a}`,
        label: "Complementarios: encuentra x, en grados (entre 0 y 90)",
        equation: useSin ? `\\sin ${a}^{\\circ} = \\cos x` : `\\cos ${a}^{\\circ} = \\sin x`,
        answer: 90 - a,
        steps: [
          "\\text{El seno de un ángulo es el coseno de su complementario, y al revés}",
          useSin ? "\\sin\\alpha = \\cos(90^{\\circ} - \\alpha)" : "\\cos\\alpha = \\sin(90^{\\circ} - \\alpha)",
          `x = 90 - ${a} = ${90 - a}`,
        ],
      };
    },
  };

  GENERATORS["trigonometry"] = {
    id: "trigonometry",
    name: "Razones trigonométricas",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "ratio", label: "Seno, coseno y tangente" },
          { value: "side", label: "Hallar un cateto" },
          { value: "notable", label: "Valores notables" },
          { value: "complement", label: "Ángulos complementarios" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["ratio", "side", "notable", "complement"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 3)] : type]();
    },
  };
})();
