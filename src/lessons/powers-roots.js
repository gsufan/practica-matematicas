LESSONS["powers-roots"] = {
  minutes: 15,
  body: `
## Qué es una potencia

Una **potencia** es una forma abreviada de escribir una multiplicación repetida, igual que multiplicar abrevia una suma repetida:

$$5 + 5 + 5 = 3 \\times 5 \\qquad \\text{y} \\qquad 5 \\times 5 \\times 5 = 5^3$$

En $a^n$, el número $a$ se llama **base** (lo que se multiplica) y $n$ se llama **exponente** (cuántas veces). Se lee "a elevado a n".

$$2^4 = 2 \\times 2 \\times 2 \\times 2 = 16$$

Dos casos con nombre propio: $a^2$ es "a al cuadrado" (el área de un cuadrado de lado $a$) y $a^3$ es "a al cubo" (el volumen de un cubo de arista $a$).

> Mucho cuidado: $2^4$ **no** es $2 \\times 4$. Es $2 \\times 2 \\times 2 \\times 2 = 16$, y $2 \\times 4 = 8$.

## Exponentes especiales

- **Exponente 1:** $a^1 = a$. Un solo factor.
- **Exponente 0:** $a^0 = 1$ para cualquier $a \\neq 0$. Se justifica con el patrón: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$, y cada vez que el exponente baja una unidad el resultado se divide entre 2. El siguiente paso lógico es $2^0 = 1$.

## Potencias con base negativa

El signo depende de la paridad del exponente:

- Exponente **par:** el resultado es positivo. $(-3)^2 = 9$.
- Exponente **impar:** el resultado es negativo. $(-3)^3 = -27$.

La razón es la regla de signos: cada par de negativos se cancela. Los paréntesis son importantes: $(-3)^2 = 9$, pero $-3^2 = -9$, porque ahí el exponente solo afecta al 3.

## Exponentes negativos

Siguiendo el mismo patrón, si el exponente sigue bajando, el resultado se sigue dividiendo entre 2: $2^0 = 1$, $2^{-1} = \\frac{1}{2}$, $2^{-2} = \\frac{1}{4}$. Un exponente negativo **invierte la base**:

$$a^{-n} = \\frac{1}{a^n}$$

Un exponente negativo no hace negativo al resultado: $2^{-3} = \\frac{1}{8}$ sigue siendo positivo, solo es pequeño.

## Propiedades de las potencias

Con la misma base se cumplen estas tres reglas:

- **Producto:** $a^m \\times a^n = a^{m+n}$. Ejemplo: $2^3 \\times 2^2 = 2^5 = 32$.
- **Cociente:** $\\frac{a^m}{a^n} = a^{m-n}$. Ejemplo: $\\frac{5^6}{5^4} = 5^2 = 25$.
- **Potencia de una potencia:** $(a^m)^n = a^{m \\times n}$. Ejemplo: $(2^3)^2 = 2^6 = 64$.

Se entienden con un ejemplo: $2^3 \\times 2^2$ es $(2 \\times 2 \\times 2) \\times (2 \\times 2)$, que son cinco factores en total, es decir $2^5$. Sumar exponentes no es una regla arbitraria: es **contar factores**.

## Raíces: la operación inversa

La **raíz cuadrada** de un número es el que, multiplicado por sí mismo, da el original:

$$\\sqrt{49} = 7 \\quad \\text{porque} \\quad 7^2 = 49$$

Elevar al cuadrado y sacar la raíz se deshacen entre sí, igual que la suma y la resta, o la multiplicación y la división. La **raíz cúbica** hace lo mismo con el cubo: $\\sqrt[3]{27} = 3$ porque $3^3 = 27$. En general, $\\sqrt[n]{x}$ es el número que elevado a $n$ da $x$.

## Cuadrados y cubos que conviene conocer

- Cuadrados: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$.
- Cubos: $1, 8, 27, 64, 125, 1000$.

Un número que es el cuadrado de un entero se llama **cuadrado perfecto**. Si la raíz de un entero no es entera, es irracional (como $\\sqrt{2}$), tema que viste en los conjuntos numéricos.

## Raíces de números negativos

Con raíces de índice **par** hay una restricción: dentro de los números reales, $\\sqrt{-4}$ no existe, porque ningún real al cuadrado da un negativo. Con índice **impar** sí existe: $\\sqrt[3]{-8} = -2$, porque $(-2)^3 = -8$.

## Errores comunes

- **Confundir $a^n$ con $a \\times n$.**
- **Sumar las bases** al multiplicar potencias: $2^3 \\times 2^2$ es $2^5$, no $4^5$.
- **Aplicar la regla del producto con bases distintas.** $2^3 \\times 3^2$ no se simplifica sumando exponentes.
- **Decir que $\\sqrt{9} = \\pm 3$.** Por definición, la raíz cuadrada devuelve el resultado **positivo**: $\\sqrt{9} = 3$.

## Practica

Para exponentes negativos responde con una fracción, por ejemplo \`1/8\`.

{{practice}}
`,
};
