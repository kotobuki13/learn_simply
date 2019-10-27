'use strict'
{

  const words = {
    0: { word: "white", type: "名詞", meaning: "白", isDone: false },
    1: { word: "marvelous", type: "形容詞", meaning: "素晴らしい", isDone: false },
    2: { word: "car", type: "名詞", meaning: "車", isDone: false },
    3: { word: "eat", type: "動詞", meaning: "食べる", isDone: false },
    4: { word: "paper", type: "名詞", meaning: "紙", isDone: false },
    5: { word: "dog", type: "名詞", meaning: "犬", isDone: false },
    6: { word: "book", type: "動詞", meaning: "予約する", isDone: false },
    7: { word: "light", type: "名詞", meaning: "光", isDone: false },
    8: { word: "keyboard", type: "名詞", meaning: "キーボード", isDone: false },
    9: { word: "street", type: "名詞", meaning: "道", isDone: false }
  };

  Object.keys(words).forEach(function (key) {

    const el = this[key];

    const li = document.createElement('li');
    li.textContent = `${el.word}`;
    document.querySelector('.WordName').appendChild(li);
  }, words);

  Object.keys(words).forEach(function (key) {

    const el = this[key];

    const li = document.createElement('li');
    li.textContent = `${el.type}`;
    document.querySelector('.WordType').appendChild(li);
  }, words);

  Object.keys(words).forEach(function (key) {

    const el = this[key];

    const li = document.createElement('li');
    li.textContent = `${el.meaning}`;
    document.querySelector('.WordMeaning').appendChild(li);
  }, words);
}