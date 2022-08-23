'use strict';

const playGame = () => {
  highscore = defaultData.map(({ score }) => score);
  timer = 20;
  currentScore = 0;
  scoreEl.textContent = 0;
  answerEl.value = '';
  messageEl.textContent = 'Start guessing...';
  finalScoreParentEl.textContent = currentScore;
  finalScoreParentEl.classList.remove('showup', 'mixColor');
  hideElement(finalScoreParentEl, questionMarkEl, buttonPlay, bestPlayerEl);
  showElement(questionFieldEl, playGameSection, headerTitleEl);

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

const endGame = () => {
  hideElement(questionFieldEl);
  toggleElement(finalScoreParentEl);

  finalScoreParentEl.textContent = `Your Score is ${currentScore}`;
  messageEl.textContent = '💥 Times up!!!';

  index = findExactPlace(highscore, currentScore);
  isHighest = index === -1 && currentScore > highscore[0];

  index !== 4 && toggleElement(formHighScoreEl);
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

  if (index !== 4) {
    const newUser = { name, score: currentScore };
    defaultData.splice(index + 1, 0, newUser);
    defaultData.pop();

    for (const [index, { name, score }] of defaultData.entries()) {
      document.querySelector(`#best-player-${index}`).textContent = name;
      document.querySelector(`#best-highscore-${index}`).textContent = score;
    }
  }

  finalScoreParentEl.textContent = isHighest
    ? `🥳🎉 CONGRATULATIONS 🥳🎉`
    : finalScoreParentEl.textContent;

  if (isHighest) {
    hideElement(questionFieldEl, playGameSection, headerTitleEl);
    showElement(bestPlayerEl);
    bestPlayerNameEl.textContent = `${name.toUpperCase()}!`;
    finalScoreParentEl.classList.add('showup', 'mixColor');
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
