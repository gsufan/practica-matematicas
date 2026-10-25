// Times tables generator. Each generator returns:
// { label, equation, answer, steps }
const timesTablesGenerator = {
  id: "times-tables",
  name: "Tablas de multiplicar",
  keyboard: "numeric",

  controls: [
    {
      id: "table", type: "select", label: "Tabla",
      choices: [
        { value: "mixed", label: "Mixta (2 a 12)" },
        ...Array.from({ length: 11 }, (_, i) => ({ value: String(i + 2), label: `Tabla del ${i + 2}` })),
      ],
    },
    {
      id: "mode", type: "radio", label: "Modo",
      choices: [{ value: "direct", label: "Directo" }, { value: "inverse", label: "Inverso" }],
    },
  ],

  generate({ table, mode }) {
    const a = table === "mixed" ? randInt(2, 12) : Number(table);
    const b = randInt(2, 12);
    const product = a * b;

    if (mode === "direct") {
      return {
        label: "Multiplica",
        equation: `${a} \\times ${b} = ?`,
        answer: product,
        // Break one factor down: a × b = a × (b − 1) + a
        steps: [
          `${a} \\times ${b} = ${a} \\times (${b - 1} + 1)`,
          `= ${a} \\times ${b - 1} + ${a}`,
          `= ${a * (b - 1)} + ${a}`,
          `= ${product}`,
        ],
      };
    }

    // Inverse mode: find the missing factor
    return {
      label: "Encuentra el número que falta",
      equation: `${a} \\times ? = ${product}`,
      answer: b,
      steps: [
        `${a} \\times ? = ${product}`,
        `? = \\frac{${product}}{${a}}`,
        `? = ${b}`,
        `Comprobación: ${a} \\times ${b} = ${product}`,
      ],
    };
  },
};

GENERATORS[timesTablesGenerator.id] = timesTablesGenerator;
