LESSONS["fractions"] = {
  minutes: 16,
  body: `
## Qué es una fracción

Una **fracción** escribe una parte de un todo. Si divides una pizza en 8 trozos iguales y comes 3, comiste $\\frac{3}{8}$ de la pizza:

$$\\frac{\\text{numerador}}{\\text{denominador}} = \\frac{3}{8}$$

El **denominador** nombra el tamaño de las partes (octavos, tercios, quintos) y el **numerador** cuenta cuántas hay. Por eso el denominador nunca puede ser cero: no existe un reparto en cero partes.

## Tres formas de ver lo mismo

- **Parte de un todo:** $\\frac{3}{4}$ de una barra de chocolate.
- **División:** $\\frac{3}{4}$ es lo mismo que $3 \\div 4$. Es lo que le toca a cada persona si se reparten 3 barras entre 4.
- **Un punto en la recta:** $\\frac{3}{4}$ está entre el 0 y el 1, a tres cuartos del camino.

La segunda idea explica por qué las fracciones son los números racionales: toda división de enteros es una fracción.

## Fracciones propias, impropias y mixtas

- **Propia:** el numerador es menor que el denominador, y vale menos que 1. $\\frac{3}{4}$.
- **Impropia:** el numerador es mayor o igual que el denominador, y vale 1 o más. $\\frac{7}{4}$.
- **Número mixto:** parte entera más fracción. $\\frac{7}{4} = 1\\frac{3}{4}$, porque $7 = 4 + 3$, o sea un entero y tres cuartos.

Para pasar de impropia a mixta se divide: $7 \\div 4 = 1$ con resto $3$. Para volver, se multiplica y se suma: $1\\frac{3}{4} = \\frac{1 \\times 4 + 3}{4} = \\frac{7}{4}$.

## Fracciones equivalentes

Dos fracciones pueden verse distintas y valer lo mismo:

$$\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{50}{100}$$

Si multiplicas (o divides) el numerador y el denominador por el mismo número, la fracción no cambia, porque estás partiendo cada trozo en más trozos más pequeños sin tocar la cantidad total:

$$\\frac{3}{5} = \\frac{3 \\times 2}{5 \\times 2} = \\frac{6}{10}$$

## Simplificar

**Simplificar** es dividir arriba y abajo por un mismo número hasta que no se pueda más. La forma final se llama **fracción irreducible**. El camino más seguro es dividir por el **máximo común divisor** (mcd) de ambos números:

$$\\frac{18}{24}: \\quad \\text{mcd}(18, 24) = 6 \\quad \\Rightarrow \\quad \\frac{18 \\div 6}{24 \\div 6} = \\frac{3}{4}$$

> Una respuesta como $\\frac{6}{8}$ vale lo mismo que $\\frac{3}{4}$, pero en matemáticas se espera siempre la fracción **simplificada**. En la práctica de esta página, si escribes una fracción sin simplificar la app te lo avisa.

## Comparar fracciones

Con el mismo denominador, la mayor es la de mayor numerador: $\\frac{5}{8} > \\frac{3}{8}$. Con distinto denominador se pueden comparar **multiplicando en cruz**:

$$\\frac{a}{b} \\text{ y } \\frac{c}{d}: \\quad a \\times d \\text{ contra } c \\times b$$

Por ejemplo, $\\frac{3}{4}$ y $\\frac{5}{7}$: $3 \\times 7 = 21$ y $5 \\times 4 = 20$. Como $21 > 20$, entonces $\\frac{3}{4} > \\frac{5}{7}$.

## Sumar y restar fracciones

Solo se pueden sumar partes **del mismo tamaño**. Si el denominador es igual, se suman los numeradores y el denominador se queda:

$$\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$$

Si los denominadores son distintos, primero se busca un **denominador común**, de preferencia el **mínimo común múltiplo** (mcm) de ambos:

$$\\frac{1}{4} + \\frac{1}{6}: \\quad \\text{mcm}(4, 6) = 12 \\quad \\Rightarrow \\quad \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$$

Para convertir, se multiplica cada fracción por lo necesario: $\\frac{1}{4} = \\frac{1 \\times 3}{4 \\times 3} = \\frac{3}{12}$ y $\\frac{1}{6} = \\frac{1 \\times 2}{6 \\times 2} = \\frac{2}{12}$. La resta funciona igual.

> El error más común es sumar también los denominadores: $\\frac{1}{2} + \\frac{1}{3} \\neq \\frac{2}{5}$. Es fácil verlo: medio más un tercio ya supera a un medio, pero $\\frac{2}{5}$ es menos que un medio. La suma correcta es $\\frac{5}{6}$.

## Multiplicar fracciones

Aquí no hace falta denominador común. Se multiplican los numeradores entre sí y los denominadores entre sí:

$$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{2 \\times 4}{3 \\times 5} = \\frac{8}{15}$$

Se entiende con un rectángulo: tomar $\\frac{2}{3}$ de un trozo que ya es $\\frac{4}{5}$ del total. "De" en una fracción significa multiplicar. Como un resultado puede salir simplificable, al final hay que revisar: $\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$.

## Dividir fracciones

Dividir entre una fracción equivale a **multiplicar por su inversa** (se intercambian numerador y denominador):

$$\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}$$

¿Por qué funciona? Dividir entre $\\frac{4}{5}$ pregunta "¿cuántas veces cabe $\\frac{4}{5}$ en el número?". Si cada unidad se parte en quintos, caben 5 quintos por unidad, y luego se agrupan de a 4. Eso es multiplicar por 5 y dividir entre 4.

## Errores comunes

- **Sumar numeradores con numeradores y denominadores con denominadores**, como si fuera una multiplicación.
- **Buscar denominador común al multiplicar o dividir.** No hace falta.
- **Olvidar simplificar** el resultado.
- **Invertir la fracción equivocada** al dividir: se invierte la segunda (el divisor), no la primera.

## Practica

Responde con la fracción simplificada, por ejemplo \`3/4\`. Si el resultado es un número entero, escribe solo el entero. También se acepta un decimal, como \`0,75\`.

{{practice}}
`,
};
