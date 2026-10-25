# Práctica de matemáticas

Práctica interactiva de matemáticas desde aritmética hasta logaritmos.

## Cómo abrirlo

1. Abre `index.html` en el navegador.
2. KaTeX está incluido en `vendor/katex`, no necesita internet.
3. Para instalarla como app (PWA) hay que servirla por HTTPS o `localhost`, no desde `file://`.

## Estructura

```
index.html                    Page markup
styles.css                    Styles (color tokens at the top)
src/math.js                   Shared helpers: randInt, renderMath (KaTeX)
src/generators/times-tables.js  One generator per subtopic
src/app.js                    UI logic and state; registers subtopics
```

Each generator returns `{ label, equation, answer, steps }`:

- `equation` and `steps` are LaTeX strings. A `?` becomes a blank box.
- `answer` is the number the student must enter.

## Adding a subtopic

1. Create `src/generators/<name>.js` with an object that has a `generate({ table, mode })` method.
2. Add a `<script>` tag for it in `index.html`, before `src/app.js`.
3. Add the object to `SUBTOPICS` in `src/app.js`.

## Status

- [x] Aritmética: tablas de multiplicar (directo e inverso)
- [ ] Aritmética: operaciones con enteros, fracciones, decimales, porcentajes, potencias, notación científica, logaritmos
- [ ] Módulos posteriores: álgebra, geometría, funciones, álgebra lineal, precálculo, cálculo
