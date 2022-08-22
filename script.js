'use strict';

const endGame = () => {
  hideElement(questionFieldEl);
  toggleElement(finalScoreParentEl);
  finalScoreEl.textContent = currentScore;
  messageEl.textContent = '💥 Times up!!!';

  console.log(highscore, currentScore);
  index = highscore.lastIndexOf(currentScore);
  console.log(index);
  higher = index === -1 && currentScore > highscore[4];
  ((index !== -1 && index !== 4) || higher) && toggleElement(formHighScoreEl);
};

const playGame = () => {
  highscore = defaultData.map(({ score }) => score);
  timer = 10;
  currentScore = 0;
  scoreEl.textContent = 0;
  answerEl.value = '';
  messageEl.textContent = 'Start guessing...';
  finalScoreEl.textContent = currentScore;
  hideElement(finalScoreParentEl, questionMarkEl, buttonPlay);
  showElement(questionFieldEl, playGameSection);

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
        ? `🎉 Correct answer! Answer next!`
        : `🚫 Wrong answer, try again!`;

    scoreEl.textContent = answer === result ? ++currentScore : currentScore;

    generateQuestion();
    answerEl.value = '';
  }
};

const checkingUsername = e => {
  e.preventDefault();
  const name = highscoreUserEl.value;

  if ((index !== -1 && index !== 4) || higher) {
    const newUser = { name, score: currentScore };
    defaultData.splice(index + 1, 0, newUser);
    defaultData.pop();

    for (const [index, { name, score }] of defaultData.entries()) {
      document.querySelector(`#best-player-${index}`).textContent = name;
      document.querySelector(`#best-highscore-${index}`).textContent = score;
    }
  }

  highscoreUserEl.value = '';
  toggleElement(formHighScoreEl);
};

buttonPlay.addEventListener('click', playGame);
againBtnEl.addEventListener('click', playGame);
checkButton.addEventListener('click', checkingAnswer);
formHighScoreEl.addEventListener('submit', checkingUsername);
document.addEventListener('keydown', e => {
  e.key === 'Enter' && +answerEl.value && checkingAnswer();
});
