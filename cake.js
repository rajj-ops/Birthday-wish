function setupCakeScreen(langPack, onCompleted) {
  const slider = document.getElementById('cakeCutSlider');
  const status = document.getElementById('cakeStatusText');
  const nextBtn = document.getElementById('cakeNextBtn');
  const flame = document.querySelector('.flame');

  slider.addEventListener('input', (e) => {
    if (e.target.value >= 95) {
      slider.disabled = true;
      status.innerText = langPack.cakeDone;
      status.style.color = "var(--accent-color)";
      status.style.fontWeight = "bold";
      
      if (flame) flame.style.display = 'none';
      nextBtn.style.display = 'block';
    }
  });

  nextBtn.onclick = onCompleted;
}
