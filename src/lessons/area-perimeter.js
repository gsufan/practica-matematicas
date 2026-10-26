LESSONS["area-perimeter"] = {
  minutes: 14,
  body: `
## Dos formas de medir una figura

Para una figura plana hay dos preguntas distintas:

- **¿Cuánto mide su borde?** Eso es el **perímetro**. Es una longitud, y se mide en cm, m, km.
- **¿Cuánto espacio ocupa?** Eso es el **área**. Es una superficie, y se mide en cm², m², km².

Piensa en un terreno: el perímetro es el largo del cerco que lo rodea; el área es la cantidad de pasto que cubre. Un cerco largo puede encerrar poco terreno, y viceversa.

## Perímetro: sumar los lados

El perímetro es la **suma de las longitudes de todos los lados**. Para un rectángulo de base $b$ y altura $h$, como hay dos de cada uno:

$$P = 2(b + h)$$

Para un cuadrado de lado $a$: $P = 4a$.

## Qué significa "metros cuadrados"

Un metro cuadrado (1 m²) es el área de un cuadrado de 1 m por 1 m. El área de una figura dice **cuántos de esos cuadraditos caben dentro**. Por eso el área se mide en unidades **al cuadrado**: al multiplicar largo por ancho, multiplicas también las unidades.

> Un error típico: pensar que 1 m² son 100 cm². En realidad, 1 m = 100 cm, así que 1 m² = 100 × 100 = **10 000 cm²**.

## Rectángulo y cuadrado

$$A_{\\text{rectángulo}} = b \\times h \\qquad A_{\\text{cuadrado}} = a^2$$

Un rectángulo de $5 \\times 3$ se llena con 5 columnas de 3 cuadraditos: son $15$.

{{fig:area-shapes}}

## Triángulo

Cualquier triángulo es **la mitad de un paralelogramo** (si lo copias y lo giras, forman uno):

$$A_{\\text{triángulo}} = \\frac{b \\times h}{2}$$

La **altura $h$** es la distancia **perpendicular** desde la base hasta el vértice opuesto, no el lado inclinado.

## Paralelogramo

Un paralelogramo se puede recortar y reacomodar en un rectángulo con la misma base y la misma altura:

$$A_{\\text{paralelogramo}} = b \\times h$$

De nuevo, $h$ es la altura perpendicular. El lado inclinado **no** se usa para el área (sí para el perímetro).

## Trapecio

Un trapecio tiene dos lados paralelos: la base mayor $B$ y la base menor $b$. Su área es el **promedio de las bases por la altura**:

$$A_{\\text{trapecio}} = \\frac{(B + b) \\times h}{2}$$

## Rombo

Un rombo tiene cuatro lados iguales y sus diagonales se cruzan en ángulo recto. Con las diagonales $D$ y $d$:

$$A_{\\text{rombo}} = \\frac{D \\times d}{2}$$

## Figuras compuestas

Muchas figuras no tienen fórmula propia, pero se pueden **descomponer** en figuras conocidas. Hay dos estrategias:

- **Sumar:** dividir la figura en partes y sumar sus áreas.
- **Restar:** completar la figura a un rectángulo grande y restar lo que sobra.

Para una L, se puede calcular el rectángulo completo y restar el rincón que falta. Ambas estrategias dan el mismo resultado, y vale la pena hacer las dos para comprobar.

## Unidades

Antes de calcular, las medidas deben estar en la **misma unidad**. Si un lado está en metros y otro en centímetros, conviértelos primero. El resultado del área queda en unidades al cuadrado.

## Cómo escribir tu respuesta

Escribe solo el número. Los decimales pueden llevar coma o punto: \`12,5\`.

## Errores comunes

- **Confundir perímetro con área.** Pregúntate: ¿mido el borde o la superficie?
- **Olvidar el $\\div 2$** en el triángulo, el trapecio y el rombo.
- **Usar el lado inclinado** en vez de la altura perpendicular.
- **Mezclar unidades** (m con cm).

## Practica

{{practice}}
`,
};
