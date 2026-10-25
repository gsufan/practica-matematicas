// Practice widget. Mounts into any container, so it works inside a lesson or on its own page.
// A generator describes its options with `controls` and builds problems with `generate(options)`.
let practiceCount = 0;

function mountPractice(root, generator, { topicId, timer: withTimer = true } = {}) {
  const uid = `p${++practiceCount}`;
  const controls = generator.controls || [];
  const options = {};
  controls.forEach((c) => (options[c.id] = c.default ?? c.choices[0].value));

  root.innerHTML = `
    <section class="setup" aria-label="Opciones de práctica"></section>
    <article class="problem">
      <p class="problem-label"></p>
      <div class="equation"></div>
      <form class="answer" autocomplete="off">
        <label for="${uid}-input" class="field">Tu respuesta</label>
        <input id="${uid}-input" inputmode="numeric">
        <button type="submit" class="primary">Validar</button>
      </form>
      <p class="feedback" role="status" aria-live="polite"></p>
      <div class="actions">
        <button type="button" data-steps>Ver pasos</button>
        <button type="button" data-next>Siguiente</button>
      </div>
      <ol class="steps" hidden></ol>
      <p class="timer" hidden></p>
    </article>
    <p class="tally">Aciertos <strong data-ok>0</strong> de <strong data-total>0</strong></p>`;

  const q = (sel) => root.querySelector(sel);
  const els = {
    setup: q(".setup"), label: q(".problem-label"), equation: q(".equation"),
    form: q(".answer"), input: q(".answer input"), feedback: q(".feedback"),
    stepsBtn: q("[data-steps]"), nextBtn: q("[data-next]"), steps: q(".steps"),
    timer: q(".timer"), ok: q("[data-ok]"), total: q("[data-total]"),
  };

  let current = null;
  const clock = { id: null, start: 0, frozen: null };
  let timerOn = false;

  // Controls: selects and segmented radios, built from the generator description
  controls.forEach((c) => {
    if (c.type === "select") {
      const label = document.createElement("label");
      label.className = "field";
      label.textContent = c.label;
      const select = document.createElement("select");
      c.choices.forEach((o) => select.append(new Option(o.label, o.value)));
      select.addEventListener("change", () => { options[c.id] = select.value; newProblem(); });
      label.append(select);
      els.setup.append(label);
    } else {
      const set = document.createElement("fieldset");
      set.innerHTML = `<legend>${c.label}</legend>`;
      c.choices.forEach((o, i) => {
        const label = document.createElement("label");
        label.className = "radio";
        label.innerHTML = `<input type="radio" name="${uid}-${c.id}" value="${o.value}"${i === 0 ? " checked" : ""}> ${o.label}`;
        label.querySelector("input").addEventListener("change", () => { options[c.id] = o.value; newProblem(); });
        set.append(label);
      });
      els.setup.append(set);
    }
  });
  if (withTimer) {
    const label = document.createElement("label");
    label.className = "check";
    label.innerHTML = '<input type="checkbox"> Cronómetro';
    label.querySelector("input").addEventListener("change", (e) => { timerOn = e.target.checked; startTimer(); });
    els.setup.append(label);
  }

  // Spanish decimal comma
  const fmt = (s) => s.toFixed(1).replace(".", ",");

  function startTimer() {
    clearInterval(clock.id);
    clock.id = null;
    clock.frozen = null;
    els.timer.hidden = !timerOn;
    if (!timerOn) return;
    clock.start = performance.now();
    clock.id = setInterval(tick, 100);
    tick();
  }

  function tick() {
    els.timer.textContent = `Tiempo: ${fmt((performance.now() - clock.start) / 1000)} s`;
  }

  // Freezes the timer at the first valid attempt and returns the time
  function stopTimer() {
    if (clock.id !== null) {
      clearInterval(clock.id);
      clock.id = null;
      clock.frozen = (performance.now() - clock.start) / 1000;
      els.timer.textContent = `Tiempo: ${fmt(clock.frozen)} s`;
    }
    return clock.frozen;
  }

  function showFeedback(message, correct) {
    els.feedback.textContent = message;
    els.feedback.className = "feedback" + (correct === true ? " ok" : correct === false ? " bad" : "");
  }

  function renderTally() {
    const t = store.topic(topicId);
    els.ok.textContent = t.ok;
    els.total.textContent = t.total;
  }

  function newProblem() {
    current = generator.generate({ ...options });
    current.counted = false; // only the first valid attempt counts
    els.label.textContent = current.label;
    els.equation.innerHTML = renderMath(current.equation);
    els.input.value = "";
    els.steps.hidden = true;
    els.steps.innerHTML = "";
    els.stepsBtn.textContent = "Ver pasos";
    showFeedback("", null);
    startTimer();
    if (!root.hasAttribute("data-no-autofocus")) els.input.focus({ preventScroll: true });
  }

  function checkAnswer() {
    const raw = els.input.value.trim();
    if (raw === "") return showFeedback("Escribe una respuesta.", null);
    if (!/^-?\d+$/.test(raw)) return showFeedback("Escribe solo un número entero.", null);

    const seconds = stopTimer();
    const correct = Number(raw) === current.answer;
    if (!current.counted) {
      current.counted = true;
      store.recordAttempt(topicId, correct);
      renderTally();
    }
    const note = seconds !== null && timerOn ? ` (${fmt(seconds)} s)` : "";
    showFeedback(correct ? `Correcto.${note}` : 'No es correcto. Intenta de nuevo o pulsa "Ver pasos".', correct);
  }

  els.form.addEventListener("submit", (e) => { e.preventDefault(); checkAnswer(); });
  els.nextBtn.addEventListener("click", newProblem);
  els.stepsBtn.addEventListener("click", () => {
    if (els.steps.hidden) {
      els.steps.innerHTML = current.steps.map((s) => `<li>${renderMath(s)}</li>`).join("");
      els.steps.hidden = false;
      els.stepsBtn.textContent = "Ocultar pasos";
    } else {
      els.steps.hidden = true;
      els.stepsBtn.textContent = "Ver pasos";
    }
  });

  renderTally();
  newProblem();

  // Lets the router stop the timer when leaving the page
  return { destroy: () => clearInterval(clock.id) };
}
