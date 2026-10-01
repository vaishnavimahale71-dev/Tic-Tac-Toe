
const cells = document.querySelectorAll(".cell");

const statusText = document.querySelector("#status");

const restartButton = document.querySelector("#restart");

const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");

const playerXCard = document.querySelector("#playerXCard");
const playerOCard = document.querySelector("#playerOCard");


let board = ["", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameRunning = true;

let xScore = 0;
let oScore = 0;


const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        const index = cell.dataset.index;


        if (board[index] !== "" || !gameRunning) {
            return;
        }


        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());


        checkWinner();

    });

});


function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = board[pattern[0]];
        const b = board[pattern[1]];
        const c = board[pattern[2]];


        if (a !== "" && a === b && b === c) {

            gameRunning = false;


            pattern.forEach(function(index) {

                cells[index].classList.add("winner");

            });


            statusText.textContent =
                "Player " + currentPlayer + " Wins!";


            if (currentPlayer === "X") {

                xScore++;

                scoreX.textContent = xScore;

            } else {

                oScore++;

                scoreO.textContent = oScore;

            }


            return;
        }
    }


    if (!board.includes("")) {

        gameRunning = false;

        statusText.textContent = "It's a Draw!";

        return;
    }


    changePlayer();

}


function changePlayer() {

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";


    updateActivePlayer();

}


function updateActivePlayer() {

    playerXCard.classList.remove("active-player");

    playerOCard.classList.remove("active-player");


    if (currentPlayer === "X") {

        playerXCard.classList.add("active-player");

    } else {

        playerOCard.classList.add("active-player");

    }

}


restartButton.addEventListener("click", function() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameRunning = true;


    statusText.textContent = "Player X's Turn";


    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winner");

    });


    updateActivePlayer();

});
