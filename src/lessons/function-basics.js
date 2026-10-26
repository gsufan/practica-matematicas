LESSONS["function-basics"] = {
  minutes: 14,
  body: `
## Una relación entre cantidades

Casi todo en la vida depende de otra cosa: lo que pagas depende de lo que compras, la distancia que recorres depende del tiempo, la altura de un niño depende de su edad. Una **función** es la manera matemática de describir **una cantidad que depende de otra**, de forma exacta y sin ambigüedad.

## La definición

Una **función** asigna a cada valor de entrada **exactamente un** valor de salida.

{{fig:function-machine}}

Piénsala como una **máquina**: metes un número, la máquina aplica su regla y devuelve otro número. Lo esencial es que, con la **misma entrada**, la máquina siempre da la **misma salida**.

- El valor de entrada se llama **variable independiente** y suele ser $x$.
- El valor de salida se llama **variable dependiente** y suele ser $y$.

> La palabra clave es **un solo**: a cada $x$ le corresponde un único $y$. Pero distintos $x$ sí pueden dar el mismo $y$.

## La notación $f(x)$

En vez de escribir "$y$ es igual a...", se escribe el nombre de la función y su entrada entre paréntesis:

$$f(x) = 3x - 5$$

Se lee "f de x". **No significa $f$ multiplicado por $x$.** Es el nombre de la máquina ($f$) con la entrada que recibe ($x$). Otras letras valen igual: $g(t)$, $h(n)$, $C(x)$ para un costo.

La ventaja es que dice **cuánto vale la salida para una entrada concreta**: $f(4)$ es la salida cuando la entrada es $4$.

## Evaluar una función

Evaluar es **sustituir** la variable por el valor y calcular. Si $f(x) = 3x - 5$:

$$f(4) = 3 \\times 4 - 5 = 7$$

Con un valor negativo, usa paréntesis:

$$f(-2) = 3 \\times (-2) - 5 = -11$$

Con una función cuadrática, como $f(x) = x^2 - 2x + 1$ y $x = 3$: $f(3) = 9 - 6 + 1 = 4$.

## Resolver $f(x) = k$

La pregunta inversa: ¿para qué entrada obtengo cierta salida? Es una ecuación. Si $f(x) = 3x - 5$ y queremos $f(x) = 16$:

$$3x - 5 = 16 \\quad \\Rightarrow \\quad 3x = 21 \\quad \\Rightarrow \\quad x = 7$$

## ¿Es una función?

Para decidirlo se revisa que **ninguna entrada se repita con salidas distintas**. En una lista de pares ordenados $(x, y)$:

- $\\{(1, 2), (2, 5), (3, 5)\\}$ **sí** es función: cada $x$ aparece una sola vez. (Que el $5$ se repita en la salida no importa.)
- $\\{(1, 2), (1, 4), (3, 5)\\}$ **no** es función: la entrada $1$ tiene dos salidas, $2$ y $4$.

En una gráfica se usa la **prueba de la recta vertical**: si alguna recta vertical corta la gráfica en dos o más puntos, no es función.

## Leer una gráfica

La gráfica de una función es el conjunto de todos los puntos $(x, y)$ con $y = f(x)$. Para leer $f(a)$ en una gráfica: ubica $a$ en el eje horizontal, sube o baja hasta tocar la curva y lee la altura.

## Formas de representar una función

Una misma función se puede mostrar de cuatro maneras, y conviene saltar entre ellas:

- Con una **fórmula**: $f(x) = 2x + 1$.
- Con una **tabla** de valores.
- Con una **gráfica**.
- Con **palabras**: "el costo es 500 más 300 por kilómetro".

## Errores comunes

- **Leer $f(x)$ como $f \\times x$.**
- **Olvidar los paréntesis** al sustituir un número negativo.
- **Confundir** $f(3)$ (la salida para $x = 3$) con $f = 3$.
- **Pensar que dos $x$ distintos con la misma $y$ rompen la definición.** No la rompen; lo que no se puede es una $x$ con dos $y$.

## Practica

{{practice}}
`,
};
