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
