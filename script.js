'use strict';

const highScore = document
  .querySelector('.highscore')
  .getElementsByTagName('li');
const guessEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');
const btnCheckEl = document.querySelector('.check');
const btnAgainEl = document.querySelector('.again');
const scoreEl = document.querySelector('.score');
let time = document.querySelector('.time');
let questionEl = document.querySelector('.question');
let question, answer, isPlaying, score;

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
    highScore[i].textContent = `${arr[i].name} ... ${arr[i].score}`;
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

const start = function () {
  if (!isPlaying) {
    let timeLeft = 20;
    let timerId = setInterval(timer, 1000);
    score = 0;
    isPlaying = true;
    questionEl.classList.remove('btn');

    function timer() {
      console.log(timeLeft);
      if (timeLeft === 0) {
        isPlaying = false;
        clearInterval(timerId);
      } else {
        time.textContent = timeLeft--;
      }
    }

    ({ question, answer } = generateQuestion());
    questionEl.textContent = question;
    questionEl.style.pointerEvents = 'none';
  }
};

const checkAnswer = function () {
  if (isPlaying) {
    const guess = Number(guessEl.value);
    if (answer === guess) {
      score++;
      scoreEl.textContent = score;
      displayMessage('Correct Answer! Answer Next!');

      ({ question, answer } = generateQuestion());
      questionEl.textContent = question;
    } else {
      displayMessage('Wrong answer!');
    }
  }
};

questionEl.addEventListener('click', start);
btnCheckEl.addEventListener('click', checkAnswer);
btnAgainEl.addEventListener('click', start);

displayHighscore(players);
// let score = 20;
// let highScore = score;

// const displayMessage = function (message) {
//   document.querySelector('.message').textContent = message;
// };

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess);

//   if (!guess) {
//     displayMessage('⛔️ No number!');
//   } else if (guess === answer) {
//     document.querySelector('.number').textContent = secretNumber;
//     displayMessage('Correct Answer! Answer Next!');
//     document.querySelector('.number').style.width = '30rem';
//     document.querySelector('body').style.backgroundColor = '#60b347';
//     document.querySelector('.check').disabled = true;
//     score += 10;
//     document.querySelector('.highscore').textContent =
//       score > highScore ? score : highScore;
//   } else {
//     if (score === 1) {
//       displayMessage('💥You Lost the Game!');
//       document.querySelector('.check').disabled = true;
//       document.querySelector('body').style.backgroundColor = '#FE0000';
//     } else {
//       displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
//     }
//     score = score > 1 ? score - 1 : 0;
//   }

//   document.querySelector('.score').textContent = score;
// });

// document.querySelector('.again').addEventListener('click', function () {
//   secretNumber = Math.floor(Math.random() * 19) + 1;
//   score = 20;

//   document.querySelector('.number').textContent = '?';
//   displayMessage('Start Guessing...');
//   document.querySelector('.number').style.width = '15rem';
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.check').disabled = false;
//   document.querySelector('.guess').value = '';
//   document.querySelector('.score').textContent = score;
// });
