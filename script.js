'use strict';

let LeaderBoard = [{
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

for (let i = 0; i < LeaderBoard.length; i++) {
    document.querySelector(`.player-${i + 1}`).textContent = `${LeaderBoard[i].name} ... ${LeaderBoard[i].score}`;
}

const timeInterval = setInterval(() => {
    count--;
    document.querySelector('.time').textContent = count;
    if (count < 1) {
        if (score > LeaderBoard[LeaderBoard.length - 1].score) {
            document.querySelector('#new-highscorer').style.display = 'flex';
            document.querySelector('.main-title').textContent = '🔥🔥🔥 Congrats!!';
            document.querySelector('body').style.backgroundColor = ' #60b347';
            document.querySelector('.message').textContent = '☄️ Times up !!!';
            document.querySelector('.number').textContent = `Your Score is ${score}`;
            document.querySelector('.number').style.fontSize = '3rem';
            document.querySelector('.new-game').style.backgroundColor = ' #222';
            document.querySelector('.new-game').textContent = ' Play Again';
            document.querySelector('.new-game').style.color = ' #fff';
        }

        clearInterval(timeInterval);
    }
}, 1000);

document.getElementById('check-calc').addEventListener('submit', e => {
    e.preventDefault();
    const guessNumber = Number(document.querySelector('.guess').value);
    const totalCalc = calculation(num1, num2, operator);
    if (!guessNumber) {
        document.querySelector('.message').textContent = '🙈🙈🙈 No number!!';
    }
    document.querySelector('body').style.backgroundColor = '#FF4A4A';
    if (count < 1) {
        alert('🙈🙈🙈 Times up!!!');
        return;
    }
    if (totalCalc === guessNumber) {
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.message').textContent = '🎉 Siuuuu Correct Answer!';
        score++;

        document.querySelector('.score').textContent = score;
        num1 = getRandomNum(0, 9);
        num2 = getRandomNum(0, 9);
        operation.get(getRandomNum(0, 2));
        document.querySelector('.number').textContent = `${num1} ${operator} ${num2}`;
    } else if (totalCalc !== guessNumber) {
        document.querySelector('.message').textContent = '🙈🙈🙈 Wrong Answer!!!';
    }
});

document.querySelector('#new-highscorer').addEventListener('submit', e => {
    e.preventDefault();
    const newPlayer = document.querySelector('.name').value;
    console.log(LeaderBoard);
    if (
        LeaderBoard.some(e => e.name === newPlayer) &&
        LeaderBoard.some(e => e.score >= score)
    ) {
        return;
    }

    LeaderBoard = LeaderBoard.filter(({
        name
    }) => name !== newPlayer);

    if (isUpdated) {
        return;
    }

    LeaderBoard.push({
        name: newPlayer,
        score: score
    });

    LeaderBoard.sort((a, b) => b.score - a.score);

    LeaderBoard.pop();

    isUpdated = true;

    for (let i = 0; i < LeaderBoard.length; i++) {
        document.querySelector(`.player-${i + 1}`).textContent = `${LeaderBoard[i].name} ... ${LeaderBoard[i].score}`;
    }
});

document.querySelector('.new-game').addEventListener('click', () => {
    score = 0;
    count = 30;

    isUpdated = false;
    document.querySelector('#new-highscorer').style.display = 'none';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = `Your Score is ${score}`;
    document.querySelector('body').style.backgroundColor = ' #222';
    document.querySelector('.main-title').textContent = 'Do the Math!';
    document.querySelector('.new-game').style.backgroundColor = ' #eee';
    document.querySelector('.new-game').style.color = ' #222';
    document.querySelector('.new-game').textContent = ' Again!';

    document.querySelector('.score').textContent = score;
    document.querySelector('.time').textContent = count;
    num1 = getRandomNum(0, 9);
    num2 = getRandomNum(0, 9);
    operation.get(getRandomNum(0, 2));
    document.querySelector(
        '.number'
    ).textContent = `${num1} ${operator} ${num2}`;

    const timeInterval = setInterval(() => {
        count--;
        document.querySelector('.time').textContent = count;
        if (count < 1) {
            if (score > LeaderBoard[LeaderBoard.length - 1].score) {
                document.querySelector('#new-highscorer').style.display = 'flex';
                document.querySelector('.message').textContent = '☄️ Times up !!!';
                document.querySelector('.number').textContent = `Your Score is ${score}`;
            }

            clearInterval(timeInterval);
        }
    }, 1000);
});
