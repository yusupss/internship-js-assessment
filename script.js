"use strict";

const numberNode = document.querySelector(".number");
const scoreNode = document.querySelector(".score");
const timeNode = document.querySelector(".time");
const highscoreInputNode = document.querySelector(".highscore");
const top5Node = document.querySelector(".highscore-table");

const ops = ["+", "-", "x"];
let firstNumber, secondNumber, randomOps, result, score, timeleft, isPlay;

const displayMessage = message => {
  document.querySelector(".message").textContent = message;
};

// render init
const init = () => {
  score = 0;
  timeleft = 20;
  timeNode.textContent = timeleft;
  displayMessage("Start guessing...");
  isPlay = true;
  document.querySelector(".guess").value = "";
  document.querySelector(".highscore-input").value = "";
  highscoreInputNode.classList.add("hidden");
  numberNode.style.width = "35rem";
  numberNode.style.fontSize = "6rem";
};
init();

const getRandomMath = () => {
  firstNumber = Math.trunc(Math.random() * 9 + 1);
  secondNumber = Math.trunc(Math.random() * 9 + 1);
  randomOps = Math.trunc(Math.random() * 3);
  result = 0;

  // do the calculation
  switch (randomOps) {
    case 0:
      result = firstNumber + secondNumber;
      break;
    case 1:
      result = firstNumber - secondNumber;
      break;
    case 2:
      result = firstNumber * secondNumber;
      break;
  }

  // render
  numberNode.textContent = `${firstNumber} ${ops[randomOps]} ${secondNumber}`;
  scoreNode.textContent = score;

  // check number - for testing
  console.log(firstNumber, ops[randomOps], secondNumber);
  console.log(result);
};
getRandomMath();

// handle check btn
document.querySelector(".check").addEventListener("click", e => {
  e.preventDefault();
  if (isPlay) {
    const guess = document.querySelector(".guess").value;

    if (!guess) {
      displayMessage("No number!");
    } else if (Number(guess) !== result) {
      displayMessage("Incorrect! ❌");
    } else if (Number(guess) === result) {
      displayMessage("Correct! 🎉");
      score++;
      getRandomMath();
      document.querySelector(".guess").value = "";
    }
  }
});

// highscore table
let top5 = [
  { name: "Budi", score: 10 },
  { name: "Karina", score: 2 },
  { name: "Ucok", score: 3 },
  { name: "Siti", score: 8 },
  { name: "Bambang", score: 7 },
];

const changeTop5 = () => {
  top5.sort((a, b) => b.score - a.score);

  top5Node.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const para = document.createElement("p");
    const node = document.createTextNode(
      `${i + 1}. ${top5[i].name} ... ${top5[i].score}`
    );
    para.className = "label-score";
    para.appendChild(node);
    top5Node.appendChild(para);
  }
};
changeTop5();

// change background colour for highscore
const rainbow = () => {
  const body = document.querySelector("body");
  body.classList.add("rainbow");
  setTimeout(() => {
    body.classList.remove("rainbow");
  }, 2000);
};

// timer
let timer;
const runTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    timeleft--;
    if (timeleft <= 0) {
      clearInterval(timer);
      displayMessage("Times up!");
      isPlay = false;
      numberNode.textContent = `Your score is ${score}`;
      numberNode.style.width = "64rem";
      numberNode.style.fontSize = "4rem";
      if (score > top5[4].score) {
        highscoreInputNode.classList.toggle("hidden");
        rainbow();
        confetti();
      }
    }
    timeNode.textContent = timeleft;
  }, 1000);
};
runTimer();

// handle submit btn
document.querySelector(".highscore-btn").addEventListener("click", e => {
  e.preventDefault();
  const query = document.querySelector(".highscore-input").value;
  if (query) {
    top5.push({ name: query, score });
    changeTop5();
    console.log(top5); // for testing
    highscoreInputNode.classList.add("hidden");
  }
});

// handle reset
document.querySelector(".again").addEventListener("click", function () {
  init();
  getRandomMath();
  runTimer();
});

// modal
const modalNode = document.querySelector(".modal");
const overlayNode = document.querySelector(".overlay");
const closeModalNode = document.querySelector(".close-modal");
const openModalNode = document.querySelector(".show-modal");
const modalContentNode = document.querySelector(".modal-content");

function getModalContent() {
  modalContentNode.innerHTML = "";
  for (const [i, el] of top5.entries()) {
    const para = document.createElement("p");
    const node = document.createTextNode(
      `${i + 1}. ${el.name} ... ${el.score}`
    );
    para.className = "modal-text";
    para.appendChild(node);
    modalContentNode.appendChild(para);
  }
}
getModalContent();

const openModal = function () {
  modalNode.classList.remove("hidden");
  overlayNode.classList.remove("hidden");
  getModalContent();
};

const closeModal = function () {
  modalNode.classList.add("hidden");
  overlayNode.classList.add("hidden");
};

openModalNode.addEventListener("click", openModal);
closeModalNode.addEventListener("click", closeModal);
overlayNode.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalNode.classList.contains("hidden")) {
    closeModal();
  }
});

// confetti
function confetti() {
  startConfetti();
  setTimeout(() => {
    stopConfetti();
  }, 4000);
}
