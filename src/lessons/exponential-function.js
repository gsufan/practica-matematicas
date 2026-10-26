LESSONS["exponential-function"] = {
  minutes: 14,
  body: `
## Cuando lo que crece es el propio crecimiento

En una función lineal se **suma** la misma cantidad en cada paso. En una **función exponencial** se **multiplica por el mismo factor** en cada paso. La diferencia es enorme:

- Una pila que sube $2$ cm cada día: $2, 4, 6, 8, 10\\ldots$ (lineal).
- Un cultivo de bacterias que se duplica cada hora: $1, 2, 4, 8, 16, 32\\ldots$ (exponencial).

En poco tiempo, lo exponencial deja atrás a lo lineal.

## La definición

$$f(x) = a \\cdot b^x, \\qquad a \\neq 0,\\quad b > 0,\\ b \\neq 1$$

- $a$ es el **valor inicial**: lo que vale la función en $x = 0$, porque $b^0 = 1$.
- $b$ es la **base** o **factor de crecimiento**: por cuánto se multiplica en cada paso.

> Ojo con la diferencia con $x^2$: en la función **potencia** $x^2$ la variable está en la **base**; en la función **exponencial** $2^x$ la variable está en el **exponente**. Son muy distintas.

## Crecimiento y decaimiento

- Si $b > 1$: la función **crece** (crecimiento exponencial). Con $b = 2$ se duplica en cada paso.
- Si $0 < b < 1$: la función **decrece** (decaimiento). Con $b = \\frac{1}{2}$ se reduce a la mitad en cada paso.

{{fig:exp-graph}}

## Características de la gráfica

Para $f(x) = b^x$ (con $a = 1$):

- Pasa siempre por el punto $(0, 1)$.
- Es **siempre positiva**: la gráfica nunca baja del eje $x$.
- Tiene una **asíntota horizontal** en $y = 0$: se acerca a esa recta sin tocarla (hacia la izquierda si $b > 1$, hacia la derecha si $b < 1$).
- Su dominio son **todos los reales** y su recorrido es $y > 0$.

## Evaluar

Se calcula la potencia y se multiplica por $a$:

$$f(x) = 3 \\cdot 2^x \\quad \\Rightarrow \\quad f(4) = 3 \\cdot 2^4 = 3 \\cdot 16 = 48$$

Con base fraccionaria: $f(x) = 80 \\cdot \\left(\\frac{1}{2}\\right)^x$ y $x = 3$:

$$f(3) = 80 \\cdot \\frac{1}{8} = 10$$

## Encontrar la base

Si la función pasa por $(0, 3)$ y $(2, 48)$: de $f(0) = a = 3$ y $f(2) = 3b^2 = 48$, se tiene $b^2 = 16$ y $b = 4$.

## Modelos de crecimiento y decaimiento

- **Poblaciones:** $N(t) = N_0 \\cdot 2^t$ si la población se duplica en cada período $t$.
- **Decaimiento radiactivo:** $M(t) = M_0 \\cdot \\left(\\frac{1}{2}\\right)^t$; el tiempo en que se reduce a la mitad se llama **vida media**.
- **Interés compuesto:** si inviertes $P$ con interés $r$ por período, el monto después de $t$ períodos es:

$$A(t) = P(1 + r)^t$$

Con $P = 1000$, $r = 10\\%$ y $t = 3$: $A = 1000 \\cdot 1{,}1^3 = 1000 \\cdot 1{,}331 = 1331$. Cada año se calcula el interés sobre el total acumulado, **incluidos los intereses anteriores**, y por eso se llama compuesto.

## Desplazar la asíntota

Si a la función se le suma un número, $f(x) = a \\cdot b^x + c$, la gráfica **sube o baja** $c$ unidades, y la asíntota horizontal pasa a ser $y = c$. Es una transformación vertical, como las que ya viste.

## El número e

Existe una base especial, $e \\approx 2{,}718$, que aparece en el crecimiento **continuo** (dinero, poblaciones, procesos naturales). Se estudia en cálculo, y su logaritmo se llama **logaritmo natural**.

## Errores comunes

- **Confundir $2^x$ con $x^2$**, o con $2x$.
- **Multiplicar la base por el exponente** ($2^3 \\neq 6$; $2^3 = 8$).
- **Olvidar que $a$ multiplica el resultado** de la potencia.
- **Usar $1 + r$ con $r = 10$** en vez de $r = 0{,}10$ en el interés.

## Practica

{{practice}}
`,
};
