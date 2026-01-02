import { getGlobalScore } from "./storage.js";
import { CHAPTERS } from "./challenges-data.js";

// Score global
const score = getGlobalScore();
document.querySelector("#global-score").textContent = `${score}%`;

// 1. Leer path desde la URL
const params = new URLSearchParams(window.location.search);
const path = params.get("path");

// 2. Validación
if (!path) {
  alert("No se eligió un camino.");
  window.location.href = "challenges.html";
}

// 3. Filtrar capítulos
const filteredChapters = CHAPTERS.filter((chapter) => chapter.path === path);

// 4. Título dinámico
const titleMap = {
  karma: "⚔️ El Campo de Batalla",
  bhakti: "❤️ El Corazón del Guerrero",
  jnana: "👁️ La Visión Clara",
};

document.getElementById("chapters-title").textContent =
  titleMap[path] || "Capítulos";

// 5. Render capítulos
const list = document.getElementById("chapters-list");
list.innerHTML = "";

filteredChapters.forEach((chapter) => {
  const li = document.createElement("li");
  li.className =
    "bg-white p-4 rounded shadow hover:bg-slate-50 cursor-pointer transition";

  li.innerHTML = `
    <h2 class="font-semibold">${chapter.title}</h2>
    <p class="text-sm text-gray-500">${chapter.subtitle}</p>
  `;

  li.addEventListener("click", () => {
    window.location.href = `game.html?chapter=${chapter.id}&path=${path}`;
  });

  list.appendChild(li);
});

document.addEventListener("DOMContentLoaded", () => {
  playMusic("chapter");
});
