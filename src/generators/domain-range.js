// Domain and range generator. Answers are inequalities, excluded values or counts.
(() => {
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const nz = (min, max) => {
    let n = 0;
    while (n === 0) n = randInt(min, max);
    return n;
  };
  const OP_TEX = { "<": "<", ">": ">", "<=": "\\leq", ">=": "\\geq" };
  const lin = (a, b) => polyTex({ x: a, "": b });

  const BUILDERS = {
    sqrt() {
      const variant = randInt(0, 2);
      if (variant === 0) {
        const a = nz(-8, 8);
        return {
          kind: "inequality", placeholder: "ej. x >= 3",
          label: "¿Cuál es el dominio de la función? Escribe la condición sobre x",
          equation: `f(x) = \\sqrt{${lin(1, -a)}}`,
          answer: { op: ">=", value: a },
          steps: [
            "\\text{La raíz cuadrada solo existe si lo de adentro es mayor o igual que cero}",
            `${lin(1, -a)} \\geq 0`,
            `x \\geq ${a}`,
          ],
        };
      }
      if (variant === 1) {
        const a = nz(-8, 8);
        return {
          kind: "inequality", placeholder: "ej. x <= 3",
          label: "¿Cuál es el dominio de la función? Escribe la condición sobre x",
          equation: `f(x) = \\sqrt{${a} - x}`,
          answer: { op: "<=", value: a },
          steps: [
            "\\text{Lo de adentro debe ser mayor o igual que cero}",
            `${a} - x \\geq 0 \\Rightarrow ${a} \\geq x`,
            `x \\leq ${a}`,
          ],
        };
      }
      const c = randInt(2, 4), x0 = nz(-5, 6), d = c * x0;
      return {
        kind: "inequality", placeholder: "ej. x >= 2",
        label: "¿Cuál es el dominio de la función? Escribe la condición sobre x",
        equation: `f(x) = \\sqrt{${lin(c, -d)}}`,
        answer: { op: ">=", value: x0 },
        steps: [
          "\\text{Lo de adentro debe ser mayor o igual que cero}",
          `${lin(c, -d)} \\geq 0`,
          `${c}x \\geq ${d}`,
          `x \\geq ${x0}`,
        ],
      };
    },

    denominator() {
      const c = Math.random() < 0.5 ? 1 : randInt(2, 3), x0 = nz(-7, 8), d = c * x0, num = randInt(1, 9);
      return {
        kind: "integer", placeholder: `ej. ${x0}`,
        label: "Hay un único valor de x que no pertenece al dominio. ¿Cuál es?",
        equation: `f(x) = \\frac{${num}}{${lin(c, -d)}}`,
        answer: x0,
        steps: [
          "\\text{No se puede dividir entre cero: el denominador no puede ser } 0",
          `${lin(c, -d)} = 0`,
          c === 1 ? `x = ${x0}` : `${c}x = ${d} \\Rightarrow x = ${x0}`,
          `\\text{El dominio es todos los reales excepto } ${x0}`,
        ],
      };
    },

    range() {
      const a = sign() * randInt(1, 3), h = nz(-5, 5), k = nz(-8, 8);
      const up = a > 0;
      const inner = `(x ${h < 0 ? "+" : "-"} ${Math.abs(h)})^{2}`;
      return {
        kind: "inequality", placeholder: up ? "ej. y >= 2" : "ej. y <= 2",
        label: "¿Cuál es el recorrido de la función? Escribe la condición sobre y",
        equation: `f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}${inner} ${k < 0 ? "-" : "+"} ${Math.abs(k)}`,
        answer: { op: up ? ">=" : "<=", value: k },
        steps: [
          "\\text{Un cuadrado nunca es negativo: } (x - h)^2 \\geq 0",
          up ? `\\text{Con } a > 0 \\text{ la curva abre hacia arriba y su valor más bajo es } ${k}` : `\\text{Con } a < 0 \\text{ la curva abre hacia abajo y su valor más alto es } ${k}`,
          `y ${OP_TEX[up ? ">=" : "<="]} ${k}`,
        ],
      };
    },

    sqrtRange() {
      const k = nz(-8, 8), a = nz(-6, 6);
      return {
        kind: "inequality", placeholder: "ej. y >= 3",
        label: "¿Cuál es el recorrido de la función? Escribe la condición sobre y",
        equation: `f(x) = \\sqrt{${lin(1, -a)}} ${k < 0 ? "-" : "+"} ${Math.abs(k)}`,
        answer: { op: ">=", value: k },
        steps: [
          "\\text{La raíz cuadrada siempre da un valor mayor o igual que } 0",
          `\\sqrt{${lin(1, -a)}} \\geq 0`,
          `\\text{Al sumar } ${k} \\text{: } y \\geq ${k}`,
        ],
      };
    },

    count() {
      const n = randInt(4, 6);
      const xs = Array.from({ length: n }, (_, i) => i + 1);
      const ys = xs.map(() => randInt(1, 5));
      const distinct = new Set(ys).size;
      return {
        kind: "integer", placeholder: `ej. ${distinct}`,
        label: "Esta función está dada por pares ordenados. ¿Cuántos valores distintos tiene su recorrido?",
        equation: `\\{ ${xs.map((x, i) => `(${x},\\ ${ys[i]})`).join(",\\ ")} \\}`,
        answer: distinct,
        steps: [
          "\\text{El recorrido es el conjunto de las salidas } y \\text{ (sin repetir)}",
          `\\text{Salidas: } ${ys.join(",\\ ")}`,
          `\\text{Sin repetir: } ${[...new Set(ys)].sort((p, q) => p - q).join(",\\ ")}`,
          `\\text{Hay } ${distinct} \\text{ valores distintos}`,
        ],
      };
    },
  };

  GENERATORS["domain-range"] = {
    id: "domain-range",
    name: "Dominio y recorrido",
    keyboard: "text",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "sqrt", label: "Dominio con raíz" },
          { value: "denominator", label: "Valor excluido" },
          { value: "range", label: "Recorrido de una parábola" },
          { value: "sqrtRange", label: "Recorrido con raíz" },
          { value: "count", label: "Recorrido de pares" },
        ],
      },
    ],
    generate({ type }) {
      const kinds = ["sqrt", "denominator", "range", "sqrtRange", "count"];
      return BUILDERS[type === "all" ? kinds[randInt(0, 4)] : type]();
    },
  };
})();
