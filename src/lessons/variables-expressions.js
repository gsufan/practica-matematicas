LESSONS["variables-expressions"] = {
  minutes: 12,
  body: `
## Por qué usamos letras

En aritmética trabajas con números concretos: $3 + 4 = 7$. El **álgebra** da un paso más: usa **letras** para hablar de números **sin decir cuáles son**. Eso permite escribir reglas que valen siempre, y no solo en un caso.

Por ejemplo, la propiedad conmutativa dice que cambiar el orden de una suma no cambia el resultado. Sin letras habría que repetirlo con cada par de números. Con letras se dice una vez:

$$a + b = b + a$$

Y esa única línea vale para $2 + 5$, para $-7 + 100$ y para cualquier par de números.

## Variables y constantes

- Una **variable** es una letra que representa un número que puede cambiar o que todavía no conocemos. Se usan $x$, $y$, $n$, $t$…
- Una **constante** es un número fijo, como $5$ o $-3$.

La misma letra puede significar cosas distintas en problemas distintos. En un problema, $x$ es "el número de manzanas"; en otro, "la edad de Ana". El significado lo da el contexto.

## Expresiones algebraicas

Una **expresión algebraica** combina números, letras y operaciones. Por ejemplo:

$$3x + 5 \\qquad x^2 - 4x + 3 \\qquad 2a - b$$

No tiene signo igual: no se "resuelve", se **escribe** o se **evalúa**. Una expresión es como una receta: dice qué operaciones hacer con el número que le des.

## Cómo leer la escritura algebraica

Hay convenciones que ahorran símbolos. Memorízalas, porque todo lo que sigue las usa:

- **El producto no lleva signo:** $3x$ significa $3 \\times x$, y $ab$ significa $a \\times b$.
- **El 1 no se escribe:** $1x$ se escribe $x$, y $-1x$ se escribe $-x$.
- **Coeficiente:** el número que multiplica a la letra. En $7x$ el coeficiente es $7$.
- **Término:** cada parte de la expresión separada por sumas o restas. $3x + 5$ tiene dos términos: $3x$ y $5$.
- **Exponente:** $x^2$ significa $x \\times x$ (es el mismo exponente que ya viste en potencias).

> Cuidado: $3x$ **no** es "3 y luego x" como en el número $34$. En álgebra la letra pegada al número indica multiplicación.

## Evaluar una expresión

**Evaluar** es reemplazar cada letra por un número y calcular. El procedimiento tiene tres pasos:

- **1. Sustituye** la letra por su valor, poniendo **paréntesis** si el valor es negativo.
- **2. Respeta el orden de operaciones:** potencias, luego productos, luego sumas y restas.
- **3. Calcula.**

Ejemplo: evaluar $3x + 5$ cuando $x = 4$:

$$3x + 5 = 3 \\times 4 + 5 = 12 + 5 = 17$$

Con un valor negativo, los paréntesis evitan errores de signo. Evaluar $x^2 - 4x + 3$ cuando $x = -2$:

$$(-2)^2 - 4 \\times (-2) + 3 = 4 + 8 + 3 = 15$$

## Dos variables

Si hay dos letras, se sustituye cada una por su valor. Evaluar $2a - b$ con $a = 3$ y $b = -4$:

$$2 \\times 3 - (-4) = 6 + 4 = 10$$

## Por qué importan los paréntesis al sustituir

Compara dos formas de evaluar $x^2$ cuando $x = -3$:

- Con paréntesis: $(-3)^2 = 9$. **Correcto.**
- Sin paréntesis: $-3^2$ se lee como $-(3^2) = -9$. **Incorrecto.**

Por eso, siempre que sustituyas un valor negativo, escríbelo entre paréntesis.

## Una expresión es una máquina

Piensa en $3x + 5$ como una máquina: entra un número, sale otro.

- Entra $x = 0$: sale $5$.
- Entra $x = 1$: sale $8$.
- Entra $x = 2$: sale $11$.

Cada vez que $x$ sube una unidad, el resultado sube $3$. Ese "sube de a 3" es el coeficiente. Esta idea de máquina es la semilla de las **funciones**, que verás más adelante en el curso.

## Errores comunes

- **Olvidar el signo de multiplicación al sustituir:** $3x$ con $x = 4$ es $3 \\times 4 = 12$, no $34$.
- **No usar paréntesis con negativos.**
- **Ignorar el orden de operaciones:** $2 + 3x$ con $x = 4$ es $2 + 12 = 14$, no $5 \\times 4 = 20$.
- **Confundir $x^2$ con $2x$.** Con $x = 5$: $x^2 = 25$ y $2x = 10$.

## Practica

Responde con un número entero.

{{practice}}
`,
};
