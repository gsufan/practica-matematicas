LESSONS["order-of-operations"] = {
  minutes: 10,
  body: `
## El problema: una expresión, dos resultados

Mira esta expresión:

$$3 + 4 \\times 2$$

Si calculas de izquierda a derecha, haces $3 + 4 = 7$ y luego $7 \\times 2 = 14$. Pero si haces primero $4 \\times 2 = 8$, queda $3 + 8 = 11$. Dos caminos, dos resultados distintos. Para que todo el mundo obtenga el mismo número, las matemáticas fijaron un **orden de operaciones**: una convención compartida, igual que la regla de escribir de izquierda a derecha.

## Por qué la multiplicación va antes de la suma

No es un capricho. Recuerda que multiplicar es sumar repetido: $4 \\times 2$ significa "4 veces el 2", es decir, $2 + 2 + 2 + 2$. Entonces:

$$3 + 4 \\times 2 = 3 + (2 + 2 + 2 + 2) = 11$$

La multiplicación es una forma abreviada de escribir un bloque de sumas, y el bloque se calcula antes de juntarlo con el resto. Por eso se le da más prioridad.

## La jerarquía

De mayor a menor prioridad:

- **1. Paréntesis.** Lo que está dentro se resuelve primero.
- **2. Potencias y raíces.** Las veremos más adelante en el curso.
- **3. Multiplicación y división,** con la misma prioridad, de izquierda a derecha.
- **4. Suma y resta,** con la misma prioridad, de izquierda a derecha.

> Multiplicación y división están en el **mismo nivel**; igual que suma y resta. No es "primero la multiplicación y luego la división". Cuando hay empate, se resuelve de izquierda a derecha.

## Empates: de izquierda a derecha

Este es el error más frecuente. Mira:

$$24 \\div 4 \\times 3 = 6 \\times 3 = 18$$

Si hicieras primero la multiplicación ($4 \\times 3 = 12$) obtendrías $24 \\div 12 = 2$, que está mal. Con la suma y la resta pasa lo mismo:

$$10 - 4 + 3 = 6 + 3 = 9$$

Hacer $4 + 3$ primero daría $10 - 7 = 3$, que también está mal. La razón es que restar equivale a sumar un negativo: $10 - 4 + 3$ es $10 + (-4) + 3$, y como la suma se puede hacer en cualquier orden, cada número se queda con **su propio signo**. Al mover el $4$ junto al $3$ le cambiarías el signo sin darte cuenta.

## Paréntesis: cambiar el orden a propósito

Los paréntesis sirven para forzar que algo se calcule antes:

$$(3 + 4) \\times 2 = 7 \\times 2 = 14$$

Comparado con $3 + 4 \\times 2 = 11$, los mismos números y las mismas operaciones dan otro resultado solo por los paréntesis. Cuando hay paréntesis dentro de paréntesis, se empieza por el **más interno**:

$$20 - (3 + 2 \\times (4 - 1)) = 20 - (3 + 2 \\times 3) = 20 - (3 + 6) = 20 - 9 = 11$$

Dentro de un paréntesis se aplica el mismo orden de siempre: primero multiplicar, luego sumar.

## Método para no equivocarte

- **Reescribe la expresión en cada paso**, resolviendo una sola operación a la vez (o un grupo de operaciones independientes).
- **Marca primero** los paréntesis, luego las multiplicaciones y divisiones, y por último las sumas y restas.
- **No saltes pasos** al principio. La velocidad llega sola con la práctica.
- Si un número es negativo, ponlo entre paréntesis al reescribir: $5 + (-3)$ y no $5 + -3$.

## Errores comunes

- **Calcular de izquierda a derecha ignorando la jerarquía.** $2 + 3 \\times 4$ es $14$, no $20$.
- **Dar prioridad a la multiplicación sobre la división** (o a la suma sobre la resta) en vez de ir de izquierda a derecha.
- **Olvidar que los paréntesis también tienen operaciones dentro** que siguen el mismo orden.
- **Dividir entre cero.** Nunca se puede; una expresión que lo requiere no tiene valor.

## Practica

{{practice}}
`,
};
