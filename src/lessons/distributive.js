LESSONS["distributive"] = {
  minutes: 12,
  body: `
## Un problema de áreas

Imagina un rectángulo de alto $3$ y de ancho $x + 4$. ¿Cuál es su área? Hay dos maneras de calcularla:

- **Entero:** alto por ancho total, $3(x + 4)$.
- **En dos pedazos:** un rectángulo de $3 \\times x$ y otro de $3 \\times 4$, que suman $3x + 12$.

Como es el mismo rectángulo, el área es la misma:

$$3(x + 4) = 3x + 12$$

Esa es la **propiedad distributiva**: multiplicar una suma es multiplicar cada sumando.

## La regla

$$a(b + c) = ab + ac$$

El número de afuera "se reparte" entre los términos de adentro. Funciona igual con restas, porque restar es sumar un negativo:

$$a(b - c) = ab - ac$$

## Por qué es verdad

Con números lo puedes comprobar: $4 \\times (10 + 2) = 4 \\times 12 = 48$, y también $4 \\times 10 + 4 \\times 2 = 40 + 8 = 48$. Esta propiedad es la que usas, sin notarlo, cuando calculas $7 \\times 8$ como $7 \\times 7 + 7$ en las tablas de multiplicar.

## Distribuir con signos

Aquí hay que cuidar la regla de signos del tema de enteros:

- $3(x + 4) = 3x + 12$
- $3(x - 4) = 3x - 12$
- $-3(x + 4) = -3x - 12$
- $-3(x - 4) = -3x + 12$

Con un factor **negativo**, **todos** los signos de adentro cambian. La razón es que $(-3) \\times (-4) = +12$.

> El error más común: multiplicar solo el primer término. En $5(x + 2)$ el $5$ debe multiplicar al $x$ **y** al $2$. El resultado es $5x + 10$, no $5x + 2$.

## Con dos variables

La idea es idéntica. Cada término de adentro se multiplica por el de afuera:

$$2(3x - 5y) = 6x - 10y$$

## Distribuir y luego reducir

A menudo hay que distribuir varios paréntesis y juntar los términos semejantes del tema anterior:

$$2(x + 3) + 4(x - 1) = 2x + 6 + 4x - 4 = 6x + 2$$

Cuando delante del paréntesis hay un signo menos, se trata como un factor $-1$:

$$5 - (x - 2) = 5 - x + 2 = 7 - x$$

## Producto de binomios

Un **binomio** es una expresión con dos términos, como $x + 3$. Para multiplicar dos binomios, cada término del primero multiplica a **cada uno** del segundo. Es distribuir dos veces:

$$(x + 2)(x + 5) = x \\cdot x + x \\cdot 5 + 2 \\cdot x + 2 \\cdot 5 = x^2 + 5x + 2x + 10 = x^2 + 7x + 10$$

Mira la forma del resultado: el término del medio, $7x$, sale de **sumar** $2 + 5$, y el último, $10$, sale de **multiplicar** $2 \\times 5$. Ese patrón es la clave de la factorización, que verás más adelante.

Con signos negativos se mantiene el procedimiento:

$$(x - 3)(x + 4) = x^2 + 4x - 3x - 12 = x^2 + x - 12$$

## Cuatro productos en una cuadrícula

Para no perder ningún término, dibuja una tabla de 2 por 2. Para $(x + 2)(x + 5)$:

- Fila de $x$: $x \\cdot x = x^2$ y $x \\cdot 5 = 5x$.
- Fila de $2$: $2 \\cdot x = 2x$ y $2 \\cdot 5 = 10$.

Luego sumas todo y reduces. Siempre tendrás $2 \\times 2 = 4$ productos antes de reducir.

## Cómo escribir tu respuesta

Escribe la expresión **desarrollada y reducida**, sin paréntesis. Por ejemplo \`3x + 12\` o \`x^2 + 7x + 10\`. El orden de los términos no importa.

## Errores comunes

- **Multiplicar solo el primer término** del paréntesis.
- **Fallar con los signos** cuando el factor es negativo.
- **Olvidar un producto** en los binomios: son siempre cuatro.
- **Confundir** $(x + 3)^2$ con $x^2 + 9$. En realidad es $(x + 3)(x + 3) = x^2 + 6x + 9$. El término del medio no puede faltar.

## Practica

Escribe el resultado sin paréntesis y reducido, por ejemplo \`6x + 2\`. Para el exponente usa \`^\`.

{{practice}}
`,
};
