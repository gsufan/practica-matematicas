LESSONS["logarithmic-function"] = {
  minutes: 13,
  body: `
## La inversa de la exponencial

Ya conoces los logaritmos como la pregunta "¿a qué exponente elevo la base para obtener este número?" y ya viste la **función inversa**. Aquí se unen las dos ideas: la **función logarítmica** es la **inversa** de la función exponencial.

$$f(x) = b^x \\quad \\longleftrightarrow \\quad f^{-1}(x) = \\log_b x$$

Lo que una hace, la otra lo deshace: $\\log_2 (2^5) = 5$ y $2^{\\log_2 8} = 8$.

## Como pares de puntos

Como las inversas **intercambian** las coordenadas, cada punto $(a, b)$ de $2^x$ se transforma en $(b, a)$ de $\\log_2 x$:

- $2^3 = 8$ es el punto $(3, 8)$; por lo tanto, $\\log_2 8 = 3$ es el punto $(8, 3)$.
- $2^0 = 1$ es $(0, 1)$; entonces $\\log_2 1 = 0$ es $(1, 0)$.
- $2^{-1} = \\frac{1}{2}$ es $\\left(-1, \\frac{1}{2}\\right)$; entonces $\\log_2 \\frac{1}{2} = -1$.

{{fig:log-graph}}

## Características de la gráfica

Para $f(x) = \\log_b x$ con $b > 1$:

- Pasa siempre por $(1, 0)$, porque $\\log_b 1 = 0$.
- Pasa por $(b, 1)$, porque $\\log_b b = 1$.
- Es **creciente**, pero cada vez **más lentamente**.
- Tiene una **asíntota vertical** en $x = 0$: se acerca al eje $y$ sin tocarlo.
- Su **dominio** es $x > 0$ y su **recorrido** son todos los reales (la inversa del dominio y recorrido de la exponencial).

## Dominio

Solo existen logaritmos de números **positivos**. Si el argumento es una expresión, se pide que sea mayor que cero:

$$f(x) = \\log(x - 4) \\quad \\Rightarrow \\quad x - 4 > 0 \\quad \\Rightarrow \\quad x > 4$$

Con desigualdad **estricta** ($>$), porque el logaritmo de $0$ tampoco existe. Fíjate en la diferencia con las raíces, donde se pedía $\\geq 0$.

## Asíntota vertical desplazada

Si el argumento es $x - a$, la gráfica se desplaza $a$ a la derecha y la asíntota vertical pasa a ser $x = a$. Es el valor donde el argumento se anula.

## Resolver ecuaciones exponenciales

Una ecuación donde la incógnita está en el exponente se resuelve de dos maneras:

- **Igualando bases:** si puedes escribir los dos lados como potencias de la misma base, los exponentes son iguales. $2^x = 32 = 2^5$ implica $x = 5$.
- **Con el logaritmo:** $b^x = c$ significa $x = \\log_b c$. Es la manera general cuando las bases no se igualan fácilmente.

Con un desplazamiento en el exponente: $3^{x - 2} = 81$. Como $81 = 3^4$: $x - 2 = 4$, así que $x = 6$.

## Ecuaciones con logaritmos

La definición también sirve al revés: $\\log_3 x = 4$ significa $3^4 = x$, es decir $x = 81$. Siempre puedes pasar de una forma a la otra.

## Dónde aparecen

Como crece tan lentamente, el logaritmo sirve para **comprimir escalas** enormes:

- **Decibeles** (sonido): cada $10$ dB significa $10$ veces más energía.
- **Escala de Richter** (terremotos): cada punto es $10$ veces más amplitud.
- **pH** (acidez): $\\text{pH} = -\\log[H^+]$.
- **Computación:** el número de pasos de una búsqueda binaria en $n$ datos es $\\log_2 n$.

## Errores comunes

- **Dar un valor negativo o cero como argumento** del logaritmo.
- **Confundir la asíntota vertical** de la logarítmica con la horizontal de la exponencial.
- **Olvidar que el dominio usa $>$** (estricto).
- **Invertir los papeles** de base y argumento: $\\log_2 8 = 3$, pero $\\log_8 2 = \\frac{1}{3}$.

## Practica

Para el dominio, escribe la desigualdad: \`x > 4\`.

{{practice}}
`,
};
