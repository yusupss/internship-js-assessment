const defaultData = [
  {
    name: 'Alfa',
    score: 5,
  },
  {
    name: 'Beta',
    score: 4,
  },
  {
    name: 'Charlie',
    score: 3,
  },
  {
    name: 'Gamma',
    score: 2,
  },
  {
    name: 'Theta',
    score: 1,
  },
];

const DEFAULT_OPERATOR = ['+', '-', 'x'];
let timer,
  currentScore,
  firstOperand,
  secondOperand,
  operator,
  result,
  index,
  higher;

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
const againBtnEl = document.querySelector('.again');
