const params = new URLSearchParams(window.location.search);
const chapterId = params.get("chapter");

if (!chapterId) {
  alert("No se seleccionó ningún capítulo.");
}

fetch("data/chapters.json")
  .then((response) => response.json())
  .then((chapters) => {
    const chapter = chapters.find((c) => c.id == chapterId);
    renderChapter(chapter);
  })
  .catch((error) => {
    console.error("Error cargando el capítulo:", error);
  });

function renderChapter(chapter) {
  document.getElementById(
    "chapter-title"
  ).textContent = `Capítulo ${chapter.id}: ${chapter.title}`;

  document.getElementById("chapter-summary").textContent = chapter.summary;
}
