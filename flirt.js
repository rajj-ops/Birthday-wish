let flirtScore = 0;

const flirtLines = [
  "Sach kahun toh... tumhari ek muskaan pura din bana deti hai ✨",
  "Pata nahi kya jadu hai tumhare chehre mein, nazrein hi nahi hatti 😉❤️",
  "Tum meri sirf pasand nahi... meri sabse pyari aadat ban chuki ho 🥺",
  "Itni khoobsurat lagti ho ki taareef ke liye words hi kam pad jaate hain 🌸",
  "Ab itna bhi mat muskurao, dil sambhalna mushkil ho raha hai 💍💖"
];

function boostFlirtMeter() {
  if (flirtScore >= 100) return;

  flirtScore += 25;
  if (flirtScore > 100) flirtScore = 100;

  const fill = document.getElementById('flirtMeterFill');
  const txt = document.getElementById('flirtPercentText');
  const dialogue = document.getElementById('flirtDialogueText');
  const nextBtn = document.getElementById('btnNextAfterFlirt');

  if (fill) fill.style.width = flirtScore + '%';
  if (txt) txt.innerText = `Love Meter: ${flirtScore}%`;

  // Change dialogue on each tap
  const lineIndex = Math.min(Math.floor(flirtScore / 25), flirtLines.length - 1);
  if (dialogue) {
    dialogue.style.opacity = '0';
    setTimeout(() => {
      dialogue.innerText = `"${flirtLines[lineIndex]}"`;
      dialogue.style.opacity = '1';
    }, 150);
  }

  // Water ripple effect on tap
  const avatar = document.getElementById('flirtHeartBtn');
  if (typeof createWaterWave === 'function' && avatar) {
    const rect = avatar.getBoundingClientRect();
    createWaterWave(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  // 100% hone par Next button unlock
  if (flirtScore >= 100 && nextBtn) {
    nextBtn.style.display = 'block';
  }
}
