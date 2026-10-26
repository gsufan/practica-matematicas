LESSONS["transformations"] = {
  minutes: 13,
  body: `
## Una familia de gráficas

No hace falta aprender cada gráfica desde cero. Casi todas las funciones que verás son **versiones transformadas** de unas pocas gráficas básicas: la parábola $f(x) = x^2$, la V del valor absoluto $f(x) = |x|$, la recta $f(x) = x$, la raíz $\\sqrt{x}$. Si sabes cómo cambia la gráfica con cada tipo de modificación, puedes dibujar cualquier variante sin calcular punto por punto.

Las transformaciones se dividen en tres grupos: **desplazamientos**, **reflexiones** y **estiramientos**.

## Desplazamientos

Sea $f$ una función y $h$, $k$ números positivos:

- $f(x) + k$: **sube** la gráfica $k$ unidades. $f(x) - k$: la **baja**.
- $f(x - h)$: la **desplaza $h$ a la derecha**. $f(x + h)$: la desplaza a la izquierda.

{{fig:shift-graph}}

> Lo que desconcierta al principio: **el signo dentro del paréntesis parece "al revés"**. $f(x - 2)$ mueve la gráfica a la **derecha**. La razón: para obtener la misma salida que $f$ daba en $x = 0$, ahora necesitas $x = 2$ (porque $2 - 2 = 0$). Todo ocurre "2 después".

Con ambos a la vez, $g(x) = f(x - h) + k$ mueve **cada punto** $(a, b)$ de $f$ al punto $(a + h,\\ b + k)$.

Ejemplo: $g(x) = (x - 2)^2 + 1$ es la parábola $x^2$ desplazada $2$ a la derecha y $1$ hacia arriba. Su vértice pasó de $(0, 0)$ a $(2, 1)$. Es exactamente la **forma de vértice** del tema anterior: ahora sabes de dónde sale.

## Reflexiones

- $-f(x)$: **refleja respecto del eje $x$** (voltea la gráfica de arriba hacia abajo). El punto $(a, b)$ pasa a $(a, -b)$.
- $f(-x)$: **refleja respecto del eje $y$** (la voltea de izquierda a derecha). El punto $(a, b)$ pasa a $(-a, b)$.
- Hacer las dos: $-f(-x)$ refleja respecto del **origen**, $(a, b) \\to (-a, -b)$.

Una parábola $x^2$ con un signo menos, $-x^2$, abre hacia abajo.

## Estiramientos y compresiones

- $c \\cdot f(x)$ con $c > 1$: **estira verticalmente**: cada $y$ se multiplica por $c$. El punto $(a, b)$ pasa a $(a, cb)$. Con $0 < c < 1$ la gráfica se aplasta.
- $f(cx)$ con $c > 1$: **comprime horizontalmente**: cada $x$ se **divide** entre $c$. El punto $(a, b)$ pasa a $\\left(\\frac{a}{c},\\ b\\right)$.

Otra vez lo "horizontal" se comporta al revés de lo que uno espera: multiplicar la $x$ por $2$ hace la gráfica **más angosta**.

## Cuál va primero

Cuando hay varias transformaciones, el orden importa. Una regla práctica para $g(x) = a \\cdot f(x - h) + k$:

- **1.** Primero lo que está **dentro** (desplazamiento horizontal $h$, estiramiento horizontal).
- **2.** Después estiramiento o reflexión **vertical** ($a$).
- **3.** Por último el desplazamiento **vertical** $k$.

## Evaluar una función transformada

También se puede **evaluar** sin graficar. Si $f(x) = x^2$ y $g(x) = f(x - 3) + 1$, entonces:

$$g(5) = f(5 - 3) + 1 = f(2) + 1 = 4 + 1 = 5$$

Se calcula primero lo que está dentro de $f$, luego se aplica $f$, y al final se suma $1$.

## Cómo escribir tu respuesta

Cuando pidan un punto, escribe las dos coordenadas separadas por coma: \`3, -2\`. Cuando pidan un valor, un número.

## Errores comunes

- **Mover hacia el lado equivocado:** $f(x + 2)$ va a la **izquierda**.
- **Sumar $h$ al signo equivocado** al calcular el nuevo vértice.
- **Confundir** $-f(x)$ (voltea arriba-abajo) con $f(-x)$ (voltea izquierda-derecha).
- **Estirar la coordenada equivocada** con $f(cx)$.

## Practica

{{practice}}
`,
};
