LESSONS["coordinate-plane"] = {
  minutes: 14,
  body: `
## Dónde está un punto

René Descartes tuvo una idea que unió el álgebra con la geometría: **describir la posición de un punto con números**. Para eso se dibujan dos rectas numéricas que se cruzan en ángulo recto:

- El **eje $x$** (horizontal) y el **eje $y$** (vertical).
- Se cortan en el **origen**, el punto $(0, 0)$.

Todo punto del plano se escribe como un **par ordenado** $(x, y)$:

- $x$ es cuánto te mueves **horizontalmente** desde el origen (derecha si es positivo, izquierda si es negativo).
- $y$ es cuánto te mueves **verticalmente** (arriba si es positivo, abajo si es negativo).

{{fig:plane}}

> **El orden importa:** $(3, 5)$ y $(5, 3)$ son puntos distintos. Primero $x$, después $y$: "primero el pasillo, después el piso".

## Los cuatro cuadrantes

Los ejes dividen el plano en **cuatro cuadrantes**, numerados en sentido contrario a las agujas del reloj:

- **I:** $x > 0$, $y > 0$ (arriba a la derecha).
- **II:** $x < 0$, $y > 0$ (arriba a la izquierda).
- **III:** $x < 0$, $y < 0$ (abajo a la izquierda).
- **IV:** $x > 0$, $y < 0$ (abajo a la derecha).

Los puntos que están **sobre** un eje no pertenecen a ningún cuadrante.

## Distancia entre dos puntos

Entre $A(x_1, y_1)$ y $B(x_2, y_2)$, el desplazamiento horizontal es $x_2 - x_1$ y el vertical es $y_2 - y_1$. Esos dos desplazamientos son los **catetos** de un triángulo rectángulo, y la distancia es su **hipotenusa**:

$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

Es el teorema de Pitágoras aplicado al plano. Ejemplo: de $A(1, 2)$ a $B(4, 6)$:

$$d = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$$

No importa el orden de los puntos: al elevar al cuadrado, los signos desaparecen.

## Punto medio

El punto que está justo a mitad de camino entre $A$ y $B$ tiene como coordenadas el **promedio** de las coordenadas:

$$M = \\left( \\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2} \\right)$$

Entre $A(2, 3)$ y $B(8, 7)$: $M = \\left(\\dfrac{2 + 8}{2}, \\dfrac{3 + 7}{2}\\right) = (5, 5)$.

## Pendiente

La **pendiente** $m$ de la recta que pasa por dos puntos mide **cuán inclinada** es: cuánto sube (o baja) por cada unidad que avanza hacia la derecha.

$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{cambio vertical}}{\\text{cambio horizontal}}$$

- $m > 0$: la recta **sube** al ir hacia la derecha.
- $m < 0$: la recta **baja**.
- $m = 0$: es **horizontal**.
- Si $x_2 = x_1$, la recta es **vertical** y su pendiente no está definida (habría que dividir entre cero).

Ejemplo: de $A(1, 2)$ a $B(5, 10)$: $m = \\dfrac{10 - 2}{5 - 1} = \\dfrac{8}{4} = 2$. Por cada unidad hacia la derecha, la recta sube $2$.

Dos rectas son **paralelas** si tienen la **misma pendiente**.

## Cómo escribir tu respuesta

- Distancia: un número. Cuadrante: 1, 2, 3 o 4.
- Punto medio: las dos coordenadas separadas por coma, \`5, 5\`.
- Pendiente: entero o fracción simplificada, como \`-3/4\`.

## Errores comunes

- **Invertir el orden** de las coordenadas $(x, y)$.
- **Restar en órdenes distintos** en el numerador y el denominador de la pendiente. Si empiezas por $y_2 - y_1$, debes hacer $x_2 - x_1$ en el mismo orden.
- **Olvidar la raíz** al final de la distancia.
- **Perder los signos negativos** al restar coordenadas negativas.

## Practica

{{practice}}
`,
};
