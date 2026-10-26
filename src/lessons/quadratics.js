LESSONS["quadratics"] = {
  minutes: 17,
  body: `
## Cuando aparece $x^2$

Una **ecuación cuadrática** (o de segundo grado) es una ecuación en la que la incógnita aparece al cuadrado, y no más que eso. Su forma general es:

$$ax^2 + bx + c = 0, \\qquad a \\neq 0$$

Si $a$ fuera $0$ quedaría $bx + c = 0$, una ecuación lineal. Por eso $a$ no puede ser cero.

Las cuadráticas aparecen al estudiar áreas, trayectorias de objetos lanzados, optimización de costos y mucho más. A diferencia de las lineales, **pueden tener dos soluciones**.

## Por qué dos soluciones

La ecuación $x^2 = 9$ la cumplen $x = 3$ y también $x = -3$, porque $(-3)^2 = 9$. Cada cuadrática tiene hasta dos soluciones reales, llamadas **raíces**. Pueden ser dos distintas, una repetida, o ninguna real.

## Método 1: raíz cuadrada

Cuando la ecuación es de la forma $x^2 = k$ (con $k \\geq 0$), se saca la raíz **en ambos lados** y se toman las dos posibilidades:

$$x^2 = 25 \\quad \\Rightarrow \\quad x = \\pm 5$$

Si hay un binomio al cuadrado, se hace lo mismo y luego se despeja:

$$(x + 3)^2 = 16 \\quad \\Rightarrow \\quad x + 3 = \\pm 4 \\quad \\Rightarrow \\quad x = -3 \\pm 4$$

Las soluciones son $x = 1$ y $x = -7$.

## Método 2: factorización

Es el más rápido cuando funciona. Se apoya en la **propiedad del producto cero**: si $A \\cdot B = 0$, entonces $A = 0$ o $B = 0$.

$$x^2 - 5x + 6 = 0$$
$$(x - 2)(x - 3) = 0$$
$$x - 2 = 0 \\quad \\text{o} \\quad x - 3 = 0$$
$$x = 2 \\quad \\text{o} \\quad x = 3$$

> Importante: la ecuación debe estar igualada a **cero** antes de factorizar. Si tienes $x^2 = 5x - 6$, primero pásalo todo a un lado.

## Método 3: la fórmula general

Funciona **siempre**. Para $ax^2 + bx + c = 0$:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

El símbolo $\\pm$ da las dos soluciones: una con $+$ y otra con $-$. Ejemplo con $2x^2 - 4x - 6 = 0$ ($a = 2$, $b = -4$, $c = -6$):

$$x = \\frac{4 \\pm \\sqrt{16 + 48}}{4} = \\frac{4 \\pm 8}{4}$$

De ahí $x = 3$ y $x = -1$.

Un error clásico es con los signos: $-b$ cuando $b = -4$ es $+4$. Escribe los valores entre paréntesis al sustituir.

## El discriminante

La expresión dentro de la raíz tiene nombre propio:

$$\\Delta = b^2 - 4ac$$

Con solo calcularla sabes cuántas soluciones reales hay, sin resolver nada:

- $\\Delta > 0$: **dos** soluciones reales distintas.
- $\\Delta = 0$: **una** solución real (doble).
- $\\Delta < 0$: **ninguna** solución real, porque no existe la raíz cuadrada de un negativo en los reales.

Ejemplo: $x^2 + 2x + 5 = 0$ tiene $\\Delta = 4 - 20 = -16 < 0$, así que no tiene soluciones reales.

## Cuál método elegir

- ¿Es de la forma $x^2 = k$ o $(x + a)^2 = k$? Usa **raíz cuadrada**.
- ¿El trinomio se factoriza fácilmente? Usa **factorización**.
- ¿Los números son feos o no ves la factorización? Usa la **fórmula general**.

## Comprobar las soluciones

Sustituye cada raíz en la ecuación original. Con $x = 3$ en $x^2 - 5x + 6$: $9 - 15 + 6 = 0$ ✓.

## Cómo escribir tus respuestas

Cuando pidan las soluciones, escríbelas separadas por coma, en cualquier orden: \`2, 3\`. Si hay una solución doble, repítela: \`4, 4\`. En las preguntas del discriminante o del número de soluciones, escribe un solo número.

## Errores comunes

- **Olvidar la solución negativa** al sacar raíz cuadrada: $x^2 = 25$ tiene dos soluciones, $5$ y $-5$.
- **Factorizar sin igualar a cero.**
- **Errores de signo** en $-b$ o en $b^2$ (que siempre es positivo, aunque $b$ sea negativo).
- **Dividir solo una parte** entre $2a$ en la fórmula: el denominador divide **todo** el numerador.

## Practica

{{practice}}
`,
};
