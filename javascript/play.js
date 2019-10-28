'use strict'

{
  const words = JSON.parse(localStorage.getItem('wordList')); //LocalStrageから単語リストの読み込み

  let wordNow;
  let loc;
  let score;
  let miss;
  let doneCount;
  let isPlaying;
  let noLimit = false;

  const wordsCount = Object.values(words).length;
  const timeLimit = Number(sessionStorage.getItem('timeLimit'));

  sessionStorage.clear();

  if (timeLimit < 0) {   // タイトルページから
    noLimit = true;         // 制限時間の取得
  }

  let startTime;
  let timeoutId;

  const remain = document.getElementById('remain');
  const meaning = document.getElementById('meaning');
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const stopGame = document.getElementById('stopGame');

  timerLabel.textContent = (timeLimit / 1000).toFixed(2);
  if (noLimit) timerLabel.textContent = "無制限";

  remain.textContent = `0 / ${wordsCount}`;

  function getWord() {  // 未達成の文字のみ取り出す
    let value;
    do {
      value = words[Math.floor(Math.random() * wordsCount)];
    } while (value.isDone);

    return value;
  }

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + wordNow.name.substring(loc);
  }

  function updateTimer() {  // タイマー処理
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft / 1000 < 11) { // 残り10秒以下でタイマーが赤色
      timerLabel.classList.add("tens");
    }

    if (timeLeft < 0) { // タイマー終了
      clearTimeout(timeoutId);
      timerLabel.textContent = "0.00";
      finish();
    }
  }

  function finish() {
    const result = {
      resultScore: score,
      resultMiss: miss,
      resultDoneCnt: doneCount,
      wordsCnt: wordsCount
    }

    sessionStorage.setItem("result", JSON.stringify(result));

    window.location.href = './result.html';
  }

  target.addEventListener('click', () => {  // ゲーム開始処理
    if (isPlaying) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    doneCount = 0;
    stopGame.classList.add("linkResult");
    stopGame.textContent = "中断して結果ページへ";
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    wordNow = getWord();

    target.textContent = wordNow.name;
    meaning.textContent = `【${wordNow.type}】 ${wordNow.meaning}`;
    startTime = Date.now();
    if (!noLimit) updateTimer();
  });

  window.addEventListener('keydown', e => { // タイピング処理
    if (!isPlaying) {
      return;
    }

    if (!(e.key === wordNow.name[loc])) {
      miss++;
      missLabel.textContent = miss;
    } else {
      loc++;

      if (loc === wordNow.name.length) {  // 次の単語へ
        wordNow.isDone = true;
        doneCount++;
        remain.textContent = `${doneCount} / ${wordsCount}`;

        if (!(doneCount === wordsCount)) { // 全て達成していない
          wordNow = getWord();
          loc = 0;
        } else {
          isPlaying = false;
        }
      }
      updateTarget();
      meaning.textContent = `【${wordNow.type}】 ${wordNow.meaning}`;

      score++;
      scoreLabel.textContent = score;

      if (!isPlaying) finish();
    }
  });

  stopGame.addEventListener('click', () => {  // ゲーム中断処理
    finish();
  });
}
