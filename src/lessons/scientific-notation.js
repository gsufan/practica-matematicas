LESSONS["scientific-notation"] = {
  minutes: 9,
  body: `
## Para qué sirve

Los números muy grandes o muy pequeños son difíciles de leer y de comparar. La distancia de la Tierra al Sol es de unos $150\\,000\\,000\\,000$ metros; la masa de un electrón es $0{,}00000000000000000000000000000091$ kg. Contar los ceros es tedioso y es fácil equivocarse.

La **notación científica** resuelve esto usando potencias de 10:

$$150\\,000\\,000\\,000 = 1{,}5 \\times 10^{11}$$

## La forma estándar

Un número está en notación científica cuando se escribe como:

$$a \\times 10^{n}, \\qquad 1 \\leq |a| < 10, \\quad n \\in \\mathbb{Z}$$

- El **coeficiente** $a$ tiene **una sola cifra distinta de cero antes de la coma**.
- El **exponente** $n$ es un entero que dice cuántas veces se multiplica (o divide) por 10.

Por eso $45 \\times 10^3$ no está en notación científica (el coeficiente es mayor que 10), aunque sea correcto: se escribe $4{,}5 \\times 10^4$.

## Potencias de 10

Es la base de todo y ya la conoces del tema de potencias:

$$10^3 = 1000 \\quad 10^2 = 100 \\quad 10^1 = 10 \\quad 10^0 = 1 \\quad 10^{-1} = 0{,}1 \\quad 10^{-2} = 0{,}01$$

Multiplicar por $10^n$ corre la coma, y la cantidad de lugares la dice el exponente.

## De notación científica a decimal

- **Exponente positivo:** la coma se corre **a la derecha**, tantos lugares como indique el exponente. Se completa con ceros.
- **Exponente negativo:** la coma se corre **a la izquierda**.

$$3{,}2 \\times 10^{4} = 32\\,000 \\qquad 3{,}2 \\times 10^{-4} = 0{,}00032$$

## De decimal a notación científica

Se hace al revés: se corre la coma hasta que quede una sola cifra distinta de cero a la izquierda, y se **cuentan los lugares**.

- Si moviste la coma **a la izquierda** (el número era grande), el exponente es **positivo**.
- Si la moviste **a la derecha** (el número era pequeño), el exponente es **negativo**.

$$45\\,000 = 4{,}5 \\times 10^{4} \\qquad 0{,}0032 = 3{,}2 \\times 10^{-3}$$

## Multiplicar y dividir en notación científica

Las propiedades de las potencias hacen el trabajo: se operan los coeficientes y se suman (o restan) los exponentes.

$$(2 \\times 10^{3}) \\times (3 \\times 10^{4}) = 6 \\times 10^{7}$$

A veces el coeficiente se pasa de 10 y hay que reacomodar: $(5 \\times 10^{3}) \\times (4 \\times 10^{2}) = 20 \\times 10^{5} = 2 \\times 10^{6}$.

## Orden de magnitud

El exponente dice, a grandes rasgos, **qué tan grande** es el número. Comparar $10^{8}$ con $10^{5}$ es inmediato: el primero es $1000$ veces mayor. Para comparar dos números en notación científica, mira primero el exponente y, si coincide, compara los coeficientes.

## Errores comunes

- **Contar mal los lugares** al correr la coma.
- **Poner el signo del exponente al revés.** Número grande, exponente positivo; número pequeño, exponente negativo.
- **Dejar un coeficiente fuera del rango** $1 \\leq a < 10$.

## Practica

Para convertir a decimal, escribe el número completo, por ejemplo \`32000\` o \`0,0032\`. Para el exponente, escribe un entero, que puede ser negativo.

{{practice}}
`,
};
