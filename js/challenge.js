import { CHALLENGES } from "./challenges-data.js";

// 1. Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const path = params.get("path");

// 2. Validación básica
if (!path || !CHALLENGES[path]) {
  alert("Desafío no válido.");
  window.location.href = "views/challenges.html";
}

// 3. Obtener el challenge
const challenge = CHALLENGES[path];

const background = document.getElementById("background");

if (background && challenge.background) {
  background.style.backgroundImage = `url('${challenge.background}')`;
}

// 4. Render UI
document.getElementById("challenge-title").textContent = challenge.title;
document.getElementById("challenge-subtitle").textContent = challenge.subtitle;
document.getElementById("challenge-condition").textContent =
  challenge.condition;

const navbarTitle = document.getElementById("navbar-title");

if (navbarTitle) {
  navbarTitle.textContent = challenge.condition;
}

// narrativa
const textContainer = document.getElementById("challenge-text");
textContainer.innerHTML = "";

challenge.narrative.forEach((paragraph) => {
  const p = document.createElement("p");
  p.textContent = paragraph;
  p.className = "mb-0.5 leading-snug text-gray-800";
  textContainer.appendChild(p);
});

// 5. Botón → capítulos
document.getElementById("enter-challenge").addEventListener("click", () => {
  window.location.href = `chapters.html?path=${path}`;
});

document.addEventListener("DOMContentLoaded", () => {
  playMusic("challenge");
});
