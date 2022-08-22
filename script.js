'use strict';
/*console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 7;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = score;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('Correct Number!');
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.check').disabled = true;
    score += 10;
    document.querySelector('.highscore').textContent =
      score > highScore ? score : highScore;
  } else {
    if (score === 1) {
      displayMessage('💥You Lost the Game!');
      document.querySelector('.check').disabled = true;
      document.querySelector('body').style.backgroundColor = '#FE0000';
    } else {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    }
    score = score > 1 ? score - 1 : 0;
  }

  document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.floor(Math.random() * 19) + 1;
  score = 20;

  document.querySelector('.number').textContent = '?';
  displayMessage('Start Guessing...');
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.check').disabled = false;
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
});
