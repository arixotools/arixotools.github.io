let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function startStopwatch() {

  if (timerInterval !== null) {
    return;
  }

  startTime =
    Date.now() - elapsedTime;

  timerInterval =
    setInterval(updateDisplay, 10);
}

function pauseStopwatch() {

  if (timerInterval === null) {
    return;
  }

  clearInterval(timerInterval);

  timerInterval = null;

  elapsedTime =
    Date.now() - startTime;
}

function resetStopwatch() {

  clearInterval(timerInterval);

  timerInterval = null;

  startTime = 0;

  elapsedTime = 0;

  document.getElementById("display").textContent =
    "00:00:00";
}

function updateDisplay() {

  elapsedTime =
    Date.now() - startTime;

  const milliseconds =
    Math.floor((elapsedTime % 1000) / 10);

  const seconds =
    Math.floor(elapsedTime / 1000) % 60;

  const minutes =
    Math.floor(elapsedTime / (1000 * 60)) % 60;

  const hours =
    Math.floor(elapsedTime / (1000 * 60 * 60));

  const display =
    `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

  document.getElementById("display").textContent =
    display;
}

function formatTime(value) {

  return value
    .toString()
    .padStart(2, "0");
}