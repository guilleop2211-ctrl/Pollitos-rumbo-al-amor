// 🎮 Configuración inicial
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = 400;
canvas.height = 400;

// Pollito
const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: "yellow",
  velocityY: 0,
  jumping: false
};

let gravity = 0.8;
let jumpPower = -12;

// Nivel
let currentLevel = 1;
const totalLevels = 4;

// Dibujar pollito
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Dibujar suelo
function drawGround() {
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
}

// Actualizar jugador
function updatePlayer() {
  player.y += player.velocityY;
  if (player.y + player.height / 2 < canvas.height - 40) {
    player.velocityY += gravity;
    player.jumping = true;
  } else {
    player.y = canvas.height - 40 - player.height / 2;
    player.velocityY = 0;
    player.jumping = false;
  }
}

// Control de niveles
function changeLevel(level) {
  document.body.className = ""; 
  document.body.classList.add(`level-${level}`);
}

// Bucle del juego
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();
  drawPlayer();
  updatePlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();

// 🚀 Controles
document.getElementById("left").addEventListener("click", () => {
  player.x -= 20;
  if (player.x < 0) player.x = 0;
});

document.getElementById("right").addEventListener("click", () => {
  player.x += 20;
  if (player.x > canvas.width - player.width) {
    nextLevel();
  }
});

document.getElementById("jump").addEventListener("click", () => {
  if (!player.jumping) {
    player.velocityY = jumpPower;
    player.jumping = true;
  }
});

// Pasar de nivel
function nextLevel() {
  if (currentLevel < totalLevels) {
    currentLevel++;
    changeLevel(currentLevel);
    player.x = 50;
  } else {
    showMessage("🎉 ¡Ganaste! El pollito encontró el amor 💖🐥");
  }
}

// Mostrar mensaje final
function showMessage(text) {
  const message = document.createElement("div");
  message.className = "message";
  message.innerText = text;
  document.body.appendChild(message);
}
