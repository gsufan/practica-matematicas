// Network-first service worker: always fresh online, cached copy offline. Bump VERSION to force clients to refresh.
const VERSION = "v17";
const CACHE = "mates-" + VERSION;
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./vendor/fonts/manrope-latin.woff2",
  "./manifest.webmanifest",
  "./src/math.js",
  "./src/figures.js",
  "./src/store.js",
  "./src/course.js",
  "./src/lessons/times-tables.js",
  "./src/lessons/number-sets.js",
  "./src/lessons/integers.js",
  "./src/lessons/order-of-operations.js",
  "./src/generators/times-tables.js",
  "./src/generators/integers.js",
  "./src/generators/number-sets.js",
  "./src/generators/order-of-operations.js",
  "./src/lessons/fractions.js",
  "./src/generators/fractions.js",
  "./src/lessons/decimals.js",
  "./src/generators/decimals.js",
  "./src/lessons/percentages.js",
  "./src/generators/percentages.js",
  "./src/lessons/powers-roots.js",
  "./src/generators/powers-roots.js",
  "./src/lessons/scientific-notation.js",
  "./src/generators/scientific-notation.js",
  "./src/lessons/logarithms.js",
  "./src/generators/logarithms.js",
  "./src/lessons/variables-expressions.js",
  "./src/generators/variables-expressions.js",
  "./src/lessons/like-terms.js",
  "./src/generators/like-terms.js",
  "./src/lessons/distributive.js",
  "./src/generators/distributive.js",
  "./src/lessons/linear-equations.js",
  "./src/generators/linear-equations.js",
  "./src/lessons/inequalities.js",
  "./src/generators/inequalities.js",
  "./src/lessons/word-problems.js",
  "./src/generators/word-problems.js",
  "./src/lessons/systems.js",
  "./src/generators/systems.js",
  "./src/lessons/polynomials.js",
  "./src/generators/polynomials.js",
  "./src/lessons/factoring.js",
  "./src/generators/factoring.js",
  "./src/lessons/quadratics.js",
  "./src/generators/quadratics.js",
  "./src/lessons/angles.js",
  "./src/generators/angles.js",
  "./src/lessons/triangles.js",
  "./src/generators/triangles.js",
  "./src/lessons/area-perimeter.js",
  "./src/generators/area-perimeter.js",
  "./src/lessons/pythagoras.js",
  "./src/generators/pythagoras.js",
  "./src/lessons/circle.js",
  "./src/generators/circle.js",
  "./src/lessons/polygons.js",
  "./src/generators/polygons.js",
  "./src/lessons/similarity.js",
  "./src/generators/similarity.js",
  "./src/lessons/solids.js",
  "./src/generators/solids.js",
  "./src/lessons/coordinate-plane.js",
  "./src/generators/coordinate-plane.js",
  "./src/lessons/trigonometry.js",
  "./src/generators/trigonometry.js",
  "./src/lessons/function-basics.js",
  "./src/generators/function-basics.js",
  "./src/lessons/linear-function.js",
  "./src/generators/linear-function.js",
  "./src/lessons/line-equation.js",
  "./src/generators/line-equation.js",
  "./src/lessons/quadratic-function.js",
  "./src/generators/quadratic-function.js",
  "./src/lessons/domain-range.js",
  "./src/generators/domain-range.js",
  "./src/lessons/transformations.js",
  "./src/generators/transformations.js",
  "./src/lessons/piecewise-abs.js",
  "./src/generators/piecewise-abs.js",
  "./src/lessons/composition-inverse.js",
  "./src/generators/composition-inverse.js",
  "./src/lessons/exponential-function.js",
  "./src/generators/exponential-function.js",
  "./src/lessons/logarithmic-function.js",
  "./src/generators/logarithmic-function.js",
  "./src/practice.js",
  "./src/theme.js",
  "./src/nav.js",
  "./src/app.js",
  "./vendor/katex/katex.min.js",
  "./vendor/katex/katex.min.css",
  "./vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Math-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Script-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  // cache: "reload" skips the HTTP cache so stale files never get stored
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" })))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === location.origin) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
