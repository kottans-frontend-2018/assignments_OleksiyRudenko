function updateClock(clock) {
  clock.innerHTML = new Date().toLocaleTimeString();
}

function initializeClock() {
  const currentTimeElement = document.getElementById("current-time");
  updateClock(currentTimeElement);
  window.setInterval(() => {
    updateClock(currentTimeElement);
  }, 1000);
}

function setCopyYear() {
  const copyYearElement = document.getElementById("copy-year");
  copyYearElement.innerText = new Date().getFullYear();
}