// Number sets generator: "how many of these numbers belong to set X?"
// Each item has a smallest set: N, Z, Q (not integer) or I (irrational).
const numberSetsGenerator = {
  id: "number-sets",
  name: "Los números y sus conjuntos",
  keyboard: "numeric",

  controls: [
    {
      id: "set", type: "select", label: "Conjunto",
      choices: [
        { value: "N", label: "Naturales" },
        { value: "Z", label: "Enteros" },
        { value: "Q", label: "Racionales" },
        { value: "I", label: "Irracionales" },
      ],
    },
  ],

  generate({ set }) {
    const items = [];
    const used = new Set();
    const add = (item) => {
      if (used.has(item.tex)) return false;
      used.add(item.tex);
      items.push(item);
      return true;
    };

    // One member of the asked set first, so the answer is never zero
    const target = { N: "N", Z: "Z", Q: "Q", I: "I" }[set];
    const pool = ["N", "Z", "Q", "I"];
    while (!add(makeItem(target)));
    while (items.length < 6) add(makeItem(pool[randInt(0, 3)]));
    items.sort(() => Math.random() - 0.5);

    const texts = items.map((it) => it.tex);
    const count = items.filter((it) => belongs(it.kind, set)).length;
    return {
      label: `¿Cuántos de estos números son ${SET_NAME[set]}?`,
      equation: `\\begin{array}{c} \\{ ${texts.slice(0, 3).join(",\\ ")}, \\\\ ${texts.slice(3).join(",\\ ")}\\} \\end{array}`,
      answer: count,
      steps: [
        ...items.map((it) => `${it.tex}${it.note || ""} \\;\\Rightarrow\\; \\text{${KIND_TEXT[it.kind]}}`),
        `\\text{Cuentan como ${SET_NAME[set]}: } ${count}`,
      ],
    };
  },
};

const SET_NAME = { N: "naturales", Z: "enteros", Q: "racionales", I: "irracionales" };
const KIND_TEXT = {
  N: "natural (también entero y racional)",
  Z: "entero negativo o cero (también racional)",
  Q: "racional, no entero",
  I: "irracional",
};

// N ⊂ Z ⊂ Q; irrationals are apart
function belongs(kind, set) {
  if (set === "I") return kind === "I";
  if (set === "Q") return kind !== "I";
  if (set === "Z") return kind === "N" || kind === "Z";
  return kind === "N";
}

function makeItem(kind) {
  const pick = (list) => list[randInt(0, list.length - 1)];
  if (kind === "N") {
    return pick([
      () => ({ kind, tex: `${randInt(1, 60)}` }),
      () => { const k = randInt(2, 9); return { kind, tex: `\\sqrt{${k * k}}`, note: ` = ${k}` }; },
      () => { const d = randInt(2, 6), q = randInt(2, 9); return { kind, tex: `\\frac{${d * q}}{${d}}`, note: ` = ${q}` }; },
    ])();
  }
  if (kind === "Z") {
    return pick([
      () => ({ kind, tex: `-${randInt(1, 40)}` }),
      () => { const d = randInt(2, 6), q = randInt(2, 9); return { kind, tex: `\\frac{-${d * q}}{${d}}`, note: ` = -${q}` }; },
      () => ({ kind, tex: "0" }),
    ])();
  }
  if (kind === "Q") {
    return pick([
      () => { const b = pick([2, 3, 4, 5, 7, 8, 9]); return { kind, tex: `\\frac{${randInt(1, b - 1)}}{${b}}` }; },
      () => ({ kind, tex: `${randInt(0, 9)}{,}${randInt(1, 9)}` }),
      () => ({ kind, tex: `-${randInt(0, 9)}{,}${randInt(1, 9)}` }),
      () => ({ kind, tex: `0{,}\\overline{${randInt(1, 8)}}` }),
    ])();
  }
  return pick([
    () => { const n = pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13]); return { kind, tex: `\\sqrt{${n}}` }; },
    () => ({ kind, tex: "\\pi" }),
    () => ({ kind, tex: "e" }),
  ])();
}

GENERATORS[numberSetsGenerator.id] = numberSetsGenerator;
