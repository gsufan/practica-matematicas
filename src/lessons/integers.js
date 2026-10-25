LESSONS["integers"] = {
  minutes: 12,
  body: `
## Por qué existen los negativos

Con los números naturales ($1, 2, 3, \\dots$) no se puede responder a "tengo 3 manzanas y debo 5: ¿cuántas me quedan?". La respuesta no es "ninguna": es una **deuda** de 2. Los números negativos sirven para representar lo que está "al otro lado del cero": deudas, temperaturas bajo cero, pisos de un subterráneo, o una altura bajo el nivel del mar.

El conjunto formado por los naturales, el cero y los negativos se llama **números enteros**:

$$\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots$$

## La recta numérica

Los enteros se ordenan sobre una recta. El cero está en el centro, los positivos a la derecha y los negativos a la izquierda. **Cuanto más a la derecha, mayor es el número.** Por eso:

$$-5 < -2 < 0 < 3$$

Un detalle que confunde al principio: $-5$ es **menor** que $-2$, aunque "5 sea más grande que 2". Piensa en deudas: deber 5 es peor que deber 2.

## Valor absoluto y opuesto

- El **valor absoluto** de un número es su distancia al cero, sin importar el lado. Se escribe $|{-5}| = 5$ y también $|5| = 5$.
- El **opuesto** de un número es el que está a la misma distancia del cero, pero al otro lado. El opuesto de $4$ es $-4$, y el opuesto de $-4$ es $4$.

Sumar un número con su opuesto siempre da cero:

$$7 + (-7) = 0$$

> Estas dos ideas, distancia al cero y opuesto, explican todas las reglas que siguen. No hace falta memorizarlas a ciegas.

## Sumar enteros

Sumar es moverse en la recta: con un número positivo avanzas a la derecha, con uno negativo retrocedes a la izquierda. Esto da dos casos:

- **Mismo signo:** se suman los valores absolutos y se conserva el signo. $(-7) + (-5) = -(7 + 5) = -12$.
- **Signos distintos:** se resta el valor absoluto menor al mayor, y el resultado lleva el signo del número con mayor valor absoluto. En $(-9) + 4$: $9 - 4 = 5$, y gana el 9, que era negativo, así que el resultado es $-5$.

## Restar enteros

Restar es **sumar el opuesto**:

$$a - b = a + (-b)$$

Por ejemplo, $5 - 8 = 5 + (-8) = -3$. Y si lo que se resta ya es negativo, el opuesto es positivo:

$$5 - (-3) = 5 + 3 = 8$$

Restar una deuda equivale a ganar dinero: si te quitan una deuda de 3, tienes 3 más. Esa es la razón de que "menos con menos" dé "más" en una resta.

## Multiplicar y dividir enteros

Primero se operan los valores absolutos y después se decide el signo con esta regla:

- **Signos iguales:** el resultado es positivo. $(-4) \\times (-3) = 12$.
- **Signos distintos:** el resultado es negativo. $(-4) \\times 3 = -12$.

La división sigue exactamente la misma regla: $(-12) \\div (-3) = 4$ y $(-12) \\div 3 = -4$.

## Por qué negativo por negativo da positivo

No es un capricho: es lo único que mantiene el orden en las tablas. Mira esta lista, donde el primer factor baja de a uno y el resultado cambia siempre en la misma cantidad:

- $3 \\times (-2) = -6$
- $2 \\times (-2) = -4$
- $1 \\times (-2) = -2$
- $0 \\times (-2) = 0$

Cada vez que el primer factor baja una unidad, el resultado **sube 2**. Si el patrón continúa:

- $(-1) \\times (-2) = 2$
- $(-2) \\times (-2) = 4$

Para que la aritmética siga siendo coherente, un negativo por un negativo tiene que ser positivo.

## Errores comunes

- **Confundir el signo de la operación con el del número.** En $5 - 3$ el "−" es una resta; en $5 + (-3)$ el "−" pertenece al $3$. Las dos expresiones valen lo mismo.
- **Olvidar los paréntesis** al escribir un negativo después de una operación. Se escribe $4 \\times (-2)$ y no $4 \\times -2$.
- **Aplicar "menos por menos es más" a una suma.** Esa regla es del producto y la división; $(-3) + (-4)$ es $-7$.
- **Dividir entre cero.** Nunca se puede; $n \\div 0$ no tiene sentido.

## Practica

{{practice}}
`,
};
