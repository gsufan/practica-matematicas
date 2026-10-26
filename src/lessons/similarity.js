LESSONS["similarity"] = {
  minutes: 14,
  body: `
## Mismo aspecto, distinto tamaño

Dos figuras son **semejantes** cuando tienen **la misma forma**, aunque no el mismo tamaño. Una foto y su ampliación, un plano y la casa real, una maqueta y el edificio: todos son pares de figuras semejantes. Se escribe $\\sim$: $\\triangle ABC \\sim \\triangle A'B'C'$.

## La definición

Dos polígonos son semejantes si cumplen **dos condiciones a la vez**:

- Sus **ángulos correspondientes** son iguales.
- Sus **lados correspondientes** son **proporcionales**.

Para los triángulos basta con **una** de las dos, y existen criterios más cortos (que dos ángulos sean iguales ya alcanza).

## La razón de semejanza

Al dividir cada lado de la figura grande entre su lado correspondiente de la figura chica, siempre se obtiene el mismo número, la **razón de semejanza** $k$:

$$k = \\frac{a'}{a} = \\frac{b'}{b} = \\frac{c'}{c}$$

{{fig:similar-triangles}}

Si $k = 2$, todas las longitudes se duplican. Si $k = \\frac{1}{3}$, se reducen a la tercera parte.

> Ojo: la razón de semejanza es para **longitudes**. Las áreas cambian con $k^2$ y los volúmenes con $k^3$. Si duplicas los lados de un cuadrado, su área se multiplica por 4.

## Encontrar un lado que falta

Con la proporción y el producto cruzado. Los triángulos tienen lados $3, 4, 5$ y $9, 12, x$:

$$\\frac{3}{9} = \\frac{5}{x} \\quad \\Rightarrow \\quad 3x = 45 \\quad \\Rightarrow \\quad x = 15$$

Otra forma, sin ecuaciones: la razón es $9 \\div 3 = 3$, así que el lado que corresponde a $5$ mide $5 \\times 3 = 15$.

La parte difícil es **emparejar bien** los lados correspondientes: el lado más corto con el más corto, el más largo con el más largo. Si los ángulos están marcados, los lados correspondientes son los **opuestos a ángulos iguales**.

## El teorema de Tales

Si en un triángulo trazas una recta **paralela a uno de los lados**, esa recta corta a los otros dos lados en partes **proporcionales**, y forma un triángulo más chico semejante al original.

Con la paralela $DE \\parallel BC$:

$$\\frac{AD}{DB} = \\frac{AE}{EC}$$

Ejemplo: si $AD = 4$, $DB = 6$ y $AE = 6$, entonces $\\dfrac{4}{6} = \\dfrac{6}{EC}$, y $EC = \\dfrac{6 \\times 6}{4} = 9$.

El mismo teorema se aplica a **varias paralelas cortadas por dos transversales**: los segmentos que determinan son proporcionales. Se atribuye a Tales de Mileto, quien según la tradición midió la altura de una pirámide con su sombra.

## Medir con sombras

En el mismo momento del día, los rayos del sol llegan con el mismo ángulo. Un poste y su sombra, y un árbol y la suya, forman **triángulos semejantes**:

$$\\frac{\\text{altura del poste}}{\\text{sombra del poste}} = \\frac{\\text{altura del árbol}}{\\text{sombra del árbol}}$$

Un poste de $2$ m con sombra de $3$ m, y un árbol con sombra de $12$ m: $\\dfrac{2}{3} = \\dfrac{h}{12}$ y $h = 8$ m.

## Escalas

Una **escala** es una razón de semejanza entre el dibujo y la realidad. En un mapa $1 : 50\\,000$, cada $1$ cm del mapa son $50\\,000$ cm reales, es decir $500$ m. Para convertir:

- Multiplica la medida del mapa por el segundo número de la escala.
- Pasa de cm a m dividiendo entre $100$, y de m a km dividiendo entre $1000$ (de cm a km, entre $100\\,000$).

Ejemplo: $3$ cm en un mapa $1 : 50\\,000$ son $150\\,000$ cm, es decir $1{,}5$ km.

## Cómo escribir tu respuesta

Escribe el número. Para las distancias en kilómetros puedes usar decimales con coma, como \`1,5\`.

## Errores comunes

- **Emparejar mal los lados correspondientes.**
- **Aplicar $k$ a áreas** en vez de $k^2$.
- **Confundir semejante con congruente.** Congruente: misma forma **y** mismo tamaño ($k = 1$).
- **Olvidar convertir unidades** en problemas de escalas.

## Practica

{{practice}}
`,
};
