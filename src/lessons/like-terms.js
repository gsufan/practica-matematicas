LESSONS["like-terms"] = {
  minutes: 11,
  body: `
## La idea: sumar solo lo que se parece

Si tienes 3 manzanas y 2 manzanas, tienes 5 manzanas. Pero si tienes 3 manzanas y 2 naranjas, no tienes "5 manzanaranjas": tienes 3 manzanas **y** 2 naranjas. Solo se pueden juntar cosas del mismo tipo.

El álgebra funciona igual. Si $x$ representa "manzanas":

$$3x + 2x = 5x$$

pero $3x + 2y$ **no se puede reducir**, porque $x$ e $y$ son cosas distintas.

## Términos semejantes

Dos términos son **semejantes** cuando tienen **exactamente la misma parte literal**: las mismas letras con los mismos exponentes. Lo único que puede cambiar es el coeficiente.

- $5x$ y $-2x$ son semejantes (ambos tienen $x$).
- $4x^2$ y $9x^2$ son semejantes (ambos tienen $x^2$).
- $7$ y $-3$ son semejantes (las constantes se juntan entre sí).
- $3x$ y $3x^2$ **no** son semejantes: $x$ no es lo mismo que $x^2$.
- $2x$ y $2y$ **no** son semejantes: letras distintas.

> La parte literal incluye el exponente. $x$ es "una longitud" y $x^2$ es "un área": no se pueden sumar, igual que no sumas metros con metros cuadrados.

## Cómo reducir

Se **suman los coeficientes** y la parte literal se queda igual:

$$ax + bx = (a + b)x$$

Esto no es una regla nueva: es la propiedad distributiva leída al revés. Con ella, $3x + 2x = (3 + 2)x = 5x$.

## Procedimiento

- **1. Agrupa** los términos semejantes (puedes subrayarlos o usar colores).
- **2. Suma** los coeficientes de cada grupo, respetando los signos.
- **3. Escribe** el resultado ordenado, con el exponente mayor primero.

Ejemplo:

$$3x + 5 + 2x - 1 = (3 + 2)x + (5 - 1) = 5x + 4$$

## El signo viaja con el término

Cuando reordenas, cada término lleva **su propio signo**, el que tiene a la izquierda. Por eso en $8 - 3x + 2x$ el término $-3x$ es negativo:

$$8 - 3x + 2x = 8 + (-3 + 2)x = 8 - x$$

Un error muy común es olvidar que el "−" pertenece al $3x$ y no a la operación en general.

## Varias variables

Cada letra forma su propio grupo. Aquí hay tres grupos independientes:

$$4x + 3y - 2x + y + 7 = (4 - 2)x + (3 + 1)y + 7 = 2x + 4y + 7$$

Nota que $y$ es lo mismo que $1y$, así que $3y + y = 4y$.

## Con exponentes

Los términos con $x^2$ se juntan entre sí, y los términos con $x$ se juntan aparte:

$$5x^2 + 3x - 2x^2 + x = (5 - 2)x^2 + (3 + 1)x = 3x^2 + 4x$$

## Cuándo desaparece un término

Si los coeficientes se cancelan, el término vale cero y ya no se escribe:

$$4x + 7 - 4x = (4 - 4)x + 7 = 0x + 7 = 7$$

## Cómo escribir tu respuesta

La respuesta se escribe como una expresión: por ejemplo \`5x + 4\`. El orden de los términos no importa: \`4 + 5x\` también es correcto. Pero tiene que estar **reducida**: si escribes \`3x + 2x\`, la página te avisará que falta reducir.

## Errores comunes

- **Sumar términos que no son semejantes:** $3x + 2y = 5xy$ es **falso**.
- **Cambiar los exponentes al sumar:** $x^2 + x^2 = 2x^2$, no $x^4$. Al sumar, solo se suman los coeficientes.
- **Perder el signo** de un término al agrupar.
- **Olvidar el coeficiente 1** de una letra suelta: $x + x = 2x$.

## Practica

Escribe la expresión reducida, por ejemplo \`5x + 4\` o \`3x^2 - 2x + 1\`. Para el exponente usa \`^\`.

{{practice}}
`,
};
