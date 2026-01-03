let currentAudio = null;

function playMusic(type) {
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
  if (!soundEnabled) return;

  const tracks = {
    challenge: "../assets/audio/challenge.mp3",
    chapter: "../assets/audio/chapter.mp3",
    game: "../assets/audio/game.mp3",
  };

  const src = tracks[type];
  if (!src) return;

  stopMusic();

  const audio = new Audio(src);
  audio.volume = 0;
  audio.play();

  fadeIn(audio, 0.6, 800);

  // setTimeout(() => {
  //   fadeOutAndStop(audio);
  // }, 5000);

  currentAudio = audio;
}

function stopMusic() {
  if (currentAudio) {
    fadeOutAndStop(currentAudio);
    currentAudio = null;
  }
}

function fadeIn(audio, targetVolume, duration) {
  const step = targetVolume / (duration / 50);
  const interval = setInterval(() => {
    audio.volume = Math.min(audio.volume + step, targetVolume);
    if (audio.volume >= targetVolume) clearInterval(interval);
  }, 50);
}

function fadeOutAndStop(audio, duration = 800) {
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
