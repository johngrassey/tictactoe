function Gameboard () {
    const rows = 3;
    const cols = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push("");
        }
    }

    const printBoard = () => {
        console.log(board);
    }

    const placeToken = (row, column, token) => {
            board[row][column] = token;
    }

    const getBoard = () => board;

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = "";
            }
        }
    }

    const checkWinner = () => {

        let column = "";
        for (let i = 0; i < rows; i++) {

        // Check Rows

            if (board[i].join("") === "XXX" || board[i].join("") === "OOO")
                return true;

        // Check Columns

            for (let j = 0; j < cols; j++) {
                column += board[j][i];
                if (column === "XXX" || column === "OOO") {
                    return true;
                }
            }
            column = "";
        }

        // Check Diagonals

        if (board[0][0] + board[1][1] + board[2][2] === "OOO" ||
            board[0][0] + board[1][1] + board[2][2] === "XXX" ||
            board[0][2] + board[1][1] + board[2][0] === "OOO" ||
            board[0][2] + board[1][1] + board[2][0] === "XXX") {
            return true;
        }

        return false;
    }

    const checkTie = () => {
        boardValues = "";

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                boardValues += board[i][j];
            }
        }

        if (boardValues.length === 9 ) {
            return true;
        }
    }

    return { printBoard, placeToken, clearBoard, checkWinner, checkTie, getBoard };
};

function createPlayer (name, token) {
    const playerName = name;
    const playerToken = token;
    let score = 0;

 function addScore () {
        ++score;
    }

    const getScore = () => {
        return score
    }

    return { playerName, playerToken, addScore, getScore };
};

function GameController () {
    let players =  [createPlayer ("Player One", "X"),
                   createPlayer ("Player Two", "O")]
    const board = Gameboard();

    let activePlayer = players[0];

    const createPlayers = (name1, name2) => {
        players = [createPlayer (name1, "X"), createPlayer (name2, "O")]
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playTurn = (row, col) => {
        board.placeToken(row,col,activePlayer.playerToken);
    }

    const addPoint = () => {
        activePlayer.addScore();
    }

    const getP1Score = () => {
        return players[0].getScore();
    }

    const getP2Score = () => {
        return players[1].getScore();
    }

    return { getActivePlayer, playTurn,
            getBoard: board.getBoard ,
            checkWinner: board.checkWinner,
            checkTie: board.checkTie,
            clearBoard: board.clearBoard,
            addPoint,
            getP1Score,
            getP2Score,
            switchPlayer, 
            createPlayers
    };
    };

function ScreenController () {
    const game = GameController();
    const boardDiv = document.querySelector(".board");
    const messageDiv = document.querySelector(".message");
    const newGameBtn = document.querySelector(".newgame");
    const endGameMsg = document.querySelector(".endgame");
    const endDialog = document.querySelector("dialog.end");
    const p1ScoreDiv = document.querySelector("div.p1score");
    const p2ScoreDiv = document.querySelector("div.p2score")

    const updateScreen = () => {

        boardDiv.textContent = "";
        const activePlayer = game.getActivePlayer();
        const board = game.getBoard();

        messageDiv.textContent = `${activePlayer.playerName}'s Turn`;
        p1ScoreDiv.textContent = game.getP1Score();
        p2ScoreDiv.textContent = game.getP2Score();

        newGameBtn.addEventListener("click", () => {
            newGame();
        });

        board.forEach((row, i) => {
            row.forEach((col, j) => {
                const cellDiv = document.createElement("button");
                cellDiv.classList.add("cell");
                cellDiv.textContent = board[i][j];
                if (cellDiv.textContent === "X") {
                    cellDiv.classList.add("x")
                } else if (cellDiv.textContent === "O") {
                    cellDiv.classList.add("o");
                }
                boardDiv.appendChild(cellDiv);
                cellDiv.addEventListener("click", (e) => {
                    if (board[i][j] === "" ) {
                        game.playTurn(i, j);
                        if (game.checkWinner()) {
                            sayWinner();
                            game.addPoint();
                            endGame();
                        } else if (game.checkTie()) {
                            sayTie();
                            endGame();
                        }
                        game.switchPlayer();
                        updateScreen();
                    }
                });
            })
        }) 

        const sayWinner = () => {
            endGameMsg.textContent = `${activePlayer.playerName} Wins!`
        }

        const sayTie = () => {
            endGameMsg.textContent = `It's a tie!`;
        }

        const endGame = () => {
            endDialog.showModal();
        }

        const newGame = () => {
                game.clearBoard();
                updateScreen();
                endDialog.close();
        }
    }

updateScreen();

}

ScreenController()