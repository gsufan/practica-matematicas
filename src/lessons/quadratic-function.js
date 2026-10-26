LESSONS["quadratic-function"] = {
  minutes: 15,
  body: `
## Cuando el cambio no es constante

Una pelota lanzada al aire sube cada vez más lento, se detiene un instante y cae cada vez más rápido. Ese movimiento, y muchos otros (áreas, puentes colgantes, antenas parabólicas), lo describe una **función cuadrática**:

$$f(x) = ax^2 + bx + c, \\qquad a \\neq 0$$

Su gráfica no es una recta, sino una curva con forma de "U" llamada **parábola**.

{{fig:parabola}}

## Hacia dónde abre

Todo depende del signo de $a$, el coeficiente de $x^2$:

- $a > 0$: la parábola **abre hacia arriba** (forma de "U"); tiene un punto más bajo.
- $a < 0$: **abre hacia abajo** (forma de "∩"); tiene un punto más alto.

Además, cuanto mayor es $|a|$, más "cerrada" (angosta) es la parábola.

## El vértice

El **vértice** es el punto donde la parábola cambia de sentido: el mínimo si abre hacia arriba, o el máximo si abre hacia abajo. La parábola es **simétrica** respecto de la recta vertical que pasa por él (el **eje de simetría**).

Para $f(x) = ax^2 + bx + c$, la coordenada $x$ del vértice es:

$$x_v = \\frac{-b}{2a}$$

y la coordenada $y$ se obtiene evaluando: $y_v = f(x_v)$.

Ejemplo: $f(x) = x^2 - 2x - 3$. Aquí $a = 1$ y $b = -2$.

$$x_v = \\frac{2}{2} = 1 \\qquad y_v = 1 - 2 - 3 = -4$$

El vértice es $(1, -4)$, y como $a > 0$, es un **mínimo**: el valor más bajo de la función es $-4$.

## Forma de vértice

La misma función se puede escribir de otra manera que muestra el vértice directamente:

$$f(x) = a(x - h)^2 + k \\qquad \\text{vértice: } (h, k)$$

Por ejemplo, $f(x) = (x - 1)^2 - 4$ tiene vértice $(1, -4)$. Cuidado con el signo de $h$: dentro del paréntesis aparece **con el signo contrario**. En $(x + 3)^2$ el valor es $h = -3$.

## Corte con el eje $y$

Es el valor de la función cuando $x = 0$: siempre es el **coeficiente $c$**.

$$f(0) = a \\cdot 0 + b \\cdot 0 + c = c$$

## Raíces: cortes con el eje $x$

Las **raíces** (o ceros) son los valores de $x$ donde $f(x) = 0$: las soluciones de la ecuación cuadrática que ya conoces. Una parábola puede cortar el eje $x$ en **dos puntos**, en **uno** (justo en el vértice) o en **ninguno**.

Si la función está en forma factorizada, las raíces se leen de inmediato:

$$f(x) = a(x - p)(x - q) \\quad \\Rightarrow \\quad \\text{raíces } p \\text{ y } q$$

Como la parábola es simétrica, **el vértice queda justo a mitad de camino entre las dos raíces**: $x_v = \\dfrac{p + q}{2}$.

## Máximo y mínimo

El vértice responde a preguntas de **optimización**: ¿cuál es la altura máxima de la pelota?, ¿qué precio da el mayor ingreso? En todos los casos, se busca el vértice y se lee su coordenada $y$.

## Leer una gráfica

Para encontrar el vértice en una gráfica, busca el punto más alto o más bajo de la curva y lee sus dos coordenadas. Los puntos de corte con los ejes se leen igual.

## Cómo escribir tu respuesta

- Vértice: las dos coordenadas separadas por coma, \`1, -4\`.
- Raíces: los dos valores, en cualquier orden, \`-1, 3\`.
- "Hacia dónde abre": 1 si abre hacia arriba y 0 si abre hacia abajo.

## Errores comunes

- **Invertir el signo de $h$** (o no invertirlo) en la forma de vértice.
- **Olvidar el signo negativo** de $-b$ en $x_v = \\frac{-b}{2a}$.
- **Calcular solo $x_v$** y no evaluar para hallar $y_v$.
- **Confundir el corte con el eje $y$** con el vértice.

## Practica

{{practice}}
`,
};
