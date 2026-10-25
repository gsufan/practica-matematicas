// UI logic. Subtopics are registered here; each one adds its generator.
const SUBTOPICS = [timesTablesGenerator];
let activeSubtopic = SUBTOPICS[0];

const $ = (id) => document.getElementById(id);
const els = {
  table: $("table-select"),
  timerToggle: $("timer-toggle"),
  label: $("problem-label"),
  equation: $("equation"),
  form: $("answer-form"),
  input: $("answer-input"),
  feedback: $("feedback"),
  stepsBtn: $("steps-btn"),
  nextBtn: $("next-btn"),
  steps: $("steps"),
  timer: $("timer"),
  ok: $("score-ok"),
  total: $("score-total"),
};

let current = null;                    // problem being practiced
const stats = { ok: 0, total: 0 };
const timer = { id: null, start: 0, frozen: null };

// Spanish decimal comma
function formatSeconds(seconds) {
  return seconds.toFixed(1).replace(".", ",");
}

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function startTimer() {
  if (timer.id !== null) clearInterval(timer.id);
  timer.id = null;
  timer.frozen = null;

  if (!els.timerToggle.checked) {
    els.timer.hidden = true;
    return;
  }
  els.timer.hidden = false;
  timer.start = performance.now();
  timer.id = setInterval(tick, 100);
  tick();
}

function tick() {
  const seconds = (performance.now() - timer.start) / 1000;
  els.timer.textContent = `Tiempo: ${formatSeconds(seconds)} s`;
}

// Freezes the timer at the first valid attempt and returns the time
function stopTimer() {
  if (timer.id !== null) {
    clearInterval(timer.id);
    timer.id = null;
    timer.frozen = (performance.now() - timer.start) / 1000;
    els.timer.textContent = `Tiempo: ${formatSeconds(timer.frozen)} s`;
  }
  return timer.frozen;
}

function showFeedback(message, correct) {
  els.feedback.textContent = message;
  els.feedback.className = "feedback" + (correct === true ? " ok" : correct === false ? " bad" : "");
}

function renderStats() {
  els.ok.textContent = stats.ok;
  els.total.textContent = stats.total;
}

function renderSteps() {
  els.steps.innerHTML = current.steps
    .map((step) => `<li>${renderMath(step)}</li>`)
    .join("");
}

function newProblem() {
  current = activeSubtopic.generate({ table: els.table.value, mode: currentMode() });
  current.counted = false; // only the first valid attempt counts

  els.label.textContent = current.label;
  els.equation.innerHTML = renderMath(current.equation);
  els.input.value = "";
  els.steps.hidden = true;
  els.steps.innerHTML = "";
  els.stepsBtn.textContent = "Ver pasos";
  showFeedback("", null);
  startTimer();
  els.input.focus();
}

function checkAnswer() {
  if (!current) return;

  const raw = els.input.value.trim();
  if (raw === "") {
    showFeedback("Escribe una respuesta.", null);
    return;
  }
  if (!/^-?\d+$/.test(raw)) {
    showFeedback("Escribe solo un número entero.", null);
    return;
  }

  const seconds = stopTimer();
  const correct = Number(raw) === current.answer;

  if (!current.counted) {
    current.counted = true;
    stats.total++;
    if (correct) stats.ok++;
    renderStats();
  }

  const timeNote = seconds !== null && els.timerToggle.checked ? ` (${formatSeconds(seconds)} s)` : "";
  showFeedback(
    correct ? `Correcto.${timeNote}` : 'No es correcto. Intenta de nuevo o pulsa "Ver pasos".',
    correct
  );
}

function toggleSteps() {
  if (els.steps.hidden) {
    renderSteps();
    els.steps.hidden = false;
    els.stepsBtn.textContent = "Ocultar pasos";
  } else {
    els.steps.hidden = true;
    els.stepsBtn.textContent = "Ver pasos";
  }
}

// Table selector: mixed, then 2 to 12
els.table.append(new Option("Mixta (2 a 12)", "mixed"));
for (let n = 2; n <= 12; n++) {
  els.table.append(new Option(`Tabla del ${n}`, String(n)));
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAnswer();
});
els.nextBtn.addEventListener("click", newProblem);
els.stepsBtn.addEventListener("click", toggleSteps);
els.table.addEventListener("change", newProblem);
document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", newProblem);
});
els.timerToggle.addEventListener("change", startTimer);

renderStats();
newProblem();
