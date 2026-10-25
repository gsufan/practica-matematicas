// Router and views. Routes: #/ (course map), #/modulo/<id> (one module),
// #/tema/<id> (lesson), #/practica/<id> (practice only).
const view = document.getElementById("view");
let mounted = null;      // practice widget on screen, if any
let tocObserver = null;  // highlights the lesson section being read

const STATUS_LABEL = { new: "Nuevo", learning: "En curso", mastered: "Dominado" };

function topicRow(topic, index, suggestedId) {
  const ready = isReady(topic.id);
  const status = store.status(topic.id);
  const t = store.topic(topic.id);
  const badge = ready
    ? `<span class="badge ${status}">${STATUS_LABEL[status]}</span>`
    : '<span class="badge soon">Próximamente</span>';
  const progress = ready && t.total > 0 ? `<span class="row-meta">${t.ok} de ${t.total} correctas</span>` : "";
  const next = topic.id === suggestedId ? '<span class="badge next">Sigue este</span>' : "";
  const percent = status === "mastered" ? 100 : Math.min(t.total, 10) * 10;
  const inner = `
    <span class="row-head">
      <span class="row-num">${String(index + 1).padStart(2, "0")}</span>
      <span class="row-badges">${next}${badge}</span>
    </span>
    <span class="row-title">${topic.title}</span>
    <span class="row-sum">${topic.summary}</span>
    ${progress}
    <span class="bar" aria-hidden="true"><span style="width:${ready ? percent : 0}%"></span></span>`;
  return ready
    ? `<a class="row" href="#/tema/${topic.id}">${inner}</a>`
    : `<div class="row disabled">${inner}</div>`;
}

function homeView() {
  const next = suggestedTopic();
  const modules = COURSE.map((m) => {
    const heading = `<h2><a href="#/modulo/${m.id}">${m.title}</a></h2>`;
    if (m.topics.length === 0) {
      return `<section class="module soon">${heading}<p>${m.summary}</p><span class="badge soon">Próximamente</span></section>`;
    }
    const rows = m.topics.map((t, i) => topicRow(t, i, next && next.id)).join("");
    return `<section class="module">${heading}<p>${m.summary}</p><div class="rows">${rows}</div></section>`;
  }).join("");

  const resume = next
    ? `<a class="resume" href="#/tema/${next.id}"><span class="kicker">Continuar</span><strong>${next.title}</strong><span>${next.summary}</span><span class="go">Abrir la lección</span></a>`
    : "";

  const ready = allTopics().filter((t) => isReady(t.id));
  const mastered = ready.filter((t) => store.status(t.id) === "mastered").length;
  const percent = ready.length ? Math.round((mastered / ready.length) * 100) : 0;

  view.innerHTML = `
    <header class="masthead">
      <p class="kicker">Curso</p>
      <h1>Matemáticas desde cero</h1>
      <p class="lead">Teoría clara y práctica con pasos. Avanza en el orden que quieras; la app te sugiere cuál sigue.</p>
      <p class="progress-pill">Tu avance <span class="bar" aria-hidden="true"><span style="width:${percent}%"></span></span> <strong>${mastered} de ${ready.length}</strong></p>
    </header>
    ${resume}
    ${modules}`;
}

function moduleView(id) {
  const module = COURSE.find((m) => m.id === id);
  if (!module) return notFoundView();

  const next = suggestedTopic();
  const body = module.topics.length
    ? `<section class="module"><div class="rows">${module.topics.map((t, i) => topicRow(t, i, next && next.id)).join("")}</div></section>`
    : `<section class="module"><p class="empty">Este módulo todavía no tiene temas. Se agregarán después de terminar los anteriores.</p></section>`;

  view.innerHTML = `
    <nav class="crumbs"><a href="#/">← Curso</a></nav>
    <header class="masthead">
      <p class="kicker">Módulo</p>
      <h1>${module.title}</h1>
      <p class="lead">${module.summary}</p>
    </header>
    ${body}`;
}

function lessonView(id) {
  const topic = findTopic(id);
  if (!topic || !isReady(id)) return notFoundView();
  store.update(id, { read: true });

  const lesson = LESSONS[id];
  view.innerHTML = `
    <nav class="crumbs"><a href="#/modulo/${topic.module.id}">← ${topic.module.title}</a></nav>
    <header class="masthead">
      <p class="kicker">${topic.module.title}</p>
      <h1>${topic.title}</h1>
      <p class="lead">Lectura de unos ${lesson.minutes} minutos, con práctica al final.</p>
    </header>
    <div class="lesson-layout">
      <article class="lesson">${renderRich(lesson.body)}</article>
      <nav class="toc" aria-label="En esta lección"></nav>
    </div>
    <p class="fullscreen-link"><a href="#/practica/${id}">Abrir la práctica en pantalla completa →</a></p>`;

  buildToc(id);

  const slot = view.querySelector("[data-practice]");
  if (slot) {
    slot.className = "embed";
    slot.setAttribute("data-no-autofocus", "");
    mounted = mountPractice(slot, GENERATORS[id], { topicId: id });
  }
}

// Table of contents from the lesson's headings; highlights the one being read
function buildToc(id) {
  const heads = [...view.querySelectorAll(".lesson h2")];
  const toc = view.querySelector(".toc");
  const label = (h) => {
    const copy = h.cloneNode(true);
    copy.querySelectorAll(".katex-mathml").forEach((n) => n.remove());
    return copy.textContent;
  };
  heads.forEach((h, i) => (h.id = `sec-${i}`));
  toc.innerHTML =
    '<p class="toc-title">En esta lección</p>' +
    heads.map((h, i) => `<a href="#/tema/${id}" data-section="sec-${i}">${label(h)}</a>`).join("");

  toc.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-section]");
    if (!link) return;
    event.preventDefault(); // the hash belongs to the router
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(link.dataset.section).scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  });

  tocObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        toc.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.dataset.section === entry.target.id));
      });
    },
    { rootMargin: "-10% 0px -80% 0px" }
  );
  heads.forEach((h) => tocObserver.observe(h));
}

function practiceView(id) {
  const topic = findTopic(id);
  if (!topic || !isReady(id)) return notFoundView();

  view.innerHTML = `
    <nav class="crumbs"><a href="#/tema/${id}">← Volver a la lección</a></nav>
    <header class="masthead"><p class="kicker">Práctica</p><h1>${topic.title}</h1></header>
    <div id="practice-root"></div>`;
  mounted = mountPractice(document.getElementById("practice-root"), GENERATORS[id], { topicId: id });
}

function notFoundView() {
  view.innerHTML = '<nav class="crumbs"><a href="#/">← Curso</a></nav><p>Esa página no existe todavía.</p>';
}

function route() {
  if (mounted) mounted.destroy();
  mounted = null;
  if (tocObserver) tocObserver.disconnect();
  tocObserver = null;

  const [, page, id] = location.hash.split("/");
  const topic = page === "tema" || page === "practica" ? findTopic(id) : null;
  view.className = "sheet" + (page === "tema" ? " lesson-page" : page === "practica" ? " practice-page" : "");

  if (page === "tema") lessonView(id);
  else if (page === "practica") practiceView(id);
  else if (page === "modulo") moduleView(id);
  else homeView();

  renderSidebar({
    home: !page,
    module: page === "modulo" ? id : topic ? topic.module.id : null,
    topic: topic ? topic.id : null,
  });
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
