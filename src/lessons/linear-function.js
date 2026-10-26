LESSONS["linear-function"] = {
  minutes: 14,
  body: `
## Cambiar siempre al mismo ritmo

Una **función lineal** es la que crece (o decrece) **a un ritmo constante**. Si pagas un taxi con una tarifa fija más un valor por kilómetro, cada kilómetro adicional suma siempre la misma cantidad. Su fórmula tiene una forma muy simple:

$$f(x) = mx + b$$

con dos números, $m$ y $b$, que lo determinan todo. Su gráfica es una **línea recta**, y de ahí viene el nombre.

{{fig:linear-graph}}

## La pendiente $m$

La **pendiente** dice **cuánto cambia $y$ cuando $x$ aumenta en 1**. Es el ritmo de cambio:

$$m = \\frac{\\text{cambio en } y}{\\text{cambio en } x} = \\frac{y_2 - y_1}{x_2 - x_1}$$

- $m > 0$: la recta **sube** al ir hacia la derecha (función creciente).
- $m < 0$: la recta **baja** (función decreciente).
- $m = 0$: la recta es **horizontal**: la función es constante.

Cuanto mayor es $|m|$, más empinada es la recta. Con $m = 2$, por cada paso a la derecha la recta sube $2$. Con $m = \\frac{1}{2}$, sube $1$ por cada $2$ que avanza: es más suave.

## La ordenada en el origen $b$

El número $b$ es el valor de la función cuando $x = 0$: el punto $(0, b)$ donde la recta **cruza el eje $y$**. Es el **valor inicial**: de dónde parte el fenómeno.

En $f(x) = 2x - 1$, la pendiente es $2$ y la recta cruza el eje $y$ en $-1$.

## Leer los parámetros

En la fórmula $y = mx + b$, solo hay que identificar los números:

- $y = -3x + 5$: pendiente $-3$ y ordenada $5$.
- $y = 4x - 7$: pendiente $4$ y ordenada $-7$.
- $y = x$: pendiente $1$ y ordenada $0$.

## Leer una recta en una gráfica

- **Ordenada:** donde la recta corta el eje vertical.
- **Pendiente:** elige dos puntos con coordenadas claras y calcula $\\dfrac{\\Delta y}{\\Delta x}$. Puedes contar "subo $2$ por cada $1$ que avanzo".

## El corte con el eje $x$ (la raíz o cero)

Es el valor de $x$ donde la función vale $0$. Para encontrarlo, resuelve $mx + b = 0$:

$$mx + b = 0 \\quad \\Rightarrow \\quad x = -\\frac{b}{m}$$

Para $f(x) = 2x - 6$: $2x = 6$, entonces $x = 3$. La recta cruza el eje horizontal en $(3, 0)$.

## Como modelo

Las funciones lineales describen situaciones reales con un **valor inicial** y un **cambio constante**:

- Un estanque con $50$ litros que pierde $3$ por minuto: $V(t) = 50 - 3t$. La pendiente $-3$ es la pérdida por minuto; la ordenada $50$, el volumen inicial.
- Un taxi: $C(x) = 800 + 300x$. La ordenada es la tarifa base; la pendiente, el valor por kilómetro.

Para usar el modelo, evalúas: $V(10) = 50 - 30 = 20$ litros.

## Una propiedad útil

Si dos puntos de una función lineal tienen la misma diferencia en $x$, tienen la misma diferencia en $y$. Esa constancia es lo que la hace lineal, y es lo que la distingue de las funciones cuadráticas o exponenciales, donde el cambio varía.

## Errores comunes

- **Invertir la pendiente:** es $\\dfrac{\\Delta y}{\\Delta x}$, no $\\dfrac{\\Delta x}{\\Delta y}$.
- **Restar en órdenes distintos** en el numerador y el denominador.
- **Confundir la pendiente con la ordenada.**
- **Olvidar el signo** de $b$ al leerla en la fórmula.

## Practica

Para la pendiente o el corte con el eje $x$ puedes responder con fracciones simplificadas, como \`3/2\`.

{{practice}}
`,
};
