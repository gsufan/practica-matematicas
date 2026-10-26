LESSONS["polynomials"] = {
  minutes: 13,
  body: `
## Qué es un polinomio

Un **polinomio** es una expresión formada por sumas y restas de **términos**, donde cada término es un número multiplicado por una potencia de la variable con exponente **entero y no negativo**:

$$3x^4 - 2x^2 + 5x - 7$$

Tienen nombre según su cantidad de términos: **monomio** (uno: $5x^3$), **binomio** (dos: $x + 3$), **trinomio** (tres: $x^2 - 2x + 1$). Más de tres se llaman simplemente polinomios.

> No son polinomios $\\frac{1}{x}$ ni $\\sqrt{x}$ ni $2^x$: el exponente de la variable debe ser un entero no negativo.

## Partes de un polinomio

- **Coeficiente:** el número que acompaña a cada potencia. En $3x^4$ es $3$.
- **Término independiente:** el que no tiene variable. En el ejemplo, $-7$.
- **Grado:** el **mayor exponente** de la variable. El polinomio de arriba es de grado $4$.
- **Coeficiente principal:** el del término de mayor grado ($3$ en el ejemplo).

Lo habitual es escribirlo **ordenado**, de mayor a menor exponente.

## Sumar polinomios

Se suman los **términos semejantes** (mismo exponente), como ya hiciste con las expresiones:

$$(3x^2 + 2x - 1) + (x^2 - 5x + 4) = (3 + 1)x^2 + (2 - 5)x + (-1 + 4) = 4x^2 - 3x + 3$$

Al sumar, los paréntesis se quitan sin cambiar nada.

## Restar polinomios

Restar es **sumar el opuesto**. El signo menos delante del paréntesis cambia el signo de **todos** los términos de adentro:

$$(3x^2 + 2x - 1) - (x^2 - 5x + 4) = 3x^2 + 2x - 1 - x^2 + 5x - 4 = 2x^2 + 7x - 5$$

> El error más frecuente: cambiar el signo solo del primer término del segundo paréntesis. Cambian **todos**.

## Multiplicar un monomio por un polinomio

Es la propiedad distributiva. Al multiplicar potencias de la misma base, los **coeficientes se multiplican** y los **exponentes se suman**:

$$3x(x^2 - 2x + 4) = 3x \\cdot x^2 - 3x \\cdot 2x + 3x \\cdot 4 = 3x^3 - 6x^2 + 12x$$

La regla $x^a \\cdot x^b = x^{a+b}$ viene del tema de potencias.

## Multiplicar polinomios

Cada término del primero multiplica a **todos** los términos del segundo, y luego se reducen los semejantes:

$$(x + 2)(x^2 - 3x + 1) = x(x^2 - 3x + 1) + 2(x^2 - 3x + 1)$$
$$= x^3 - 3x^2 + x + 2x^2 - 6x + 2 = x^3 - x^2 - 5x + 2$$

Un truco para no perder términos: si multiplicas un polinomio de $m$ términos por uno de $n$ términos, antes de reducir tendrás $m \\times n$ productos.

## El grado de un producto

Al multiplicar, **los grados se suman**: un polinomio de grado $2$ por uno de grado $3$ da uno de grado $5$. Al sumar, el grado del resultado es, como mucho, el mayor de los dos (puede bajar si los términos principales se cancelan).

## Productos notables

Algunos productos aparecen tanto que conviene reconocerlos:

- **Cuadrado de una suma:** $(a + b)^2 = a^2 + 2ab + b^2$
- **Cuadrado de una resta:** $(a - b)^2 = a^2 - 2ab + b^2$
- **Suma por diferencia:** $(a + b)(a - b) = a^2 - b^2$

Se verifican multiplicando. Por ejemplo, $(x + 3)^2 = (x + 3)(x + 3) = x^2 + 6x + 9$.

## Cómo escribir tu respuesta

Escribe el polinomio ordenado, usando \`^\` para el exponente: \`2x^2 - 3x + 1\`. El orden no importa para la validación, pero sí debe estar reducido y sin paréntesis. Para la pregunta del grado, escribe solo un número.

## Errores comunes

- **No cambiar todos los signos** al restar.
- **Sumar exponentes al sumar términos** ($x^2 + x^2 = 2x^2$, no $x^4$), o multiplicarlos al multiplicar ($x^2 \\cdot x^3 = x^5$, no $x^6$).
- **Olvidar productos** al multiplicar polinomios con varios términos.
- **Confundir** $(x + 3)^2$ con $x^2 + 9$.

## Practica

{{practice}}
`,
};
