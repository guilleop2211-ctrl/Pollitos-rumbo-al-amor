/* =========================
   Pixelart del HERO (dos pollitos + corazón)
   ========================= */
(function drawHeroArt(){
  const c = document.getElementById('heroArt');
  const ctx = c.getContext('2d');

  const px = (x,y,color) => { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); };

  // Fondo estrellas suaves
  ctx.fillStyle = '#231b3f';
  ctx.fillRect(0,0,c.width,c.height);
  for (let i=0;i<80;i++){
    ctx.fillStyle = 'rgba(255,255,255,' + (0.4 + Math.random()*0.6) + ')';
    ctx.fillRect(Math.random()*96, Math.random()*26, 1, 1);
  }

  // Suelo
  for (let x=0;x<96;x++) px(x, 56, '#5b3f8f');
  for (let x=0;x<96;x+=2) px(x, 57, '#6a4aa3');

  // Corazón al centro (pixelart)
  const heart = [
    '..11..11..',
    '.1111.1111',
    '1111111111',
    '1111111111',
    '.11111111.',
    '..111111..',
    '...1111...',
    '....11....'
  ];
  const heartX = 43, heartY = 14;
  heart.forEach((row, j)=>{
    [...row].forEach((ch, i)=>{
      if (ch==='1') px(heartX+i, heartY+j, '#ff6ba1');
    });
  });

  // Pollito base (8x8) – función para dibujar a la izquierda o derecha
  function chick(baseX, baseY, flip=false, bow=false, hat=false){
    const Y = '#F7E06E', O='#FF922E', B='#000000', F='#8b5a2b', P='#ff6ba1', H='#4b3b8f';
    // Cuerpo (pixel blocks)
    const body = [
      '...XXXX...',
      '..XXXXXX..',
      '.XXXXXXX..',
      '.XXXXXXX..',
      '.XXXXXXX..',
      '..XXXXXX..',
      '..XX..XX..',
      '...X..X...'
    ];
    body.forEach((row, j)=>{
      [...row].forEach((ch, i)=>{
        if (ch==='X') px(baseX + (flip? (9-i) : i), baseY + j, Y);
      });
    });
    // Pico
    ['..OO','..OO'].forEach((row, j)=>{
      [...row].forEach((ch,i)=> ch==='O' && px(baseX + (flip? (6-i): (3+i)), baseY+3+j, O));
    });
    // Patitas
    px(baseX+3, baseY+7, F); px(baseX+6, baseY+7, F);
    // Ojo
    px(baseX+5, baseY+3, B);
    // Moñito (Day)
    if (bow){
      px(baseX+1, baseY+1, P); px(baseX+2, baseY+1, P);
      px(baseX+1, baseY+2, P); px(baseX+2, baseY+2, P);
      px(baseX+3, baseY+2, P);
    }
    // Sombrerito (Guille)
    if (hat){
      px(baseX+4, baseY, H); px(baseX+5, baseY, H); px(baseX+6, baseY, H);
      px(baseX+5, baseY-1, H);
    }
  }

  // Day (izquierda, moñito)
  chick(22, 34, false, true, false);
  // Guille (derecha, sombrerito, mirando hacia Day → flip)
  chick(62, 34, true, false, true);
})();

/* =========================
   Juego sencillo con 4 niveles
   ========================= */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas (se ajusta visualmente por CSS)
canvas.width = 400;
canvas.height = 400;

// Pollito jugador (Day)
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

// Cambiar fondo segun nivel
function changeLevel(level) {
  document.body.className = "";
  document.body.classList.add(`level-${level}`);
}

// Dibujar pollito (círculo pixelado sencillo)
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

// Bucle del juego
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawPlayer();
  updatePlayer();
  requestAnimationFrame(gameLoop);
}
gameLoop();

// Controles táctiles
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
    toast(`Nivel ${currentLevel} ✓`);
  } else {
    showMessage("💖 ¡Sí! Guille te entrega un ramo de tulipanes 🌷");
  }
}

// Mensajito arriba
function toast(text) {
  const m = document.createElement("div");
  m.className = "message";
  m.innerText = text;
  document.body.appendChild(m);
  setTimeout(()=> m.remove(), 1800);
}

// Mensaje final
function showMessage(text) {
  const m = document.createElement("div");
  m.className = "message";
  m.innerText = text;
  document.body.appendChild(m);
}
