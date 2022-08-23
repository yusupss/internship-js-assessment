'use strict';
// Zuhal 'Alimul Hadi
let initialData = [
    {
        name: 'Natasha',
        score: 5
    },
    {
        name: 'Tony',
        score: 4
    },
    {
        name: 'Peter',
        score: 3
    },
    {
        name: 'Xavier',
        score: 2
    },
    {
        name: 'Tchala',
        score: 1
    }
]

let firstNumber;
let operator;
let operatorData = ['+', '-', '*'];
let message = document.querySelector('.message');
let secondNumber;
let resultOperation;
let interval;
let isLose;
let currScore;
let currentRank;
let isSubmitted;
let numberBanner = document.querySelector(".number");

const highScore = document.querySelector(".highscore");
const inputVal = document.querySelector(".guess");
const tbody = document.querySelector('.table-content');
const timeLeft = document.querySelector('.time-left');
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const firstNumberEl = document.getElementById('first-number');
const operatorEl = document.getElementById('operator');
const secondNumberEl = document.getElementById('second-number');
const submitHighScoreEl = document.getElementById('new-highscore');
const btnSubmitHighScoreEl = document.getElementById('btn-submit-highscore');
const inputNameHighScoreEl = document.getElementById("input-highscore");
const scoreEl = document.querySelector('.score');

// notification Element
const isLostNotificationEl = document.getElementById('is-played');
const invalidNameNotificationEl = document.getElementById('invalid-name');
const isSubmittedNotificationEl = document.getElementById('is-submitted');

const startTimer = () => {
    timeLeft.innerText = 20;
    let value = parseInt(timeLeft.innerText);
    interval = setInterval(()=> {
        if (value <= 0) {
            clearInterval(interval);
            isLose = true;
            message.innerText = "Times up!!!"
            firstNumberEl.innerText = "";
            secondNumberEl.innerText = "";
            operatorEl.innerText = `Your score is ${currScore}`;
            checkScore();
            return;
        }
        value -= 1;
        timeLeft.innerText = value;
    }, 1000)
}

const refreshHighScore = () => {
    tbody.innerHTML = "";

    initialData = initialData.sort((a, b)=> b.score - a.score);

    initialData.map((data, index)=>{
        const row = document.createElement('tr');
        
        const rank = document.createElement('td');
        rank.innerText = index + 1;
    
        const name = document.createElement('td');
        name.innerText = data.name;
    
        const score = document.createElement('td');
        score.innerText = data.score;
    
        // append to tr
        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(score);
    
        // append to tbody
        tbody.appendChild(row);
    })
}

const refreshQuestions = () => {
    firstNumber = Math.trunc(Math.random() * 9) + 1;
    secondNumber = Math.trunc(Math.random() * 9) + 1;
    operator = operatorData[Math.trunc(Math.random() * operatorData.length)];
    
    firstNumberEl.innerText = firstNumber;
    secondNumberEl.innerText = secondNumber;
    operatorEl.innerText = operator === "*" ? "x" : operator;
    resultOperation = getResult(firstNumber, operator, secondNumber);
}

const getResult = (a, operator, b) => {
    switch (operator) {
        case "+": 
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
    }
}

const checkScore = () => {
    currentRank = null;

    let sortedByHighestRank = initialData.sort((a, b)=> b.score - a.score);

    // check whether got to leaderboard
    for (let i=0; i<sortedByHighestRank.length ;i++) {
        if (currScore >= initialData[i].score) {
            currentRank = i + 1;
            break;
        }
    }

    if (typeof currentRank === "number") {
        submitHighScoreEl.classList.remove('hidden');
    }
}

const handleInputNameChange = () => {
    const el = document.getElementById('input-highscore');
    if (el.value != "") {
        invalidNameNotificationEl.classList.add('hidden');
    } else {
        if (!isSubmitted) invalidNameNotificationEl.classList.remove('hidden');
    }
}

const updateArrayLatest = (currentRank) => {
    if (typeof currentRank === "number") {
        initialData = initialData.sort((a, b)=> b.score - a.score);

        initialData.splice(currentRank - 1, 0, {
            name: document.getElementById("input-highscore").value,
            score: currScore
        });

        initialData = [...initialData.slice(0, initialData.length - 1)];

        initialData = initialData.sort((a, b)=> b.score - a.score);
        refreshHighScore();
        currentRank = null;
        isSubmitted = true;
    }
}

const displayMessage = (message) => {
    document.querySelector(".message").innerText = message;
    return message;
}

const changeBackground = (color) => {
    document.querySelector("body").style.background = color;
    return color;
}

const init = () => {
    currScore = 0;
    scoreEl.innerText = 0;
    inputVal.value = ""
    inputNameHighScoreEl.value = "";
    isLose = false;
    isSubmitted = false;
    displayMessage("Start guessing...");
    changeBackground("#222");
    clearInterval(interval);
    startTimer();
    refreshHighScore();
    refreshQuestions();
}

checkBtn.addEventListener('click', function() {
    let score = document.querySelector(".score").innerText;
    currScore = parseInt(score);

    if (!inputVal) {
        displayMessage("Enter valid number");
        return;
    }

    if (!isLose) {
        if (parseInt(inputVal.value) == parseInt(resultOperation)) {
            displayMessage("Correct Number! Congrats!")
            currScore += 1;
            document.querySelector(".score").innerText = currScore.toString();
            refreshQuestions();
        } else if (parseInt(inputVal.value) !== parseInt(resultOperation)) {
            displayMessage("Wrong answer, try again");
        } 
    } else {
        isLostNotificationEl.classList.remove('hidden');
    }
})

againBtn.addEventListener("click", function() {
    init();
    invalidNameNotificationEl.classList.add('hidden');
    isSubmittedNotificationEl.classList.add('hidden');
    isLostNotificationEl.classList.add('hidden');
    submitHighScoreEl.classList.add('hidden');
});

btnSubmitHighScoreEl.addEventListener('click', ()=> {
    if (!isSubmitted && inputNameHighScoreEl.value) {
        updateArrayLatest(currentRank);
    } else if (!inputNameHighScoreEl.value) {
        invalidNameNotificationEl.classList.remove('hidden');
    } else {
        isSubmittedNotificationEl.classList.remove('hidden');
    }
});

init();