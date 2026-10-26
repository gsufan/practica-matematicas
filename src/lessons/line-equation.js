LESSONS["line-equation"] = {
  minutes: 14,
  body: `
## Escribir la recta que necesitas

Una recta queda **determinada** por dos datos: por ejemplo, **dos puntos**, o **un punto y la pendiente**. La tarea de este tema es escribir su ecuación $y = mx + b$ a partir de esa información.

## Con un punto y la pendiente

Si conoces la pendiente $m$ y un punto $(x_1, y_1)$ de la recta, solo falta $b$. Sustituye el punto en $y = mx + b$ y despeja:

*Recta con pendiente $3$ que pasa por $(2, 5)$:*

$$5 = 3 \\times 2 + b \\quad \\Rightarrow \\quad 5 = 6 + b \\quad \\Rightarrow \\quad b = -1$$

La ecuación es $y = 3x - 1$.

## Con dos puntos

Primero se calcula la pendiente, y luego se procede como antes.

*Recta que pasa por $(1, 2)$ y $(3, 8)$:*

- **Pendiente:** $m = \\dfrac{8 - 2}{3 - 1} = \\dfrac{6}{2} = 3$.
- **Ordenada:** con el punto $(1, 2)$: $2 = 3 \\times 1 + b$, así que $b = -1$.

La ecuación es $y = 3x - 1$. Para comprobar, sustituye el **otro** punto: $3 \\times 3 - 1 = 8$ ✓.

## La forma punto-pendiente

Existe una fórmula directa, que no necesita despejar $b$:

$$y - y_1 = m(x - x_1)$$

Para el ejemplo anterior: $y - 5 = 3(x - 2)$. Si la desarrollas, $y = 3x - 6 + 5 = 3x - 1$: la misma recta. Es útil porque se escribe sin cálculos intermedios.

## Rectas paralelas

Dos rectas son **paralelas** cuando tienen **la misma pendiente** (y distinta ordenada). Para escribir la paralela a $y = 2x + 5$ que pasa por $(1, 4)$:

- La pendiente es la misma: $m = 2$.
- Se sustituye el punto: $4 = 2 \\times 1 + b$, entonces $b = 2$.

La paralela es $y = 2x + 2$. Como el punto $(1, 4)$ no estaba sobre la recta original (con $x = 1$ ella da $7$), las dos rectas son distintas.

## Rectas perpendiculares

Dos rectas son **perpendiculares** (forman un ángulo recto) cuando el **producto de sus pendientes es $-1$**: una es el **inverso negativo** de la otra.

$$m_1 \\times m_2 = -1 \\quad \\Rightarrow \\quad m_2 = -\\frac{1}{m_1}$$

- Si $m_1 = 2$, entonces $m_2 = -\\dfrac{1}{2}$.
- Si $m_1 = -\\dfrac{3}{4}$, entonces $m_2 = \\dfrac{4}{3}$.

Para recordarlo: "se da vuelta la fracción y se cambia el signo".

## Dónde se cruzan dos rectas

En el punto de intersección, las dos rectas tienen **los mismos $x$ e $y$**. Se igualan las dos fórmulas y se despeja $x$; después se calcula $y$.

*Rectas $y = 2x + 1$ e $y = -x + 7$:*

$$2x + 1 = -x + 7 \\quad \\Rightarrow \\quad 3x = 6 \\quad \\Rightarrow \\quad x = 2$$

Y $y = 2 \\times 2 + 1 = 5$. Se cruzan en $(2, 5)$. Es un sistema de dos ecuaciones: lo mismo que viste en álgebra, ahora con una imagen detrás.

## Rectas especiales

- **Horizontal:** $y = c$ (pendiente $0$).
- **Vertical:** $x = c$. **No es una función**, porque a un solo $x$ le corresponden infinitos $y$; su pendiente no está definida.

## Cómo escribir tu respuesta

Escribe la ecuación como \`y = 3x - 1\` o simplemente \`3x - 1\`. Para el punto de corte, \`2, 5\`. Para una pendiente, una fracción simplificada: \`-1/2\`.

## Errores comunes

- **Olvidar calcular $b$** y dejar solo la pendiente.
- **Errores de signo al sustituir** un punto con coordenadas negativas.
- **Perpendicular: cambiar solo el signo** (o solo invertir) en vez de las dos cosas.
- **No comprobar** con el segundo punto.

## Practica

{{practice}}
`,
};
