'use strict'

{

  const startGame = document.getElementById("startGame");

  startGame.onclick = function () {
    sessionStorage.removeItem('timeLimit');

    const time = document.sample_form.time;
    const index = time.selectedIndex;
    const selectedTime = time.options[index].value * 1000;

    sessionStorage.setItem('timeLimit', selectedTime);

    window.location.href = './play.html';
  };

}