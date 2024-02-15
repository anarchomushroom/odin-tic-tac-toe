function Gameboard() {
    const board = new Array(9).fill("");

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

        if (currentBoard[cell] === "") {
            board.changeCell(activePlayer.mark, cell);
            if (checkWinner(activePlayer.mark) === true) {
                console.log(`${activePlayer} wins!`);
                return;
            }
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
    // players for testing
    const player1 = Player("player1", "O");
    const player2 = Player("player2", "X");

    const game = GameController(player1, player2);
    const boardDiv = document.querySelector(".board");

    const testElement = document.createElement("p");
    testElement.textContent = "Hello working";

    boardDiv.appendChild(testElement);

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

    function clickHandlerBoard(e) {
        const selectedCell = e.target.dataset.cell;
        if (!selectedCell) return;

        game.playRound(selectedCell);
        updateBoard();
    };
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateBoard();
};

ScreenController();
