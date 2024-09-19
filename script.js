let currentMode = '2-player'; // default mode
let turn = 'Player 1';

// Initialize the checkerboard
function initializeBoard() {
    const checkerboard = document.getElementById("checkerboard");
    checkerboard.innerHTML = ''; // Clear board

    for (let row = 0; row < 8; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 8; col++) {
            const td = document.createElement("td");
            // Add appropriate classes for black and white cells
            td.className = (row + col) % 2 === 0 ? 'white-cell' : 'black-cell';

            // Add pieces in the first three and last three rows
            if ((row < 3 || row > 4) && td.className === 'black-cell') {
                const piece = document.createElement("div");
                piece.className = row < 3 ? 'black-piece' : 'red-piece';
                td.appendChild(piece);
            }
            tr.appendChild(td);
        }
        checkerboard.appendChild(tr);
    }
}

// Start the game based on the mode selected
function startGame(mode) {
    currentMode = mode;
    initializeBoard();
    document.getElementById("turn").textContent = "Turn: Player 1";
    if (currentMode !== '2-player') {
        document.getElementById("turn").textContent = "Turn: You (Player 1)";
    }
    // You can add logic to change game behavior based on difficulty mode here
    console.log(`Starting game in ${mode} mode.`);
}

// Handle the game logic per turn
function handleTurn(row, col) {
    // Game logic for handling turns goes here

    // Switch turns between Player 1 and Player 2
    turn = (turn === 'Player 1') ? 'Player 2' : 'Player 1';
    document.getElementById("turn").textContent = `Turn: ${turn}`;
}

// Initial board setup
initializeBoard();
