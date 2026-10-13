function blowCandle() {
  const flame = document.getElementById('candleFlame');
  const smoke = document.getElementById('candleSmoke');
  if (flame && flame.style.display !== 'none') {
    flame.style.display = 'none';
    if (smoke) {
      smoke.style.display = 'block';
      setTimeout(() => { smoke.style.display = 'none'; }, 900);
    }
  }
}

function updateCakeName() {
  const icingName = document.getElementById('cakeIcingName');
  if (icingName) {
    const currentName = (typeof targetName !== 'undefined' && targetName) ? targetName : 'Babu';
    icingName.innerHTML = `Happy Birthday<br><span style="font-size: 21px; color:#ffdf78;">${currentName}</span>`;
  }
}

function startCake() {
  const slider = document.getElementById('cakeCutSlider');
  const status = document.getElementById('cakeStatusText');
  const nextBtn = document.getElementById('cakeNextBtn');
  const knife = document.getElementById('laserKnife');
  const cake = document.getElementById('cakeStructure');

  // Immediately render user's exact name
  updateCakeName();

  slider.value = 0;
  if (knife) knife.style.height = '0%';

  slider.oninput = (e) => {
    const val = parseInt(e.target.value);
    
    if (knife) {
      knife.style.height = (val * 0.85) + '%';
    }

    if (val >= 95) {
      slider.disabled = true;
      blowCandle();
      
      if (cake) cake.classList.add('cut-done');
      if (knife) knife.style.opacity = '0';

      status.innerText = (typeof t !== 'undefined' && t.cakeDone) ? t.cakeDone : "Cake kati gala! Card sabu dekhantu 💌";
      status.style.color = "var(--accent)";
      status.style.fontWeight = "bold";

      if (nextBtn) nextBtn.style.display = 'block';
    }
  };

  if (nextBtn) {
    nextBtn.onclick = () => {
      switchScreen('screen-cake', 'screen-wishes-vertical');
    };
  }
}

// Initial call on page load
document.addEventListener('DOMContentLoaded', updateCakeName);
