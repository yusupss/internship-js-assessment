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
let time = document.querySelector('.time');

function randomize(number) {
  return Math.trunc(Math.random() * number) + 1;
}

const secretNumber1 = randomize(9);
const secretNumber2 = randomize(9);
const listOperation = ['+', '-', 'x'];
const operation = listOperation[randomize(3)];
let answer;
if (operation === 0) {
  answer = secretNumber1 + secretNumber2;
} else if (operation === 1) {
  answer = secretNumber1 - secretNumber2;
} else {
  answer = secretNumber1 * secretNumber2;
}

console.log(answer);
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

const start = function () {
  let timeLeft = Number(time.textContent) - 1;
  let timerId = setInterval(timer, 1000);

  function timer() {
    console.log(timeLeft);
    if (timeLeft === -1) {
      console.log('waktu habis');
      clearInterval(timerId);
    } else {
      time.textContent = timeLeft--;
    }
  }
};

document.querySelector('.number').addEventListener('click', start);

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
