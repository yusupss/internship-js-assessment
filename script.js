const timerView = document.querySelector(".timer");
const theView = document.querySelector(".number");
const right = document.querySelector(".right-side");
const left = document.querySelector(".left-side");
const btnCheck = document.querySelector(".check");
const btnSkip = document.querySelector(".skip");
const answer = document.querySelector(".guess");
const btnAgain = document.querySelector(".again");
const scoreView = document.querySelector(".score");
const highscoreField = document.querySelector(".new-highscore");
const message = document.querySelector(".message");
const btnSubmit = document.querySelector(".submit");
const theName = document.querySelector(".name");
const body = document.querySelector("body");
const btnReview = document.querySelector(".review");
const card = document.querySelector(".card");

let timeLeft;
let score = 0;
let arrMath = [];
const operators = ["+", "-", "x"];
const highscore = [
  {
    name: "Natasha",
    score: 5,
  },
  {
    name: "Tony",
    score: 4,
  },
  {
    name: "Peter",
    score: 3,
  },
  {
    name: "Xavier",
    score: 2,
  },
  {
    name: "Tchala",
    score: 1,
  },
];
let review = [];

const viewHighScore = () => {
  left.innerHTML = "";
  right.innerHTML = "";
  highscore.map((score, index) => {
    left.innerHTML += `<div class="mt-1">${index + 1}</div>`;
    right.innerHTML += `<div class="mt-1">${score.name}...${score.score}</div>`;
  });
};

const setUp = () => {
  scoreView.innerHTML = score;
  const operator = Math.trunc(Math.random() * 3);
  arrMath = [
    Math.trunc(Math.random() * 9) + 1,
    operators[operator],
    Math.trunc(Math.random() * 9) + 1,
  ];
  operator == 0 && arrMath.push(arrMath[0] + arrMath[2]);
  operator == 1 && arrMath.push(arrMath[0] - arrMath[2]);
  operator == 2 && arrMath.push(arrMath[0] * arrMath[2]);
  theView.innerHTML = `${arrMath[0]} ${arrMath[1]} ${arrMath[2]}`;
  review.push(arrMath);
};

btnSubmit.addEventListener("click", function () {
  btnSubmit.disabled = true;
  let temp = [];
  highscore.map((data) => {
    data.score < score ? temp.push(false) : temp.push(true);
  });
  highscore.pop();
  highscore.splice(temp.indexOf(false), 0, {
    name: theName.value,
    score,
  });
  viewHighScore();
  btnReview.classList.remove("hidden");
});
function countDown() {
  timeLeft = 20;
  let timer = setInterval(function () {
    if (timeLeft == 0) {
      btnSkip.classList.toggle("hidden");
      clearInterval(timer);
      btnCheck.disabled = true;
      theView.style.fontSize = "large";
      if (score === 0) {
        theView.innerHTML = "Try again next time 😊";
        btnReview.classList.remove("hidden");
      } else {
        theView.innerHTML = `Your score is ${score}`;
        let temp = [];
        highscore.map((data) => {
          data.score < score ? temp.push(false) : temp.push(true);
        });
        if (temp.indexOf(false) !== -1) {
          toggleHighscore();
          toggleSubmit();
        }
      }
    } else {
      timeLeft -= 1;
      timerView.innerHTML = timeLeft;
    }
  }, 1000);
}

const init = () => {
  viewHighScore();
  setUp();
  countDown();
};
init();
function toggleSubmit() {
  btnSubmit.classList.toggle("hidden");
}
function toggleHighscore() {
  message.classList.toggle("hidden");
  highscoreField.classList.toggle("hidden");
}

const again = () => {
  timeLeft = 20;
  review = [];
  btnCheck.disabled = false;
  theView.style.fontSize = "6rem";

  highscoreField.classList.add("hidden");
  btnSkip.classList.remove("hidden");
  btnReview.classList.add("hidden");
  theName.value = "";
  answer.value = "";
  score = 0;
  message.innerHTML = "Start guessing...";

  init();
};

btnAgain.addEventListener("click", again);
btnCheck.addEventListener("click", () => {
  if (answer.value == arrMath[3]) {
    score += 1;
    scoreView.innerHTML = score;
    setUp();
    message.innerHTML = "🎉 Correct Answer! Answer next";
    body.style.backgroundColor = "#023020";
  } else {
    message.innerHTML = "💥 Wrong answer, try again";
    body.style.backgroundColor = "#8b0000 ";
  }
  answer.value = "";
});
answer.addEventListener("click", function () {
  body.style.backgroundColor = "#222";
});

btnSkip.addEventListener("click", function () {
  setUp();
});
btnReview.addEventListener("click", function () {
  card.classList.remove("hidden");
  document.querySelector(".stuff").innerHTML = "";
  review.map((view) => {
    document.querySelector(
      ".stuff"
    ).innerHTML += `<div class="reviews"> ${view[0]}${view[1]}${view[2]} = ${view[3]} </div> <br>`;
  });
});
document.querySelector(".close-modal").addEventListener("click", function () {
  card.classList.add("hidden");
});
