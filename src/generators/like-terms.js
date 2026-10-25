// Like terms generator: reduce a sum of terms. The answer is a polynomial.
const likeTermsGenerator = {
  id: "like-terms",
  name: "Términos semejantes",
  keyboard: "text",

  controls: [
    {
      id: "type", type: "select", label: "Tipo",
      choices: [
        { value: "all", label: "Todos" },
        { value: "one", label: "Una variable" },
        { value: "two", label: "Dos variables" },
        { value: "square", label: "Con x al cuadrado" },
      ],
    },
  ],

  generate({ type }) {
    const kind = type === "all" ? ["one", "two", "square"][randInt(0, 2)] : type;
    return { kind: "expression", placeholder: "ej. 5x + 4", ...LIKE_BUILDERS[kind]() };
  },
};

const coefficient = () => (Math.random() < 0.5 ? -1 : 1) * randInt(1, 9);

// Terms list [{ key, coef }] shown in a shuffled order, joined with signs
function showTerms(terms) {
  return terms
    .map((t, i) => {
      const abs = Math.abs(t.coef);
      const body = t.key === "" ? `${abs}` : (abs === 1 ? "" : `${abs}`) + keyTex(t.key);
      if (i === 0) return (t.coef < 0 ? "-" : "") + body;
      return ` ${t.coef < 0 ? "-" : "+"} ${body}`;
    })
    .join("");
}

function buildLike(keys) {
  for (let attempt = 0; attempt < 200; attempt++) {
    // two terms per kind, so every group needs reducing
    const terms = keys.flatMap((key) => [{ key, coef: coefficient() }, { key, coef: coefficient() }]);
    const total = {};
    terms.forEach((t) => (total[t.key] = (total[t.key] || 0) + t.coef));
    if (Object.values(total).some((c) => c === 0)) continue; // keep every kind alive
    terms.sort(() => Math.random() - 0.5);
    if (terms[0].key === terms[1].key && keys.length > 1 && Math.random() < 0.5) continue; // mix the order

    const groups = keys.map((key) => {
      const coefs = terms.filter((t) => t.key === key).map((t) => t.coef);
      const sum = coefs.map((c, i) => (i === 0 ? `${c}` : c < 0 ? `- ${-c}` : `+ ${c}`)).join(" ");
      return key === "" ? `(${sum})` : `(${sum})${keyTex(key)}`;
    });
    return {
      label: "Reduce la expresión",
      equation: `${showTerms(terms)} = ?`,
      answer: total,
      steps: [
        showTerms(terms),
        "\\text{Agrupamos los términos semejantes: los que tienen la misma parte literal}",
        `= ${groups.join(" + ")}`,
        "\\text{Sumamos los coeficientes de cada grupo}",
        `= ${polyTex(total)}`,
      ],
    };
  }
  return LIKE_BUILDERS.one();
}

const LIKE_BUILDERS = {
  one() { return buildLike(["x", ""]); },
  two() { return buildLike(Math.random() < 0.5 ? ["x", "y"] : ["x", "y", ""]); },
  square() { return buildLike(["x^2", "x", ""]); },
};

GENERATORS[likeTermsGenerator.id] = likeTermsGenerator;
