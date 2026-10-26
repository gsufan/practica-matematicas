LESSONS["triangles"] = {
  minutes: 14,
  body: `
## El polígono más simple

Un **triángulo** es una figura cerrada con **tres lados**, **tres vértices** y **tres ángulos**. Es el polígono más simple, y a la vez el más importante: cualquier otro polígono se puede dividir en triángulos, y por eso casi toda la geometría se apoya en ellos.

Además es **rígido**: con tres varillas articuladas, la forma queda fija y no se deforma. Un cuadrado hecho de varillas, en cambio, se tuerce. Por eso los puentes, las torres y las estructuras de techos usan triángulos.

## Clasificación por sus lados

- **Equilátero:** los tres lados son iguales.
- **Isósceles:** dos lados son iguales.
- **Escaleno:** los tres lados son distintos.

## Clasificación por sus ángulos

- **Acutángulo:** los tres ángulos son agudos.
- **Rectángulo:** tiene un ángulo recto.
- **Obtusángulo:** tiene un ángulo obtuso.

Un triángulo solo puede tener **un** ángulo recto u obtuso. Veremos por qué ahora.

## La suma de los ángulos interiores

La propiedad central: **los tres ángulos interiores de un triángulo suman $180^\\circ$**.

{{fig:triangle-sum}}

Una forma de ver por qué: recorta las tres esquinas de un triángulo de papel y júntalas por el vértice. Forman una línea recta, es decir, $180^\\circ$. La demostración usa paralelas: si por un vértice se traza una paralela al lado opuesto, los ángulos alternos internos que se forman muestran que $\\alpha + \\beta + \\gamma$ forman un ángulo llano.

De esta propiedad salen varias conclusiones:

- Si conoces dos ángulos, el tercero es $180 - (\\text{suma de los dos})$.
- Un triángulo no puede tener dos ángulos rectos ni dos obtusos: se pasaría de $180^\\circ$.
- En un triángulo **equilátero**, cada ángulo mide $180 \\div 3 = 60^\\circ$.

## Triángulo isósceles

En un isósceles, los **ángulos opuestos a los lados iguales también son iguales**. Se llaman ángulos de la base. Entonces:

- Si conoces el ángulo del vértice $V$, cada ángulo de la base mide $\\dfrac{180 - V}{2}$.
- Si conoces un ángulo de la base $b$, el del vértice mide $180 - 2b$.

Ejemplo: vértice de $40^\\circ$, base: $(180 - 40) \\div 2 = 70^\\circ$ cada uno.

## Ángulo exterior

Si prolongas un lado de un triángulo, el ángulo que se forma afuera es el **ángulo exterior**. Vale la **suma de los dos ángulos interiores que no están a su lado**:

$$\\text{exterior} = \\alpha + \\gamma$$

Se explica fácil: el interior del vértice y el exterior forman una línea recta (suman $180^\\circ$), y los tres interiores también suman $180^\\circ$. Al quitar el interior de ambos lados, el exterior queda igual a la suma de los otros dos.

## Con álgebra

Si los ángulos son $x$, $2x$ y $3x$, se plantea:

$$x + 2x + 3x = 180 \\quad \\Rightarrow \\quad 6x = 180 \\quad \\Rightarrow \\quad x = 30$$

Los ángulos miden $30^\\circ$, $60^\\circ$ y $90^\\circ$: es un triángulo rectángulo.

## ¿Se puede construir un triángulo?

No cualquier terna de medidas forma un triángulo. La **desigualdad triangular** dice que cada lado debe ser **menor que la suma de los otros dos**. Basta comprobarlo con el lado mayor:

$$\\text{lado mayor} < \\text{suma de los otros dos}$$

- Con $3$, $4$ y $5$: $5 < 3 + 4 = 7$ ✓. Sí se puede.
- Con $2$, $3$ y $6$: $6 < 2 + 3 = 5$ ✗. No se puede: los dos lados cortos no alcanzan a "cerrar" la figura.
- Con $2$, $3$ y $5$: $5 = 2 + 3$. Los lados quedan alineados y la figura se aplana. Tampoco es un triángulo.

La razón es simple: el camino más corto entre dos puntos es la línea recta. Ir de un vértice a otro por los otros dos lados no puede ser más corto que ir directo.

## Puntos y rectas notables

Cada triángulo tiene líneas especiales: las **alturas** (perpendiculares desde un vértice al lado opuesto), las **medianas** (de un vértice al punto medio del lado opuesto) y las **bisectrices** (que parten un ángulo en dos iguales). Las verás más adelante; por ahora, recuerda que la altura es la que se usa para calcular el área.

## Errores comunes

- **Olvidar que la suma es $180^\\circ$.** Es la herramienta más usada.
- **Suponer que un triángulo es isósceles o rectángulo por cómo se ve** en el dibujo. Solo valen las marcas y los datos.
- **Aplicar la desigualdad triangular con el lado equivocado.** Compara siempre el **mayor** contra la suma de los otros dos.
- **Confundir el ángulo exterior** con el interior del mismo vértice.

## Practica

Escribe solo el número. En "¿Se puede construir?", escribe 1 si se puede y 0 si no.

{{practice}}
`,
};
