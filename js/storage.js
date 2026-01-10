// MEMORIA de la APP. funciones que leen y escriben en localStorage
const STORAGE_KEY = "bg-progress"; // memoria persistente en el navegador
const TOTAL_QUESTIONS = 180; // para el score global

export function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

// guardar respuestas
export function saveAnswer(chapterId, questionId, isCorrect) {
  const progress = getProgress();

  if (!progress[chapterId]) {
    progress[chapterId] = {};
  }

  progress[chapterId][questionId] = isCorrect;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// progreso como % porcentage
function calculateProgress(chapterId) {
  const progress = getProgress();
  const answers = progress[chapterId];

  if (!answers) return 0;

  const total = Object.keys(answers).length;
  const correct = Object.values(answers).filter((v) => v).length;

  return Math.round((correct / total) * 100);
}

export function calculateChapterScore(chapterId) {
  const progress = getProgress();
  const answers = progress[chapterId];

  if (!answers) return 0;

  const total = Object.keys(answers).length;
  const correct = Object.values(answers).filter((v) => v).length;

  return Math.round((correct / total) * 100);
}

export function getGlobalScore() {
  const progress = getProgress();

  let correct = 0;

  for (const chapterId in progress) {
    const answers = progress[chapterId];

    for (const questionId in answers) {
      if (answers[questionId] === true) {
        correct++;
      }
    }
  }

  return Math.round((correct / TOTAL_QUESTIONS) * 100);
}
