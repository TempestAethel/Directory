const pip = document.getElementById('pip');
const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');

let isJumping = false;
let score = 0;
let gravity = 0.5;
let velocityY = 0;
let keys = {};

const platforms = Array.from(document.querySelectorAll('.platform'));

document.addEventListener('keydown', (event) => {
    keys[event.code] = true; // track pressed keys
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false; // untrack released keys
});

function gameLoop() {
    // Handle horizontal movement
    if (keys['ArrowRight']) {
        movePip(5);
    }
    if (keys['ArrowLeft']) {
        movePip(-5);
    }
    // Handle jumping
    if (keys['Space'] && !isJumping) {
        jump();
    }

    // Apply gravity
    if (isJumping) {
        velocityY += gravity;
        pip.style.bottom = (parseFloat(pip.style.bottom) || 0) + velocityY + 'px';
        if (detectCollisionWithPlatforms()) {
            isJumping = false;
            velocityY = 0;
        }

        // Check if Pip falls off the bottom
        if (parseFloat(pip.style.bottom) > gameArea.clientHeight) {
            resetGame();
        }
    }

    requestAnimationFrame(gameLoop);
}

function movePip(direction) {
    const pipRect = pip.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();

    if ((direction > 0 && pipRect.right < gameAreaRect.right) || 
        (direction < 0 && pipRect.left > gameAreaRect.left)) {
        pip.style.left = pip.offsetLeft + direction + 'px';
    }
}

function jump() {
    isJumping = true;
    velocityY = -10; // jump strength
}

function detectCollisionWithPlatforms() {
    const pipRect = pip.getBoundingClientRect();

    for (let platform of platforms) {
        const platformRect = platform.getBoundingClientRect();
        
        if (pipRect.bottom >= platformRect.top && pipRect.bottom <= platformRect.bottom &&
            pipRect.left < platformRect.right && pipRect.right > platformRect.left) {
            pip.style.bottom = (platformRect.top - gameArea.getBoundingClientRect().top) + 'px'; // snap Pip on the top of the platform
            score++;
            updateScore();
            return true; // Collision detected
        }
    }
    return false; // No collision
}

function resetGame() {
    pip.style.bottom = '0px';
    pip.style.left = '50px';
    isJumping = false;
    velocityY = 0;
    score = 0;
    updateScore();
}

function updateScore() {
    scoreBoard.innerText = `Score: ${score}`;
}

// Start the game loop
requestAnimationFrame(gameLoop);
