//start variables
let board = ['', '', '', '', '', '', '', '', ''];
let playerTurn = 0;
let gameOver = false;
let tied = false;
let sum = 0;

//game rules
let symbols = ['o', 'x'];

let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let winnerSquares = ['', '', ''];

let round = 0;

//mark the play on the board and switch to the other player
function playAndSwitch(position) {
    if (gameOver){
        return;
    }

    if (tied) {
        return;
    }

    markPlay(position);

    verify();

    verifyTied();

    switchPlayer();

}

//marking a play
function markPlay(position) {
    if (board[position] == ''){
        board[position] = symbols[playerTurn];
        markSquare(position, board[position]);
        sum += 1;
        console.log(sum);
    }
}

//switching players
function switchPlayer() {
    if (!gameOver) {
        if(playerTurn == 0) {
            playerTurn = 1;
        } else {
            playerTurn = 0;
        }
    }
}

//verifying win
function verify() {
    for (let i = 0; i < winCombinations.length; i++) {
        let combination = winCombinations[i];

        let position0 = combination[0];
        let position1 = combination[1];
        let position2 = combination[2];

        if (board[position0] == board[position1] &&
            board[position0] == board[position2] &&
            board[position0] != ''){

                winnerSquares = [combination[0], combination[1], combination[2]];
        
                transformWinnerSquares();

                gameOver = true;
            }
        }

        // for(let i = 0; i < board.length; i++) {
        //     verifyTied(i);
        //     console.log(sum);
        // }

    // board.forEach((position) => {
    //     verifyTied(position);
    //     console.log(sum);
    // })
}

function transformWinnerSquares() {
    for (position of winnerSquares) {
        let square = document.getElementById(position);
        square.classList.add('winnerSquare');
        square.style.backgroundColor = '#93b991';
        
        // square.style.backgroundColor = '#93b991';
        // square.style.transform = 'scale(1.25)';
        // square.style.transition = 'ease-in-out 200ms';
    }
}

function verifyTied(position) {
    if (sum == 9 && !gameOver) {
        tied = true;
    }
}