// Default enemy weapon stats
let enemyWeapon = {
    type: "missile",
    power: 80,
    range: 40,
    cooldown: 3
};

// Function to build the weapon based on user input code
function buildWeapon() {
    const code = document.getElementById("weapon-code").value;
    
    try {
        // Parse the player's weapon code
        const playerWeapon = eval(`(${code})`);
        
        // Display the player's weapon stats
        document.getElementById("player-stats").innerText = `Type: ${playerWeapon.type}, Power: ${playerWeapon.power}, Range: ${playerWeapon.range}, Cooldown: ${playerWeapon.cooldown}`;
        
        // Display the enemy's weapon stats
        document.getElementById("enemy-stats").innerText = `Type: ${enemyWeapon.type}, Power: ${enemyWeapon.power}, Range: ${enemyWeapon.range}, Cooldown: ${enemyWeapon.cooldown}`;
        
        return playerWeapon;
    } catch (error) {
        alert("Error in weapon code! Please ensure your code is correct.");
        return null;
    }
}

// Function to start the battle
function startBattle() {
    const playerWeapon = buildWeapon();
    if (!playerWeapon) return;

    // Simple battle logic (comparing weapon stats)
    let playerScore = playerWeapon.power * playerWeapon.range / playerWeapon.cooldown;
    let enemyScore = enemyWeapon.power * enemyWeapon.range / enemyWeapon.cooldown;

    // Determine the winner
    let result;
    if (playerScore > enemyScore) {
        result = "You win!";
    } else if (playerScore < enemyScore) {
        result = "Enemy wins!";
    } else {
        result = "It's a draw!";
    }

    // Display the result
    document.getElementById("battle-result").innerText = result;
}
