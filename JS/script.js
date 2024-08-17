const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusMessage.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        statusMessage.textContent = `It's a Draw!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
    });
    statusMessage.textContent = "";
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
