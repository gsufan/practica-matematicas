// Sidebar: modules and topics, collapsible. Open on wide screens, a drawer on phones.
const SIDEBAR_KEY = "mates-sidebar";
const wideQuery = window.matchMedia("(min-width: 900px)");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menu-toggle");
const openGroups = new Set(); // modules the user expanded by hand

function savedSidebar() {
  try {
    return localStorage.getItem(SIDEBAR_KEY);
  } catch {
    return null;
  }
}

function setSidebar(open, remember) {
  document.body.dataset.sidebar = open ? "open" : "closed";
  menuButton.setAttribute("aria-expanded", String(open));
  if (remember && wideQuery.matches) {
    try {
      localStorage.setItem(SIDEBAR_KEY, open ? "open" : "closed");
    } catch {
      // not saved: the choice lasts until the page closes
    }
  }
}

function sidebarIsOpen() {
  return document.body.dataset.sidebar === "open";
}

// active: { home, module, topic } ids of what is on screen
function renderSidebar(active) {
  const scroll = sidebar.querySelector(".side-scroll")?.scrollTop || 0;
  if (active.module) openGroups.add(active.module);

  const groups = COURSE.map((m) => {
    const title = `<a class="side-module${active.module === m.id && !active.topic ? " active" : ""}" href="#/modulo/${m.id}">${m.title}</a>`;
    if (m.topics.length === 0) {
      return `<div class="side-group"><div class="side-head">${title}<span class="side-soon">pronto</span></div></div>`;
    }
    const mastered = m.topics.filter((t) => store.status(t.id) === "mastered").length;
    const items = m.topics
      .map((t) => {
        if (!isReady(t.id)) return `<span class="side-topic soon">${t.title}</span>`;
        const current = active.topic === t.id ? " active" : "";
        return `<a class="side-topic${current}" href="#/tema/${t.id}"${current ? ' aria-current="page"' : ""}><span class="dot ${store.status(t.id)}"></span>${t.title}</a>`;
      })
      .join("");
    return `
      <details class="side-group" data-module="${m.id}"${openGroups.has(m.id) ? " open" : ""}>
        <summary><span class="side-head">${title}<span class="side-count">${mastered}/${m.topics.length}</span></span></summary>
        <div class="side-topics">${items}</div>
      </details>`;
  }).join("");

  sidebar.innerHTML = `
    <div class="side-scroll">
      <div class="side-top">
        <span class="side-title">Secciones</span>
        <button type="button" class="side-close" aria-label="Cerrar el menú">✕</button>
      </div>
      <a class="side-link${active.home ? " active" : ""}" href="#/">Inicio</a>
      ${groups}
    </div>`;
  sidebar.querySelector(".side-scroll").scrollTop = scroll;
}

// Remember which groups the user opens or closes
sidebar.addEventListener("toggle", (event) => {
  const group = event.target.closest?.("details[data-module]");
  if (!group) return;
  if (group.open) openGroups.add(group.dataset.module);
  else openGroups.delete(group.dataset.module);
}, true);

sidebar.addEventListener("click", (event) => {
  if (event.target.closest(".side-close")) return setSidebar(false, false);
  // on phones, picking something closes the drawer
  if (event.target.closest("a") && !wideQuery.matches) setSidebar(false, false);
});

menuButton.addEventListener("click", () => setSidebar(!sidebarIsOpen(), true));
document.getElementById("scrim").addEventListener("click", () => setSidebar(false, false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebarIsOpen() && !wideQuery.matches) setSidebar(false, false);
});

// Wide screens remember the choice (open by default); phones start closed
function syncSidebarToScreen() {
  setSidebar(wideQuery.matches ? savedSidebar() !== "closed" : false, false);
}
wideQuery.addEventListener("change", syncSidebarToScreen);
syncSidebarToScreen();
