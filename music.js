const audio = new Audio('./Ashkan Kagan - DMT (Instrumental).mp3');
audio.loop = true;

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.querySelector('.level');
const progressBar = document.getElementById('progress');

let isManuallyStarted = false;

// پلی
playBtn.addEventListener('click', () => {
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
});

// پاز
pauseBtn.addEventListener('click', () => {
  audio.pause();
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'inline-block';
});

// ولوم
volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value / 100;
  audio.volume = volume;

  if (!isManuallyStarted && volume > 0) {
    audio.play().then(() => {
      isManuallyStarted = true;
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
    }).catch(err => {
      console.warn("Autoplay blocked:", err);
    });
  }

  if (volume === 0) {
    audio.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
  } else if (isManuallyStarted && audio.paused) {
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
  }
});

// بروزرسانی نوار پیشرفت
audio.addEventListener('timeupdate', () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.transform = `scaleX(${percentage / 100})`;
});
