'use strict'

{
  if (JSON.parse((localStorage.getItem('wordList'))) === null) {
    const words = [
      { name: "pencil", type: "名詞", meaning: "えんぴつ", isDone: false }
    ];
    localStorage.setItem('wordList', JSON.stringify(words));
  };

  const words = JSON.parse(localStorage.getItem('wordList'));
  const startGame = document.getElementById("startGame");

  startGame.onclick = function () {

    if (words.length !== 0) {
      sessionStorage.removeItem('timeLimit');

      const time = document.topForm.time;
      const index = time.selectedIndex;
      const selectedTime = time.options[index].value * 1000;

      sessionStorage.setItem('timeLimit', selectedTime);

      window.location.href = './play.html';
    } else {
      window.location.href = './list.html'
    }
  };

}