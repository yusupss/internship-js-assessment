'use strict';
//  Get random number
let getRandomNum = (a, b) => {
    a = Math.ceil(a); //  Rounds the number to a higher value
    b = Math.floor(b); //  Rounds the number to a lower value
    return Math.floor(Math.random() * (a - b + 1)) + b; //  Returns a random number between a and b
}
let operations = new Map([
    [0, '+'],
    [1, '*'],
    [2, '-'],
])

let score = 0;
let num1 = getRandomNum(0, 9);
let num2 = getRandomNum(0,9);
let operator = operations.get(getRandomNum(0, 2)); //  Generate random operator

const artm = '+'
document.querySelector('.number').textContent = `${num1} ${operator} ${num2}`;
//  Game logic
const calculation = (num1, operations, num2) => {
    if (operations == '+') {
        return num1 + num2;
    } else if (operations == '*') {
        return num1 * num2;
    } else if (operations == '-') {
        return num1 - num2;
    }
};

let count = 20; 

const topPlayer = [
    {   name: 'Thomas', 
        score: 6,
    }, {
        name: 'Arthur',
        score: 5,
    }, {
        name: 'John',
        score: 4,
    }, {
        name: 'Alfie Solomons',
        score: 3,
    }, {
        name: 'Michael Gray',
        score: 2,
    }
];

for (let i = 0; i < topPlayer.length; i++) {
    document.querySelector(`.player-${i + 1}`).textContent = `${topPlayer[i].name} ... ${topPlayer[i].score}`
}

const timeInterval = setInterval(() => {
    count--;
    document.querySelector('.time').textContent = count;
    //  If times up
    if (count < 1) {
        //  If there is new highscorer than -1 from top player
        if (score > topPlayer[topPlayer.length - 1].score){
            document.querySelector('.final').style.display = 'flex';
            document.querySelector('.message').textContent = '🔥 Times up !!!';
            document.querySelector('.number').textContent = `Your score is ${score}`;
        }
        clearInterval(timeInterval);
    }
}, 1000)