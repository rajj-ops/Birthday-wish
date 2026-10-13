function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateButtonText(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('app-theme', next);
  updateButtonText(next);
}

function updateButtonText(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerText = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }
}

document.addEventListener('DOMContentLoaded', initTheme);
