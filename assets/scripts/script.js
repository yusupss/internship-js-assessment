"use strict";
// Color
const greenBG = "#60b347";
const redBG = "rgb(121, 10, 10)";
const yellowBG = "rgb(224, 101, 0)";

const question = document.querySelector(".question");
const btnCheck = document.querySelector(".check");
const body = document.querySelector("body");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const form = document.querySelector(".form");
const labelTime = document.querySelector(".time");
const again = document.querySelector(".again");
const btnFormName = document.querySelector(".formName");
const inputName = document.querySelector(".name");
let realAnswer, timer, lastValue;

const createSecretNumber = (min = 1, max = 9) => {
  return Math.trunc(Math.random() * max) + min;
};

const sendMessage = (newMessage) => {
  message.textContent = newMessage;
};

const timeCounter = function (limit = 20) {
  timer = setInterval(function () {
    if (limit <= 0) {
      clearInterval(timer);
      sendMessage("Times up!!");
      question.textContent = `Your score is ${score.textContent}`;
      labelTime.textContent = 0;
      guess.value = null;
      guess.disabled = true;
      btnCheck.disabled = true;

      // comparison with lowest score
      const lowestScoreArr = document.querySelector(".list-highscore li:last-child").textContent.split(" ");
      const lowestScore = Number(lowestScoreArr[lowestScoreArr.length - 1]);
      if (Number(score.textContent) <= lowestScore) {
        body.style.backgroundColor = redBG;
        sendMessage("Your score is still low!");
      } else {
        body.style.backgroundColor = yellowBG;
        form.classList.remove("hidden");
        message.classList.add("hidden");
      }
    } else {
      labelTime.textContent = limit;
    }
    limit -= 1;
  }, 1000);
};

const makeQuestion = function () {
  const firstNum = createSecretNumber();
  const secondNum = createSecretNumber();
  const operators = ["+", "-", "*"];
  const operator = operators[createSecretNumber(0, 3)];
  question.textContent = `${firstNum} ${operator} ${secondNum}`;
  realAnswer = eval(`${firstNum} ${operator} ${secondNum}`);
  return realAnswer;
};

const init = function () {
  makeQuestion();
  timeCounter();
};

btnCheck.addEventListener("click", function () {
  const guessValue = Number(guess.value);
  if (!guess.value) {
    // Not Guessing
    sendMessage("Please insert a number!");
  }
  // Correct Guess
  else if (guessValue === realAnswer) {
    sendMessage(`Correct number! `);
    score.textContent++;
    guess.value = null;
    lastValue = null;
    makeQuestion();
  }
  // Wrong Guess
  else if (guessValue !== realAnswer) {
    sendMessage("Wrong answer! Calculate correctly!");
    if (guessValue === lastValue) {
      sendMessage("Your answer is the same as before!");
    }
    lastValue = guessValue;
    guess.value = null;
  }
});

again.addEventListener("click", function () {
  body.style.backgroundColor = "#222";
  score.textContent = 0;
  guess.disabled = false;
  btnCheck.disabled = false;
  btnFormName.disabled = false;
  inputName.disabled = false;
  inputName.value = null;

  form.classList.add("hidden");
  message.classList.remove("hidden");
  sendMessage("Start guessing...");
  clearInterval(timer);
  init();
});

const formNameHandle = function () {
  const valName = inputName.value;
  const finalScore = Number(score.textContent);
  const listHighScore = document.querySelectorAll(".list-highscore li");
  let arrHighScore = [];
  for (const item of listHighScore) {
    arrHighScore.push(item.textContent.split(" "));
  }
  arrHighScore.push([valName, "...", finalScore]);
  arrHighScore.sort((a, b) => b[b.length - 1] - a[a.length - 1]);
  let output = "";
  for (let i = 0; i < 5; i++) {
    output += `<li>${arrHighScore[i].join(" ")}</li>`;
  }
  document.querySelector(".list-highscore").innerHTML = output;
  question.textContent = "Thank you!";
  body.style.backgroundColor = greenBG;
  btnFormName.disabled = true;
  inputName.disabled = true;
};

init();
