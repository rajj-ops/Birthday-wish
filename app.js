// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
window.selectedTheme = 'dark';
window.selectedLang = 'od';
window.targetName = 'Raj';
window.isFlirtModeOn = false;

// ==========================================
// 2. SMOOTH SCREEN SWITCHER WITH TRANSITIONS
// ==========================================
window.switchScreen = function(fromId, toId) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  if (!toEl) return;

  if (fromEl) {
    fromEl.classList.add('screen-exit');
    setTimeout(() => {
      fromEl.classList.remove('active', 'screen-exit');
      fromEl.style.display = 'none';

      toEl.style.display = 'block';
      // Entry animation reset
      void toEl.offsetWidth;
      toEl.classList.add('active');
    }, 250);
  } else {
    toEl.style.display = 'block';
    toEl.classList.add('active');
  }
};

// ==========================================
// 3. INTERACTIVE TOUCH / WATER RIPPLE EFFECT
// ==========================================
window.createWaterWave = function(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'water-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  const secRipple = document.createElement('div');
  secRipple.className = 'water-ripple-secondary';
  secRipple.style.left = `${x}px`;
  secRipple.style.top = `${y}px`;

  document.body.appendChild(ripple);
  document.body.appendChild(secRipple);

  setTimeout(() => {
    ripple.remove();
    secRipple.remove();
  }, 750);
};

// Global tap / pointer event par ripple
document.addEventListener('pointerdown', (e) => {
  if (typeof createWaterWave === 'function') {
    createWaterWave(e.clientX, e.clientY);
  }
});

// ==========================================
// 4. THEME TOGGLE (DARK / LIGHT MODE)
// ==========================================
window.toggleTheme = function() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  window.selectedTheme = newTheme;

  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
  }
};

// ==========================================
// 5. FLIRTING MODE TOGGLE ENGINE
// ==========================================
window.toggleFlirtMode = function() {
  window.isFlirtModeOn = !window.isFlirtModeOn;
  const btn = document.getElementById('flirtToggleBtn');

  if (btn) {
    btn.innerText = window.isFlirtModeOn ? "🔥 Flirt: ON" : "💖 Flirt: OFF";
    btn.classList.toggle('flirt-active', window.isFlirtModeOn);
  }

  // Agar user abhi final letter screen par hai toh text live badal jayega
  if (typeof window.renderFinalLetterDynamic === 'function') {
    window.renderFinalLetterDynamic();
  }
};

// ==========================================
// 6. INITIALIZATION ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Theme apply
  document.body.setAttribute('data-theme', window.selectedTheme);

  // Initial active screen show
  const activeScreens = document.querySelectorAll('.app-screen.active');
  if (activeScreens.length === 0) {
    const firstScreen = document.querySelector('.app-screen');
    if (firstScreen) {
      firstScreen.style.display = 'block';
      firstScreen.classList.add('active');
    }
  }
});
