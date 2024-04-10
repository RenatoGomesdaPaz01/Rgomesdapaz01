var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currColumns = []; 

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    let boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardElement.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns[c]; 
    if (r < 0) {
        return;
    }
    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece", "drop");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece", "drop");
        currPlayer = playerRed;
    }
    r -= 1; 
    currColumns[c] = r; 
    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    let boardElement = document.getElementById("board");

    if (boardElement.style.display !== "none") {
        boardElement.style.display = "none"; 
    }

    if (board[r][c] == playerRed) {
        winner.innerText = "Congratulations! Red wins 😊";
        winner.style.color = "red";
    } else {
        winner.innerText = "Congratulations! Yellow wins 😊";
        winner.style.color = "yellow";
    }

    let playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        restartGame();
    } else {
        boardElement.style.display = "flex"; 
    }
}

function restartGame() {
    let winner = document.getElementById("winner");
    let boardElement = document.getElementById("board");
    winner.innerText = ""; 
    boardElement.style.display = "flex"; 
    setGame(); 
    gameOver = false;
}

