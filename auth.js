function setupAuthScreen(correctPin, username, onVerifiedSuccess) {
  const boxes = [
    document.getElementById('otp-1'),
    document.getElementById('otp-2'),
    document.getElementById('otp-3'),
    document.getElementById('otp-4')
  ];
  const realInput = document.getElementById('hiddenPinInput');
  const errorMsg = document.getElementById('authErrorText');
  const authContainer = document.getElementById('authCardBox');
  const authFormSide = document.getElementById('authFormSide');
  const authSuccessSide = document.getElementById('authSuccessSide');
  const btnFill = document.getElementById('btnAutoFill');
  const btnContinue = document.getElementById('btnAuthContinue');

  // Username inject
  const userDisplay = document.getElementById('authUsernameDisplay');
  if (userDisplay) userDisplay.innerText = username;

  // Hint update
  const hintCode = document.getElementById('hintCodeDisplay');
  if (hintCode) hintCode.innerText = correctPin;

  // Focus trigger
  document.getElementById('otpGroup').onclick = () => realInput.focus();

  // Manual Typing update
  realInput.addEventListener('input', (e) => {
    updateBoxes(e.target.value);
    if (e.target.value.length === 4) {
      verifyPin(e.target.value);
    }
  });

  function updateBoxes(val) {
    errorMsg.innerText = "";
    boxes.forEach((box, i) => {
      if (val[i]) {
        box.innerText = val[i];
        box.classList.add('filled');
      } else {
        box.innerText = "";
        box.classList.remove('filled');
      }
      box.classList.toggle('active', i === val.length);
    });
  }

  // Video jaisa "Fill" button par auto-type animation
  btnFill.onclick = () => {
    realInput.value = "";
    updateBoxes("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < correctPin.length) {
        realInput.value += correctPin[i];
        updateBoxes(realInput.value);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => verifyPin(correctPin), 250);
      }
    }, 180);
  };

  // Verification Check
  function verifyPin(inputPin) {
    if (inputPin === correctPin) {
      // Success State (Video Green Checkmark)
      authFormSide.style.display = 'none';
      authSuccessSide.style.display = 'block';
    } else {
      // Error State (Red Shake)
      authContainer.classList.add('shake');
      errorMsg.innerText = "Invalid password! Jisne aapko link bheja hai usse puchiye ki password kya hai.";
      setTimeout(() => authContainer.classList.remove('shake'), 500);
      realInput.value = "";
      setTimeout(() => updateBoxes(""), 600);
    }
  }

  // Continue Button
  btnContinue.onclick = () => {
    onVerifiedSuccess();
  };
}
