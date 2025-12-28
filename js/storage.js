const STORAGE_KEY = "userProgress"; // memoria persistente en el navegador

export function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

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
