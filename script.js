'use strict';
/*console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 7;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;*/
const highScore = document
  .querySelector('.highscore')
  .getElementsByTagName('li');
const guessEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');
const btnCheckEl = document.querySelector('.check');
let time = document.querySelector('.time');
let questionEl = document.querySelector('.question');
let question, answer, isPlaying;

function randomize(number) {
  return Math.trunc(Math.random() * number) + 1;
}

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

const generateQuestion = function () {
  const num1 = randomize(9);
  const num2 = randomize(9);
  const listOperation = ['+', '-', 'x'];
  const operation = listOperation[randomize(2)];
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
    let timeLeft = Number(time.textContent) - 1;
    let timerId = setInterval(timer, 1000);
    isPlaying = true;

    function timer() {
      console.log(timeLeft);
      if (timeLeft === -1) {
        isPlaying = false;
        clearInterval(timerId);
      } else {
        time.textContent = timeLeft--;
      }
    }

    ({ question, answer } = generateQuestion());
    questionEl.textContent = question;
    questionEl.style.pointerEvents = 'none';
    console.log(question, answer);
  }
};

const checkAnswer = function () {
  if (isPlaying) {
    const guess = Number(guessEl.value);
    if (answer === guess) {
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
