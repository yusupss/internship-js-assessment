'use strict';

let highscore = [...defaultData];
const timerElement = document.querySelector('.timer');
const buttonPlay = document.querySelector('.btn-play');
const playGameSection = document.querySelector('.play-game');
const questionMarkEl = document.querySelector('#questionMark');
const questionFieldEl = document.querySelector('#questionField');
const finalScoreEl = document.querySelector('#finalScore');
const finalScoreParentEl = document.querySelector('.finalScoreParent');
const firstOperandEl = document.querySelector('#first--operand');
const secondOperandEl = document.querySelector('#second--operand');
const operatorEl = document.querySelector('#operator');
const checkButton = document.querySelector('.check');
const answerEl = document.querySelector('.answer');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const formHighScoreEl = document.querySelector('#form-highscore');
const highscoreUserEl = document.querySelector('#highscoreUser');
const submitBtnEl = document.querySelector('#submit-btn');
const DEFAULT_OPERATOR = ['+', '-', 'x'];

const generateOperand = () => {
  return Math.trunc(Math.random() * 9 + 1);
};

const generateOperatorIndex = () => {
  return Math.trunc(Math.random() * 3);
};

const generateResult = (firstOperand, secondOperand, operator) => {
  if (operator === '+') return firstOperand + secondOperand;
  else if (operator === '-') return firstOperand - secondOperand;
  else if (operator === 'x') return firstOperand * secondOperand;
};

const generateQuestion = () => {
  firstOperand = generateOperand();
  secondOperand = generateOperand();
  operator = DEFAULT_OPERATOR[generateOperatorIndex()];

  firstOperandEl.textContent = firstOperand;
  secondOperandEl.textContent = secondOperand;
  operatorEl.textContent = operator;

  result = generateResult(firstOperand, secondOperand, operator);
};

const endGame = () => {
  questionFieldEl.classList.add('hidden');
  finalScoreParentEl.classList.remove('hidden');
  finalScoreEl.textContent = currentScore;
  messageEl.textContent = '💥 Times up!!!';

  index = highscore.findIndex(({ score }) => score === currentScore);
  higher = index === -1 && currentScore > highscore[0].score;
  ((index !== -1 && index !== 4) || higher) &&
    formHighScoreEl.classList.toggle('hidden');
};

const playGame = () => {
  questionMarkEl.classList.toggle('hidden');
  questionFieldEl.classList.toggle('hidden');
  buttonPlay.classList.toggle('hidden');
  playGameSection.classList.toggle('hidden');

  let interval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);

  generateQuestion();
};

const checkingAnswer = () => {
  if (timer) {
    const answer = +answerEl.value;
    messageEl.textContent =
      answer === result
        ? '🎉 Correct Answer! Answer next!'
        : '🚫 Wrong Answer! Answer next!';

    scoreEl.textContent = answer === result ? ++currentScore : currentScore;

    generateQuestion();
    answerEl.value = '';
  }
};

const checkingUsername = e => {
  console.log(e.key);
  e.preventDefault();
  const name = highscoreUserEl.value;

  if ((index !== -1 && index !== 4) || higher) {
    const newUser = { name, score: currentScore };
    highscore.splice(index + 1, 0, newUser);
    highscore.pop();

    for (const [index, { name, score }] of highscore.entries()) {
      document.querySelector(`#best-player-${index}`).textContent = name;
      document.querySelector(`#best-highscore-${index}`).textContent = score;
    }
  }

  highscoreUserEl.value = '';
  formHighScoreEl.classList.toggle('hidden');
};

buttonPlay.addEventListener('click', playGame);
checkButton.addEventListener('click', checkingAnswer);
formHighScoreEl.addEventListener('submit', checkingUsername);
document.addEventListener('keydown', e => {
  e.key === 'Enter' && +answerEl.value && checkingAnswer();
});
