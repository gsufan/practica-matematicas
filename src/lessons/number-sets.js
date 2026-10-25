LESSONS["number-sets"] = {
  minutes: 14,
  body: `
## Qué es un número

Un **número** es una idea: una cantidad, una posición en un orden o una medida. Lo que escribimos en el papel ("5", "V", "cinco", "five") es solo un **numeral**, es decir, un símbolo que representa esa idea. Distintas culturas usaron distintos símbolos para la misma cantidad.

Los números se usan para tres cosas principales:

- **Contar:** cuántas manzanas hay.
- **Ordenar:** cuál es el primero, el segundo, el tercero.
- **Medir:** cuánto pesa algo, cuánto mide, cuánto cuesta.

Cada tipo de número que conocerás nació porque el anterior no alcanzaba para resolver un problema nuevo. Esa historia es la mejor forma de entender los "reinos" de números.

## Cómo escribimos los números: el sistema decimal

Usamos diez dígitos ($0, 1, 2, \\dots, 9$) y el **valor posicional**: la posición de cada dígito decide cuánto vale. Por eso 345 no es "3 más 4 más 5":

$$345 = 3 \\times 100 + 4 \\times 10 + 5 \\times 1 = 3 \\times 10^2 + 4 \\times 10^1 + 5 \\times 10^0$$

Cada posición vale diez veces la de su derecha. El **cero** es clave en este sistema: marca una posición vacía y permite distinguir 305 de 35. Hacia la derecha de la coma decimal las posiciones siguen bajando: décimas, centésimas, milésimas. En español la coma separa la parte entera de la decimal.

## Naturales: contar

Los **números naturales**, $\\mathbb{N}$, son los que usamos para contar:

$$1, 2, 3, 4, 5, \\dots$$

Con ellos se puede sumar y multiplicar sin salir del conjunto: la suma o el producto de dos naturales siempre es natural. Pero restar no siempre funciona: ¿cuánto es $3 - 5$?

> Según el autor o el país, el cero se incluye o no entre los naturales. En este curso los naturales empiezan en 1 y trataremos el 0 por separado, como un entero.

## Enteros: deudas y lo que está bajo cero

Para que cualquier resta tenga respuesta se agregan el cero y los negativos. Se obtienen los **números enteros**, $\\mathbb{Z}$:

$$\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots$$

Ahora sumar, restar y multiplicar siempre dan un entero. Pero dividir no: $7 \\div 2$ no es entero.

## Racionales: repartir

Para repartir 7 en 2 partes aparecen las **fracciones**. Un número **racional**, $\\mathbb{Q}$, es cualquiera que se pueda escribir como una fracción de dos enteros (con denominador distinto de cero):

$$\\frac{a}{b}, \\quad a, b \\in \\mathbb{Z}, \\quad b \\neq 0$$

Son racionales las fracciones ($\\frac{3}{4}$), los decimales que terminan ($0{,}75 = \\frac{75}{100}$) y los decimales que se repiten sin fin ($0{,}\\overline{3} = \\frac{1}{3}$). Todo entero también es racional, porque $5 = \\frac{5}{1}$.

Un decimal de un racional **siempre** termina o se repite en un ciclo. Esa es su huella.

## Irracionales: lo que no cabe en una fracción

Los griegos descubrieron que la diagonal de un cuadrado de lado 1 mide $\\sqrt{2}$, y que ese número **no se puede escribir** como fracción de enteros. Su escritura decimal sigue sin fin y sin repetirse:

$$\\sqrt{2} = 1{,}41421356\\dots$$

Los números así se llaman **irracionales**. Los más famosos son $\\sqrt{2}$, $\\pi$ (la razón entre el perímetro de una circunferencia y su diámetro) y $e$ (que aparecerá con los logaritmos).

> Cuidado: no toda raíz es irracional. $\\sqrt{9} = 3$ y $\\sqrt{16} = 4$ son enteros. Solo es irracional la raíz de un número que no es un cuadrado perfecto, como $\\sqrt{2}$, $\\sqrt{3}$ o $\\sqrt{5}$.

## Reales: toda la recta

Si juntas los racionales y los irracionales obtienes los **números reales**, $\\mathbb{R}$. Son todos los puntos de la recta numérica, sin huecos. Con ellos se puede medir cualquier longitud.

## Complejos: una mirada adelante

Hay ecuaciones, como $x^2 = -1$, sin solución real, porque ningún real elevado al cuadrado da un número negativo. Para resolverlas se inventó la unidad imaginaria $i$, con $i^2 = -1$, y con ella los **números complejos**, $\\mathbb{C}$. No los usaremos en aritmética, pero conviene saber que existen y que completan la jerarquía.

## Cómo encajan entre sí

Cada conjunto contiene al anterior, como muñecas rusas:

$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$$

Los irracionales viven dentro de los reales, fuera de los racionales. Un mismo número pertenece a varios conjuntos a la vez: el $3$ es natural, entero, racional, real y complejo. Para clasificarlo, busca **el conjunto más pequeño** al que pertenece, y los demás los hereda.

- $-4$: es entero (y por tanto racional y real), pero no natural.
- $\\frac{6}{3}$: parece fracción, pero vale $2$, así que es natural.
- $0{,}\\overline{7}$: decimal que se repite, es racional.
- $\\sqrt{7}$: raíz de un no cuadrado perfecto, es irracional.

## Errores comunes

- **Pensar que una fracción nunca es entera.** $\\frac{12}{4} = 3$.
- **Creer que "tiene muchos decimales" significa irracional.** Un decimal con ciclo ($0{,}\\overline{142857}$) es racional. Lo que define a un irracional es que **no** se repite.
- **Pensar que $\\pi$ es $3{,}14$ o $\\frac{22}{7}$.** Son aproximaciones; $\\pi$ no es racional.
- **Creer que toda raíz es irracional.** Depende de si el número es cuadrado perfecto.

## Practica

{{practice}}
`,
};
