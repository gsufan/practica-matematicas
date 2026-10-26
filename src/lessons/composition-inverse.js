LESSONS["composition-inverse"] = {
  minutes: 14,
  body: `
## Encadenar máquinas

Si la salida de una función se usa como entrada de otra, se obtiene una **función compuesta**. Es como una línea de producción: la primera máquina corta, la segunda pinta. El producto final depende de las dos, en ese orden.

## Composición

La función compuesta de $f$ después de $g$ se escribe $(f \\circ g)(x)$ y se define así:

$$(f \\circ g)(x) = f(g(x))$$

Se lee "$f$ compuesta con $g$". **Se aplica primero la de adentro ($g$) y después la de afuera ($f$).**

Sean $f(x) = 2x + 1$ y $g(x) = x - 3$. Para evaluar $(f \\circ g)(5)$:

- $g(5) = 5 - 3 = 2$.
- $f(2) = 2 \\times 2 + 1 = 5$.

Entonces $(f \\circ g)(5) = 5$.

## El orden importa

La composición **no** es conmutativa: en general $f(g(x)) \\neq g(f(x))$. Con las mismas funciones, $(g \\circ f)(5)$ se hace al revés:

- $f(5) = 11$, y luego $g(11) = 11 - 3 = 8$.

Dio $8$, no $5$. Siempre fíjate en cuál va adentro.

## La fórmula de la compuesta

Para obtener $(f \\circ g)(x)$ como una sola expresión, sustituye **toda** la fórmula de $g$ en la $x$ de $f$:

$$(f \\circ g)(x) = f(x - 3) = 2(x - 3) + 1 = 2x - 6 + 1 = 2x - 5$$

Con $f(x) = x^2$ y $g(x) = x + 2$: $(f \\circ g)(x) = (x + 2)^2 = x^2 + 4x + 4$. No olvides desarrollar el cuadrado completo (el término del medio no se puede omitir).

## Deshacer una función: la inversa

Una función **inversa** hace el **camino contrario**: si $f$ convierte $a$ en $b$, la inversa $f^{-1}$ convierte $b$ en $a$.

> **Cuidado con la notación:** $f^{-1}(x)$ **no** significa $\\dfrac{1}{f(x)}$. El $-1$ es solo el nombre de la inversa.

Ejemplos de funciones y sus inversas:

- Sumar $5$ ↔ restar $5$.
- Multiplicar por $3$ ↔ dividir entre $3$.
- Elevar al cuadrado (con $x \\geq 0$) ↔ sacar raíz.
- Elevar $2^x$ ↔ el logaritmo en base $2$.

Si $f$ y $f^{-1}$ se aplican seguidas, **se cancelan**: $f^{-1}(f(x)) = x$ y $f(f^{-1}(x)) = x$.

## Evaluar la inversa

$f^{-1}(k)$ es **el valor de $x$ que hace $f(x) = k$**. Para $f(x) = 2x + 3$, calcular $f^{-1}(11)$ es resolver:

$$2x + 3 = 11 \\quad \\Rightarrow \\quad x = 4$$

Entonces $f^{-1}(11) = 4$. No hace falta tener la fórmula de la inversa.

## Encontrar la fórmula de la inversa

Se hace en cuatro pasos:

- **1.** Escribe $y = f(x)$.
- **2.** **Intercambia** $x$ e $y$.
- **3.** **Despeja** $y$.
- **4.** Esa $y$ es $f^{-1}(x)$.

Para $f(x) = 2x + 3$:

$$y = 2x + 3 \\quad \\to \\quad x = 2y + 3 \\quad \\to \\quad y = \\frac{x - 3}{2}$$

Entonces $f^{-1}(x) = \\dfrac{x - 3}{2} = \\dfrac{x}{2} - \\dfrac{3}{2}$. Comprueba: $f(f^{-1}(x)) = 2 \\cdot \\dfrac{x - 3}{2} + 3 = x$ ✓.

## La gráfica de la inversa

Las gráficas de $f$ y de $f^{-1}$ son **simétricas respecto de la recta $y = x$**: una es el espejo de la otra. Si el punto $(a, b)$ está en $f$, entonces $(b, a)$ está en $f^{-1}$.

{{fig:inverse-graph}}

## ¿Toda función tiene inversa?

No. Para tener inversa, a cada salida debe corresponderle **una sola entrada**: la función debe ser **inyectiva**. La parábola $x^2$ no la tiene en todo el dominio, porque $f(2) = f(-2) = 4$. Se arregla restringiendo el dominio a $x \\geq 0$. En la gráfica, se detecta con la **prueba de la recta horizontal**: si alguna horizontal corta la gráfica dos veces, no hay inversa.

## Cómo escribir tu respuesta

Para la inversa, escribe la expresión: puedes usar fracciones (\`x/2 - 3/2\`) o decimales (\`0,5x - 1,5\`). Para evaluar, un número.

## Errores comunes

- **Aplicar las funciones en el orden equivocado** en $(f \\circ g)(x)$.
- **Confundir $f^{-1}(x)$ con $\\frac{1}{f(x)}$.**
- **No intercambiar** $x$ e $y$ antes de despejar.
- **Dividir solo un término** al despejar: $\\frac{x - 3}{2}$ no es $x - \\frac{3}{2}$, sino $\\frac{x}{2} - \\frac{3}{2}$. El denominador divide **todo** el numerador.

## Practica

{{practice}}
`,
};
