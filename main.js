/* =========================
   Pixelart del HERO (dos pollitos + corazón)
   ========================= */
(function drawHeroArt(){
  const c = document.getElementById('heroArt');
  const ctx = c.getContext('2d');
  const px = (x,y,color) => { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); };

  // Fondo estrellas
  ctx.fillStyle = '#231b3f';
  ctx.fillRect(0,0,c.width,c.height);
  for (let i=0;i<80;i++){
    ctx.fillStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.6)+')';
    ctx.fillRect(Math.random()*96, Math.random()*26, 1, 1);
  }

  // Suelo
  for (let x=0;x<96;x++) px(x, 56, '#5b3f8f');
  for (let x=0;x<96;x+=2) px(x, 57, '#6a4aa3');

  // Corazón
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
  const heartX=43, heartY=14;
  heart.forEach((row,j)=>{
    [...row].forEach((ch,i)=>{ if(ch==='1') px(heartX+i,heartY+j,'#ff6ba1'); });
  });

  // Pollito (función)
  function chick(baseX, baseY, flip=false, bow=false, hat=false){
    const Y='#F7E06E', O='#FF922E', B='#000', F='#8b5a2b', P='#ff6ba1', H='#4b3b8f';
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
    body.forEach((row,j)=>[...row].forEach((ch,i)=>{
      if(ch==='X') px(baseX+(flip?(9-i):i), baseY+j, Y);
    }));
    // Pico
    ['..OO','..OO'].forEach((row,j)=>{
      [...row].forEach((ch,i)=>ch==='O' && px(baseX+(flip?(6-i):(3+i)),baseY+3+j,O));
    });
    // Patitas
    px(baseX+3, baseY+7, F); px(baseX+6, baseY+7, F);
    // Ojo
    px(baseX+5, baseY+3, B);
    // Moñito
    if(bow){ px(baseX+1,baseY+1,P);px(baseX+2,baseY+1,P);px(baseX+1,baseY+2,P);px(baseX+2,baseY+2,P);px(baseX+3,baseY+2,P); }
    // Sombrero
    if(hat){ px(baseX+4,baseY,H);px(baseX+5,baseY,H);px(baseX+6,baseY,H);px(baseX+5,baseY-1,H); }
  }
  chick(22,34,false,true,false); // Day
  chick(62,34,true,false,true);  // Guille
})();

/* =========================
   Juego básico
   ========================= */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const player = { x:50, y:300, width:30, height:30, color:"yellow", velocityY:0, jumping:false };
let gravity=0.8, jumpPower=-12;
let currentLevel=1, totalLevels=4;

function changeLevel(level){ document.body.className=""; document.body.classList.add(`level-${level}`); }

function drawPlayer(){
  ctx.fillStyle=player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.width/2, 0, Math.PI*2);
  ctx.fill();
}
function drawGround(){ ctx.fillStyle="#228B22"; ctx.fillRect(0, canvas.height-40, canvas.width, 40); }
function updatePlayer(){
  player.y+=player.velocityY;
  if(player.y+player.height/2<canvas.height-40){ player.velocityY+=gravity; player.jumping=true; }
  else{ player.y=canvas.height-40-player.height/2; player.velocityY=0; player.jumping=false; }
}
function gameLoop(){ ctx.clearRect(0,0,canvas.width,canvas.height); drawGround(); drawPlayer(); updatePlayer(); requestAnimationFrame(gameLoop); }
gameLoop();

document.getElementById("left").addEventListener("click",()=>{ player.x-=20; if(player.x<0) player.x=0; });
document.getElementById("right").addEventListener("click",()=>{ player.x+=20; if(player.x>canvas.width-player.width) nextLevel(); });
document.getElementById("jump").addEventListener("click",()=>{ if(!player.jumping){ player.velocityY=jumpPower; player.jumping=true; }});

function nextLevel(){
  if(currentLevel<totalLevels){ currentLevel++; changeLevel(currentLevel); player.x=50; toast(`Nivel ${currentLevel} ✓`); }
  else{ toast("¡Llegaste al final del camino de amor 💕!"); }
}
function toast(text){ const m=document.createElement("div"); m.className="message"; m.innerText=text; document.body.appendChild(m); setTimeout(()=>m.remove(),1800); }
function showMessage(text){ const m=document.createElement("div"); m.className="message"; m.innerText=text; document.body.appendChild(m); }

/* =========================
   Botones de decisión
   ========================= */
document.getElementById("yesBtn").addEventListener("click",()=>{
  showMessage("💖 ¡Sí! Guille te entrega un ramo de tulipanes 🌷");
  const tulipColors=["#ff66cc","#ff99cc","#ff3366"];
  tulipColors.forEach((c,i)=>{ drawTulip(140+i*40, canvas.height-60, c); });
});
document.getElementById("noBtn").addEventListener("click",()=>{ showMessage("💔 Mañana volveré a intentarlo"); });

function drawTulip(x,y,color){
  ctx.fillStyle=color; ctx.fillRect(x,y,10,14); // flor
  ctx.fillStyle="#228B22"; ctx.fillRect(x+4,y+14,2,12); // tallo
  ctx.fillRect(x-4,y+18,6,2); ctx.fillRect(x+6,y+18,6,2); // hojas
}
