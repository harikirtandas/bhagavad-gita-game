const optionsButton = document.getElementById("options-button");
const optionsMenu = document.getElementById("options-menu");

if (optionsButton && optionsMenu) {
  optionsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    optionsMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!optionsMenu.contains(e.target)) {
      optionsMenu.classList.add("hidden");
    }
  });
}

const soundToggle = document.getElementById("sound-toggle");

let soundEnabled = localStorage.getItem("soundEnabled");
if (soundEnabled === null) {
  soundEnabled = "true";
  localStorage.setItem("soundEnabled", "true");
}

updateIcon();

soundToggle?.addEventListener("click", () => {
  soundEnabled = soundEnabled === "true" ? "false" : "true";
  localStorage.setItem("soundEnabled", soundEnabled);

  if (soundEnabled === "false") {
    stopMusic(); // 🔇 se apaga inmediatamente
  }

  updateIcon();
});

function updateIcon() {
  if (!soundToggle) return;
  soundToggle.textContent = soundEnabled === "true" ? "🔊" : "🔇";
}
const backButton = document.getElementById("back-button");

backButton?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "../index.html";
  }
});
