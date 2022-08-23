'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const operation = new Map([
  [0, '+'],
  [1, '-'],
  [2, 'x'],
]);

let score = 0;
let operator = operation.get(getRandomInt(0, 2));
let numOne = getRandomInt(0, 9);
let numTwo = getRandomInt(0, 9);
let isUpdated = false;

const arithmetic = '+';

document.querySelector(
  '.number'
).textContent = `${numOne} ${operator} ${numTwo}`;

function calc(numOne, numTwo, operation) {
  switch (operation) {
    case '+':
      return numOne + numTwo;
    case '-':
      return numOne - numTwo;
    case 'x':
      return numOne * numTwo;
    default:
      break;
  }
}

let count = 20;

const topScores = [
  { name: 'Luffy', score: 5 },
  { name: 'Sanji', score: 4 },
  { name: 'Zoro', score: 3 },
  { name: 'Jimbei', score: 2 },
  { name: 'Nico Robin', score: 1 },
];

for (let i = 0; i < topScores.length; i++) {
  document.querySelector(
    `.player--${i + 1}`
  ).textContent = `${topScores[i].name} ... ${topScores[i].score}`;
}

const intervalID = setInterval(() => {
  count--;
  document.querySelector('.time').textContent = count;
  if (count < 1) {
    if (score > topScores[topScores.length - 1].score) {
      document.querySelector('.finish').style.display = 'flex';
      document.querySelector('.message').textContent = '☄️ Times up !!!';
      document.querySelector('.number').textContent = `Your Score is ${score}`;
    }

    clearInterval(intervalID);
  }
}, 1000);

document.querySelector('.check').addEventListener('click', () => {
  const guessNumber = Number(document.querySelector('.guess').value);
  const totalCalc = calc(numOne, numTwo, operator);

  if (count < 1) {
    alert('Times up!!!');
    return;
  }

  if (totalCalc === guessNumber) {
    document.querySelector('.message').textContent =
      '🎉 Correct Answer! Answer next';
    score++;

    document.querySelector('.score').textContent = score;
    numOne = getRandomInt(0, 9);
    numTwo = getRandomInt(0, 9);
    operation.get(getRandomInt(0, 2));
    document.querySelector(
      '.number'
    ).textContent = `${numOne} ${operator} ${numTwo}`;
  }
});

document.querySelector('.highscore').addEventListener('click', () => {
  const newPlayer = document.querySelector('.name').value;
  console.log(topScores);
  if (
    topScores.some(e => e.name === newPlayer) &&
    topScores.some(e => e.score <= score)
  ) {
    return;
  }

  if (isUpdated) {
    return;
  }

  topScores.push({ name: newPlayer, score: score });

  topScores.sort((a, b) => b.score - a.score);

  topScores.pop();

  isUpdated = true;

  for (let i = 0; i < topScores.length; i++) {
    document.querySelector(
      `.player--${i + 1}`
    ).textContent = `${topScores[i].name} ... ${topScores[i].score}`;
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 0;
  count = 20;

  isUpdated = false;
  document.querySelector('.finish').style.display = 'none';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = `Your Score is ${score}`;

  document.querySelector('.score').textContent = score;
  document.querySelector('.time').textContent = count;
  numOne = getRandomInt(0, 9);
  numTwo = getRandomInt(0, 9);
  operation.get(getRandomInt(0, 2));
  document.querySelector(
    '.number'
  ).textContent = `${numOne} ${operator} ${numTwo}`;

  const intervalID = setInterval(() => {
    count--;
    document.querySelector('.time').textContent = count;
    if (count < 1) {
      if (score > topScores[topScores.length - 1].score) {
        document.querySelector('.finish').style.display = 'flex';
        document.querySelector('.message').textContent = '☄️ Times up !!!';
        document.querySelector(
          '.number'
        ).textContent = `Your Score is ${score}`;
      }

      clearInterval(intervalID);
    }
  }, 1000);
});
