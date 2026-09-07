document.addEventListener('DOMContentLoaded', () => {
  function switchScreen(fromId, toId) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (fromEl) fromEl.classList.remove('active');
    if (toEl) toEl.classList.add('active');
  }

  // URL Query Parameters ya LocalStorage se Target Data Read Karna
  const params = new URLSearchParams(window.location.search);
  const targetName = params.get('name') || localStorage.getItem('wish_name') || 'Babu';
  const targetAge = params.get('age') || localStorage.getItem('wish_age') || '20';
  const targetPin = params.get('pin') || localStorage.getItem('wish_pin') || '2026';
  const currentLang = params.get('lang') || localStorage.getItem('wish_lang') || 'hi';

  const t = langData[currentLang] || langData['hi'];

  // Text setup
  document.getElementById('displayUsername').innerText = targetName;
  document.getElementById('authInputUser').value = targetName;
  document.getElementById('otpUserPhoneTag').innerText = targetName;

  document.getElementById('txtWelcome').innerText = t.welcomeTitle;
  document.getElementById('txtIntroName').innerText = `${t.hello} ${targetName}!`;
  document.getElementById('txtReady').innerText = t.readyQuestion;
  document.getElementById('btnStartIntro').innerText = t.btnBegin;

  document.getElementById('txtFlipTitle').innerText = t.flipHeader;
  document.getElementById('txtTapUncover').innerText = t.tapUncover;

  document.getElementById('txtBalloonTitle').innerText = t.balloonTitle;
  document.getElementById('txtBalloonSub').innerText = t.balloonSub;

  document.getElementById('txtCakeTitle').innerText = t.cakeTitle;
  document.getElementById('cakeStatusText').innerText = t.cakeDesc;

  // ========================================================
  // STEP 1: VERIFY PASSWORD (IMAGE 2 CYBERPUNK CARD)
  // ========================================================
  const passInput = document.getElementById('authInputPass');
  const btnVerify = document.getElementById('btnVerifyPassword');
  const errorMsg = document.getElementById('cyberErrorMsg');
  const cardBox = document.getElementById('cyberCardBox');

  btnVerify.addEventListener('click', () => {
    const entered = passInput.value.trim();

    if (entered === targetPin) {
      // Sahi Password: Move to Stage 2 (Video OTP Verification Screen)
      errorMsg.innerText = "";
      switchScreen('screen-auth-step1', 'screen-auth-step2');
      initOtpScreen();
    } else {
      // Galat Password: Shake card aur exact error message
      cardBox.classList.add('shake-card');
      errorMsg.innerText = "Invalid password! Jisne aapko link bheja hai usse puchiye ki password kya hai.";
      setTimeout(() => cardBox.classList.remove('shake-card'), 500);
      passInput.value = "";
    }
  });

  // ========================================================
  // STEP 2: VIDEO OTP AUTO-FILL & GREEN CHECKMARK ANIMATION
  // ========================================================
  function initOtpScreen() {
    const pboxes = [
      document.getElementById('pbox-1'),
      document.getElementById('pbox-2'),
      document.getElementById('pbox-3'),
      document.getElementById('pbox-4')
    ];
    const btnAutoFill = document.getElementById('btnTriggerAutoFill');
    const subCardArea = document.getElementById('otpSubCardArea');
    const successView = document.getElementById('otpSuccessView');
    const btnProceed = document.getElementById('btnProceedToWish');

    // Video exact "Fill" animation: Ek-ek digit pop hokar type hoga
    btnAutoFill.onclick = () => {
      let idx = 0;
      btnAutoFill.disabled = true;

      const fillInterval = setInterval(() => {
        if (idx < targetPin.length) {
          pboxes[idx].innerText = targetPin[idx];
          pboxes[idx].classList.add('filled');
          idx++;
        } else {
          clearInterval(fillInterval);

          // All 4 typed! Trigger Video Green Checkmark
          setTimeout(() => {
            subCardArea.style.display = 'none';
            successView.style.display = 'block';
          }, 350);
        }
      }, 200);
    };

    // Continue to Birthday Celebration
    btnProceed.onclick = () => {
      switchScreen('screen-auth-step2', 'screen-intro');
      startBirthdayJourney();
    };
  }

  // ========================================================
  // STEP 3: BIRTHDAY CELEBRATION JOURNEY
  // ========================================================
  function startBirthdayJourney() {
    // Intro -> 12 Flip Cards
    document.getElementById('btnStartIntro').onclick = () => {
      switchScreen('screen-intro', 'screen-flip');

      setupFlipCards(t, () => {
        // Flip Cards -> 3D Balloons
        switchScreen('screen-flip', 'screen-balloon');

        setupBalloonScreen(t, () => {
          // Balloons -> Cake Cutting
          switchScreen('screen-balloon', 'screen-cake');

          setupCakeScreen(t, () => {
            alert(`Happy Birthday ${targetName}! All surprises completed! ✨`);
          });
        });
      });
    };
  }
});
