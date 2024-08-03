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

    return { printBoard, placeToken, clearBoard };
};

function createPlayer (name, token) {
    const playerName = name;
    const playerToken = token;

    return { playerName, playerToken };
};

function GameController () {
    const playerOne = createPlayer (prompt("Name?"), prompt("Token?"));
    const playerTwo = createPlayer (prompt("Name?"), prompt("Token?"));
    const board = Gameboard();

    console.log(playerOne);
    console.log(playerTwo);
    board.placeToken(0,1,"X");
    board.printBoard();
};

GameController();