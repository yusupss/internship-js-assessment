'use strict';

const scoreBoard = [
    {name: "Julian", point: 5},
    {name: "Alvian", point: 4},
    {name: "Fajar", point: 3},
    {name: "Rahmat", point: 2},
    {name: "Leo", point: 1},
];

let timeLeft = 20;


document.addEventListener("DOMContentLoaded", function(event) { 
    let countdown = setInterval(function(){
        timeLeft--;

    document.getElementById("time").textContent = timeLeft;
    if(timeLeft <= 0)
        clearInterval(countdown);
    }, 1000);
});

document.getElementById('score-board').innerHTML = scoreBoard.map((score, rank) =>
    `<p class="score-board">${rank + 1}. ${score.name}... <span class="score">${score.point}</span></p>`
).join('<br>');

function ready(callback){
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}