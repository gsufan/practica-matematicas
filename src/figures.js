// Small SVG toolkit for geometry figures. Colors come from CSS classes (see styles.css),
// so figures follow the light and dark themes. Angles are in degrees, counterclockwise.
const FIG = (() => {
  const rad = (d) => (d * Math.PI) / 180;
  const r1 = (n) => Math.round(n * 10) / 10;

  // Point at distance r from c, in the direction deg (y grows downward on screen)
  const at = (c, r, deg) => [r1(c[0] + r * Math.cos(rad(deg))), r1(c[1] - r * Math.sin(rad(deg)))];
  const pts = (ps) => ps.map((p) => `${p[0]},${p[1]}`).join(" ");

  const svg = (inner, label, w = 320, h = 200) =>
    `<svg class="fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${inner}</svg>`;
  const poly = (ps, cls = "fill") => `<polygon class="f-${cls}" points="${pts(ps)}"/>`;
  const line = (a, b, cls = "line") => `<line class="f-${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  const circle = (c, r, cls = "fill") => `<circle class="f-${cls}" cx="${c[0]}" cy="${c[1]}" r="${r}"/>`;
  const ellipse = (c, rx, ry, cls = "line") => `<ellipse class="f-${cls}" cx="${c[0]}" cy="${c[1]}" rx="${rx}" ry="${ry}"/>`;
  const dot = (p) => `<circle class="f-dot" cx="${p[0]}" cy="${p[1]}" r="3.5"/>`;
  const text = (x, y, s, anchor = "middle", cls = "text") =>
    `<text class="f-${cls}" x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

  // Arc around c from angle a to angle b (counterclockwise)
  function arc(c, r, a, b, cls = "accent") {
    const p0 = at(c, r, a), p1 = at(c, r, b);
    const large = (((b - a) % 360) + 360) % 360 > 180 ? 1 : 0;
    return `<path class="f-${cls}" d="M ${p0[0]} ${p0[1]} A ${r} ${r} 0 ${large} 0 ${p1[0]} ${p1[1]}"/>`;
  }

  // Label inside the angle from a to b
  const angleLabel = (c, r, a, b, s) => {
    const span = (((b - a) % 360) + 360) % 360;
    const p = at(c, r, a + span / 2);
    return text(p[0], p[1], s, "middle", "accent-text");
  };

  // Small square marking a right angle at v between directions a and b
  function rightMark(v, a, b, s = 12) {
    const p1 = at(v, s, a), p3 = at(v, s, b);
    const p2 = [r1(p1[0] + p3[0] - v[0]), r1(p1[1] + p3[1] - v[1])];
    return `<polyline class="f-mark" points="${pts([p1, p2, p3])}"/>`;
  }

  // Tick on a segment (equal sides)
  function tick(a, b) {
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
    return line([r1(m[0] - nx * 6), r1(m[1] - ny * 6)], [r1(m[0] + nx * 6), r1(m[1] + ny * 6)], "mark");
  }

  // Label next to the middle of a segment, pushed away from `away` (a point inside the shape)
  function sideLabel(a, b, s, away, gap = 14) {
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let nx = -(b[1] - a[1]), ny = b[0] - a[0];
    const len = Math.hypot(nx, ny) || 1;
    nx /= len; ny /= len;
    if (away && (m[0] - away[0]) * nx + (m[1] - away[1]) * ny < 0) { nx = -nx; ny = -ny; }
    return text(m[0] + nx * gap, m[1] + ny * gap, s, "middle", "text");
  }

  const centroid = (ps) => [ps.reduce((s, p) => s + p[0], 0) / ps.length, ps.reduce((s, p) => s + p[1], 0) / ps.length];

  // Direction from p to q in degrees (counterclockwise from +x, y up on screen)
  const dir = (p, q) => ((Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI + 360) % 360;

  // Mapping from drawing units (y up) to a w x h canvas, keeping proportions
  function fit(points, w = 320, h = 200, pad = 38) {
    const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const s = Math.min((w - 2 * pad) / (maxX - minX || 1), (h - 2 * pad) / (maxY - minY || 1));
    const ox = (w - s * (maxX - minX)) / 2, oy = (h - s * (maxY - minY)) / 2;
    const map = (p) => [r1(ox + s * (p[0] - minX)), r1(h - oy - s * (p[1] - minY))];
    map.scale = s;
    return map;
  }

  return { rad, at, pts, svg, poly, line, circle, ellipse, dot, text, arc, angleLabel, rightMark, tick, sideLabel, centroid, dir, fit };
})();

// Figures used inside lessons, by name: {{fig:name}}
const FIGURES = {
  "angle-types"() {
    const parts = [];
    const spec = [
      { c: [55, 120], a: 35, t: "Agudo", d: "menor que 90°" },
      { c: [160, 120], a: 90, t: "Recto", d: "exactamente 90°" },
      { c: [265, 120], a: 135, t: "Obtuso", d: "entre 90° y 180°" },
    ];
    spec.forEach((s) => {
      parts.push(FIG.line(s.c, FIG.at(s.c, 60, 0)), FIG.line(s.c, FIG.at(s.c, 60, s.a)));
      parts.push(s.a === 90 ? FIG.rightMark(s.c, 0, 90, 14) : FIG.arc(s.c, 22, 0, s.a));
      parts.push(FIG.dot(s.c), FIG.text(s.c[0] + 18, s.c[1] + 32, s.t, "middle", "text"), FIG.text(s.c[0] + 18, s.c[1] + 50, s.d, "middle", "muted"));
    });
    return FIG.svg(parts.join(""), "Ángulo agudo, recto y obtuso", 320, 190);
  },

  "angle-pairs"() {
    const c = [160, 100];
    const parts = [
      FIG.line([40, 100], [280, 100]),
      FIG.line(c, FIG.at(c, 90, 55)),
      FIG.arc(c, 28, 0, 55), FIG.arc(c, 40, 55, 180, "line"),
      FIG.angleLabel(c, 52, 0, 55, "a"), FIG.angleLabel(c, 62, 55, 180, "b"),
      FIG.dot(c),
      FIG.text(160, 172, "a + b = 180°  (ángulos suplementarios)", "middle", "text"),
    ];
    return FIG.svg(parts.join(""), "Dos ángulos que forman una línea recta suman 180 grados", 320, 190);
  },

  "parallel-lines"() {
    const y1 = 60, y2 = 140;
    const t1 = [110, 10], t2 = [210, 190];
    const x1 = t1[0] + (t2[0] - t1[0]) * ((y1 - t1[1]) / (t2[1] - t1[1]));
    const x2 = t1[0] + (t2[0] - t1[0]) * ((y2 - t1[1]) / (t2[1] - t1[1]));
    const slope = (Math.atan2(-(t2[1] - t1[1]), t2[0] - t1[0]) * 180) / Math.PI; // transversal direction, downward
    const up = slope + 180;
    const p1 = [r1(x1), y1], p2 = [r1(x2), y2];
    function r1(n) { return Math.round(n * 10) / 10; }
    const parts = [
      FIG.line([30, y1], [290, y1]), FIG.line([30, y2], [290, y2]), FIG.line(t1, t2),
      FIG.arc(p1, 22, 0, up, "accent"), FIG.angleLabel(p1, 38, 0, up, "1"),
      FIG.arc(p2, 22, 0, up, "accent"), FIG.angleLabel(p2, 38, 0, up, "2"),
      FIG.text(40, 100, "paralelas", "start", "muted"),
      FIG.text(160, 186, "Ángulos correspondientes: 1 = 2", "middle", "text"),
    ];
    return FIG.svg(parts.join(""), "Dos rectas paralelas cortadas por una transversal", 320, 200);
  },

  "triangle-sum"() {
    const A = [40, 150], B = [270, 150], C = [150, 30];
    const parts = [
      FIG.poly([A, B, C]),
      FIG.arc(A, 24, 0, 62), FIG.angleLabel(A, 42, 0, 62, "α"),
      FIG.arc(B, 24, 118, 180), FIG.angleLabel(B, 42, 118, 180, "β"),
      FIG.arc(C, 24, 242, 298), FIG.angleLabel(C, 42, 242, 298, "γ"),
      FIG.text(160, 182, "α + β + γ = 180°", "middle", "text"),
    ];
    return FIG.svg(parts.join(""), "Los tres ángulos de un triángulo suman 180 grados", 320, 195);
  },

  "right-triangle"() {
    const A = [60, 160], B = [260, 160], C = [60, 40];
    const parts = [
      FIG.poly([A, B, C]), FIG.rightMark(A, 0, 90, 14),
      FIG.text(160, 180, "cateto b", "middle", "text"), FIG.text(34, 100, "cateto a", "end", "text"),
      FIG.text(172, 92, "hipotenusa c", "middle", "text"),
      FIG.text(210, 30, "a² + b² = c²", "middle", "accent-text"),
    ];
    return FIG.svg(parts.join(""), "Triángulo rectángulo con catetos a y b e hipotenusa c", 320, 195);
  },

  "trig-triangle"() {
    const A = [60, 160], B = [260, 160], C = [60, 40];
    const parts = [
      FIG.poly([A, B, C]), FIG.rightMark(A, 0, 90, 14),
      FIG.arc(B, 34, FIG.dir(B, C), 180), FIG.angleLabel(B, 56, FIG.dir(B, C), 180, "α"),
      FIG.text(160, 181, "cateto adyacente", "middle", "text"), FIG.text(30, 100, "cateto opuesto", "end", "text"),
      FIG.text(176, 90, "hipotenusa", "middle", "text"),
    ];
    return FIG.svg(parts.join(""), "Catetos opuesto y adyacente y la hipotenusa respecto del ángulo alfa", 320, 195);
  },

  "circle-parts"() {
    const c = [160, 100], r = 70;
    const e = FIG.at(c, r, 30), f = FIG.at(c, r, 210);
    const parts = [
      FIG.circle(c, r), FIG.line(f, e), FIG.line(c, FIG.at(c, r, 120), "accent"), FIG.dot(c),
      FIG.text(c[0] - 6, c[1] + 12, "centro", "end", "muted"),
      FIG.text(c[0] - 26, c[1] - 24, "r", "middle", "accent-text"),
      FIG.text(c[0] + 38, c[1] - 8, "diámetro d", "middle", "text"),
      FIG.text(160, 188, "C = 2πr      A = πr²", "middle", "text"),
    ];
    return FIG.svg(parts.join(""), "Circunferencia con centro, radio y diámetro", 320, 200);
  },

  "area-shapes"() {
    const parts = [
      FIG.poly([[20, 120], [100, 120], [100, 60], [20, 60]]), FIG.text(60, 90, "b × h", "middle", "text"), FIG.text(60, 142, "Rectángulo", "middle", "muted"),
      FIG.poly([[130, 120], [220, 120], [175, 50]]), FIG.line([175, 50], [175, 120], "mark"), FIG.text(190, 90, "h", "middle", "accent-text"), FIG.text(175, 142, "Triángulo: b × h / 2", "middle", "muted"),
      FIG.poly([[245, 120], [310, 120], [295, 60], [255, 60]]), FIG.text(278, 90, "(B+b)h/2", "middle", "text"), FIG.text(278, 142, "Trapecio", "middle", "muted"),
    ];
    return FIG.svg(parts.join(""), "Rectángulo, triángulo y trapecio", 330, 165);
  },

  "regular-polygon"() {
    const c = [160, 95];
    const shape = (n, cx, r) => Array.from({ length: n }, (_, i) => FIG.at([cx, 95], r, 90 + (360 / n) * i));
    const parts = [
      FIG.poly(shape(3, 55, 42)), FIG.text(55, 160, "3 lados", "middle", "muted"),
      FIG.poly(shape(5, 160, 45)), FIG.text(160, 160, "5 lados", "middle", "muted"),
      FIG.poly(shape(6, 265, 45)), FIG.text(265, 160, "6 lados", "middle", "muted"),
    ];
    void c;
    return FIG.svg(parts.join(""), "Triángulo, pentágono y hexágono regulares", 320, 175);
  },

  "similar-triangles"() {
    const A = [30, 160], B = [150, 160], C = [30, 60];
    const A2 = [180, 160], B2 = [300, 160], C2 = [180, 100];
    const parts = [
      FIG.poly([A, B, C]), FIG.poly([A2, B2, C2]),
      FIG.rightMark(A, 0, 90, 12), FIG.rightMark(A2, 0, 90, 12),
      FIG.text(90, 178, "a", "middle", "text"), FIG.text(240, 178, "a'", "middle", "text"),
      FIG.text(14, 110, "b", "middle", "text"), FIG.text(164, 130, "b'", "middle", "text"),
      FIG.text(160, 24, "a / a' = b / b'", "middle", "accent-text"),
    ];
    return FIG.svg(parts.join(""), "Dos triángulos semejantes de distinto tamaño", 320, 190);
  },

  "plane"() {
    const o = [50, 150];
    const parts = [FIG.line([20, 150], [300, 150]), FIG.line([50, 180], [50, 15])];
    for (let i = 1; i <= 5; i++) {
      parts.push(FIG.line([50 + i * 45, 146], [50 + i * 45, 154], "mark"), FIG.text(50 + i * 45, 166, String(i), "middle", "muted"));
    }
    for (let j = 1; j <= 3; j++) {
      parts.push(FIG.line([46, 150 - j * 40], [54, 150 - j * 40], "mark"), FIG.text(36, 150 - j * 40, String(j), "middle", "muted"));
    }
    const A = [50 + 1 * 45, 150 - 1 * 40], B = [50 + 4 * 45, 150 - 3 * 40];
    parts.push(FIG.line(A, B, "accent"), FIG.dot(A), FIG.dot(B), FIG.text(A[0] - 6, A[1] + 14, "A(1, 1)", "end", "text"), FIG.text(B[0] + 8, B[1] - 12, "B(4, 3)", "start", "text"));
    parts.push(FIG.text(302, 138, "x", "middle", "muted"), FIG.text(62, 18, "y", "middle", "muted"), FIG.dot(o));
    return FIG.svg(parts.join(""), "Plano cartesiano con los puntos A(1,1) y B(4,3)", 320, 190);
  },

  solids() {
    const box = (x, y, w, h, d) => [
      FIG.poly([[x, y + d], [x + w, y + d], [x + w, y + d + h], [x, y + d + h]]),
      FIG.poly([[x, y + d], [x + d, y], [x + w + d, y], [x + w, y + d]], "fill2"),
      FIG.poly([[x + w, y + d], [x + w + d, y], [x + w + d, y + h], [x + w, y + d + h]], "fill3"),
    ].join("");
    const cyl = (cx, y, rx, h) => [
      `<path class="f-fill" d="M ${cx - rx} ${y + 12} L ${cx - rx} ${y + h} A ${rx} 12 0 0 0 ${cx + rx} ${y + h} L ${cx + rx} ${y + 12} Z"/>`,
      FIG.ellipse([cx, y + 12], rx, 12, "fill2"),
    ].join("");
    const cone = (cx, y, rx, h) => [
      `<path class="f-fill" d="M ${cx} ${y} L ${cx - rx} ${y + h} A ${rx} 12 0 0 0 ${cx + rx} ${y + h} Z"/>`,
    ].join("");
    const parts = [
      box(14, 20, 62, 56, 22), FIG.text(50, 118, "Prisma", "middle", "muted"),
      cyl(145, 24, 30, 76), FIG.text(145, 118, "Cilindro", "middle", "muted"),
      cone(235, 20, 32, 80), FIG.text(235, 118, "Cono", "middle", "muted"),
      FIG.circle([300, 62], 26), FIG.ellipse([300, 62], 26, 8, "mark"), FIG.text(300, 118, "Esfera", "middle", "muted"),
    ];
    return FIG.svg(parts.join(""), "Prisma, cilindro, cono y esfera", 340, 135);
  },
};
