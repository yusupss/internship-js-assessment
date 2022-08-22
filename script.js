'use strict';

const scoreBoard = new Map([
    ["Julian", 5],
    ["Alvian", 4],
    ["Fajar", 3],
    ["Rahmat", 2],
    ["Leo", 1],
]);

let timeLeft;
let result = 0;
let score = 0;
let rank = 1;
let highscore = '';
let sortedDesc = new Map();
let inputNumber = document.querySelector('.guess');
let timer = document.getElementById("time");

const content = document.querySelector(".content");
const buttonCheck = document.querySelector('.check');
const message = document.querySelector('.message');
const inputName = document.querySelector('.inputName');
const user  = document.querySelector('.username');
const buttonSubmit = document.querySelector('.submit');

scoreBoard.forEach((value, key) => {
    highscore += `<p class="score-board">${rank}. ${key}... <span class="score">${value}</span></p><br>`;
    rank++;
});

document.getElementById('score-board').innerHTML = highscore;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function compute() {
    const operators = ["+", "-", "*"];
    content.innerHTML = (Math.trunc(Math.random() * 10) + 1) + operators[getRandomInt(0,2)] + (Math.trunc(Math.random() * 10) + 1);
    result = eval(document.querySelector(".content").textContent);

    return result;
};

function play() {
    timeLeft = 20;
    let countdown = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;

        inputNumber.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.keyCode === 13) {
                buttonCheck.click();
            };
        });

        buttonCheck.addEventListener('click', () => {
            const guess = Number(document.querySelector('.guess').value);

            if (guess == result) {
                score++;
                document.querySelector('.score').textContent = score;
                inputNumber.value = '';
                compute();
            };
        });

        if (timeLeft <= 0) {
            clearInterval(countdown);
        };
        if (timeLeft == 0) {
            message.textContent = '💥Times up!!!';
            content.innerHTML = `Your Score is ${score}`;
            content.style.width = "100rem";
            inputNumber.value = '';
            inputName.style.display = 'block';
        };
    }, 1000);
}

compute();
play();

document.querySelector('.again').addEventListener('click', function () {
    timer.textContent = 20;
    content.textContent = '?';
    inputNumber.value = '';
    content.style.width = '30rem';
    inputName.style.display = 'none';

    document.querySelector('.score') = 0;
    document.querySelector('body').style.backgroundColor = '#222';
    compute();
    play();
});

buttonSubmit.addEventListener('click', () => {
    scoreBoard.set(user.value, score);
    user.value = '';
    highscore = '';
    rank = 1;

    sortedDesc = [...scoreBoard].sort((a, b) => (a[1] > b[1] ? -1 : 1));

    sortedDesc.forEach((value, key) => {
        if (rank > 5) {
            return;
        };
        highscore += `<p class="score-board">${rank}. ${value[0]}... <span class="score">${value[1]}</span></p><br>`;
        rank++;
    });
    document.getElementById('score-board').innerHTML = highscore;
});