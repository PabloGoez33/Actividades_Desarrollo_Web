let player1CurrentHealth = 100;
let player2CurrentHealth = 100;

let player1 = prompt("Enter Player 1 name:");
let player2 = prompt("Enter Player 2 name:");

document.getElementById("players-name").innerText = player1 + " vs " + player2;
document.getElementById("player1-name").innerText = player1;
document.getElementById("player2-name").innerText = player2;

function randomDamage() {
    return Math.floor(Math.random() * 30) + 1;
}

function playerAttack1() {
    if (player1CurrentHealth > 50) {
        document.getElementById("player1-image").src = "player1_a.png";
        setTimeout(() => {
            document.getElementById("player1-image").src = "player1.png";
        }, 1000);
    }
    if (player1CurrentHealth <= 50) {
        document.getElementById("player1-image").src = "player1_50_a.png";
        setTimeout(() => {
            document.getElementById("player1-image").src = "player1_50.png";
        }, 1000);
    }
    const damage = randomDamage();
    player2CurrentHealth = Math.max(0, player2CurrentHealth - damage);
    const player2Health = document.getElementById("player2-health");
    player2Health.innerText = `Health: ${player2CurrentHealth}`;
    if (player2CurrentHealth <= 50) {
        document.getElementById("player2-image").src = "player2_50.png";
    }
    if (player2CurrentHealth <= 0) {
        document.getElementById("player2-image").src = "player2_l.png";
        setTimeout(() => {
            alert(`${player1} wins!`);
            location.reload();
        }, 2000);
    }
    let history = document.getElementById("history");
    history.innerText = `${player1} attacks ${player2} for ${damage} damage.`;
    document.getElementById("player2-attack").disabled = false;
    document.getElementById("player1-attack").disabled = true;
}

function playerAttack2() {
    if (player2CurrentHealth > 50) {
        document.getElementById("player2-image").src = "player2_a.png";
        setTimeout(() => {
            document.getElementById("player2-image").src = "player2.png";
        }, 1000);
    }
    if (player2CurrentHealth <= 50) {
        document.getElementById("player2-image").src = "player2_50_a.png";
        setTimeout(() => {
            document.getElementById("player2-image").src = "player2_50.png";
        }, 1000);
    }
    const damage = randomDamage();
    player1CurrentHealth = Math.max(0, player1CurrentHealth - damage);
    const player1Health = document.getElementById("player1-health");
    player1Health.innerText = `Health: ${player1CurrentHealth}`;
    if (player1CurrentHealth <= 50) {
        document.getElementById("player1-image").src = "player1_50.png";
    }
    if (player1CurrentHealth <= 0) {
        document.getElementById("player1-image").src = "player1_l.png";
        setTimeout(() => {
            alert(`${player2} wins!`);
            location.reload();
        }, 2000);
    }
    let history = document.getElementById("history");
    history.innerText = `${player2} attacks ${player1} for ${damage} damage.`;
    document.getElementById("player1-attack").disabled = false;
    document.getElementById("player2-attack").disabled = true;
}
