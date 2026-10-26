LESSONS["circle"] = {
  minutes: 14,
  body: `
## Círculo y circunferencia no son lo mismo

- La **circunferencia** es la **línea**: el borde, todos los puntos que están a la misma distancia de un punto central.
- El **círculo** es la **superficie** que queda encerrada por esa línea.

Es la misma diferencia que entre perímetro y área. La circunferencia tiene longitud; el círculo tiene área.

## Partes

{{fig:circle-parts}}

- **Centro:** el punto del que equidistan todos los puntos de la circunferencia.
- **Radio ($r$):** la distancia del centro a la circunferencia.
- **Diámetro ($d$):** el segmento que pasa por el centro y une dos puntos opuestos. Mide el doble del radio: $d = 2r$.
- **Cuerda:** un segmento que une dos puntos de la circunferencia. El diámetro es la cuerda más larga.
- **Arco:** un trozo de la circunferencia.
- **Sector circular:** la región entre dos radios y su arco, como un trozo de pizza.

## El número π

Si mides la circunferencia de cualquier círculo y la divides entre su diámetro, siempre obtienes el **mismo número**, sin importar el tamaño:

$$\\pi = \\frac{\\text{circunferencia}}{\\text{diámetro}} \\approx 3{,}14159\\ldots$$

Una rueda de bicicleta y la Luna llena cumplen esa misma razón. $\\pi$ es un número **irracional**: sus decimales no terminan ni se repiten. $3{,}14$ y $\\frac{22}{7}$ son solo aproximaciones.

## Longitud de la circunferencia

Despejando de la definición de $\\pi$:

$$C = \\pi d = 2\\pi r$$

Con $r = 5$: $C = 2\\pi \\cdot 5 = 10\\pi \\approx 31{,}4$.

## Área del círculo

$$A = \\pi r^2$$

Con $r = 5$: $A = \\pi \\cdot 25 = 25\\pi \\approx 78{,}5$.

> Cuidado: el radio va **al cuadrado**, no el $\\pi$. Y el área usa $r^2$ (unidades al cuadrado), mientras que la circunferencia usa $r$ (unidades simples).

## Respuestas "en términos de π"

Para evitar aproximaciones, las respuestas suelen dejarse **con π escrito**: $10\\pi$ en lugar de $31{,}4$. Es exacto y más limpio. En esta página, cuando se pide así, tú escribes **solo el número que acompaña a π**. Si el resultado es $25\\pi$, escribes \`25\`.

## Hallar el radio

Si te dan la circunferencia o el área, despeja:

- De $C = 18\\pi$: $2\\pi r = 18\\pi$, entonces $r = 9$.
- De $A = 49\\pi$: $\\pi r^2 = 49\\pi$, entonces $r^2 = 49$ y $r = 7$.

## Arcos y sectores

Un arco con ángulo central $\\theta$ es una **fracción** de la circunferencia: $\\dfrac{\\theta}{360}$ de ella. Lo mismo para el sector y el círculo.

$$L_{\\text{arco}} = \\frac{\\theta}{360} \\times 2\\pi r \\qquad A_{\\text{sector}} = \\frac{\\theta}{360} \\times \\pi r^2$$

Ejemplo: un sector de $90^\\circ$ en un círculo de radio $6$ es un cuarto del círculo:

$$A = \\frac{90}{360} \\times \\pi \\times 36 = \\frac{1}{4} \\times 36\\pi = 9\\pi$$

## Cómo escribir tu respuesta

Escribe el número que acompaña a $\\pi$: entero (\`12\`), fracción simplificada (\`5/3\`) o decimal exacto (\`1,5\`).

## Errores comunes

- **Confundir radio con diámetro.** Si te dan el diámetro, divídelo entre 2 antes de usar $\\pi r^2$.
- **Mezclar las fórmulas** de longitud y de área.
- **Olvidar la fracción** $\\frac{\\theta}{360}$ en arcos y sectores.
- **Usar $\\pi = 3$**. Está lejos del valor real.

## Practica

{{practice}}
`,
};
