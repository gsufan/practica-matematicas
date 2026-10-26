// Triangles generator: angle sum, isosceles, exterior angle, algebra, triangle inequality.
(() => {
  // Triangle with interior angles A and B at the base (drawing units, y up)
  function shape(A, B, extra) {
    const Cang = 180 - A - B, ab = 100;
    const ac = (ab * Math.sin(FIG.rad(B))) / Math.sin(FIG.rad(Cang));
    const pa = [0, 0], pb = [ab, 0], pc = [ac * Math.cos(FIG.rad(A)), ac * Math.sin(FIG.rad(A))];
    const all = [pa, pb, pc].concat(extra ? [[ab + 55, 0]] : []);
    const map = FIG.fit(all, 320, 200, 40);
    return { a: map(pa), b: map(pb), c: map(pc), end: extra ? map([ab + 55, 0]) : null };
  }

  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  // Label distance from a vertex: far enough to clear the arc, close enough not to hit the next label
  const labelRadius = (deg, p, q, r) => {
    const room = Math.min(dist(p, q), dist(p, r)) * 0.4;
    return Math.max(deg < 30 ? 40 : 30, Math.min(deg < 30 ? 56 : 46, room));
  };

  // labels: text for the angles at A, B, C (or null)
  function triFig(A, B, labels, opts = {}) {
    const t = shape(A, B, opts.extend);
    const parts = [FIG.poly([t.a, t.b, t.c])];
    if (opts.extend) parts.push(FIG.line(t.b, t.end));
    if (opts.outside) {
      // long labels (expressions with x) go outside, next to each vertex
      const mid = FIG.centroid([t.a, t.b, t.c]);
      [[t.a, labels.a], [t.b, labels.b], [t.c, labels.c]].forEach(([v, text]) => {
        const len = Math.hypot(v[0] - mid[0], v[1] - mid[1]) || 1;
        parts.push(FIG.text(v[0] + ((v[0] - mid[0]) / len) * 34, v[1] + ((v[1] - mid[1]) / len) * 22, text, "middle", "accent-text"));
      });
      parts.push(
        FIG.arc(t.a, 18, FIG.dir(t.a, t.b), FIG.dir(t.a, t.c)),
        FIG.arc(t.b, 18, FIG.dir(t.b, t.c), FIG.dir(t.b, t.a)),
        FIG.arc(t.c, 18, FIG.dir(t.c, t.a), FIG.dir(t.c, t.b))
      );
      return FIG.svg(parts.join(""), "Triángulo con sus ángulos", 320, 200);
    }
    if (labels.a != null) {
      parts.push(FIG.arc(t.a, 20, FIG.dir(t.a, t.b), FIG.dir(t.a, t.c)), FIG.angleLabel(t.a, labelRadius(A, t.a, t.b, t.c), FIG.dir(t.a, t.b), FIG.dir(t.a, t.c), labels.a));
    }
    if (labels.b != null) {
      const from = opts.exterior ? FIG.dir(t.b, t.end) : FIG.dir(t.b, t.c), to = opts.exterior ? FIG.dir(t.b, t.c) : FIG.dir(t.b, t.a);
      parts.push(FIG.arc(t.b, opts.exterior ? 30 : 20, from, to), FIG.angleLabel(t.b, opts.exterior ? 54 : labelRadius(B, t.b, t.a, t.c), from, to, labels.b));
    }
    if (labels.c != null) {
      const C = 180 - A - B;
      parts.push(FIG.arc(t.c, 20, FIG.dir(t.c, t.a), FIG.dir(t.c, t.b)), FIG.angleLabel(t.c, labelRadius(C, t.c, t.a, t.b), FIG.dir(t.c, t.a), FIG.dir(t.c, t.b), labels.c));
    }
    if (opts.equalSides) {
      parts.push(FIG.tick(t.a, t.c), FIG.tick(t.b, t.c));
    }
    return FIG.svg(parts.join(""), "Triángulo con sus ángulos", 320, 200);
  }

  const lin = (a, b) => `${a === 1 ? "" : a}x${b ? ` + ${b}` : ""}`;
  const pick = (list) => list[randInt(0, list.length - 1)];

  const BUILDERS = {
    sum() {
      let A, B;
      do { A = randInt(25, 100); B = randInt(25, 100); } while (A + B > 150 || A + B < 55);
      const C = 180 - A - B;
      const which = randInt(0, 2); // 0: x at A, 1: x at B, 2: x at C
      const vals = [A, B, C];
      const labels = { a: `${A}°`, b: `${B}°`, c: `${C}°` };
      labels[["a", "b", "c"][which]] = "x";
      const known = vals.filter((_, i) => i !== which);
      return {
        kind: "integer", placeholder: "ej. 60",
        label: "Encuentra x, en grados",
        figure: triFig(A, B, labels),
        equation: "x = ?",
        answer: vals[which],
        steps: [
          "\\text{Los ángulos interiores de un triángulo suman } 180^{\\circ}",
          `${known[0]} + ${known[1]} + x = 180`,
          `x = 180 - ${known[0] + known[1]}`,
          `x = ${vals[which]}`,
        ],
      };
    },

    isosceles() {
      if (Math.random() < 0.5) {
        const V = pick([20, 30, 40, 50, 60, 80, 100, 110, 120, 140]) ;
        const base = (180 - V) / 2;
        return {
          kind: "integer", placeholder: "ej. 70",
          label: "Triángulo isósceles (las marcas indican lados iguales). Encuentra x, en grados",
          figure: triFig(base, base, { a: "x", b: null, c: `${V}°` }, { equalSides: true }),
          equation: "x = ?",
          answer: base,
          steps: [
            "\\text{Los ángulos de la base de un triángulo isósceles son iguales}",
            `\\text{Los dos ángulos de la base suman } 180 - ${V} = ${180 - V}`,
            `x = \\frac{${180 - V}}{2} = ${base}`,
          ],
        };
      }
      const base = randInt(25, 80);
      const V = 180 - 2 * base;
      return {
        kind: "integer", placeholder: "ej. 80",
        label: "Triángulo isósceles (las marcas indican lados iguales). Encuentra x, en grados",
        figure: triFig(base, base, { a: `${base}°`, b: null, c: "x" }, { equalSides: true }),
        equation: "x = ?",
        answer: V,
        steps: [
          "\\text{Los ángulos de la base son iguales}",
          `${base} + ${base} + x = 180`,
          `x = 180 - ${2 * base} = ${V}`,
        ],
      };
    },

    exterior() {
      let A, B;
      do { A = randInt(25, 90); B = randInt(30, 100); } while (A + B > 150);
      const C = 180 - A - B, ext = A + C;
      return {
        kind: "integer", placeholder: "ej. 120",
        label: "Encuentra el ángulo exterior x, en grados",
        figure: triFig(A, B, { a: `${A}°`, b: "x", c: `${C}°` }, { extend: true, exterior: true }),
        equation: "x = ?",
        answer: ext,
        steps: [
          "\\text{El ángulo exterior es igual a la suma de los dos interiores no adyacentes}",
          `x = ${A} + ${C}`,
          `x = ${ext}`,
          `\\text{Otra forma: el ángulo interior en ese vértice mide } ${B} \\text{, y } 180 - ${B} = ${ext}`,
        ],
      };
    },

    algebra() {
      for (let attempt = 0; attempt < 300; attempt++) {
        const x = randInt(8, 40);
        const a = [randInt(1, 3), randInt(1, 3), randInt(1, 3)];
        const b = [randInt(0, 20), randInt(0, 20), 0];
        // the last constant makes the three angles add up to 180
        b[2] = 180 - (a[0] + a[1] + a[2]) * x - b[0] - b[1];
        const vals = a.map((c, i) => c * x + b[i]);
        if (b[2] < 0 || b[2] > 25 || vals.some((v) => v < 25 || v > 120)) continue;
        if (vals.reduce((s, v) => s + v, 0) !== 180) continue;
        const exprs = a.map((c, i) => lin(c, b[i]));
        return {
          kind: "integer", placeholder: "ej. 30",
          label: "Los tres ángulos de este triángulo se escriben con x. Encuentra x",
          figure: triFig(vals[0], vals[1], { a: `(${exprs[0]})°`, b: `(${exprs[1]})°`, c: `(${exprs[2]})°` }, { outside: true }),
          equation: `(${exprs[0]}) + (${exprs[1]}) + (${exprs[2]}) = 180`,
          answer: x,
          steps: [
            `(${exprs[0]}) + (${exprs[1]}) + (${exprs[2]}) = 180`,
            `${lin(a[0] + a[1] + a[2], b[0] + b[1] + b[2])} = 180`,
            `${a[0] + a[1] + a[2]}x = ${180 - b[0] - b[1] - b[2]}`,
            `x = ${x}`,
            `\\text{Los ángulos miden } ${vals.join("^{\\circ},\\ ")}^{\\circ}`,
          ],
        };
      }
      return BUILDERS.sum();
    },

    inequality() {
      const possible = Math.random() < 0.5;
      let a, b, c;
      if (possible) {
        do { a = randInt(3, 15); b = randInt(3, 15); c = randInt(Math.abs(a - b) + 1, a + b - 1); } while (c < 2);
      } else {
        a = randInt(3, 12); b = randInt(3, 12);
        // too long (c >= a + b) or too short (c <= |a - b|): either way there is no triangle
        c = Math.random() < 0.5 ? a + b + randInt(0, 4) : Math.max(1, Math.abs(a - b) - randInt(0, 2));
      }
      const sides = [a, b, c].sort(() => Math.random() - 0.5);
      const [p, q, r] = sides;
      const ok = p + q > r && p + r > q && q + r > p;
      const big = Math.max(p, q, r), rest = p + q + r - big;
      return {
        kind: "integer", placeholder: "1 (sí) o 0 (no)",
        label: "¿Se puede construir un triángulo con lados de estas medidas? Escribe 1 si se puede y 0 si no",
        equation: `${p},\\ ${q},\\ ${r}`,
        answer: ok ? 1 : 0,
        steps: [
          "\\text{Desigualdad triangular: el lado mayor debe ser menor que la suma de los otros dos}",
          `\\text{Lado mayor: } ${big} \\text{. Suma de los otros dos: } ${rest}`,
          ok ? `${big} < ${rest} \\Rightarrow \\text{sí se puede}` : `${big} \\geq ${rest} \\Rightarrow \\text{no se puede}`,
          `\\text{Respuesta: } ${ok ? 1 : 0}`,
        ],
      };
    },
  };

  GENERATORS["triangles"] = {
    id: "triangles",
    name: "Triángulos",
    keyboard: "numeric",
    controls: [
      {
        id: "type", type: "select", label: "Tipo",
        choices: [
          { value: "all", label: "Todos" },
          { value: "sum", label: "Suma de ángulos" },
          { value: "isosceles", label: "Isósceles" },
          { value: "exterior", label: "Ángulo exterior" },
          { value: "algebra", label: "Con álgebra" },
          { value: "inequality", label: "¿Se puede construir?" },
        ],
      },
    ],
    generate({ type }) {
      const kind = type === "all" ? ["sum", "isosceles", "exterior", "algebra", "inequality"][randInt(0, 4)] : type;
      return BUILDERS[kind]();
    },
  };
})();
