// Course map. A topic is "ready" when LESSONS and GENERATORS have an entry for its id.
// Lessons and generators register themselves in these objects.
const LESSONS = {};
const GENERATORS = {};

const COURSE = [
  {
    id: "aritmetica",
    title: "Aritmética",
    summary: "Los números y sus operaciones, hasta llegar a los logaritmos.",
    topics: [
      { id: "number-sets", title: "Los números y sus conjuntos", summary: "Qué es un número y los reinos: naturales, enteros, racionales, irracionales y reales." },
      { id: "times-tables", title: "Tablas de multiplicar", summary: "Multiplicar de memoria y entender por qué funciona." },
      { id: "integers", title: "Enteros y negativos", summary: "Sumar, restar y multiplicar con signos." },
      { id: "order-of-operations", title: "Orden de operaciones", summary: "Qué se calcula primero en una expresión." },
      { id: "fractions", title: "Fracciones", summary: "Partes de un todo y cómo operar con ellas." },
      { id: "decimals", title: "Decimales", summary: "Números con coma y su relación con las fracciones." },
      { id: "percentages", title: "Porcentajes y proporciones", summary: "Comparar cantidades y repartir en partes." },
      { id: "powers-roots", title: "Potencias y raíces", summary: "Multiplicar repetido y su operación inversa." },
      { id: "scientific-notation", title: "Notación científica", summary: "Escribir números muy grandes o muy pequeños." },
      { id: "logarithms", title: "Logaritmos", summary: "La pregunta inversa de una potencia." },
    ],
  },
  {
    id: "algebra",
    title: "Álgebra",
    summary: "Letras que representan números.",
    topics: [
      { id: "variables-expressions", title: "Variables y expresiones", summary: "Qué es una variable y cómo evaluar una expresión." },
      { id: "like-terms", title: "Términos semejantes", summary: "Reducir expresiones juntando lo que se parece." },
      { id: "distributive", title: "Propiedad distributiva", summary: "Multiplicar un número por una suma y desarrollar productos." },
      { id: "linear-equations", title: "Ecuaciones lineales", summary: "Despejar la incógnita paso a paso." },
      { id: "inequalities", title: "Desigualdades", summary: "Resolver y representar condiciones como x > 3." },
      { id: "word-problems", title: "Problemas con ecuaciones", summary: "Traducir un enunciado a una ecuación." },
      { id: "systems", title: "Sistemas de ecuaciones", summary: "Dos ecuaciones, dos incógnitas." },
      { id: "polynomials", title: "Polinomios", summary: "Sumar, restar y multiplicar polinomios." },
      { id: "factoring", title: "Factorización", summary: "Escribir una expresión como producto." },
      { id: "quadratics", title: "Ecuaciones cuadráticas", summary: "Resolver ecuaciones con x al cuadrado." },
    ],
  },
  {
    id: "geometria",
    title: "Geometría",
    summary: "Figuras, medidas y espacio.",
    topics: [
      { id: "angles", title: "Puntos, rectas y ángulos", summary: "Tipos de ángulos y relaciones entre ellos." },
      { id: "triangles", title: "Triángulos", summary: "Ángulos, lados y cuándo se puede construir uno." },
      { id: "area-perimeter", title: "Perímetro y área", summary: "Medir el borde y la superficie de figuras planas." },
      { id: "pythagoras", title: "Teorema de Pitágoras", summary: "La relación entre los lados de un triángulo rectángulo." },
      { id: "circle", title: "Circunferencia y círculo", summary: "Longitud, área y el número π." },
      { id: "polygons", title: "Polígonos", summary: "Ángulos y diagonales de figuras de muchos lados." },
      { id: "similarity", title: "Semejanza y Tales", summary: "Figuras del mismo aspecto y proporciones." },
      { id: "solids", title: "Cuerpos geométricos", summary: "Áreas y volúmenes en el espacio." },
      { id: "coordinate-plane", title: "Plano cartesiano", summary: "Distancia, punto medio y pendiente." },
      { id: "trigonometry", title: "Razones trigonométricas", summary: "Seno, coseno y tangente en el triángulo rectángulo." },
    ],
  },
  { id: "funciones", title: "Funciones", summary: "Relaciones entre cantidades.", topics: [] },
  { id: "algebra-lineal", title: "Álgebra lineal", summary: "Vectores, matrices y sistemas.", topics: [] },
  { id: "precalculo", title: "Precálculo", summary: "La preparación para el cálculo.", topics: [] },
  { id: "calculo", title: "Cálculo", summary: "Cambio y acumulación.", topics: [] },
];

const allTopics = () => COURSE.flatMap((m) => m.topics.map((t) => ({ ...t, module: m })));
const findTopic = (id) => allTopics().find((t) => t.id === id);
const isReady = (id) => Boolean(LESSONS[id] && GENERATORS[id]);

// First ready topic that is not mastered yet
function suggestedTopic() {
  return allTopics().find((t) => isReady(t.id) && store.status(t.id) !== "mastered") || null;
}
