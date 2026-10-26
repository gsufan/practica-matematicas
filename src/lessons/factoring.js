LESSONS["factoring"] = {
  minutes: 14,
  body: `
## Deshacer una multiplicación

En el tema de la propiedad distributiva **desarrollaste**: pasaste de un producto a una suma.

$$3(x + 4) = 3x + 12$$

**Factorizar** es el camino de vuelta: pasar de la suma al producto.

$$3x + 12 = 3(x + 4)$$

Cada expresión que se multiplica se llama **factor**. Es la misma idea que factorizar números: $12 = 3 \\times 4$ o $12 = 2 \\times 2 \\times 3$. Factorizar es **descomponer** una expresión en sus piezas multiplicativas.

## Para qué sirve

Un producto igualado a cero es **muy fácil** de resolver: si $A \\cdot B = 0$, entonces $A = 0$ o $B = 0$. Una suma igualada a cero no tiene esa propiedad. Por eso factorizar es la herramienta central para resolver ecuaciones cuadráticas, y también para simplificar fracciones algebraicas.

## Método 1: factor común

Se busca lo que se **repite** en todos los términos: el **mayor factor común**. Tiene dos partes:

- **Los números:** el mayor divisor común de los coeficientes.
- **Las letras:** cada letra que esté en **todos** los términos, con su **menor** exponente.

Ejemplo: $12x^2 + 18x$.

- Coeficientes $12$ y $18$: el mayor divisor común es $6$.
- La letra $x$ está en ambos; el menor exponente es $1$.
- Factor común: $6x$.

Para saber qué queda dentro del paréntesis, **divide** cada término entre el factor común:

$$12x^2 + 18x = 6x(2x + 3)$$

Comprueba distribuyendo: $6x \\cdot 2x = 12x^2$ y $6x \\cdot 3 = 18x$ ✓.

> Si solo uno de los términos tiene $x$, la $x$ **no** entra en el factor común: en $6x + 9$ el factor común es $3$, y queda $3(2x + 3)$.

## Método 2: trinomios $x^2 + bx + c$

Muchos trinomios provienen de multiplicar dos binomios:

$$(x + p)(x + q) = x^2 + (p + q)x + pq$$

Mira el resultado: el coeficiente del medio es $p + q$ y el término independiente es $p \\cdot q$. Para factorizar, se hace la pregunta al revés:

> **¿Qué dos números multiplicados dan $c$ y sumados dan $b$?**

Ejemplo: $x^2 + 7x + 10$. Buscamos dos números que multipliquen $10$ y sumen $7$. Los pares de factores de $10$ son $(1, 10)$ y $(2, 5)$. Solo $2 + 5 = 7$:

$$x^2 + 7x + 10 = (x + 2)(x + 5)$$

## Los signos importan

Las pistas con los signos de $b$ y $c$:

- Si $c > 0$, los dos números tienen **el mismo signo** (el de $b$).
- Si $c < 0$, los dos números tienen **signos distintos**, y el de mayor valor absoluto es el signo de $b$.

Ejemplos:

$$x^2 - 5x + 6 = (x - 2)(x - 3) \\qquad x^2 + x - 12 = (x - 3)(x + 4)$$

En el primero, $(-2)(-3) = 6$ y $-2 - 3 = -5$. En el segundo, $(-3)(4) = -12$ y $-3 + 4 = 1$.

## Método 3: diferencia de cuadrados

Un producto notable que ya conoces, leído al revés:

$$a^2 - b^2 = (a - b)(a + b)$$

Se reconoce porque son **dos cuadrados perfectos restados**:

$$x^2 - 49 = (x - 7)(x + 7) \\qquad 9x^2 - 25 = (3x - 5)(3x + 5)$$

> **Una suma** de cuadrados, como $x^2 + 49$, **no** se puede factorizar en los números reales.

## Estrategia general

- **1. Siempre busca primero el factor común.** Simplifica todo lo que sigue.
- **2. Cuenta los términos:** con dos términos, mira si es diferencia de cuadrados; con tres, prueba el método del trinomio.
- **3. Comprueba** distribuyendo el resultado: debe volver a la expresión original.
- **4. Revisa** que no se pueda factorizar más.

## Cómo escribir tus respuestas

- Para el factor común, escribe la expresión: \`3x\` o \`3\`.
- Para "qué queda dentro", escribe el polinomio: \`2x + 3\`.
- Para un trinomio, escribe los dos números separados por coma, en cualquier orden: \`2, 5\`.
- Para la diferencia de cuadrados, escribe el número: \`7\`.

## Errores comunes

- **Sacar un factor común incompleto:** $6x + 12 = 3(2x + 4)$ no está terminado, porque dentro aún se puede sacar un $2$. El factor común mayor es $6$.
- **Perder el signo** de uno de los números del trinomio.
- **Factorizar una suma de cuadrados.**
- **No comprobar** el resultado multiplicando.

## Practica

{{practice}}
`,
};
