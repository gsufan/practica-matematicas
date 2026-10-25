// Router and views. Routes: #/ (course map), #/tema/<id> (lesson), #/practica/<id> (practice only).
const view = document.getElementById("view");
let mounted = null; // practice widget on screen, if any

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
    if (m.topics.length === 0) {
      return `<section class="module soon"><h2>${m.title}</h2><p>${m.summary}</p><span class="badge soon">Próximamente</span></section>`;
    }
    const rows = m.topics.map((t, i) => topicRow(t, i, next && next.id)).join("");
    return `<section class="module"><h2>${m.title}</h2><p>${m.summary}</p><div class="rows">${rows}</div></section>`;
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

function lessonView(id) {
  const topic = findTopic(id);
  if (!topic || !isReady(id)) return notFoundView();
  store.update(id, { read: true });

  const lesson = LESSONS[id];
  view.innerHTML = `
    <nav class="crumbs"><a href="#/">← Curso</a></nav>
    <header class="masthead">
      <p class="kicker">${topic.module.title}</p>
      <h1>${topic.title}</h1>
      <p class="lead">Lectura de unos ${lesson.minutes} minutos, con práctica al final.</p>
    </header>
    <article class="lesson">${renderRich(lesson.body)}</article>
    <p class="fullscreen-link"><a href="#/practica/${id}">Abrir la práctica en pantalla completa →</a></p>`;

  const slot = view.querySelector("[data-practice]");
  if (slot) {
    slot.className = "embed";
    slot.setAttribute("data-no-autofocus", "");
    mounted = mountPractice(slot, GENERATORS[id], { topicId: id });
  }
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
  view.innerHTML = '<nav class="crumbs"><a href="#/">← Curso</a></nav><p>Ese tema no existe todavía.</p>';
}

function route() {
  if (mounted) mounted.destroy();
  mounted = null;

  const [, page, id] = location.hash.split("/");
  if (page === "tema") lessonView(id);
  else if (page === "practica") practiceView(id);
  else homeView();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
