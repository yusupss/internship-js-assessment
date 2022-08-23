'use strict';

const highScore = document
  .querySelector('.highscore')
  .getElementsByTagName('li');

const guessEl = document.querySelector('.guess');
const resultEl = document.querySelector('.result');
const messageEl = document.querySelector('.message');

const btnCheckEl = document.querySelector('.check');
const btnAgainEl = document.querySelector('.again');
const btnSubmitEl = document.querySelector('.submit');

const nameEl = document.querySelector('.name');
const scoreEl = document.querySelector('.score');
const bodyEl = document.querySelector('body');

let time = document.querySelector('.time');
let questionEl = document.querySelector('.question');
let question, answer, isPlaying, score, hasWrittenName;

const players = [
  {
    name: 'Mario',
    score: 5,
  },
  {
    name: 'Anggito',
    score: 4,
  },
  {
    name: 'Teo',
    score: 3,
  },
  {
    name: 'Prajna',
    score: 2,
  },
  {
    name: 'Jeje',
    score: 1,
  },
];

const displayHighscore = function (arr) {
  for (let i = 0; i < 5; i++) {
    highScore[i].textContent = `${i + 1}. ${arr[i].name} ... ${arr[i].score} ${
      i === 0 ? '👑' : ''
    }`;
  }
};

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const randomize = function (number) {
  return Math.trunc(Math.random() * number) + 1;
};

const generateQuestion = function () {
  const num1 = randomize(9);
  const num2 = randomize(9);
  const listOperation = ['+', '-', 'x'];
  const operation = listOperation[randomize(3) - 1];
  let answer;

  if (operation === '+') {
    answer = num1 + num2;
  } else if (operation === '-') {
    answer = num1 - num2;
  } else {
    answer = num1 * num2;
  }

  const question = `${num1} ${operation} ${num2}`;
  return { question, answer };
};

const showResult = function () {
  isPlaying = false;
  btnAgainEl.classList.remove('hidden');
  questionEl.textContent = `You're Score is ${score}`;
  questionEl.style.width = '90rem';
  guessEl.disabled = true;
  displayMessage("💣 Time's up!");

  if (score > players[4].score) {
    resultEl.classList.remove('hidden');
    bodyEl.style.backgroundColor =
      score > players[0].score ? '#7a00aa' : '#269c77';
  } else {
    hasWrittenName = true;
  }
};

const startTimer = function () {
  let timeLeft = 19;
  let timerId = setInterval(timer, 1000);

  function timer() {
    if (timeLeft === 0) {
      clearInterval(timerId);
      showResult();
    }
    time.textContent = timeLeft--;
  }
};

const start = function () {
  if (!isPlaying) {
    score = 0;
    isPlaying = true;
    hasWrittenName = false;

    btnAgainEl.classList.add('hidden');
    questionEl.classList.remove('btn');
    questionEl.style.width = '32rem';
    questionEl.removeEventListener('click', start);
    resultEl.classList.add('hidden');
    scoreEl.textContent = score;
    guessEl.value = '';
    guessEl.disabled = false;
    nameEl.value = '';
    bodyEl.style.backgroundColor = '#222';

    displayMessage('Start Guessing...');
    startTimer();

    ({ question, answer } = generateQuestion());
    questionEl.textContent = question;
  }
};

const checkAnswer = function () {
  if (isPlaying) {
    const guess = Number(guessEl.value);
    if (answer === guess) {
      score++;
      scoreEl.textContent = score;
      displayMessage('✅ Correct Answer! Answer Next!');

      ({ question, answer } = generateQuestion());
      questionEl.textContent = question;
    } else {
      displayMessage('❌ Wrong answer!');
    }
  }
};

const addNewHighscore = function () {
  if (!hasWrittenName) {
    const name = nameEl.value;
    players.push({ name, score });
    const sorter = (a, b) => {
      return b['score'] - a['score'];
    };
    players.sort(sorter);
    displayHighscore(players);
    hasWrittenName = true;
  }
};

const again = function () {
  if (hasWrittenName) {
    start();
  } else {
    alert('Please Enter Your Name!');
  }
};

const init = function () {
  questionEl.addEventListener('click', start);
  btnCheckEl.addEventListener('click', checkAnswer);
  btnAgainEl.addEventListener('click', again);
  btnSubmitEl.addEventListener('click', addNewHighscore);
  guessEl.disabled = true;

  displayMessage('Click Start to play!');
  displayHighscore(players);
};

init();
