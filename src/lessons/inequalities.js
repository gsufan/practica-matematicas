LESSONS["inequalities"] = {
  minutes: 13,
  body: `
## Cuando no hay igualdad exacta

Una ecuación dice que dos cosas valen **lo mismo**. Pero en la vida real muchas condiciones son de "al menos", "no más de", "menos que":

- "Para entrar al cine necesitas **al menos** 12 años."
- "El ascensor soporta **como máximo** 400 kg."
- "Quiero gastar **menos de** 20 000 pesos."

Esas condiciones se escriben con **desigualdades**. Su solución no suele ser un número, sino **un conjunto de números**.

## Los símbolos

- $a < b$: "a es menor que b".
- $a > b$: "a es mayor que b".
- $a \\leq b$: "a es menor **o igual** que b".
- $a \\geq b$: "a es mayor **o igual** que b".

> El símbolo "se abre" hacia el número mayor. Si te cuesta recordarlo, piensa que la parte angosta apunta al menor.

## La solución es un conjunto

Resolver $x + 2 > 5$ significa encontrar **todos** los $x$ que la hacen verdadera:

$$x + 2 > 5 \\quad \\Rightarrow \\quad x > 3$$

El $4$ sirve, el $10$ sirve y el $3{,}5$ sirve. El $3$ no sirve, porque $3 + 2 = 5$ no es **mayor** que $5$. Con $\\geq$ el $3$ sí valdría: se dice que el extremo está **incluido**.

## En la recta numérica

La solución se dibuja sobre la recta numérica:

- Un **círculo vacío** en el extremo cuando **no** se incluye ($<$ o $>$).
- Un **círculo lleno** cuando **sí** se incluye ($\\leq$ o $\\geq$).
- Una flecha hacia el lado de las soluciones.

También se escribe como **intervalo**: $x > 3$ es $(3, \\infty)$, y $x \\leq 5$ es $(-\\infty, 5]$. El paréntesis excluye el extremo y el corchete lo incluye. El infinito siempre va con paréntesis, porque no es un número que se pueda alcanzar.

## Se resuelven casi igual que las ecuaciones

Las mismas operaciones que usaste con las ecuaciones siguen valiendo:

- **Sumar o restar** el mismo número en ambos lados: la desigualdad **no cambia**.
- **Multiplicar o dividir** por un número **positivo**: la desigualdad **no cambia**.

Ejemplo:

$$2x + 3 < 11$$
$$2x < 8$$
$$x < 4$$

## La regla que sí cambia: números negativos

Al **multiplicar o dividir por un número negativo**, la desigualdad se **invierte**. Es la única diferencia importante respecto a las ecuaciones.

¿Por qué? Mira un caso numérico. Sabemos que $2 < 5$. Si multiplicamos ambos lados por $-1$, quedan $-2$ y $-5$. Pero en la recta, $-2$ está a la **derecha** de $-5$, así que:

$$-2 > -5$$

Multiplicar por un negativo "da la vuelta" a la recta, y por eso el símbolo se invierte.

Ejemplo:

$$-3x + 4 \\geq 10$$
$$-3x \\geq 6$$
$$x \\leq -2$$

Se dividió entre $-3$ y el $\\geq$ pasó a $\\leq$.

> Si no estás seguro, **comprueba con un número**. Con $x = -5$ (que cumple $x \\leq -2$): $-3(-5) + 4 = 19 \\geq 10$. Es verdadero, así que la solución está bien.

## Con x en ambos lados

Se juntan las $x$ a un lado, igual que en las ecuaciones. Resolver $5x - 3 > 2x + 9$:

$$5x - 2x > 9 + 3$$
$$3x > 12$$
$$x > 4$$

Si al reunir las $x$ queda un coeficiente negativo, hay que invertir el símbolo al dividir.

## Cómo escribir tu respuesta

Escribe la solución con $x$ a la izquierda, por ejemplo \`x > 3\` o \`x <= -2\`. Puedes usar \`<=\` y \`>=\` en lugar de ≤ y ≥. También se acepta \`3 < x\`. Para fracciones, usa \`x > 5/2\`.

## Errores comunes

- **Olvidar invertir** el símbolo al dividir o multiplicar por un negativo.
- **Invertirlo cuando no corresponde:** al sumar o restar un negativo no cambia nada.
- **Confundir $<$ con $\\leq$:** la diferencia es si el extremo cuenta o no.
- **Dar un solo número** como si fuera una ecuación: la respuesta es un conjunto.

## Practica

{{practice}}
`,
};
