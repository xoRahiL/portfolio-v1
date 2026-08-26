// ==========================================
// Theme toggle (dark default, light optional)
// Persists choice in localStorage
// ==========================================
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

const applyTheme = (theme) => {
  if (theme === "light") {
    root.classList.add("light-theme");
    themeIcon.textContent = "🌙";
    themeLabel.textContent = "Dark mode";
  } else {
    root.classList.remove("light-theme");
    themeIcon.textContent = "☀️";
    themeLabel.textContent = "Light mode";
  }
};

const savedTheme = localStorage.getItem("resume-theme") || "dark";
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const isLight = root.classList.contains("light-theme");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("resume-theme", next);
});

// ==========================================
// Download PDF — uses the browser's native
// print-to-PDF, styled by the @media print
// rules in resume.css (always clean/light,
// regardless of the on-screen theme)
// ==========================================
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn?.addEventListener("click", () => {
  window.print();
});