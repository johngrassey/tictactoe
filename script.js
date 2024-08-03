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

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i] = 0;
            }
        }
    }

    return { printBoard, placeToken, clearBoard };
};

function createPlayer (name, token) {
    const playerName = name;
    const playerToken = token;

    return { playerName, playerToken };
};

function GameController () {
    const players = [createPlayer (prompt("Name?"), "X"),
                    createPlayer (prompt("Name?"), "O")]
    const board = Gameboard();

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const turn = () => {
        const row = prompt("Row");
        const col = prompt("Col");
        board.placeToken(row,col,activePlayer.playerToken);
        switchPlayer();
    }

    turn();
    turn();
    board.printBoard();
};

GameController();