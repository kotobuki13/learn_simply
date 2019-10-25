'use strict'

{
  const words = {
    0: { word: "white", class: "名詞", meaning: "白", isDone: false },
    1: { word: "marvelous", class: "形容詞", meaning: "素晴らしい", isDone: false },
    2: { word: "car", class: "名詞", meaning: "車", isDone: false },
    3: { word: "eat", class: "動詞", meaning: "食べる", isDone: false },
    4: { word: "paper", class: "名詞", meaning: "紙", isDone: false },
    5: { word: "dog", class: "名詞", meaning: "犬", isDone: false },
    6: { word: "book", class: "動詞", meaning: "予約する", isDone: false },
    7: { word: "light", class: "名詞", meaning: "光", isDone: false },
    8: { word: "keyboard", class: "名詞", meaning: "キーボード", isDone: false },
    9: { word: "street", class: "名詞", meaning: "道", isDone: false }
  };

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
    target.textContent = placeholder + wordNow.word.substring(loc);
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
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    wordNow = getWord();

    target.textContent = wordNow.word;
    meaning.textContent = `【${wordNow.class}】 ${wordNow.meaning}`;
    startTime = Date.now();
    if (!noLimit) updateTimer();
  });

  window.addEventListener('keydown', e => { // タイピング処理
    if (!isPlaying) {
      return;
    }

    if (!(e.key === wordNow.word[loc])) {
      miss++;
      missLabel.textContent = miss;
    } else {
      loc++;

      if (loc === wordNow.word.length) {  // 次の単語へ
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
      meaning.textContent = `【${wordNow.class}】 ${wordNow.meaning}`;

      score++;
      scoreLabel.textContent = score;

      if (!isPlaying) finish();
    }
  });

  stopGame.addEventListener('click', () => {  // ゲーム中断処理
    finish();
  });
}
