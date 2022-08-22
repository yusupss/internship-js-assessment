'use strict';

const scoreBoard = new Map([
    ["Julian", 5],
    ["Alvian", 4],
    ["Fajar", 3],
    ["Rahmat", 2],
    ["Leo", 1],
]);

let result = 0;
let score = 0;
let rank = 1;
let highscore = '';
let countdownStarted = false;
let sortedDesc = new Map();
let inputNumber = document.querySelector('.guess');
let timer = document.getElementById("time");

const GAME_TIME_LENGTH = 20;

const content = document.querySelector(".content");
const checkButton = document.querySelector('.check');
const message = document.querySelector('.message');
const inputName = document.querySelector('.inputName');
const user  = document.querySelector('.username');
const submitButton = document.querySelector('.submit');
const restartButton = document.querySelector('.again');

scoreBoard.forEach((value, key) => {
    highscore += `<p class="score-board">${rank}. ${key}... <span class="score">${value}</span></p><br>`;
    rank++;
});

document.getElementById('score-board').innerHTML = highscore;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function compute() {
    const operators = ["+", "-", "x"];
    content.innerHTML = (Math.trunc(Math.random() * 10) + 1) + operators[getRandomInt(0,2)] + (Math.trunc(Math.random() * 10) + 1);
    result = eval(document.querySelector(".content").textContent);

    return result;
};

function counter(timeLeft) {
    if (!countdownStarted) {
        compute();
        timer.textContent = GAME_TIME_LENGTH;
        let countdown = setInterval(function() {
            countdownStarted = true;
            timeLeft--;
            timer.textContent = timeLeft;

            inputNumber.addEventListener('keyup', e => {
                e.preventDefault();
                if (e.keyCode === 13) {
                    checkButton.click();
                }
            });

            checkButton.addEventListener('click', () => {
                const guess = Number(document.querySelector('.guess').value);

                if (guess == result) {
                    score++;
                    message.textContent = '🎉Correct Answer, Answer next!';
                    document.querySelector('.score').textContent = score;
                    inputNumber.value = '';
                    compute();
                } else {
                    message.textContent = '💥Wrong Answer, Try again!';
                }
            });

            if (timeLeft == 0) {
                clearInterval(countdown);
                countdownStarted = false;

                message.textContent = '💥Times up!!!';
                content.innerHTML = `Your Score is ${score}`;
                content.style.width = "100rem";
                inputNumber.value = '';
                inputName.style.display = 'block';
            }
        }, 1000);
    } else {
        window.alert('The countdown have been started, finish all questions to restart!!!');
    }
};

restartButton.addEventListener('click', function () {
    inputNumber.value = '';
    message.textContent = 'Start guessing...';
    content.style.width = '30rem';
    inputName.style.display = 'none';

    document.querySelector('.score').textContent = 0;
    document.querySelector('body').style.backgroundColor = '#222';

    counter(GAME_TIME_LENGTH);
});

submitButton.addEventListener('click', () => {
    scoreBoard.set(user.value, score);
    user.value = '';
    highscore = '';
    rank = 1;

    sortedDesc = [...scoreBoard].sort((a, b) => (a[1] > b[1] ? -1 : 1));

    sortedDesc.forEach((value) => {
        if (rank > 5) {
            return;
        }
        highscore += `<p class="score-board">${rank}. ${value[0]}... <span class="score">${value[1]}</span></p><br>`;
        rank++;
    });
    document.getElementById('score-board').innerHTML = highscore;
});

compute();
counter(GAME_TIME_LENGTH);