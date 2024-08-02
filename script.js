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

    console.log(board);
    return board;
};

function createPlayer (name, token) {
    const playerName = name;
    const playerToken = token;

    return { playerName, playerToken };
};

function GameControlloer () {

};