const board = Array(9).fill(null);
let currentPlayer = 'X';
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes(null)) return 'Draw'; // Check for draw
    return null;
}

function handleClick(index) {
    if (board[index] || checkWinner()) {
        return;
    }
    board[index] = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        document.getElementById('status').textContent = winner === 'Draw' ? 'Draw!' : `Player ${winner} wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    }
    render();
}

function render() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell ? cell : '';
        cellDiv.addEventListener('click', () => handleClick(index));
        boardDiv.appendChild(cellDiv);
    });
}

render();
