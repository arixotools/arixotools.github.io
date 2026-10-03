let countdownInterval;

function startCountdown() {

  const input =
    document.getElementById("targetDate").value;

  const result =
    document.getElementById("result");

  if (!input) {
    result.textContent =
      "Please select a future date and time.";
    return;
  }

  const targetTime =
    new Date(input).getTime();

  clearInterval(countdownInterval);

  function updateCountdown() {

    const now = new Date().getTime();

    const difference =
      targetTime - now;

    if (difference <= 0) {

      clearInterval(countdownInterval);

      result.innerHTML =
        "<strong>🎉 Time's up!</strong>";

      return;
    }

    const days =
      Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (difference / (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (difference / 1000) % 60
      );

    result.innerHTML =
      `<strong>${days}</strong> days<br>
       <strong>${hours}</strong> hours<br>
       <strong>${minutes}</strong> minutes<br>
       <strong>${seconds}</strong> seconds`;
  }

  updateCountdown();

  countdownInterval =
    setInterval(updateCountdown, 1000);
}