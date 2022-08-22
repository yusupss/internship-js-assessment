'use strict';

const scoreMap = new Map([
    ["Julian", 5],
    ["Alvian", 4],
    ["Fajar", 3],
    ["Rahmat", 2],
    ["Leo", 2],
]);

let result = 0;
let score = 0;
let rank = 1;
let scoreboard = '';
let highScore = 5;
let countdownStarted = false;
let highestScore = true;
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
const highestScoreLabel = document.querySelector('.label-highest-score');

// For showing first scoreboard in web
scoreMap.forEach((value, key) => {
    scoreboard += `<p class="score-board">${rank}. ${key}... <span class="score">${value}</span></p><br>`;
    rank++;
});

document.getElementById('score-board').innerHTML = scoreboard;

// Function to randomizer for operator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to make the expression math
function compute() {
    const operators = ["+", "-", "*"];
    content.innerHTML = (Math.trunc(Math.random() * 10) + 1) + operators[getRandomInt(0,2)] + (Math.trunc(Math.random() * 10) + 1);
    result = eval(document.querySelector(".content").textContent);

    return result;
};

// Function to calculate the countdown
function counter(timeLeft) {
    if (!countdownStarted) {
        compute();
        score = 0;
        timer.textContent = GAME_TIME_LENGTH;
        let countdown = setInterval(function() {
            countdownStarted = true;
            timeLeft--;
            timer.textContent = timeLeft;

            if (timeLeft == 0) {
                clearInterval(countdown);
                countdownStarted = false;

                message.textContent = '💥Times up!!!';
                content.innerHTML = `Your Score is ${score}`;
                content.style.width = "100rem";
                inputNumber.value = '';
                inputName.style.display = 'block';

                if (score > highScore) {
                    highestScoreLabel.textContent = 'New Highscore!';
                    highScore = score;
                }
            }
        }, 1000);
    } else {
        window.alert('The countdown have been started, finish all questions to restart!!!');
    }
};

// Function to checking the result of guess number and expression math result
function checkResult() {
    const guess = parseInt(document.querySelector('.guess').value);
    if (guess == result) {
        score++;
        message.textContent = '🎉Correct Answer, Answer next!';
        document.querySelector('.score').textContent = score;
        inputNumber.value = '';
        compute();
    } else {
        console.log('ANEH JIG');
        message.textContent = '💥Wrong Answer, Try again!';
    }
};

checkButton.addEventListener('click', () => {
    checkResult();
});

inputNumber.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkResult();
    }
});

restartButton.addEventListener('click', () => {
    inputNumber.value = '';
    message.textContent = 'Start guessing...';
    content.style.width = '30rem';
    inputName.style.display = 'none';

    document.querySelector('.score').textContent = 0;
    document.querySelector('body').style.backgroundColor = '#222';

    counter(GAME_TIME_LENGTH);
});

submitButton.addEventListener('click', () => {
    scoreMap.set(user.value, score);
    user.value = '';
    scoreboard = '';
    rank = 1;

    sortedDesc = [...scoreMap].sort((a, b) => (a[1] > b[1] ? -1 : 1));

    sortedDesc.forEach((value) => {
        if (rank > 5) {
            return;
        }
        scoreboard += `<p class="score-board">${rank}. ${value[0]}... <span class="score">${value[1]}</span></p><br>`;
        rank++;
    });
    document.getElementById('score-board').innerHTML = scoreboard;
});

compute();
counter(GAME_TIME_LENGTH);