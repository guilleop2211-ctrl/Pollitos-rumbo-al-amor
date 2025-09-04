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
    if(bow){ px(baseX+1,baseY+1,P);px(baseX+2,baseY+1,P);px(bas
