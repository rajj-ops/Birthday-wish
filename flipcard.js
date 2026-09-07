function setupFlipCards(langPack, onCompleted) {
  let currentIndex = 0;
  const reasons = langPack.reasons;
  const total = reasons.length;

  const cardFlipInner = document.getElementById('cardFlipInner');
  const cardFrontNum = document.getElementById('cardFrontNum');
  const cardBackText = document.getElementById('cardBackText');
  const cardBackCounter = document.getElementById('cardBackCounter');
  const btnNext = document.getElementById('btnNextReason');

  function loadCard(index) {
    // Unflip if already flipped
    cardFlipInner.classList.remove('flipped');
    
    // Front update
    cardFrontNum.innerText = `#${index + 1}`;
    
    // Back update
    cardBackText.innerText = reasons[index];
    cardBackCounter.innerText = `${index + 1} / ${total}`;

    // Button state
    if (index === total - 1) {
      btnNext.innerText = langPack.btnPopJoy || "Pop Joy ➔";
    } else {
      btnNext.innerText = langPack.btnNextReason || "Next Reason ➔";
    }
  }

  // Click card to flip
  cardFlipInner.onclick = () => {
    cardFlipInner.classList.toggle('flipped');
  };

  // Next Reason Button
  btnNext.onclick = () => {
    if (currentIndex < total - 1) {
      currentIndex++;
      loadCard(currentIndex);
    } else {
      // Completed all 12 cards -> move to Balloons
      onCompleted();
    }
  };

  // Load first card
  loadCard(0);
}
