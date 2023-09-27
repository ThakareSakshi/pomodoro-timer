function openSettings() {
  const settingsPopup = document.getElementById("settingsPopup");
  settingsPopup.style.display = "block";
}

function closeSettings() {
  const settingsPopup = document.getElementById("settingsPopup");
  settingsPopup.style.display = "none";
}

// script.js

//Function to redirect to login.html
function redirectToLogin() {
  window.location.href = "login.html";
}

// Add event listener to the "Log In" button
document
  .getElementById("login-button")
  .addEventListener("click", redirectToLogin);

async function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display =
    popup.style.display === "none" || popup.style.display === ""
      ? "block"
      : "none";
}

async function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display =
    popup.style.display === "none" || popup.style.display === ""
      ? "block"
      : "none";
}
function redirectToReport() {
  window.location.href = "report.html";
}
