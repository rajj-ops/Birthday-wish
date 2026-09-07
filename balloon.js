function setupBalloonScreen(langPack, onCompleted) {
  const balloons = document.querySelectorAll('.b3d');
  const nextBtn = document.getElementById('balloonNextBtn');
  let poppedCount = 0;

  // Multi-language 5 keywords
  const balloonWords = langPack.balloonWords || ["Beautiful", "Smart", "Awesome", "Kind", "Cute"];

  balloons.forEach((b, index) => {
    // Inject text directly inside the balloon element
    const txtSpan = b.querySelector('.b3d-txt');
    if (txtSpan) {
      txtSpan.innerText = balloonWords[index] || "Sweet";
    }

    b.addEventListener('click', () => {
      if (!b.classList.contains('revealed')) {
        b.classList.add('revealed');
        poppedCount++;

        // Jab saare 5 balloons reveal ho jayein, next button reveal karo
        if (poppedCount === balloons.length) {
          nextBtn.style.display = 'block';
          nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  nextBtn.onclick = onCompleted;
}
