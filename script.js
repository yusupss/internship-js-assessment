'use strict';

const scoreBoard = [
    {name: "Julian", point: 5},
    {name: "Alvian", point: 4},
    {name: "Fajar", point: 3},
    {name: "Rahmat", point: 2},
    {name: "Leo", point: 1},
];

let timeLeft = 20;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function compute() {
    const operators = ["+", "-", "x", "÷"]; 

    document.querySelector(".number").innerHTML = (Math.trunc(Math.random() * 10) + 1) + operators[getRandomInt(0,3)] + (Math.trunc(Math.random() * 10) + 1);
}

document.addEventListener("DOMContentLoaded", function(event) {
    compute();
    let countdown = setInterval(function(){
    timeLeft--;

    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
    }
    if (timeLeft == 0) {
        document.querySelector('.message').textContent = '💥Times up!!!';
    }
    }, 1000);
});

document.getElementById('score-board').innerHTML = scoreBoard.map((score, rank) =>
    `<p class="score-board">${rank + 1}. ${score.name}... <span class="score">${score.point}</span></p>`
).join('<br>');