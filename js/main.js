fetch("data/chapters.json")
  .then((response) => response.json())
  .then((chapters) => {
    renderChapters(chapters);
  })
  .catch((error) => {
    console.error("Error cargando los capítulos:", error);
  });

function renderChapters(chapters) {
  const list = document.getElementById("chapters-list");

  chapters.forEach((chapter) => {
    const li = document.createElement("li");

    li.className =
      "bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition";

    li.innerHTML = `
      <h2 class="text-lg font-medium">
        Capítulo ${chapter.id}: ${chapter.title}
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        ${chapter.summary}
      </p>
    `;

    li.addEventListener("click", () => {
      window.location.href = `game.html?chapter=${chapter.id}`;
    });

    list.appendChild(li);
  });
}
