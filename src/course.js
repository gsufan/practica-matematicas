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
  { id: "algebra", title: "Álgebra", summary: "Letras que representan números.", topics: [] },
  { id: "geometria", title: "Geometría", summary: "Figuras, medidas y espacio.", topics: [] },
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
