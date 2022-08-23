'use strict';
//  Game logic
let score = 20;
let secretNum = Math.trunc(Math.random()* 20 ) + 1;
let highScore = 0;


document.querySelector('.check').addEventListener('click', 
function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(document.querySelector('.guess').value);
    //  When there is no input
    if (!guess) {
        document.querySelector('.message').textContent = '🙈🙈🙈 No number!!';
        score--;
        document.querySelector('.score').textContent = score;
        //  When user wins
    } else if (guess === secretNum) {
        document.querySelector('.number').textContent = secretNum;
        document.querySelector('.message').textContent = '😎😎😎 Siuuu You won!';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '40rem';
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
        //  When user guess is too low
    } else if (guess < secretNum) {
        if (score > 1) {
            document.querySelector('.message').textContent = '🙈🙈🙈 Too low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '🤯🤯🤯 Bye Loser!';
            document.querySelector('.score').textContent = 0;
        }
        //  When user guess is too high
    } else if (guess > secretNum) {
        if (score > 1) {
            document.querySelector('.message').textContent = '🙈🙈🙈 Too high!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '🤯🤯🤯 Bye Loser!'
            document.querySelector('.score').textContent = 0;
        }
    }
})
//  Again button
document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    secretNum = Math.trunc(Math.random() * 20) + 1;

    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})