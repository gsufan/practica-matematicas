LESSONS["logarithms"] = {
  minutes: 14,
  body: `
## La pregunta que responde un logaritmo

Ya sabes calcular potencias: $2^5 = 32$. Tienes una base (2), un exponente (5) y un resultado (32). Hay tres preguntas posibles:

- Dados **base y exponente**, ¿cuál es el resultado? Eso es una **potencia**: $2^5 = ?$
- Dados **exponente y resultado**, ¿cuál es la base? Eso es una **raíz**: $\\sqrt[5]{32} = ?$
- Dados **base y resultado**, ¿cuál es el exponente? Eso es un **logaritmo**: $\\log_2 32 = ?$

El logaritmo es la tercera pregunta, la que faltaba. Responde: **¿a qué exponente hay que elevar la base para obtener este número?**

## Definición

$$\\log_b x = n \\quad \\Longleftrightarrow \\quad b^n = x$$

Se lee "logaritmo en base $b$ de $x$ es $n$". Las dos frases dicen exactamente lo mismo; la segunda usa potencias y la primera usa logaritmos. Siempre puedes traducir entre ellas.

$$\\log_2 32 = 5 \\quad \\text{porque} \\quad 2^5 = 32$$

$$\\log_{10} 1000 = 3 \\quad \\text{porque} \\quad 10^3 = 1000$$

> Un logaritmo **es un exponente**. Cuando no sepas qué hacer, reescribe la expresión como potencia: $\\log_3 81 = ?$ se convierte en $3^? = 81$, y la respuesta es $4$.

## Condiciones

Para que un logaritmo exista:

- La **base** debe ser positiva y distinta de 1 ($b > 0$, $b \\neq 1$). Con base 1, todas las potencias valen 1.
- El **argumento** debe ser positivo ($x > 0$). Ninguna potencia de una base positiva da un número negativo o cero.

Por eso $\\log_2 (-4)$ y $\\log_2 0$ no existen en los reales.

## Valores que siempre ocurren

- $\\log_b 1 = 0$, porque $b^0 = 1$.
- $\\log_b b = 1$, porque $b^1 = b$.
- $\\log_b b^n = n$: el logaritmo "deshace" a la potencia.
- $b^{\\log_b x} = x$: y la potencia "deshace" al logaritmo.

Los logaritmos de fracciones salen negativos: $\\log_2 \\frac{1}{8} = -3$, porque $2^{-3} = \\frac{1}{8}$.

## Propiedades

Como los logaritmos son exponentes, heredan las propiedades de las potencias. Pasan una operación al "nivel de abajo":

- **Producto → suma:** $\\log_b (x \\cdot y) = \\log_b x + \\log_b y$
- **Cociente → resta:** $\\log_b \\frac{x}{y} = \\log_b x - \\log_b y$
- **Potencia → producto:** $\\log_b x^{p} = p \\cdot \\log_b x$

La primera es la regla de sumar exponentes: $\\log_2 (4 \\cdot 8)$ es $\\log_2 32 = 5$, y también $\\log_2 4 + \\log_2 8 = 2 + 3 = 5$.

> Cuidado: $\\log_b (x + y)$ **no** es $\\log_b x + \\log_b y$. No existe una fórmula simple para el logaritmo de una suma.

## Los logaritmos más usados

- **Logaritmo decimal**, base 10, que se escribe $\\log x$ sin base. $\\log 1000 = 3$.
- **Logaritmo natural**, base $e \\approx 2{,}718$, que se escribe $\\ln x$. Aparece en el crecimiento continuo y en cálculo.
- **Logaritmo en base 2**, central en computación: cuántos bits hacen falta para representar $x$ opciones.

## Para qué sirven

Convierten **multiplicaciones en sumas**, lo que antes de las calculadoras permitía hacer cuentas gigantes con una regla de cálculo. Hoy sirven sobre todo para medir cosas que cambian en **órdenes de magnitud**:

- **Decibeles** (sonido), **escala de Richter** (terremotos) y **pH** (acidez) son escalas logarítmicas: sumar 1 en la escala significa multiplicar por 10 la cantidad.
- Resolver ecuaciones donde la incógnita está en el exponente, como $2^x = 50$.
- Analizar la eficiencia de algoritmos (por ejemplo, la búsqueda binaria cuesta $\\log_2 n$ pasos).

## Errores comunes

- **Olvidar que el resultado es un exponente.** $\\log_2 8$ es 3, no 4.
- **Confundir base y argumento.** $\\log_2 8 = 3$ pero $\\log_8 2 = \\frac{1}{3}$.
- **Aplicar propiedades que no existen.** $\\log (x + y) \\neq \\log x + \\log y$.
- **Calcular el logaritmo de un número no positivo.**

## Practica

Los logaritmos de este ejercicio siempre dan enteros. Si no sabes qué hacer, pregúntate: ¿a qué exponente elevo la base?

{{practice}}
`,
};
