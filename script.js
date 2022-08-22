'use strict';

let highscore = [];
let timer = 20;
const timerElement = document.querySelector('.timer');
const buttonPlay = document.querySelector('.btn-play');
const playGameSection = document.querySelector('.play-game');
const questionMarkEl = document.querySelector('#questionMark');
const questionFieldEl = document.querySelector('#questionField');

const playGame = () => {
  questionMarkEl.classList.add('hidden');
  questionFieldEl.classList.remove('hidden');
  buttonPlay.remove(); // TODO: ketika user klik again add element buttonPlay!
  playGameSection.classList.remove('hidden');

  let interval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    timer === 0 && clearInterval(interval);
  }, 1000);
};

buttonPlay.addEventListener('click', playGame);
