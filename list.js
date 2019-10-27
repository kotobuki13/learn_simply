'use strict'
{
  let words;

  function showList() {
    Object.keys(words).forEach(function (key) {   // 単語リストの表示

      const el = this[key];

      const li = document.createElement('li');
      li.textContent = `${el.name}`;
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
  };

  if (!(localStorage.getItem('wordList') === null)) {
    words = JSON.parse(localStorage.getItem('wordList')); //LocalStrageから単語リストの読み込み
    showList();
  };
}