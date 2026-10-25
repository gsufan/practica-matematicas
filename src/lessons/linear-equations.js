LESSONS["linear-equations"] = {
  minutes: 16,
  body: `
## Qué es una ecuación

Una **expresión** se evalúa; una **ecuación** se resuelve. La diferencia es el signo igual. Una ecuación afirma que dos expresiones valen lo mismo:

$$3x + 5 = 17$$

La letra es una **incógnita**: un número que todavía no conocemos y que hay que **encontrar**. **Resolver** la ecuación es encontrar el valor de la incógnita que hace verdadera la igualdad. A ese valor se le llama **solución**.

En este caso la solución es $x = 4$, porque $3 \\times 4 + 5 = 17$. Con cualquier otro valor la igualdad sería falsa.

## Ecuaciones lineales

Una ecuación es **lineal** cuando la incógnita aparece solo a la primera potencia (sin $x^2$, ni $\\sqrt{x}$, ni $x$ en un denominador). Tienen la forma $ax + b = c$. Se llaman lineales porque, al graficarlas, dibujan una línea recta, tema que verás en funciones.

## La balanza

El mejor modelo mental es una **balanza en equilibrio**: lo que hay en el platillo izquierdo pesa igual que lo del derecho. La regla de oro del álgebra es:

> **Lo que le hagas a un lado de la ecuación, hazlo igual al otro lado.** Así la balanza no se desequilibra y la ecuación sigue siendo verdadera.

Puedes sumar o restar el mismo número en ambos lados, y multiplicar o dividir ambos lados por el mismo número (distinto de cero).

## Operaciones inversas

Para dejar la $x$ sola hay que **deshacer** lo que le hicieron, con la operación contraria:

- Si le **suman** 5, restas 5.
- Si le **restan** 5, sumas 5.
- Si la **multiplican** por 3, divides entre 3.
- Si la **dividen** entre 3, multiplicas por 3.

## Un paso

Si $x + 7 = 12$: restamos 7 a ambos lados.

$$x + 7 - 7 = 12 - 7 \\quad \\Rightarrow \\quad x = 5$$

Si $4x = 20$: dividimos ambos lados entre 4.

$$\\frac{4x}{4} = \\frac{20}{4} \\quad \\Rightarrow \\quad x = 5$$

## Dos pasos

Casi siempre hay que deshacer dos operaciones. **El orden importa:** primero se quita lo que se **suma o resta**, y después lo que **multiplica o divide**. Es el orden de operaciones al revés.

$$3x + 5 = 17$$
$$3x = 17 - 5 = 12$$
$$x = \\frac{12}{3} = 4$$

## La comprobación

Siempre puedes (y debes) comprobar la solución sustituyéndola en la ecuación original:

$$3 \\times 4 + 5 = 12 + 5 = 17 \\quad \\checkmark$$

Si el resultado no coincide, hay un error en algún paso. Es la gran ventaja de las ecuaciones: tú mismo puedes verificar tu respuesta.

## Incógnita en ambos lados

Si la $x$ está en los dos lados, primero se juntan todos los términos con $x$ en un lado y los números en el otro. Resolver $5x + 2 = 2x + 14$:

$$5x - 2x = 14 - 2$$
$$3x = 12$$
$$x = 4$$

Se restó $2x$ y se restó $2$ a ambos lados. Es el mismo principio de la balanza.

## Con paréntesis

Primero se **distribuye** (tema anterior) y luego se resuelve como siempre. Resolver $2(x + 3) = 14$:

$$2x + 6 = 14 \\quad \\Rightarrow \\quad 2x = 8 \\quad \\Rightarrow \\quad x = 4$$

Otra forma, cuando todo el paréntesis se multiplica por un número que divide a ambos lados, es dividir primero: $x + 3 = 7$, así que $x = 4$. Ambos caminos son válidos.

## Soluciones que no son enteras

La solución no siempre es un entero. Resolver $2x + 3 = 8$:

$$2x = 5 \\quad \\Rightarrow \\quad x = \\frac{5}{2}$$

Se deja como **fracción simplificada**, o como decimal si lo prefieres: $x = 2{,}5$. Aquí vuelven a servir las fracciones y los decimales de la aritmética.

## Casos especiales

Algunas ecuaciones lineales se comportan distinto:

- **Sin solución:** $x + 1 = x + 2$ se reduce a $1 = 2$, que es imposible. Ningún número la cumple.
- **Infinitas soluciones:** $2(x + 1) = 2x + 2$ se reduce a $2 = 2$, que siempre es verdad. Cualquier número sirve.

## Cómo escribir tu respuesta

Escribe solo el valor de la incógnita, por ejemplo \`4\`, o \`x = 4\`. Si es una fracción, escríbela simplificada, como \`5/2\`. También se acepta el decimal \`2,5\`.

## Errores comunes

- **Cambiar solo un lado:** si sumas 5 a la izquierda, también hay que sumarlo a la derecha.
- **Dividir solo uno de los términos:** en $4x + 8 = 20$ hay que dividir **todo** entre 4, o primero restar el 8.
- **Errores de signo al pasar términos:** al restar $-3$ a ambos lados, en realidad se suma 3.
- **No comprobar la solución.**

## Practica

{{practice}}
`,
};
