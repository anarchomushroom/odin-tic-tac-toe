function Gameboard() {
    const board = new Array(9);

    function changeCell(mark, index) {
        board[index] = mark;
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
    const players = [player1, player2];
    const board = Gameboard();
    let activePlayer = players[0];

    function changeActivePlayer() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else activePlayer = players[0];
    };

    function playRound(cell) {
        const currentBoard = board.getBoard();

        if (currentBoard[cell] === undefined) {
            board.changeCell(activePlayer.mark, cell);
            if (checkWinner(activePlayer.mark) === true) {
                console.log(`${activePlayer} wins!`);
                return;
            }
            console.log(currentBoard);
            changeActivePlayer();
        } else {
            return;
        }
    }

    function checkWinner(mark) {
        const currentBoard = board.getBoard();
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
                const value = currentBoard[combo[j]];
                checkArray.push(value);
            };
            if (checkArray.every(value => value === mark)) {
                return true;
            }
        };
    };

    return {
        playRound,
        getBoard: board.getBoard
    };
};

// =============================
// UI Stuff
// =============================
function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".board");

    function updateBoard() {
        const board = game.getBoard();

        boardDiv.textContent = "";

        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.cell = index;
            cellButton.textContent = cell;
            boardDiv.appendChild(cellButton);
        });
    };

    return {
        updateBoard
    }
}
