# Práctica de matemáticas

Práctica interactiva de matemáticas desde aritmética hasta logaritmos.

## Cómo abrirlo

1. Abre `index.html` en el navegador.
2. KaTeX está incluido en `vendor/katex`, no necesita internet.
3. Para instalarla como app (PWA) hay que servirla por HTTPS o `localhost`, no desde `file://`.

## Estructura

```
index.html                       Shell; loads scripts in order
styles.css                       Styles (color tokens at the top)
sw.js, manifest.webmanifest      PWA: offline fallback, installable
src/math.js                      randInt, renderMath, renderRich (lesson markup)
src/figures.js                   SVG toolkit and named figures for geometry
src/store.js                     Progress in localStorage
src/course.js                    COURSE map, LESSONS and GENERATORS registries
src/lessons/<topic>.js           Theory for one topic
src/generators/<topic>.js        Problem generator for one topic
src/practice.js                  Practice widget (used inside lessons and on its own page)
src/theme.js                     Light/dark toggle (follows the system until chosen)
src/nav.js                       Collapsible sidebar with modules and topics
src/app.js                       Router and views
```

Rutas: `#/` (mapa del curso), `#/modulo/<id>` (un módulo), `#/tema/<id>` (lección con práctica incrustada), `#/practica/<id>` (solo práctica).

## Agregar un tema

El tema ya está listado en `COURSE` (`src/course.js`). Para activarlo:

1. Crear `src/lessons/<id>.js` con `LESSONS["<id>"] = { minutes, body }`. El cuerpo usa un markup simple: `## título`, `- lista`, `> nota`, `$matemática$`, `$$bloque$$` y `{{practice}}` donde va la práctica.
2. Crear `src/generators/<id>.js` con `controls` (selects o radios) y `generate(options)`, que devuelve `{ label, equation, answer, steps }`. Registrarlo con `GENERATORS["<id>"] = ...`.
3. Agregar ambos `<script>` en `index.html` y las dos rutas en la lista de `sw.js`. Subir `VERSION` en `sw.js`.

`equation` y `steps` son LaTeX; un `?` se muestra como casilla vacía.

## Status

- [x] Aritmética: tablas de multiplicar (directo e inverso)
- [x] Aritmética: los números y sus conjuntos
- [x] Aritmética: enteros y negativos
- [x] Aritmética: orden de operaciones
- [x] Aritmética: fracciones, decimales, porcentajes y proporciones, potencias y raíces, notación científica, logaritmos
- [x] Álgebra: variables y expresiones, términos semejantes, propiedad distributiva, ecuaciones lineales
- [x] Álgebra: desigualdades, problemas con ecuaciones, sistemas, polinomios, factorización, ecuaciones cuadráticas
- [x] Geometría: ángulos, triángulos, perímetro y área, Pitágoras, circunferencia, polígonos, semejanza, cuerpos, plano cartesiano, trigonometría
- [ ] Módulos posteriores: funciones, álgebra lineal, precálculo, cálculo
