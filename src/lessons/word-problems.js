LESSONS["word-problems"] = {
  minutes: 12,
  body: `
## El álgebra sirve para algo

Hasta ahora resolviste ecuaciones que ya venían escritas. En la práctica, los problemas llegan **en palabras**. La habilidad central del álgebra es **traducir**: pasar del lenguaje cotidiano al lenguaje matemático, resolver, y volver a las palabras.

## Un método de cuatro pasos

- **1. Entiende:** lee el problema completo. ¿Qué te piden? ¿Qué datos tienes?
- **2. Define la incógnita:** elige una letra y escribe exactamente qué representa. "Sea $x$ la edad de Ana."
- **3. Plantea la ecuación:** traduce el enunciado, frase por frase.
- **4. Resuelve y comprueba:** resuelve, vuelve a la historia y verifica que la respuesta tenga sentido.

El paso 2 parece trivial, pero es donde más se falla. Siempre escribe qué significa cada letra, con sus unidades.

## Diccionario de traducción

Las palabras clave se repiten mucho:

- "**más que**", "aumentado en", "la suma de" → $+$
- "**menos que**", "disminuido en", "la diferencia" → $-$
- "**el doble de**", "el triple de", "veces" → $\\times$
- "**la mitad de**", "el cociente" → $\\div$
- "**es**", "da", "resulta", "suman" → $=$

> Cuidado con el orden en "menos que". "5 menos que $x$" se escribe $x - 5$, no $5 - x$. Piensa: 5 menos que 20 es 15, es decir $20 - 5$.

## Números consecutivos

Dos enteros consecutivos son $x$ y $x + 1$. Tres consecutivos son $x$, $x + 1$ y $x + 2$.

*La suma de dos enteros consecutivos es 31. ¿Cuáles son?*

$$x + (x + 1) = 31 \\quad \\Rightarrow \\quad 2x + 1 = 31 \\quad \\Rightarrow \\quad x = 15$$

Los números son $15$ y $16$.

## Edades

Cuando una persona tiene "$m$ años más" que otra, se escribe como $x + m$:

*Marta tiene 6 años más que su hermano. Juntos suman 30. ¿Cuántos años tiene el hermano?*

$$x + (x + 6) = 30 \\quad \\Rightarrow \\quad 2x = 24 \\quad \\Rightarrow \\quad x = 12$$

## Tarifas, compras y repartos

Aquí hay un **valor fijo** y otro que **depende de la cantidad**. Es la forma $\\text{fijo} + \\text{unitario} \\times x$:

*Un taxi cobra 800 de base más 300 por kilómetro. Un viaje costó 3 500. ¿Cuántos kilómetros fueron?*

$$800 + 300x = 3500 \\quad \\Rightarrow \\quad 300x = 2700 \\quad \\Rightarrow \\quad x = 9$$

## Geometría

Muchas fórmulas de perímetro y área son ecuaciones. Para un rectángulo, $P = 2(\\text{ancho} + \\text{largo})$:

*El largo mide 3 cm más que el ancho y el perímetro es 26 cm.*

$$2(x + (x + 3)) = 26 \\quad \\Rightarrow \\quad 4x + 6 = 26 \\quad \\Rightarrow \\quad x = 5$$

El ancho mide $5$ cm y el largo $8$ cm.

## Comprobar con la historia

Resolver la ecuación **no** termina el problema. Hay que volver al texto:

- ¿La respuesta responde **lo que se preguntó**? Si pedían el número mayor y encontraste el menor, falta un paso.
- ¿Tiene **sentido**? Una edad negativa o una cantidad de personas con decimales indica un error.
- ¿Cumple **todas** las condiciones del enunciado?

En el ejemplo de los consecutivos, comprueba: $15 + 16 = 31$ ✓.

## Errores comunes

- **No definir la incógnita**, y perderse a mitad del problema.
- **Responder la letra y no la pregunta.** Si $x$ es el menor y piden el mayor, la respuesta es $x + 1$.
- **Plantear en el orden equivocado** frases como "menos que".
- **No comprobar con el enunciado.**

## Practica

Lee el problema, plantea la ecuación en tu cuaderno y escribe solo el número que te piden. Si te atascas, mira los pasos.

{{practice}}
`,
};
