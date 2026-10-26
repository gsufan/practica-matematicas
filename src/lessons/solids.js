LESSONS["solids"] = {
  minutes: 15,
  body: `
## Pasar al espacio

Las figuras planas tienen largo y ancho. Los **cuerpos geométricos** tienen además **altura**: ocupan espacio. Con ellos aparecen dos medidas nuevas:

- **Área de la superficie:** cuánto "papel" hace falta para forrar el cuerpo por fuera. Se mide en unidades cuadradas (cm²).
- **Volumen:** cuánto espacio ocupa por dentro, o cuánto cabe en él. Se mide en unidades **cúbicas** (cm³).

{{fig:solids}}

Un cm³ es el volumen de un cubito de $1 \\times 1 \\times 1$ cm. El volumen de un cuerpo es **cuántos cubitos caben** adentro. Y una equivalencia útil: $1\\ \\text{litro} = 1000\\ \\text{cm}^3$.

## Prisma y cubo

Un **prisma** tiene dos bases iguales y paralelas, unidas por caras laterales. Si las bases son rectángulos, es un prisma rectangular (una caja). Su volumen sigue una idea sencilla: **área de la base por altura**.

$$V = \\text{largo} \\times \\text{ancho} \\times \\text{alto}$$

Un cubo es el caso especial con todas las aristas iguales a $a$:

$$V = a^3 \\qquad A = 6a^2$$

El **área total** de una caja se calcula sumando sus seis caras (tres pares de rectángulos iguales):

$$A = 2(lw + lh + wh)$$

## Cilindro

Un cilindro es un "prisma" con base circular. Se aplica la misma regla: **área de la base por altura**.

$$V = \\pi r^2 h$$

Su superficie tiene dos tapas circulares y un rectángulo curvo (la pared) que, si lo desenrollas, mide $2\\pi r$ de largo y $h$ de alto:

$$A = 2\\pi r^2 + 2\\pi r h = 2\\pi r(r + h)$$

## Cono

Un cono ocupa **exactamente un tercio** del cilindro que tiene la misma base y la misma altura:

$$V = \\frac{1}{3}\\pi r^2 h$$

## Esfera

La esfera es el cuerpo que no tiene bordes planos. Arquímedes descubrió sus fórmulas, y pidió que las grabaran en su tumba:

$$V = \\frac{4}{3}\\pi r^3 \\qquad A = 4\\pi r^2$$

La superficie de una esfera es exactamente **cuatro veces el área de un círculo del mismo radio**.

## Pirámide

Igual que el cono respecto del cilindro, una pirámide ocupa **un tercio** del prisma con la misma base y la misma altura:

$$V = \\frac{1}{3} \\times \\text{área de la base} \\times \\text{altura}$$

Para una base cuadrada de lado $a$: $V = \\dfrac{a^2 h}{3}$.

## Resumen de fórmulas de volumen

- Prisma y cilindro: **base × altura**.
- Pirámide y cono: **un tercio** de base × altura.
- Esfera: $\\frac{4}{3}\\pi r^3$.

## Cómo escribir tu respuesta

- Para los cuerpos redondos (con $\\pi$), escribe **solo el número que acompaña a $\\pi$**. Por ejemplo, para $48\\pi$ escribe \`48\`, y para $\\frac{32}{3}\\pi$ escribe \`32/3\`.
- Para cubos, prismas y pirámides, escribe el número (o la fracción simplificada).

## Errores comunes

- **Confundir volumen con área de la superficie**, o sus unidades (cm³ y cm²).
- **Olvidar el $\\frac{1}{3}$** en conos y pirámides.
- **Usar el diámetro** donde va el radio.
- **Elevar al cuadrado el $\\pi$** en vez del radio.

## Practica

{{practice}}
`,
};
