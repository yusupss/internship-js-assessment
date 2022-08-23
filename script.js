'use strict';
//  Get random number
const getRandomNum = (a, b) => {
    a = Math.ceil(a); //  Rounds the number to a higher value
    b = Math.floor(b); //  Rounds the number to a lower value
    return Math.floor(Math.random() * (a - b + 1)) + b; //  Returns a random number between a and b
}
const operations = new Map([
    [0, '+'],
    [1, '-'],
    [2, '*'],
]);

let count = 20;
let score = 0;
let operator = operations.get(getRandomNum(0, 2)); //  Generate random operator
let num1 = getRandomNum(0, 9);
let num2 = getRandomNum(0, 9);
let isUpdated = false;

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
}, 1000);

document.getElementById('#check-calc').addEventListener('submit', c => {
    c.preventDefault();
    const guessNum = Number(document.querySelector('.guess').value);
    const totCalculation = calculation(num1, num2, operator);

    if (count < 1) {
        alert('🔥 Times up !!!');
        return;
    }

    if ( totCalculation === guessNum) {
        document.querySelector('.message').textContent ='🎉 Correct Answer!';
        score++;

        document.querySelector('.score').textContent = score;
        num1 = getRandomNum(0, 9);
        num2 = getRandomNum(0, 9);
        operations.get(getRandomNum(0, 2));
        document.querySelector('.number').textContent = `${num1} ${operator} ${num2}`;
    }
});

document.querySelector('#new-highscorer').addEventListener('submit', c => {
    c.preventDefault();
    const newPlayer = document.querySelector('.name').value;
    console.log(topPlayer);
    if (topPlayer.some(c => c.name === newPlayer) && topPlayer.some(c => c.score >= score)){
        return;
    }
    topPlayer = topPlayer.filter(({ name }) => name !== newPlayer);
    if (isUpdated) {
        return;
    }
    topPlayer.push(
        {   name: newPlayer, 
            score: score,
        });
    topPlayer.sort((x, y) => y.score - x.score);
    topPlayer.pop();
    isUpdated = true;

    for (let i = 0; i < topPlayer.length; i++) {
        document.querySelector(`.player-${i + 1}`).textContent = `${topPlayer[i].name} ... ${topPlayer[i].score}`;
    }
});

document.querySelector('.new-game').addEventListener('click', function() {
    score = 0;
    count = 20;
    isUpdated = false;

    document.querySelector('#new-highscorer').style.display = 'none';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = `Your Score is ${score}`;

    document.querySelector('.score').textContent = score;
    document.querySelector('.time').textContent = count;
    numOne = getRandomNum(0, 9);
    numTwo = getRandomNum(0, 9);
    operation.get(getRandomNum(0, 2));
    document.querySelector('.number').textContent = `${numOne} ${operator} ${numTwo}`;
})