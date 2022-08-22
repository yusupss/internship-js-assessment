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
const scoreEl = document.querySelector('.score');
const nameEl = document.querySelector('.name');
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
    highScore[i].textContent = `${i + 1}. ${arr[i].name} ... ${arr[i].score}`;
  }
};

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const randomize = function (number) {
  return Math.trunc(Math.random() * number);
};

const generateQuestion = function () {
  const num1 = randomize(10);
  const num2 = randomize(10);
  const listOperation = ['+', '-', 'x'];
  const operation = listOperation[randomize(3)];
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
  displayMessage("💣 Time's up!");
  questionEl.textContent = `You're Score is ${score}`;
  questionEl.style.width = '90rem';
  if (score > players[4].score) resultEl.classList.remove('hidden');
};

const startTimer = function () {
  let timeLeft = 2;
  let timerId = setInterval(timer, 1000);
  time.textContent = timeLeft;

  function timer() {
    console.log(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerId);
      showResult();
    }
    time.textContent = timeLeft--;
  }
};

const start = function () {
  if (!isPlaying) {
    score = 2;
    isPlaying = true;
    hasWrittenName = false;
    questionEl.classList.remove('btn');
    questionEl.style.width = '32rem';
    resultEl.classList.add('hidden');
    guessEl.value = '';

    displayMessage('Start Guessing...');
    startTimer();

    ({ question, answer } = generateQuestion());
    questionEl.textContent = question;
    questionEl.style.pointerEvents = 'none';
  }
};

const checkAnswer = function () {
  if (isPlaying) {
    const guess = Number(guessEl.value);
    if (answer === guess) {
      console.log(score);
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
    players.push({ name: name, score: score });
    const sorter = (a, b) => {
      return b['score'] - a['score'];
    };
    players.sort(sorter);
    displayHighscore(players);
    hasWrittenName = true;
  }
};

questionEl.addEventListener('click', start);
btnCheckEl.addEventListener('click', checkAnswer);
btnAgainEl.addEventListener('click', start);
btnSubmitEl.addEventListener('click', addNewHighscore);

displayHighscore(players);
