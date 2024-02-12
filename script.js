function Gameboard() {
    const board = new Array(9);

    function changeCell(mark, index) {
        if (board[index] === undefined) {
            board[index] = mark;
        } else {
            return;
        }
    };

    const getBoard = () => board;

    return {
        getBoard,
        changeCell
    };
};

function Player(playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;

    return {
        name,
        mark
    };
};

function GameController(player1, player2) {
    function playRound() {
        // code here
    }

    function checkWinner(mark) {
        const board = Gameboard.getBoard();
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const combo = winConditions[i];
            const checkArray = [];

            for (let j = 0; j < combo.length; j++) {
                const value = board[combo[j]];
                checkArray.push(value);
            };
            if (checkArray.every(value => value === mark)) {
                return true;
            }
        };
    };

    return {
        checkWinner
    };
};