// Word problems generator: statement in words, solved with a linear equation.
(() => {
  const NAMES = ["Ana", "Luis", "Marta", "Pedro", "Sofía", "Diego", "Valentina", "Tomás", "Camila", "Andrés"];
  const money = (n) => `$${n.toLocaleString("es-CL")}`;
  const pickName = (not) => {
    let n;
    do { n = NAMES[randInt(0, NAMES.length - 1)]; } while (n === not);
    return n;
  };

  function problem(statement, steps, answer, unit) {
    return {
      kind: "integer",
      label: "Problema",
      statement,
      equation: `\\text{Respuesta (${unit}): } ?`,
      answer,
      steps,
    };
  }

  const BUILDERS = {
    consecutive() {
      if (Math.random() < 0.5) {
        const x = randInt(5, 60), s = 2 * x + 1;
        return problem(
          `La suma de dos números enteros consecutivos es ${s}. ¿Cuál es el menor de los dos?`,
          [
            "\\text{Sea } x \\text{ el número menor. El siguiente es } x + 1",
            `x + (x + 1) = ${s}`,
            `2x + 1 = ${s}`,
            `2x = ${s - 1}`,
            `x = ${x}`,
            `\\text{El menor es } ${x} \\text{ y el otro es } ${x + 1}`,
          ],
          x, "número"
        );
      }
      const x = randInt(4, 50), s = 3 * x + 3;
      return problem(
        `La suma de tres números enteros consecutivos es ${s}. ¿Cuál es el mayor de los tres?`,
        [
          "\\text{Sea } x \\text{ el menor. Los otros son } x + 1 \\text{ y } x + 2",
          `x + (x + 1) + (x + 2) = ${s}`,
          `3x + 3 = ${s}`,
          `3x = ${s - 3}`,
          `x = ${x}`,
          `\\text{Los números son } ${x},\\ ${x + 1},\\ ${x + 2} \\text{; el mayor es } ${x + 2}`,
        ],
        x + 2, "número"
      );
    },

    ages() {
      const a = pickName(), b = pickName(a);
      if (Math.random() < 0.5) {
        const x = randInt(8, 40), m = randInt(2, 20), t = 2 * x + m;
        return problem(
          `${a} tiene ${m} años más que ${b}. Entre los dos suman ${t} años. ¿Cuántos años tiene ${b}?`,
          [
            `\\text{Sea } x \\text{ la edad de ${b}. Entonces ${a} tiene } x + ${m}`,
            `x + (x + ${m}) = ${t}`,
            `2x + ${m} = ${t}`,
            `2x = ${t - m}`,
            `x = ${x}`,
            `\\text{${b} tiene } ${x} \\text{ años}`,
          ],
          x, "años"
        );
      }
      const x = randInt(5, 25), t = 4 * x;
      return problem(
        `${a} tiene el triple de la edad de su hijo. Entre los dos suman ${t} años. ¿Cuántos años tiene el hijo?`,
        [
          `\\text{Sea } x \\text{ la edad del hijo. ${a} tiene } 3x`,
          `x + 3x = ${t}`,
          `4x = ${t}`,
          `x = ${x}`,
          `\\text{El hijo tiene } ${x} \\text{ años}`,
        ],
        x, "años"
      );
    },

    money() {
      if (Math.random() < 0.5) {
        const base = randInt(2, 10) * 100, rate = randInt(2, 9) * 100, k = randInt(3, 25), total = base + rate * k;
        return problem(
          `Un taxi cobra ${money(base)} de tarifa base más ${money(rate)} por cada kilómetro. Un viaje costó ${money(total)}. ¿Cuántos kilómetros se recorrieron?`,
          [
            "\\text{Sea } x \\text{ la cantidad de kilómetros}",
            `${base} + ${rate}x = ${total}`,
            `${rate}x = ${total} - ${base} = ${total - base}`,
            `x = \\frac{${total - base}}{${rate}} = ${k}`,
            `\\text{Se recorrieron } ${k} \\text{ kilómetros}`,
          ],
          k, "km"
        );
      }
      const name = pickName(), k = randInt(3, 9), price = randInt(2, 9) * 100, pencil = randInt(1, 5) * 100;
      const total = k * price + pencil;
      return problem(
        `${name} compró ${k} cuadernos iguales y un lápiz de ${money(pencil)}. Pagó ${money(total)} en total. ¿Cuánto cuesta cada cuaderno?`,
        [
          "\\text{Sea } x \\text{ el precio de un cuaderno}",
          `${k}x + ${pencil} = ${total}`,
          `${k}x = ${total} - ${pencil} = ${total - pencil}`,
          `x = \\frac{${total - pencil}}{${k}} = ${price}`,
          `\\text{Cada cuaderno cuesta } \\$${price}`,
        ],
        price, "pesos"
      );
    },

    geometry() {
      if (Math.random() < 0.6) {
        const x = randInt(3, 30), m = randInt(2, 15), p = 4 * x + 2 * m;
        return problem(
          `El largo de un rectángulo mide ${m} cm más que su ancho y su perímetro es ${p} cm. ¿Cuánto mide el ancho?`,
          [
            `\\text{Sea } x \\text{ el ancho. El largo es } x + ${m}`,
            `\\text{Perímetro} = 2(\\text{ancho} + \\text{largo})`,
            `2(x + (x + ${m})) = ${p}`,
            `2(2x + ${m}) = ${p} \\Rightarrow 4x + ${2 * m} = ${p}`,
            `4x = ${p - 2 * m}`,
            `x = ${x}`,
            `\\text{El ancho mide } ${x} \\text{ cm}`,
          ],
          x, "cm"
        );
      }
      const x = randInt(2, 25), b = randInt(1, Math.min(12, 3 * x - 1)), c = 3 * x - b;
      return problem(
        `Si al triple de un número se le resta ${b}, se obtiene ${c}. ¿Cuál es el número?`,
        [
          "\\text{Sea } x \\text{ el número}",
          `3x - ${b} = ${c}`,
          `3x = ${c} + ${b} = ${c + b}`,
          `x = ${x}`,
          `\\text{El número es } ${x}`,
        ],
        x, "número"
      );
    },
  };

  GENERATORS["word-problems"] = {
    id: "word-problems",
    name: "Problemas con ecuaciones",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "consecutive", label: "Números consecutivos" },
          { value: "ages", label: "Edades" },
          { value: "money", label: "Tarifas y compras" },
          { value: "geometry", label: "Geometría y números" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["consecutive", "ages", "money", "geometry"][randInt(0, 3)] : type;
      return BUILDERS[kind]();
    },
  };
})();
