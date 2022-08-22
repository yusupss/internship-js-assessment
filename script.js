'use strict';

const scoreBoard = [
    {name: "Julian", point: 5},
    {name: "Alvian", point: 4},
    {name: "Fajar", point: 3},
    {name: "Rahmat", point: 2},
    {name: "Leo", point: 1},
]

document.getElementById('score-board').innerHTML = scoreBoard.map((score, rank) =>
    `<p class="score-board">${rank + 1}. ${score.name} <span class="score">${score.point}</span></p>`
).join('<br>');