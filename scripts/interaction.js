//intro page variables
let startButton = document.querySelector(".start");

let restartButton = document.querySelector(".playAgain");

let restartButtonTied = document.querySelector(".playAgainTied");

let introLayer = document.querySelector(".introPage");

let turnLayer = document.querySelector(".turnTeller");
let turnMessage = document.querySelector(".turn");

let gameOverLayer = document.querySelector(".finishPage");

let tiedLayer = document.querySelector(".tiedPage");

let winner = document.querySelector(".winner");

let name1 = '';
let name2 = '';

let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");

let players = ['', ''];

let count1 = 0;
let count2 = 0;

//game container variables
let squares = document.querySelectorAll(".square");

document.addEventListener('DOMContentLoaded', () => {
        startButton.addEventListener('click', startGame)
})

restartButton.addEventListener('click', restart);
restartButtonTied.addEventListener('click', restart);

document.addEventListener('DOMContentLoaded', () => {
    squares.forEach((square) => {
        square.addEventListener('click', selectPosition);
    })
})

// start functions

function startGame() {
    introLayer.style.display = 'none';
    name1 = document.querySelector(".input1").value;
    name2 = document.querySelector(".input2").value;

    players = [name1, name2];

    player1.innerHTML = `${name1}: ${count1} pontos`;
    player2.innerHTML = `${name2}: ${count2} pontos`;

    turnMessage.innerHTML = '';
    turnMessage.classList.remove('turnMessage0');
    turnMessage.classList.remove('turnMessage1');

    turnLayer.style.display = 'flex';
    if (round %2 == 0) {
        turnMessage.innerHTML = `${players[0]} começa`;
        turnMessage.classList.add('turnMessage0');
    } else if (round %2 == 1) {
        turnMessage.innerHTML = `${players[1]} começa`;
        turnMessage.classList.add('turnMessage1');
    }
    setTimeout(() => {
        turnLayer.style.display = 'none';
    }, 1000);
}

//game functions

function selectPosition(event) {
    let square = event.target;
    let position = square.id;

    playAndSwitch(position);

    if (gameOver) {
        setTimeout(() => {
            gameOverLayer.style.display = 'flex';
            winner.innerHTML = `${players[playerTurn]} ganhou!`;
            if (playerTurn == 0) {
                winner.classList.add('icon1');
            } else if (playerTurn == 1) {
                winner.classList.add('icon2');
            }
            
        }, 200);

        if (playerTurn == 0) {
            count1++;
            player1.innerHTML = `${name1}: ${count1} pontos`;
        } else {
            count2++;
            player2.innerHTML = `${name2}: ${count2} pontos`;
        }
    };

    if (tied) {
        setTimeout(() => {
            tiedLayer.style.display = 'flex';
        })
    }
}

function markSquare (position, symbol) {
    let square = document.getElementById(position);
    square.innerHTML = `<div class='${symbol}'></div>`;
}

function resetGame(){
    board = ['', '', '', '', '', '', '', '', ''];
    playerTime = 0;
    gameOver = false;
    sum = 0;
    tied = false;
    winner.classList.remove('icon1');
    winner.classList.remove('icon2');
    round += 1;
    if (round %2 == 0) {
        playerTurn = 0;
    } else if (round %2 == 1) {
        playerTurn = 1;
    }
    resetSquares();
}

function restart(){
    resetGame();
    gameOverLayer.style.display = 'none';
    tiedLayer.style.display = 'none';
    startGame();
}

function resetSquares() {
    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

            square.innerHTML = `<div class= '${symbol}'></div>`
            square.style.backgroundColor = "#acd8aa";
            square.classList.remove('winnerSquare');
    })
}