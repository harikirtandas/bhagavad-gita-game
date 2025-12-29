let currentQuestionIndex = 0; // en qué pregunta está
let currentChapter = null; // guarda el capitulo actual
const params = new URLSearchParams(window.location.search); // lee los parametros de la url ?chapter=1
const chapterId = params.get("chapter"); // 1

if (!chapterId) {
  alert("No se seleccionó ningún capítulo.");
}

// 	fetch → datos  - find → lógica - renderChapter → UI
// 🔹 fetch: Trae datos (asíncrono)
// 🔹 find: Selecciona UN dato de muchos
// 🔹 render: Muestra datos en pantalla

fetch("data/chapters.json") // pido (hace una peticion http) un recurso. asíncrono
  .then((response) => response.json()) // response = respuesta HTTP
  .then((chapters) => {
    // chapters: array de capítulos
    const chapter = chapters.find((c) => c.id == chapterId); // “Dame el capítulo cuyo id sea igual al que vino por la URL”.
    currentChapter = chapter; // Guardás el capítulo globalmente.
    renderChapter(chapter); // empieza la UI
  })
  .catch((error) => {
    console.error("Error cargando el capítulo:", error);
  });

function renderChapter(chapter) {
  // recibe solo un capítulo
  document.getElementById(
    "chapter-title"
  ).textContent = `Capítulo ${chapter.id}: ${chapter.title}`; // inserta el título en el DOM

  document.getElementById("chapter-summary").textContent = chapter.summary; // inserta la descripción

  renderQuestion(chapter.challenges[currentQuestionIndex], chapter.id);
  // render de la pregunta actual, currentQuestionIndex al principio es 0

  updateProgress(); // guarda el progreso
}

// Preguntas

function renderQuestion(question) {
  const container = document.getElementById("game-container");

  // borra lo anterior e inserta nuevo HTML: Cada pregunta reemplaza la anterior
  container.innerHTML = ` 
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-lg font-medium mb-4">
        ${question.question}
      </h2>

      <div class="space-y-2">
        ${question.options // map recorre el array y devuelve botones
          .map(
            (option, index) => `
          <button
            class="w-full text-left p-3 border rounded hover:bg-gray-100 transition"
            onclick="handleAnswer(
                '${index}',
                '${question.correct}',
                '${question.id}'
              )"
            >
            ${option}  
          </button>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// respuesta del usuario con colores de feedback. Se ejcuta al hacer click en renderQuestion
function handleAnswer(selectedIndex, correctIndex, questionId) {
  const buttons = document.querySelectorAll("#game-container button");

  buttons.forEach((btn, index) => {
    btn.classList.remove("hover:bg-gray-100");
    btn.classList.add("pointer-events-none");

    if (index == correctIndex) {
      btn.classList.add("bg-green-200", "border-green-500", "text-green-900");
    }

    if (index == selectedIndex && selectedIndex !== correctIndex) {
      btn.classList.add("bg-red-200", "border-red-500", "text-red-900");
    }
  });

  const isCorrect = selectedIndex === correctIndex;
  saveAnswer(currentChapter.id, questionId, isCorrect);
  showFeedback(isCorrect, correctIndex);
  showContinueButton(); // botón de continuar
}

// feedback textual
function showFeedback(isCorrect, correctIndex) {
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.textContent = "✔ Correcto";
    feedback.className = "text-green-600";
  } else {
    const correctText =
      currentChapter.challenges[currentQuestionIndex].options[correctIndex];

    feedback.textContent = `✘ Incorrecto: ${correctText}`;
    feedback.className = "text-red-600";
  }
}

// guardar respuesta
function saveAnswer(chapterId, questionId, isCorrect) {
  const progress = JSON.parse(localStorage.getItem("bg-progress")) || {};

  if (!progress[chapterId]) {
    progress[chapterId] = { answers: {} };
  }

  progress[chapterId].answers[questionId] = isCorrect;

  localStorage.setItem("bg-progress", JSON.stringify(progress));
}

// bloqueo de los botones

function disableAnswers() {
  const buttons = document.querySelectorAll("#game-container button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("opacity-60", "cursor-not-allowed");
  });
}

// Botón de continuar
function showContinueButton() {
  // evitar duplicados
  if (document.getElementById("continue-btn")) return;

  const container = document.getElementById("game-container");

  const btn = document.createElement("button");
  btn.id = "continue-btn";
  btn.textContent = "Continuar";
  btn.className =
    "mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition";

  btn.onclick = nextQuestion;

  container.appendChild(btn);
}

function nextQuestion() {
  currentQuestionIndex++;

  updateProgress(); // guarda el progreso

  document.getElementById("continue-btn")?.remove(); // limpia el boton
  document.getElementById("feedback").textContent = ""; // lmpia el feedback

  if (currentQuestionIndex < currentChapter.challenges.length) {
    renderQuestion(currentChapter.challenges[currentQuestionIndex]);
  } else {
    document.getElementById("game-container").innerHTML =
      "<p class='text-center font-semibold'>Capítulo completado 🙏</p>";
  }
}

// barra de progreso

function updateProgress() {
  const total = currentChapter.challenges.length;
  const percent = Math.round((currentQuestionIndex / total) * 100);

  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById(
    "progress-text"
  ).textContent = `Progress: ${percent}%`;
}
