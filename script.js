'use strict';

let highscore = [...defaultData];

const endGame = () => {
  hideElement(questionFieldEl);
  toggleElement(finalScoreParentEl);
  finalScoreEl.textContent = currentScore;
  messageEl.textContent = '💥 Times up!!!';

  index = highscore.findIndex(({ score }) => currentScore === score);
  higher = index === -1 && currentScore > highscore[4].score;
  ((index !== -1 && index !== 4) || higher) && toggleElement(formHighScoreEl);
};

const playGame = () => {
  timer = 10;
  currentScore = 0;
  scoreEl.textContent = 0;
  answerEl.value = '';
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
        ? '🎉 Correct Answer! Answer next!'
        : '🚫 Wrong Answer! Answer next!';

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
    highscore.splice(index + 1, 0, newUser);
    highscore.pop();

    for (const [index, { name, score }] of highscore.entries()) {
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
