// 'use strict';

const calc = document.querySelector('.number');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const check = document.querySelector('.check');
const body = document.querySelector('body');
const highScore = document.querySelector('.highscore');
const again = document.querySelector('.again');
const persons = document.querySelector('.persons');
const timeLeft = document.querySelector('.timeleft');
const submit = document.querySelector('.submit');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const greeting = document.querySelector('.greeting');

const number1 = Math.trunc(Math.random() * 9) + 1;
const number2 = Math.trunc(Math.random() * 9) + 1;
const operatorArray = [
  {
    ops: '+',
    method: (a, b) => a + b,
  },
  {
    ops: '-',
    method: (a, b) => a - b,
  },
  {
    ops: '*',
    method: (a, b) => a * b,
  },
];
let idxOps = Math.floor(Math.random() * operatorArray.length);

const highScorePersons = [
  {
    name: 'Bruno',
    score: 5,
  },
  {
    name: 'John',
    score: 4,
  },
  {
    name: 'Jane',
    score: 3,
  },
  {
    name: 'Jack',
    score: 2,
  },
  {
    name: 'Jill',
    score: 1,
  },
];

const showForm = () => {
  const form = document.querySelector('.form');
  form.classList.remove('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

score.textContent = 0;

const eq = {
  ops: operatorArray[idxOps].ops,
  number1: number1,
  number2: number2,
};
const equation = () => {
  calc.textContent = `${eq.number1} ${eq.ops} ${eq.number2}`;
};

equation();

let res = operatorArray[idxOps].method(number1, number2);

const checkAnswer = () => {
  const guess = document.querySelector('.guess').value;
  if (guess == res) {
    displayMessage('Correct');
    score.textContent++;
    body.style.backgroundColor = '#00ff00';
  } else if (guess == '') {
    displayMessage('Please enter a number');
  } else {
    displayMessage('Wrong');
    body.style.backgroundColor = '#ff0000';
  }
};

const countdown = () => {
  let time = 20;
  setInterval(() => {
    time--;
    timeLeft.textContent = time;
    if (time == 0) {
      displayMessage('Time is up');
      body.style.backgroundColor = '#ff0000';
      time = 1;
      check.disabled = true;
      showForm();
    } else if (time <= 5) {
      if (time % 2 == 0) {
        body.style.backgroundColor = '#ff0000';
      } else {
        body.style.backgroundColor = '#00ff00';
      }
    }
  }, 1000);
};

countdown();

const displayPlayers = () => {
  for (let i = 0; i < highScorePersons.length; i++) {
    const person = document.createElement('li');
    person.textContent = `${highScorePersons[i].name} - ${highScorePersons[i].score}`;
    persons.appendChild(person);
  }
};

displayPlayers();

const displayMessage = msg => {
  message.textContent = msg;
};

check.addEventListener('click', () => {
  checkAnswer();
  eq.number1 = Math.trunc(Math.random() * 9) + 1;
  eq.number2 = Math.trunc(Math.random() * 9) + 1;
  idxOps = Math.floor(Math.random() * operatorArray.length);
  eq.ops = operatorArray[idxOps].ops;
  res = operatorArray[idxOps].method(eq.number1, eq.number2);
  equation();
});

submit.addEventListener('click', () => {
  let playerName = document.querySelector('#name').value;
  for (let i = 0; i < highScorePersons.length; i++) {
    if (highScorePersons[i].score < score.textContent) {
      highScorePersons.splice(i, 0, {
        name: playerName,
        score: score.textContent,
      });
      highScorePersons.pop(); // remove last element
      greeting.textContent = `${playerName} you are the new highscore! 🥳👌🤩`;
      openModal();
      break;
    } else {
      greeting.textContent = `${playerName} you are not the new highscore! 😢`;
      openModal();
    }
  }
  persons.innerHTML = '';
  displayPlayers();
});

btnCloseModal.addEventListener('click', closeModal);
again.addEventListener('click', () => {
  location.reload();
});
