// Obtener el canvas y el contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// ================== IMÁGENES ==================
// Fondo
const bgImg = new Image();
bgImg.src = "assets/backgrounds/level1.png"; // cambia el nombre según tu imagen

// Pollito
const pollitoImg = new Image();
pollitoImg.src = "assets/sprites/pollito.png"; // tu sprite de pollito pixelart

// ================== JUGADOR ==================
const player = {
  x: 100,
  y: 380,
  width: 40,
  height: 40,
  dx: 0,
  dy: 0,
  speed: 4,
  jumping: false,
  gravity: 0.8,
  jumpPower: -12
};

// ================== CONTROLES ==================
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

document.getElementById("left").addEventListener("click", () => {
  keys["ArrowLeft"] = true;
  setTimeout(() => (keys["ArrowLeft"] = false), 200);
});
document.getElementById("right").addEventListener("click", () => {
  keys["ArrowRight"] = true;
  setTimeout(() => (keys["ArrowRight"] = false), 200);
});
document.getElementById("jump").addEventListener("click", () => {
  if (!player.jumping) {
    player.dy = player.jumpPower;
    player.jumping = true;
  }
});

// ================== FÍSICA ==================
function movePlayer() {
  if (keys["ArrowLeft"]) {
    player.dx = -player.speed;
  } else if (keys["ArrowRight"]) {
    player.dx = player.speed;
  } else {
    player.dx = 0;
  }

  if (keys["Space"] && !player.jumping) {
    player.dy = player.jumpPower;
    player.jumping = true;
  }

  // Movimiento horizontal
  player.x += player.dx;

  // Movimiento vertical
  player.y += player.dy;
  player.dy += player.gravity;

  // Suelo
  if (player.y + player.height > canvas.height - 50) {
    player.y = canvas.height - 50 - player.height;
    player.dy = 0;
    player.jumping = false;
  }
}

// ================== DIBUJO ==================
function drawBackground() {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.drawImage(pollitoImg, player.x, player.y, player.width, player.height);
}

// ================== LOOP ==================
function updateGame() {
  drawBackground();
  movePlayer();
  drawPlayer();
  requestAnimationFrame(updateGame);
}

// Iniciar juego cuando cargue el fondo
bgImg.onload = () => {
  updateGame();
};
