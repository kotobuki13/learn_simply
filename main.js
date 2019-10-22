'use strict'

{
  const words = [
    'white',
    'three',
    'pencil',
    'paper',
    'watch',
  ];

  let word;
  let isPlaying;

  const timeLimit = 5 * 1000;
  let startTime;
  let timeoutId;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('sum');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    console.log((timeLeft / 1000).toFixed(2));

    timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      clearTimeout(timeoutId);
      console.log("finished");
    }
  }

  target.addEventListener('click', () => {
    if (isPlaying) {
      return;
    }
    isPlaying = true;

    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });
}
