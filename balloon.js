window.balloonsPoppedCount = 0;
window.poppedMap = {};

// Screen aane par initialize karne ke liye
window.startBalloons = function() {
  window.balloonsPoppedCount = 0;
  window.poppedMap = {};
  
  const words = (typeof t !== 'undefined' && t && t.balloonWords) 
    ? t.balloonWords 
    : ["Sundari ✨", "beautiful 💡", "Sweet Heart ❤️", "Kind Soul 🌸", "My Peace 🥺"];

  for (let i = 1; i <= 5; i++) {
    const txt = document.getElementById(`bTxt${i}`);
    if (txt && words[i - 1]) {
      txt.innerText = words[i - 1];
    }
  }
};

// Har balloon par click/touch handler
window.popBalloon = function(num) {
  if (window.poppedMap[num]) return; // agar pehle se popped hai to return
  window.poppedMap[num] = true;
  window.balloonsPoppedCount++;

  const wrap = document.getElementById(`bWrap${num}`);
  if (wrap) {
    // Float animation band karke pill reveal mode on karega
    wrap.style.animation = 'none';
    wrap.classList.add('revealed');
  }

  // Counter 0/5 badhao
  const counter = document.getElementById('balloonCounterNum');
  if (counter) {
    counter.innerText = `${window.balloonsPoppedCount} / 5`;
  }

  // Water ripple effect agar function available hai
  if (typeof createWaterWave === 'function' && wrap) {
    const rect = wrap.getBoundingClientRect();
    createWaterWave(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  // 5 balloons pop hone par Cake Button reveal hoga
  if (window.balloonsPoppedCount >= 5) {
    const nextBtn = document.getElementById('balloonNextBtn');
    if (nextBtn) {
      nextBtn.style.display = 'block';
    }
  }
};

window.proceedToCakeScreen = function() {
  if (typeof switchScreen === 'function') {
    switchScreen('screen-balloon', 'screen-cake');
  }
  if (typeof startCake === 'function') {
    startCake();
  }
};

// DOM load hote hi ready karo
document.addEventListener('DOMContentLoaded', () => {
  window.startBalloons();
});
