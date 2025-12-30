const cards = document.querySelectorAll("[data-path]");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const path = card.dataset.path;

    // redirección con filtro
    window.location.href = `challenge.html?path=${path}`;
  });
});
