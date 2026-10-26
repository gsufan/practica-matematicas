LESSONS["polygons"] = {
  minutes: 13,
  body: `
## Figuras de muchos lados

Un **polígono** es una figura plana **cerrada** formada por segmentos rectos que no se cruzan. Los segmentos son los **lados**, los puntos donde se unen son los **vértices**, y en cada vértice hay un **ángulo interior**. Un polígono de $n$ lados tiene $n$ vértices y $n$ ángulos.

Reciben nombre según su número de lados: triángulo (3), cuadrilátero (4), pentágono (5), hexágono (6), heptágono (7), octógono (8), eneágono (9), decágono (10), dodecágono (12).

## Regulares e irregulares

Un polígono es **regular** si tiene **todos sus lados iguales y todos sus ángulos iguales**. Un cuadrado lo es; un rectángulo no (sus lados no son todos iguales); un rombo tampoco (sus ángulos no son todos iguales).

{{fig:regular-polygon}}

También se distingue entre **convexos** (todos los ángulos interiores miden menos de $180^\\circ$) y **cóncavos** (algún ángulo es mayor que $180^\\circ$, como una flecha o una estrella).

## Suma de los ángulos interiores

La clave: desde un vértice se pueden trazar diagonales que **dividen** el polígono en triángulos. Un polígono de $n$ lados se divide en $n - 2$ triángulos, y cada triángulo suma $180^\\circ$:

$$S = (n - 2) \\times 180^\\circ$$

- Triángulo: $(3 - 2) \\times 180 = 180^\\circ$.
- Cuadrilátero: $(4 - 2) \\times 180 = 360^\\circ$.
- Pentágono: $(5 - 2) \\times 180 = 540^\\circ$.
- Hexágono: $(6 - 2) \\times 180 = 720^\\circ$.

## Ángulo interior de un polígono regular

Si todos los ángulos son iguales, basta repartir la suma:

$$\\alpha = \\frac{(n - 2) \\times 180}{n}$$

Para un hexágono regular: $\\dfrac{720}{6} = 120^\\circ$. Para un cuadrado: $\\dfrac{360}{4} = 90^\\circ$.

## Ángulo exterior

El **ángulo exterior** de un vértice es el que se forma al prolongar un lado. Forma una línea recta con el interior, así que:

$$\\text{exterior} = 180^\\circ - \\text{interior}$$

Hay un resultado sorprendente: **los ángulos exteriores de cualquier polígono convexo suman siempre $360^\\circ$**. Imagina caminar por el borde: en cada vértice giras un poco, y al volver al inicio has dado exactamente **una vuelta completa**. Para un polígono regular:

$$\\beta = \\frac{360^\\circ}{n}$$

Esto da un atajo: el interior de un polígono regular es $180 - \\dfrac{360}{n}$. Con $n = 8$: $180 - 45 = 135^\\circ$.

## Diagonales

Una **diagonal** es un segmento que une dos vértices **no consecutivos**. Desde cada vértice salen $n - 3$ diagonales (no cuentan el propio vértice ni sus dos vecinos). Como cada diagonal se cuenta dos veces (una desde cada extremo), el total es:

$$D = \\frac{n(n - 3)}{2}$$

- Cuadrado: $\\dfrac{4 \\times 1}{2} = 2$ diagonales.
- Pentágono: $\\dfrac{5 \\times 2}{2} = 5$.
- Hexágono: $\\dfrac{6 \\times 3}{2} = 9$.

## Hallar el número de lados

Las fórmulas sirven en ambos sentidos. Si un polígono regular tiene ángulos exteriores de $30^\\circ$, entonces $n = \\dfrac{360}{30} = 12$ lados. Si la suma de sus ángulos interiores es $1080^\\circ$, entonces $(n - 2) \\times 180 = 1080$ y $n = 8$.

## Errores comunes

- **Usar $n \\times 180$** en vez de $(n - 2) \\times 180$.
- **Olvidar dividir entre 2** en las diagonales.
- **Aplicar la fórmula del ángulo interior** a un polígono que no es regular: ahí la suma no se reparte en partes iguales.
- **Confundir ángulo interior con exterior.**

## Practica

Escribe solo el número.

{{practice}}
`,
};
