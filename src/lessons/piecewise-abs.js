LESSONS["piecewise-abs"] = {
  minutes: 12,
  body: `
## Funciones con más de una fórmula

A veces una situación cambia de regla según el caso. Por ejemplo, una tarifa eléctrica cobra un precio por los primeros 100 kWh y otro precio, más alto, por los que pasan de eso. Una **función por partes** usa **una fórmula distinta para cada tramo** del dominio:

$$f(x) = \\begin{cases} 2x + 1 & \\text{si } x < 0 \\\\ x^2 - 3 & \\text{si } x \\geq 0 \\end{cases}$$

Se lee: "si $x$ es menor que $0$, usa $2x + 1$; si $x$ es mayor o igual que $0$, usa $x^2 - 3$".

## Cómo evaluarla

El procedimiento tiene dos pasos:

- **1.** Revisa **a qué tramo pertenece** el valor de $x$.
- **2.** Usa **solo la fórmula de ese tramo**.

Con la función de arriba:

- $f(-2)$: como $-2 < 0$, usa $2x + 1$: $2(-2) + 1 = -3$.
- $f(3)$: como $3 \\geq 0$, usa $x^2 - 3$: $9 - 3 = 6$.
- $f(0)$: como $0 \\geq 0$, usa $x^2 - 3$: $-3$. (No $2(0) + 1$.)

> Lo importante son los **límites de cada tramo**. Un valor justo en la frontera pertenece al tramo cuyo símbolo incluye la igualdad ($\\geq$ o $\\leq$).

## Gráfica de una función por partes

Se dibuja cada trozo en su tramo. En la frontera, un **círculo lleno** indica que el punto pertenece a ese trozo, y un **círculo vacío** que no. Una función por partes puede tener **saltos**; aun así sigue siendo función mientras cada $x$ tenga una sola salida.

## El valor absoluto

El **valor absoluto** de un número es su **distancia al cero**, así que nunca es negativo:

$$|5| = 5 \\qquad |-5| = 5 \\qquad |0| = 0$$

Se puede definir como una función por partes:

$$|x| = \\begin{cases} x & \\text{si } x \\geq 0 \\\\ -x & \\text{si } x < 0 \\end{cases}$$

Su gráfica tiene forma de **V**, con la punta en el origen.

{{fig:abs-graph}}

## La V desplazada

La función $f(x) = a|x - h| + k$ es la V de $|x|$ desplazada: su **vértice** (la punta) está en $(h, k)$. Se parece mucho a la parábola en forma de vértice.

- Si $a > 0$, la V abre hacia arriba. Si $a < 0$, hacia abajo.
- Cuanto mayor es $|a|$, más cerrada es la V.

## Evaluar con valor absoluto

Calcula primero **lo de adentro**, luego aplica el valor absoluto, y al final lo demás. Con $f(x) = |2x - 5| + 1$ y $x = 1$:

$$f(1) = |2 - 5| + 1 = |-3| + 1 = 3 + 1 = 4$$

## Ecuaciones con valor absoluto

Como $|A| = b$ significa que $A$ está a distancia $b$ del cero, hay **dos casos**: $A = b$ o $A = -b$ (con $b \\geq 0$).

*Resolver $|x - 3| = 5$:*

$$x - 3 = 5 \\quad \\text{o} \\quad x - 3 = -5$$
$$x = 8 \\quad \\text{o} \\quad x = -2$$

Se lee geométricamente: "los números que están a distancia $5$ del número $3$": son $8$ y $-2$. Si $b < 0$, la ecuación no tiene solución, porque una distancia no puede ser negativa.

## Cómo escribir tu respuesta

Para evaluar, un número. Para las ecuaciones con dos soluciones, escríbelas separadas por coma, en cualquier orden: \`-2, 8\`.

## Errores comunes

- **Usar la fórmula del tramo equivocado**, sobre todo en la frontera.
- **Olvidar uno de los dos casos** en una ecuación con valor absoluto.
- **Quitar el valor absoluto sin pensar:** $|x - 3|$ no es siempre $x - 3$.
- **Dejar un resultado negativo** después de aplicar el valor absoluto.

## Practica

{{practice}}
`,
};
