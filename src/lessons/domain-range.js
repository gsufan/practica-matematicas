LESSONS["domain-range"] = {
  minutes: 12,
  body: `
## Qué entra y qué sale

No todos los números sirven como entrada de una función, y no todos los números son una posible salida. Dos conjuntos describen eso:

- El **dominio** es el conjunto de **todas las entradas** $x$ para las que la función está definida.
- El **recorrido** (o rango, o imagen) es el conjunto de **todas las salidas** $y$ que la función puede dar.

Si piensas la función como una máquina, el dominio es lo que **puedes meter** y el recorrido es lo que **puede salir**.

## El dominio por defecto

Si el enunciado no dice nada, el dominio es **todos los números reales para los que la fórmula tiene sentido**. Para las funciones polinomiales ($2x + 1$, $x^2 - 3$) siempre lo tiene: el dominio son todos los reales. Los problemas aparecen en **dos situaciones**:

## 1. Divisiones: el denominador no puede ser cero

En $f(x) = \\dfrac{5}{x - 2}$, si $x = 2$ el denominador vale $0$ y la operación no existe. Se excluye ese valor:

$$\\text{Dominio} = \\text{todos los reales excepto } 2$$

Para encontrarlo, iguala el denominador a cero y resuelve: $x - 2 = 0 \\Rightarrow x = 2$.

## 2. Raíces cuadradas: lo de adentro no puede ser negativo

En el conjunto de los números reales, la raíz cuadrada de un negativo no existe. Por eso lo que está dentro debe ser **mayor o igual que cero**.

*Dominio de $f(x) = \\sqrt{x - 3}$:*

$$x - 3 \\geq 0 \\quad \\Rightarrow \\quad x \\geq 3$$

Este es el momento de usar lo que aprendiste de **desigualdades**. Otro ejemplo, $\\sqrt{2x - 6}$: $2x - 6 \\geq 0$, entonces $2x \\geq 6$ y $x \\geq 3$. Si el coeficiente de $x$ es negativo, como en $\\sqrt{5 - x}$, recuerda invertir el símbolo: $5 - x \\geq 0$ da $x \\leq 5$.

## 3. Logaritmos

El argumento de un logaritmo debe ser **estrictamente positivo**: $\\log(x - 4)$ existe solo si $x - 4 > 0$, es decir $x > 4$. (Lo verás en detalle con la función logarítmica.)

## El recorrido

El recorrido suele ser más difícil de encontrar. Algunas pistas:

- **Función lineal** ($m \\neq 0$): el recorrido son **todos los reales**.
- **Parábola** $a(x - h)^2 + k$: como un cuadrado nunca es negativo, el recorrido es $y \\geq k$ si abre hacia arriba, o $y \\leq k$ si abre hacia abajo. El número $k$ es la coordenada $y$ del vértice.
- **Raíz** $\\sqrt{x - a} + k$: la raíz da valores $\\geq 0$, así que el recorrido es $y \\geq k$.
- **Valor absoluto** $|x - a| + k$: también $y \\geq k$.

Una forma de verlo es mirar la **gráfica**: el dominio es lo que cubre de izquierda a derecha, y el recorrido es lo que cubre de abajo hacia arriba.

## Con una lista de pares

Si la función se da como lista de pares ordenados, el dominio son las **primeras coordenadas** y el recorrido son las **segundas**, sin repetir:

$$\\{(1, 3), (2, 5), (3, 3), (4, 7)\\}$$

Dominio $= \\{1, 2, 3, 4\\}$; recorrido $= \\{3, 5, 7\\}$: tiene tres valores distintos, aunque hay cuatro pares.

## Cómo escribir tu respuesta

Para las condiciones, escribe la desigualdad: \`x >= 3\` o \`x <= 5\`; en el recorrido, usa la letra $y$: \`y >= 2\`. Para un valor excluido, solo el número.

## Errores comunes

- **Olvidar excluir** el valor que anula el denominador.
- **Escribir $x > 3$ en vez de $x \\geq 3$** para una raíz (con la raíz, el $3$ sí vale: $\\sqrt{0} = 0$).
- **No invertir la desigualdad** al dividir entre un negativo.
- **Confundir dominio con recorrido.**

## Practica

{{practice}}
`,
};
