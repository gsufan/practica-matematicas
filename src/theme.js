// Light/dark theme. The first visit follows the system; after a click the choice is remembered.
const THEME_KEY = "mates-theme";
const THEME_COLORS = { light: "#f5f6fb", dark: "#0e1124" };

function savedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
const systemTheme = () => (systemQuery.matches ? "dark" : "light");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = THEME_COLORS[theme];
  const button = document.getElementById("theme-toggle");
  button.setAttribute("aria-pressed", String(theme === "dark"));
  button.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // not saved: the choice lasts until the page closes
  }
  applyTheme(next);
});

// Without a saved choice, follow the system when it changes
systemQuery.addEventListener("change", () => {
  if (!savedTheme()) applyTheme(systemTheme());
});

applyTheme(savedTheme() || systemTheme());
