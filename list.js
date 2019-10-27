'use strict'
{
  let words;

  const addWord = document.getElementById('addWord');
  const wordsCnt = document.getElementById('wordsCnt');

  function showList() {   // 単語リストの表示
    words.forEach(function (word) {
      const li = document.createElement('li');
      li.textContent = `${word.name}`;
      document.querySelector('.WordName').appendChild(li);
    });

    words.forEach(function (word) {
      const li = document.createElement('li');
      li.textContent = `${word.type}`;
      document.querySelector('.WordType').appendChild(li);
    });

    words.forEach(function (word) {
      const li = document.createElement('li');
      li.textContent = `${word.meaning}`;
      document.querySelector('.WordMeaning').appendChild(li);
    });

    words.forEach(function (word, index) {  // 削除ボタンの表示
      const li = document.createElement('li');
      li.textContent = "[×]";
      li.addEventListener('click', () => {
        const will = confirm("本当に削除しますか？");
        if (will) {
          words.splice(index, 1);
          localStorage.setItem('wordList', JSON.stringify(words));

          location.reload();
        }
      });

      document.querySelector('.deleteMark').appendChild(li);
    });
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

  wordsCnt.textContent = words.length;

  addWord.addEventListener('click', () => {  // 単語の登録
    const word = getInfo();
    words[words.length] = word;
    localStorage.setItem('wordList', JSON.stringify(words));

    location.reload();
  });
}