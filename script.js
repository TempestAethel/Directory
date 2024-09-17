const words = [
    { word: "javascript", hint: "A programming language commonly used for web development." },
    { word: "hangman", hint: "A classic word guessing game." },
    { word: "coding", hint: "The process of writing instructions for a computer." },
    { word: "programming", hint: "The act of creating software." },
    { word: "development", hint: "The process of developing software applications." }
];

let selectedWordObj = words[Math.floor(Math.random() * words.length)];
let selectedWord = selectedWordObj.word;
let hint = selectedWordObj.hint;
let wrongLetters = [];
let correctLetters = [];
let guessesLeft = 6;

// Canvas for Hangman
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function drawHangman() {
    const parts = [
        () => { ctx.beginPath(); ctx.moveTo(50, 150); ctx.lineTo(150, 150); ctx.stroke(); }, // Base
        () => { ctx.beginPath(); ctx.moveTo(100, 150); ctx.lineTo(100, 20); ctx.stroke(); }, // Pole
        () => { ctx.beginPath(); ctx.moveTo(100, 20); ctx.lineTo(150, 20); ctx.stroke(); }, // Top
        () => { ctx.beginPath(); ctx.moveTo(150, 20); ctx.lineTo(150, 40); ctx.stroke(); }, // Rope
        () => { ctx.beginPath(); ctx.arc(150, 50, 10, 0, Math.PI * 2); ctx.stroke(); }, // Head
        () => { ctx.beginPath(); ctx.moveTo(150, 60); ctx.lineTo(150, 120); ctx.stroke(); }, // Body
        () => { ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(130, 100); ctx.stroke(); }, // Left Arm
        () => { ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(170, 100); ctx.stroke(); }, // Right Arm
        () => { ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(130, 140); ctx.stroke(); }, // Left Leg
        () => { ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(170, 140); ctx.stroke(); }  // Right Leg
    ];

    if (wrongLetters.length > 0 && wrongLetters.length <= parts.length) {
        parts[wrongLetters.length - 1](); // Draw the next part
    }
}

const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const guessesLeftElement = document.getElementById("guesses-left");
const hintElement = document.getElementById("hint");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

function displayWord() {
    wordElement.innerHTML = selectedWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = wrongLetters.join(', ');
    guessesLeftElement.innerHTML = guessesLeft;
}

function checkGameOver() {
    if (guessesLeft <= 0) {
        alert("Game Over! The word was: " + selectedWord);
        restartButton.style.display = 'block';
    } else if (correctLetters.length === new Set(selectedWord).size) {
        alert("Congratulations! You've guessed the word: " + selectedWord);
        restartButton.style.display = 'block';
    }
}

guessButton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letter && !wrongLetters.includes(letter) && !correctLetters.includes(letter)) {
        if (selectedWord.includes(letter)) {
            correctLetters.push(letter);
        } else {
            wrongLetters.push(letter);
            guessesLeft--;
            hintElement.innerHTML = hint; // Show hint on wrong guess
            drawHangman(); // Draw the hangman part on wrong guess
        }
    }

    displayWord();
    updateWrongLetters();
    checkGameOver();
});

restartButton.addEventListener("click", () => {
    wrongLetters = [];
    correctLetters = [];
    guessesLeft = 6;
    selectedWordObj = words[Math.floor(Math.random() * words.length)];
    selectedWord = selectedWordObj.word;
    hint = selectedWordObj.hint;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    displayWord();
    updateWrongLetters();
    hintElement.innerHTML = ''; // Clear hint
    restartButton.style.display = 'none';
});

displayWord();
updateWrongLetters();
