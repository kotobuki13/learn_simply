'use strict'
{

  const words = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];

  words.forEach((word, index) => {
    const li = document.createElement('li');

    li.textContent = word;

    document.querySelector('.list').appendChild(li);
  });

}