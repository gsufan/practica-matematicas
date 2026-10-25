LESSONS["decimals"] = {
  minutes: 12,
  body: `
## Qué es un decimal

Un **número decimal** es otra forma de escribir una fracción cuyo denominador es 10, 100, 1000, etc. La coma separa la parte entera de la parte decimal:

$$3{,}25 = 3 + \\frac{2}{10} + \\frac{5}{100} = \\frac{325}{100}$$

Es la misma idea del valor posicional de los enteros, pero hacia la derecha. Cada posición vale **la décima parte** de la que está a su izquierda:

$$\\dots \\; 100 \\;\\; 10 \\;\\; 1 \\;,\\; \\frac{1}{10} \\;\\; \\frac{1}{100} \\;\\; \\frac{1}{1000} \\; \\dots$$

Se leen como décimas, centésimas y milésimas. Así, $0{,}007$ son siete milésimas.

> En español la coma separa los decimales y, cuando se agrupan miles, se usa un espacio o un punto. En muchos países anglosajones es al revés. Esta página acepta ambos al escribir tus respuestas: \`2,5\` y \`2.5\` valen lo mismo.

## Ceros que sí y ceros que no importan

- Agregar ceros **al final** de la parte decimal no cambia el valor: $2{,}5 = 2{,}50 = 2{,}500$.
- Agregar ceros **justo después de la coma** sí lo cambia: $2{,}5 \\neq 2{,}05$.
- Los ceros a la izquierda de la parte entera no valen nada: $007 = 7$.

Esto sirve para **comparar** decimales: iguala la cantidad de cifras con ceros y compara como si fueran enteros. $0{,}8$ y $0{,}75$ se comparan como $0{,}80$ y $0{,}75$, así que $0{,}8 > 0{,}75$. Aunque 75 "parezca más grande que 8", es una fracción más pequeña.

## De fracción a decimal

Una fracción es una división, así que para pasarla a decimal basta dividir el numerador entre el denominador:

$$\\frac{3}{4} = 3 \\div 4 = 0{,}75$$

Cuando el denominador se puede llevar a 10, 100 o 1000 multiplicando, hay un atajo: $\\frac{3}{4} = \\frac{3 \\times 25}{4 \\times 25} = \\frac{75}{100} = 0{,}75$. Esto funciona con denominadores como 2, 4, 5, 8, 10, 20, 25 y 50, porque solo tienen como factores primos al 2 y al 5.

## Decimales que terminan y decimales periódicos

- **Finitos:** terminan. $\\frac{1}{8} = 0{,}125$.
- **Periódicos:** repiten un grupo de cifras para siempre. $\\frac{1}{3} = 0{,}333\\dots = 0{,}\\overline{3}$ y $\\frac{1}{7} = 0{,}\\overline{142857}$.

Todo decimal que termina o que se repite es racional (una fracción). Los decimales que ni terminan ni se repiten son los irracionales, como $\\pi$.

## De decimal a fracción

Se escribe el decimal sobre una potencia de 10 y se simplifica:

$$0{,}35 = \\frac{35}{100} = \\frac{7}{20}$$

## Sumar y restar decimales

Se **alinean las comas** una bajo la otra, se completan con ceros y se opera como con enteros:

$$3{,}25 + 1{,}6 = 3{,}25 + 1{,}60 = 4{,}85$$

La coma del resultado queda en la misma columna. En la resta pasa igual, empezando por el número mayor.

## Multiplicar decimales

Se multiplica **como si no hubiera comas** y luego se colocan tantos decimales como tengan los dos factores juntos:

$$3{,}25 \\times 1{,}6: \\quad 325 \\times 16 = 5200, \\quad 2 + 1 = 3 \\text{ decimales} \\quad \\Rightarrow \\quad 5{,}200 = 5{,}2$$

La razón: $3{,}25 = \\frac{325}{100}$ y $1{,}6 = \\frac{16}{10}$, así que el producto es $\\frac{5200}{1000}$.

## Dividir decimales

Si el divisor tiene coma, se multiplican **ambos números por 10, 100…** hasta que el divisor sea entero. El resultado no cambia, porque se multiplicó arriba y abajo por lo mismo:

$$7{,}5 \\div 1{,}5 = \\frac{7{,}5 \\times 10}{1{,}5 \\times 10} = 75 \\div 15 = 5$$

## Errores comunes

- **Alinear por la derecha en vez de por la coma** al sumar.
- **Contar mal los decimales** al multiplicar.
- **Creer que multiplicar siempre agranda.** $0{,}5 \\times 8 = 4$ es menor que 8, y $8 \\times 0{,}5$ es "la mitad de 8".
- **Pensar que más cifras decimales es más grande.** $0{,}125 < 0{,}5$.

## Practica

Puedes responder con coma o con punto, por ejemplo \`2,5\`. También se aceptan fracciones, como \`5/2\`.

{{practice}}
`,
};
