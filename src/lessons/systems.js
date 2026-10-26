LESSONS["systems"] = {
  minutes: 16,
  body: `
## Dos incógnitas, dos ecuaciones

Una ecuación con dos incógnitas, como $x + y = 7$, tiene infinitas soluciones: $(1, 6)$, $(2, 5)$, $(3, 4)$… Si agregamos una **segunda** condición, el panorama cambia:

$$\\begin{cases} x + y = 7 \\\\ x - y = 1 \\end{cases}$$

A esto se le llama **sistema de ecuaciones**. Su solución es el par $(x, y)$ que hace verdaderas **las dos ecuaciones a la vez**. Aquí es $(4, 3)$, porque $4 + 3 = 7$ y $4 - 3 = 1$.

## La interpretación geométrica

Cada ecuación lineal con dos incógnitas es una **recta** en el plano. Resolver el sistema es encontrar el punto donde **se cruzan**. Hay tres casos posibles:

- **Las rectas se cruzan en un punto:** una solución. Es el caso normal.
- **Las rectas son paralelas:** no hay solución.
- **Las rectas son la misma:** infinitas soluciones.

En esta práctica trabajamos siempre con el primer caso.

## Método 1: sustitución

La idea: **despejar** una incógnita en una ecuación y **sustituirla** en la otra. Así queda una sola ecuación con una sola incógnita, que ya sabes resolver.

$$\\begin{cases} y = 2x + 1 \\\\ 3x + y = 11 \\end{cases}$$

- **1.** La primera ya tiene $y$ despejada. La sustituimos en la segunda: $3x + (2x + 1) = 11$.
- **2.** Resolvemos: $5x + 1 = 11$, entonces $5x = 10$, así que $x = 2$.
- **3.** Volvemos a la primera: $y = 2(2) + 1 = 5$.

La solución es $(2, 5)$.

> Usa sustitución cuando alguna letra ya está sola o es fácil de dejar sola, es decir, cuando tiene coeficiente $1$ o $-1$.

## Método 2: eliminación

La idea: **sumar las dos ecuaciones** de modo que una incógnita **desaparezca**. Funciona porque sumar lo mismo a ambos lados de una igualdad la mantiene verdadera.

$$\\begin{cases} 2x + 3y = 12 \\\\ 4x - 3y = 6 \\end{cases}$$

Los coeficientes de $y$ son $3$ y $-3$: opuestos. Al sumar, la $y$ se elimina:

$$6x = 18 \\quad \\Rightarrow \\quad x = 3$$

Y sustituyendo en la primera: $2(3) + 3y = 12$, entonces $3y = 6$ y $y = 2$. Solución: $(3, 2)$.

## Eliminación cuando los coeficientes no son opuestos

Si no hay coeficientes opuestos, se **multiplica** una (o las dos) ecuaciones para fabricarlos:

$$\\begin{cases} x + 2y = 8 \\\\ 3x - 4y = 4 \\end{cases}$$

Multiplicamos la primera por $2$ para que la $y$ quede con coeficiente $4$:

$$2x + 4y = 16$$

Sumamos con la segunda: $5x = 20$, entonces $x = 4$, y de la primera $4 + 2y = 8$, así que $y = 2$.

Multiplicar una ecuación completa por un número no cambia su solución: es la regla de la balanza aplicada a **toda** la ecuación.

## Comprobar siempre

Sustituye el par en **ambas** ecuaciones originales. Con $(4, 2)$:

- $4 + 2(2) = 8$ ✓
- $3(4) - 4(2) = 12 - 8 = 4$ ✓

Si falla una, hay un error. Comprobar en una sola no es suficiente.

## Cómo escribir tu respuesta

Escribe los dos valores separados por coma, **primero $x$ y luego $y$**: \`3, 2\`. También se acepta \`(3, 2)\` o \`x=3, y=2\`.

## Errores comunes

- **Calcular solo una incógnita** y olvidar la otra.
- **Multiplicar solo un término** al fabricar coeficientes opuestos: hay que multiplicar **toda** la ecuación, incluido el lado derecho.
- **Errores de signo** al sumar ecuaciones con términos negativos.
- **No comprobar** en las dos ecuaciones.

## Practica

{{practice}}
`,
};
