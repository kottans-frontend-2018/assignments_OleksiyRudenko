function updateClock(clock) {
  clock.innerHTML = new Date().toLocaleTimeString(getLang());
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

function getLang() {
  if (navigator.languages != undefined)
    return navigator.languages[0];
  else
    return navigator.language;
}