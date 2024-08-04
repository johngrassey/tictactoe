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
        if (board[row][column] === "") {
            board[row][column] = token;
        } else {
            alert ("Space Taken!");
        };
 
    }

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i] = 0;
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

        if (board[0][0] + board[1][1] + board[2][2] === "XXX" || board[0][2] + board[1][1] + board[2][0] === "OOO") {
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
            alert ( "It's a Tie!");
        }
    }

    return { printBoard, placeToken, clearBoard, checkWinner, checkTie };
};

function createPlayer (name, token) {
    const playerName = name;
    const playerToken = token;

    return { playerName, playerToken };
};

function GameController () {
    const players = [createPlayer ("John", "X"),
                    createPlayer ("Brielle", "O")]
    const board = Gameboard();

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const playTurn = () => {
        const row = prompt("Row");
        const col = prompt("Col");
        board.placeToken(row,col,activePlayer.playerToken);

    }

    const playGame = () => {
        while ( !board.checkWinner() && !board.checkTie() ) {
            playTurn();
            switchPlayer();
            board.printBoard();
        } 

        alert ( "GAME OVER!");
    }

    return { playGame };
};

const game = GameController();

game.playGame();