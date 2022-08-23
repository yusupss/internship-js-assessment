'use strict';

const getRandomNum = (a, b) => {
    a = Math.ceil(a);
    b = Math.floor(b);
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

const operation = new Map([
    [0, '+'],
    [1, '-'],
    [2, '*'],
]);

let count = 30;
let score = 0;
let operator = operation.get(getRandomNum(0, 2));
let num1 = getRandomNum(0, 9);
let num2 = getRandomNum(0, 9);
let isUpdated = false;

document.querySelector('.number').textContent = `${num1} ${operator} ${num2}`;

const calculation = (num1, num2, operation) => {
    if (operation == '+') {
        return num1 + num2;
    } else if (operation == '-') {
        return num1 - num2;
    } else if (operation == '*') {
        return num1 * num2;
    }
}

let topScores = [{
        name: 'Thomas',
        score: 5
    },
    {
        name: 'Arthur',
        score: 4
    },
    {
        name: 'John',
        score: 3
    },
    {
        name: 'Alfie Solomons',
        score: 2
    },
    {
        name: 'Michael Gray',
        score: 1
    },
];

for (let i = 0; i < topScores.length; i++) {
    document.querySelector(
        `.player-${i + 1}`
    ).textContent = `${topScores[i].name} ... ${topScores[i].score}`;
}

const intervalID = setInterval(() => {
    count--;
    document.querySelector('.time').textContent = count;
    if (count < 1) {
        if (score > topScores[topScores.length - 1].score) {
            document.querySelector('#new-highscorer').style.display = 'flex';
            document.querySelector('.message').textContent = '☄️ Times up !!!';
            document.querySelector('.number').textContent = `Your Score is ${score}`;
        }

        clearInterval(intervalID);
    }
}, 1000);

document.getElementById('check-calc').addEventListener('submit', e => {
    e.preventDefault();
    const guessNumber = Number(document.querySelector('.guess').value);
    const totalCalc = calculation(num1, num2, operator);

    if (count < 1) {
        alert('Times up!!!');
        return;
    }

    if (totalCalc === guessNumber) {
        document.querySelector('.message').textContent =
            '🎉 Correct Answer! Answer next';
        score++;

        document.querySelector('.score').textContent = score;
        num1 = getRandomNum(0, 9);
        num2 = getRandomNum(0, 9);
        operation.get(getRandomNum(0, 2));
        document.querySelector(
            '.number'
        ).textContent = `${num1} ${operator} ${num2}`;
    }
});

document.querySelector('#new-highscorer').addEventListener('submit', e => {
    e.preventDefault();
    const newPlayer = document.querySelector('.name').value;
    console.log(topScores);
    if (
        topScores.some(e => e.name === newPlayer) &&
        topScores.some(e => e.score >= score)
    ) {
        return;
    }

    topScores = topScores.filter(({
        name
    }) => name !== newPlayer);

    if (isUpdated) {
        return;
    }

    topScores.push({
        name: newPlayer,
        score: score
    });

    topScores.sort((a, b) => b.score - a.score);

    topScores.pop();

    isUpdated = true;

    for (let i = 0; i < topScores.length; i++) {
        document.querySelector(
            `.player-${i + 1}`
        ).textContent = `${topScores[i].name} ... ${topScores[i].score}`;
    }
});

document.querySelector('.new-game').addEventListener('click', () => {
    score = 0;
    count = 30;

    isUpdated = false;
    document.querySelector('#new-highscorer').style.display = 'none';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = `Your Score is ${score}`;

    document.querySelector('.score').textContent = score;
    document.querySelector('.time').textContent = count;
    num1 = getRandomNum(0, 9);
    num2 = getRandomNum(0, 9);
    operation.get(getRandomNum(0, 2));
    document.querySelector(
        '.number'
    ).textContent = `${num1} ${operator} ${num2}`;

    const intervalID = setInterval(() => {
        count--;
        document.querySelector('.time').textContent = count;
        if (count < 1) {
            if (score > topScores[topScores.length - 1].score) {
                document.querySelector('#new-highscorer').style.display = 'flex';
                document.querySelector('.message').textContent = '☄️ Times up !!!';
                document.querySelector(
                    '.number'
                ).textContent = `Your Score is ${score}`;
            }

            clearInterval(intervalID);
        }
    }, 1000);
});
