'use strict';

const scoreBoard = [
    {name: "Julian", point: 5},
    {name: "Alvian", point: 4},
    {name: "Fajar", point: 3},
    {name: "Rahmat", point: 2},
    {name: "Leo", point: 1},
];

let timeLeft = 20;
let result = 0;
let score = 0;

const content = document.querySelector(".content");
const inputNumber = document.querySelector('.guess');
const buttonCheck = document.querySelector('.check');
const message = document.querySelector('.message');

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function compute() {
    const operators = ["+", "-", "*", "÷"];
    content.innerHTML = (Math.trunc(Math.random() * 10) + 1) + operators[getRandomInt(0,3)] + (Math.trunc(Math.random() * 10) + 1);
    result = eval(document.querySelector(".content").textContent);

    return result;
};

document.addEventListener("DOMContentLoaded", function(event) {
    compute();
    let countdown = setInterval(function() {
        timeLeft--;

        inputNumber.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.keyCode === 13) {
                button.click();
            };
        });

        buttonCheck.addEventListener('click', () => {
            const guess = Number(document.querySelector('.guess').value);

            if (guess == result) {
                score++;
                document.querySelector('.score').textContent = score;
                document.querySelector('.guess').value = '';
                compute();
            };
        });

        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
        };
        if (timeLeft == 0) {
            message.textContent = '💥Times up!!!';
            content.innerHTML = `Your Score is ${score}`;
            content.style.width = "100rem";
        };
    }, 1000);
});

document.getElementById('score-board').innerHTML = scoreBoard.map((score, rank) =>
    `<p class="score-board">${rank + 1}. ${score.name}... <span class="score">${score.point}</span></p>`
).join('<br>');