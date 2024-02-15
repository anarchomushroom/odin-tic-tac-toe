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
    let gameState = "active";

    const getGameState = () => gameState;

    const getActivePlayer = () => activePlayer;

    function changeActivePlayer() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else activePlayer = players[0];
    };

    function playRound(cell) {
        const currentBoard = board.getBoard();
        if (gameState === "complete") return;

        if (currentBoard[cell] === "") {
            board.changeCell(activePlayer.mark, cell);
            if (checkWinner(activePlayer.mark) === true) {
                console.log(`${activePlayer.name} wins!`);
                changeGameState();
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

    function changeGameState() {
        if (gameState === "active") {
            gameState = "complete";
        } else gameState = "active";
    };

    return {
        playRound,
        getBoard: board.getBoard,
        getGameState,
        changeGameState,
        getActivePlayer
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
    const infoDiv = document.querySelector(".game-info");

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

    function updateStatus() {
        if (game.getGameState() === "complete") {
            infoDiv.textContent = `${game.getActivePlayer().name} is the winner!`
        } else infoDiv.textContent = `${game.getActivePlayer().name}'s turn`
    };

    function clickHandlerBoard(e) {
        const selectedCell = e.target.dataset.cell;
        if (!selectedCell) return;

        game.playRound(selectedCell);
        updateStatus();
        updateBoard();
    };
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateBoard();
    updateStatus();
};

ScreenController();
