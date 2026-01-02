let currentAudio = null;

function playMusic(type) {
  const tracks = {
    challenge: "../assets/audio/challenge.mp3",
    chapter: "../assets/audio/chapter.mp3",
    game: "../assets/audio/game.mp3",
  };

  const src = tracks[type];
  if (!src) return;

  // cortar audio previo si existía
  if (currentAudio) {
    fadeOutAndStop(currentAudio);
  }

  const audio = new Audio(src);
  audio.volume = 0;
  audio.play();

  fadeIn(audio, 0.6, 800);

  // auto fade-out
  setTimeout(() => {
    fadeOutAndStop(audio);
  }, 5000);

  currentAudio = audio;
}

function fadeIn(audio, targetVolume, duration) {
  const step = targetVolume / (duration / 50);
  const interval = setInterval(() => {
    audio.volume = Math.min(audio.volume + step, targetVolume);
    if (audio.volume >= targetVolume) clearInterval(interval);
  }, 50);
}

function fadeOutAndStop(audio, duration = 1000) {
  const step = audio.volume / (duration / 50);
  const interval = setInterval(() => {
    audio.volume = Math.max(audio.volume - step, 0);
    if (audio.volume <= 0) {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(interval);
    }
  }, 50);
}
