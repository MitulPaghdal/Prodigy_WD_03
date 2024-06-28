const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
let isXNext = true;
let gameState = Array(9).fill(null);
let gameActive = true;

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

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXNext ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    const cellIndex = Array.from(cells).indexOf(cell);
    gameState[cellIndex] = currentClass;
    cell.textContent = currentClass;
}

function swapTurns() {
    isXNext = !isXNext;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = "It's a draw!";
    } else {
        messageElement.textContent = `${isXNext ? "X" : "O"} wins!`;
    }
    gameActive = false;
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function restartGame() {
    gameState = Array(9).fill(null);
    isXNext = true;
    messageElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    gameActive = true;
}
