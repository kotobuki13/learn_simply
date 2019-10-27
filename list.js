'use strict'
{
  let words;

  const addWord = document.getElementById('addWord');

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

  function getInfo() {
    const selectedWordName = document.registerForm.wordName.value;  // 単語名
    const wordType = document.registerForm.wordType;  // 品詞
    const index = wordType.selectedIndex;
    const selectedWordType = wordType.options[index].value;
    const selectedWordMeaning = document.registerForm.wordMeaning.value  // 意味の取得

    const word = { name: selectedWordName, type: selectedWordType, meaning: selectedWordMeaning, isDone: false };
    return word;
  }

  if (!(localStorage.getItem('wordList') === null)) {
    words = JSON.parse(localStorage.getItem('wordList')); //LocalStrageから単語リストの読み込み
    showList();
  };

  addWord.addEventListener('click', () => {  // 単語の登録
    const word = getInfo();
    words[words.length] = word;
    localStorage.setItem('wordList', JSON.stringify(words));

    location.reload();
  });
}