LESSONS["trigonometry"] = {
  minutes: 15,
  body: `
## La razón entre lados

La palabra **trigonometría** significa "medida de triángulos". La idea nace de la semejanza: todos los triángulos rectángulos que tienen **el mismo ángulo agudo** son semejantes entre sí. Por lo tanto, sus lados guardan **las mismas razones**, sin importar el tamaño del triángulo.

Esas razones dependen solo del ángulo. Les damos nombre y se convierten en una herramienta para calcular distancias que no se pueden medir directamente: la altura de un edificio, el ancho de un río, la pendiente de una rampa.

## Nombrar los lados

Fija un ángulo agudo, al que llamaremos $\\alpha$. Los lados de un triángulo rectángulo se nombran **respecto de ese ángulo**:

{{fig:trig-triangle}}

- **Hipotenusa:** el lado opuesto al ángulo recto. Siempre es el más largo.
- **Cateto opuesto:** el cateto que está **frente** a $\\alpha$.
- **Cateto adyacente:** el cateto que está **al lado** de $\\alpha$ (junto con la hipotenusa).

> Ojo: "opuesto" y "adyacente" dependen del ángulo que elijas. Si cambias de ángulo, los dos catetos intercambian sus papeles.

## Seno, coseno y tangente

$$\\sin\\alpha = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}} \\qquad \\cos\\alpha = \\frac{\\text{cateto adyacente}}{\\text{hipotenusa}} \\qquad \\tan\\alpha = \\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}}$$

Una regla para recordarlas es la sigla **SOH-CAH-TOA**: **S**eno = **O**puesto / **H**ipotenusa, **C**oseno = **A**dyacente / **H**ipotenusa, **T**angente = **O**puesto / **A**dyacente.

## Un ejemplo completo

Un triángulo rectángulo con catetos $3$ y $4$ y con hipotenusa $5$ (la terna pitagórica). Para el ángulo $\\alpha$ opuesto al lado $3$:

$$\\sin\\alpha = \\frac{3}{5} \\qquad \\cos\\alpha = \\frac{4}{5} \\qquad \\tan\\alpha = \\frac{3}{4}$$

Las razones se dejan como **fracciones simplificadas**. Si el triángulo se duplica ($6, 8, 10$), las razones no cambian: $\\frac{6}{10} = \\frac{3}{5}$.

## Como un número entre 0 y 1

El seno y el coseno de un ángulo agudo siempre están **entre 0 y 1**, porque el cateto es más corto que la hipotenusa. La tangente puede ser cualquier número positivo.

## Usarlas para encontrar un lado

Si conoces una razón y un lado, puedes calcular otro. Si $\\sin\\alpha = \\dfrac{3}{5}$ y la hipotenusa mide $20$, el cateto opuesto $x$ cumple:

$$\\frac{3}{5} = \\frac{x}{20} \\quad \\Rightarrow \\quad x = \\frac{3 \\times 20}{5} = 12$$

El método siempre es el mismo: escribir la razón, igualarla a la proporción con las medidas del problema y despejar.

## Ángulos notables

Algunos ángulos tienen razones exactas que conviene recordar:

- $\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$
- $\\tan 45^\\circ = 1$ (el triángulo con ángulos de $45^\\circ$ tiene catetos iguales)
- $\\sin 0^\\circ = 0$, $\\sin 90^\\circ = 1$, $\\cos 0^\\circ = 1$, $\\cos 90^\\circ = 0$, $\\tan 0^\\circ = 0$

Los otros valores notables ($\\sin 45^\\circ$, $\\sin 60^\\circ$, $\\tan 30^\\circ$…) incluyen raíces cuadradas, y los verás en precálculo.

## Ángulos complementarios

En un triángulo rectángulo, los dos ángulos agudos suman $90^\\circ$ (porque el tercero es el recto y todos suman $180^\\circ$). Además, el **cateto opuesto** a uno es el **adyacente** del otro. De ahí sale una propiedad elegante:

$$\\sin\\alpha = \\cos(90^\\circ - \\alpha)$$

Por ejemplo, $\\sin 20^\\circ = \\cos 70^\\circ$. De ahí viene el nombre: **co-seno** es el "seno del complemento".

## Un puente hacia lo que viene

Estas tres razones se extienden más adelante a **cualquier ángulo** (no solo agudos) usando la circunferencia unitaria, y se convierten en las **funciones trigonométricas**, fundamentales para estudiar ondas, sonido y movimientos que se repiten.

## Cómo escribir tu respuesta

Para las razones, escribe una fracción simplificada: \`3/5\`. Para un lado, un número entero. Para ángulos complementarios, un número entero de grados.

## Errores comunes

- **Mezclar opuesto y adyacente** al cambiar de ángulo.
- **Dar la razón sin simplificar** ($\\frac{6}{10}$ en vez de $\\frac{3}{5}$).
- **Usar la hipotenusa donde va un cateto**, o al revés.
- **Calcular con la razón invertida:** el seno es opuesto sobre hipotenusa, no hipotenusa sobre opuesto.

## Practica

{{practice}}
`,
};
