'use strict';

const scoreMap = new Map([
    ["Julian", 5],
    ["Alvian", 4],
    ["Fajar", 3],
    ["Rahmat", 2],
    ["Leo", 2],
]);

const OPERATORS = ["+", "-", "x", "÷"];
const GAME_TIME_LENGTH = 20;

let result = 0;
let score = 0;
let rank = 1;
let scoreboard = '';
let highScore = 5;
let countdownStarted = false;
let highestScore = true;
let userExist = false;
let userExistValue = 0;
let sortedDesc = new Map();
let inputNumber = document.querySelector('.guess');
let timer = document.getElementById("time");

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');
const openModalButton = document.querySelector('.tutorial');
const content = document.querySelector(".content");
const checkButton = document.querySelector('.check');
const message = document.querySelector('.message');
const inputName = document.querySelector('.inputName');
const user  = document.querySelector('.username');
const submitButton = document.querySelector('.submit');
const restartButton = document.querySelector('.again');
const highestScoreLabel = document.querySelector('.label-highest-score');

// For showing first scoreboard in web
scoreboard += `<table>
                <tr style="height: 4rem">
                    <th class="h-table">No.</th>
                    <th class="h-table">Name</th>
                    <th>Score</th>
                </tr>`
scoreMap.forEach((value, key) => {
    scoreboard += ` <tr>
                        <td>${rank}.</td>
                        <td class="score-board">${key} </td>
                        <td class="rank"><span class="score">${value}</span></td>
                    </tr>`;
                    rank++;
                });
scoreboard += `</table>`

document.getElementById('score-board').innerHTML = scoreboard;

// Function to randomizer for operator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to make the expression math
function compute() {
    content.innerHTML = (Math.trunc(Math.random() * 10) + 1) + ' ' + OPERATORS[getRandomInt(0, 3)] + ' ' + (Math.trunc(Math.random() * 10) + 1);
    result = evaluate(document.querySelector(".content").textContent);

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
                    document.querySelector('body').style.backgroundColor = '#0000FF';
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
        message.textContent = '💥Wrong Answer, Try again!';
    }
};

// Function to checking name to submitted
function checkSubmit() {
    scoreMap.set(user.value, score);
    user.value = '';
    scoreboard = '';
    rank = 1;

    sortedDesc = [...scoreMap].sort((a, b) => (a[1] > b[1] ? -1 : 1));

    scoreboard += `<table>
                <tr style="height: 4rem">
                    <th class="h-table">No.</th>
                    <th class="h-table">Name</th>
                    <th>Score</th>
                </tr>`
    sortedDesc.forEach((value) => {
        if (rank > 5) {
            return;
        }
        scoreboard += ` <tr>
                        <td>${rank}.</td>
                        <td class="score-board">${value[0]} </td>
                        <td class="rank"><span class="score">${value[1]}</span></td>
                    </tr>`;
                    rank++;
                });
        // scoreboard += `<p class="score-board">${rank}. ${value[0]}... <span class="score">${value[1]}</span></p><br>`;
    scoreboard += `</table>`
    document.getElementById('score-board').innerHTML = scoreboard;
};

// Function to change the string expression into number expression
function evaluate(expression) {
    let tokens = expression.split('');
    let values = [];
    let op = [];
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == ' ') {
            continue;
        }

        if (tokens[i] >= '0' && tokens[i] <= '9') {
            let buffer = "";

            while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') {
                buffer = buffer + tokens[i++];
            }

            values.push(parseInt(buffer, 10));
            i--;
        } else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == 'x' || tokens[i] == '÷') {
            while (op.length > 0) {
                values.push(getOperator(op.pop(), values.pop(), values.pop()));
            }

            op.push(tokens[i]);
        }
    }

    while (op.length > 0) {
        values.push(getOperator(op.pop(), values.pop(), values.pop()));
    }

    return values.pop();
};

// Function to get the operator before it can be calculated
function getOperator(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '÷':
            return parseInt(a / b, 10);
    }
    return 0;
};

openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

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
    content.style.width = '40rem';
    inputName.style.display = 'none';

    document.querySelector('.score').textContent = 0;
    document.querySelector('body').style.backgroundColor = '#222';

    counter(GAME_TIME_LENGTH);
});

submitButton.addEventListener('click', () => {
    checkSubmit();
});

inputName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkSubmit();
    }
});

compute();
counter(GAME_TIME_LENGTH);