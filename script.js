const Gameboard = (function () {
    // handles logic to do with the gameboard itself
    // builds the board itself
    const board = new Array(9);

    // changes the cell values
    const changeCell = function (mark, index) {
        board[index] = mark;
    };

    // returns the board
    const getBoard = () => board;

    return {
        getBoard,
        changeCell
    };
})();

const Player = function (playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;

    const getName = () => name;
    const getMark = () => mark;

    return {
        getName,
        getMark
    };
};

const GameController = (function () {
    // handles the flow of the game
    // whose turn it is
    // whether there is a winner or not

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
    // play a round of the game
    return {
        checkWinner
    };
})();

const board = Gameboard.getBoard();
Gameboard.changeCell("X", 0);
Gameboard.changeCell("X", 1);
Gameboard.changeCell("X", 3);
Gameboard.changeCell("X", 6);

console.log(GameController.checkWinner("X"));