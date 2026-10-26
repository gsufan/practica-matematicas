LESSONS["pythagoras"] = {
  minutes: 14,
  body: `
## El teorema más famoso

En un **triángulo rectángulo** (el que tiene un ángulo de $90^\\circ$), los dos lados que forman el ángulo recto se llaman **catetos** y el lado opuesto, el más largo, es la **hipotenusa**. El **teorema de Pitágoras** relaciona los tres:

$$a^2 + b^2 = c^2$$

donde $a$ y $b$ son los catetos y $c$ es la hipotenusa.

{{fig:right-triangle}}

En palabras: **el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos**.

## La idea geométrica

El teorema habla literalmente de **cuadrados**. Si construyes un cuadrado sobre cada lado del triángulo, el área del cuadrado grande (el de la hipotenusa) es igual a la suma de las áreas de los dos cuadrados chicos. Existen más de cien demostraciones distintas; una de las más conocidas reacomoda cuatro copias del triángulo dentro de un cuadrado de dos maneras.

Es una propiedad solo de los triángulos **rectángulos**. Para los demás, no vale.

## Un ejemplo con números

Con catetos de $3$ y $4$:

$$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \\quad \\Rightarrow \\quad c = \\sqrt{25} = 5$$

La hipotenusa mide $5$.

## Calcular un cateto

Si conoces la hipotenusa y un cateto, despeja el que falta. Con $c = 13$ y $a = 5$:

$$b^2 = c^2 - a^2 = 169 - 25 = 144 \\quad \\Rightarrow \\quad b = 12$$

Fíjate en que ahora **se resta**. La hipotenusa siempre es el lado mayor, así que $c^2$ es el número más grande.

## Ternas pitagóricas

Una **terna pitagórica** son tres enteros que cumplen $a^2 + b^2 = c^2$. Algunas muy usadas:

- $3,\\ 4,\\ 5$
- $5,\\ 12,\\ 13$
- $8,\\ 15,\\ 17$
- $7,\\ 24,\\ 25$

Si multiplicas una terna por un número, obtienes otra: de $3, 4, 5$ salen $6, 8, 10$ y $9, 12, 15$. Los antiguos carpinteros usaban una cuerda con 12 nudos equidistantes, formando un triángulo $3, 4, 5$, para trazar ángulos rectos.

## El recíproco

También funciona al revés. Si en un triángulo se cumple $a^2 + b^2 = c^2$ para sus tres lados, **entonces es rectángulo**. Sirve para comprobar si una esquina es recta: mides $6$ y $8$ a lo largo de los bordes, y la diagonal debe medir exactamente $10$.

## Aplicaciones

- **Diagonal de un rectángulo:** la diagonal lo divide en dos triángulos rectángulos, así que $d = \\sqrt{b^2 + h^2}$.
- **Escalera apoyada en una pared:** la pared, el suelo y la escalera forman un triángulo rectángulo; la escalera es la hipotenusa.
- **Distancia entre dos puntos** del plano, que verás en el tema de plano cartesiano.

## Cuando el resultado no es entero

La mayoría de los triángulos rectángulos no tienen lados enteros. Con catetos $1$ y $1$, la hipotenusa es $\\sqrt{2}$: el primer número irracional que descubrieron los griegos. En esta práctica usamos ternas, para que las respuestas sean enteras.

## Errores comunes

- **Aplicarlo a triángulos que no son rectángulos.**
- **Sumar cuando hay que restar** al buscar un cateto.
- **Olvidar sacar la raíz** al final: $c^2 = 25$ no es la respuesta, $c = 5$ sí.
- **Elevar mal:** $3^2 + 4^2$ es $9 + 16$, no $(3 + 4)^2 = 49$.

## Practica

Escribe solo el número. En "¿Es rectángulo?", escribe 1 si lo es y 0 si no.

{{practice}}
`,
};
