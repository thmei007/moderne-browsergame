import { TILE, T, PAL } from './mapData.js';

// ── Tile drawing ─────────────────────────────────────────────────
export function drawTile(ctx, c, r, type, tick) {
  const x=c*TILE, y=r*TILE;
  switch(type) {
    case T.LAND:
      ctx.fillStyle = ((c+r)%2===0) ? PAL.land : PAL.land2;
      ctx.fillRect(x,y,TILE,TILE);
      break;
    case T.PATH:
      ctx.fillStyle = PAL.path;
      ctx.fillRect(x,y,TILE,TILE);
      // cobblestone joints
      ctx.fillStyle = PAL.path2;
      ctx.fillRect(x,y,TILE,1); ctx.fillRect(x,y,1,TILE);
      // occasional stone variation
      if ((c*3+r*7)%5===0){ ctx.fillStyle='#2e2820'; ctx.fillRect(x+2,y+2,6,6); }
      break;
    case T.TREE: {
      ctx.fillStyle = PAL.tree;
      ctx.fillRect(x,y,TILE,TILE);
      // canopy
      ctx.fillStyle = PAL.tree2;
      ctx.fillRect(x+1,y+2,14,9);
      ctx.fillStyle = '#1c2a12';
      ctx.fillRect(x+3,y+3,10,7);
      // highlight
      ctx.fillStyle = '#243016';
      ctx.fillRect(x+3,y+3,4,2);
      // trunk
      ctx.fillStyle = '#2a1e10';
      ctx.fillRect(x+6,y+11,4,5);
      break;
    }
    case T.MOUN: {
      ctx.fillStyle = PAL.moun;
      ctx.fillRect(x,y,TILE,TILE);
      // peak
      ctx.fillStyle = PAL.moun2;
      ctx.fillRect(x+3,y+2,10,10);
      ctx.fillStyle = '#382c44';
      ctx.fillRect(x+5,y+2,6,6);
      // snow cap
      ctx.fillStyle = '#b0a8bc';
      ctx.fillRect(x+7,y+2,2,2);
      ctx.fillRect(x+6,y+3,4,1);
      // shadow
      ctx.fillStyle = '#1e1828';
      ctx.fillRect(x+3,y+12,10,4);
      break;
    }
    case T.WATR: {
      ctx.fillStyle = PAL.watr;
      ctx.fillRect(x,y,TILE,TILE);
      // animated waves
      const wv = Math.floor(tick/40)%3;
      ctx.fillStyle = PAL.watr2;
      ctx.fillRect(x+((c*3+wv*4)%10),y+4,5,1);
      ctx.fillRect(x+((c*5+wv*3+6)%10),y+10,4,1);
      break;
    }
    case T.CITY:
      ctx.fillStyle = PAL.city;
      ctx.fillRect(x,y,TILE,TILE);
      ctx.fillStyle = '#222018';
      ctx.fillRect(x,y,TILE,1); ctx.fillRect(x,y,1,TILE);
      // cobble variation
      if ((c+r)%3===0){ ctx.fillStyle='#262018'; ctx.fillRect(x+3,y+3,4,4); }
      break;
    default:
      ctx.fillStyle = PAL.sky;
      ctx.fillRect(x,y,TILE,TILE);
  }
}

// ── Building (drawn centred on city tile) ────────────────────────
export function drawBuilding(ctx, col, row, color, done) {
  const bx = col*TILE - 8, by = row*TILE - 28;
  const alpha = done ? 0.28 : 1;
  ctx.globalAlpha = alpha;

  // Foundation shadow
  ctx.fillStyle = '#060408';
  ctx.fillRect(bx+2,by+36,30,4);

  // Main building body
  ctx.fillStyle = '#1e1a28';
  ctx.fillRect(bx,by+10,32,30);

  // Facade brickwork
  ctx.fillStyle = '#28222e';
  for (let fy=0;fy<3;fy++) for (let fx=0;fx<3;fx++)
    ctx.fillRect(bx+1+fx*10,by+12+fy*8,9,7);

  // Windows (3 × 2 grid)
  const winOn = !done && Math.floor(Date.now()/900+col+row)%4!==0;
  ctx.fillStyle = winOn ? color+'bb' : '#1a1820';
  [[4,12],[14,12],[22,12],[4,22],[22,22]].forEach(([wx,wy])=>{
    ctx.fillRect(bx+wx,by+wy,6,5);
    if (winOn){
      ctx.fillStyle='#ffffff18';
      ctx.fillRect(bx+wx,by+wy,3,2);
      ctx.fillStyle = winOn ? color+'bb' : '#1a1820';
    }
  });

  // Door
  ctx.fillStyle = '#100e18';
  ctx.fillRect(bx+13,by+31,6,9);
  ctx.fillStyle = '#2a2030';
  ctx.fillRect(bx+14,by+32,2,3);

  // Cornice / roof edge
  ctx.fillStyle = '#2a2438';
  ctx.fillRect(bx-1,by+8,34,4);
  ctx.fillStyle = color+'66';
  ctx.fillRect(bx,by+8,32,1);

  // Peaked roof
  ctx.fillStyle = '#1a1424';
  ctx.fillRect(bx+2,by+2,28,8);
  ctx.fillStyle = '#221830';
  ctx.fillRect(bx+4,by+2,24,6);
  // roof ridge
  ctx.fillStyle = color+'44';
  ctx.fillRect(bx+4,by+2,24,1);

  // City glow on ground
  if (!done){
    ctx.fillStyle = color+'18';
    ctx.fillRect(bx-4,by+32,40,8);
  }

  ctx.globalAlpha = 1;
}

// ── Special location building (Redaktion etc.) ───────────────────
export function drawSpecial(ctx, col, row, color, isNear) {
  const bx = col*TILE - 7, by = row*TILE - 22;

  // Shadow
  ctx.fillStyle = '#060408';
  ctx.fillRect(bx+2,by+30,26,3);

  // Body
  ctx.fillStyle = '#1c1a0c';
  ctx.fillRect(bx,by+10,26,22);

  // Brickwork
  ctx.fillStyle = '#242210';
  for (let fy=0;fy<2;fy++) for (let fx=0;fx<2;fx++)
    ctx.fillRect(bx+1+fx*12,by+12+fy*8,11,7);

  // Windows (gold when near)
  ctx.fillStyle = isNear ? color+'cc' : '#221e0a';
  [[3,11],[16,11],[3,20],[16,20]].forEach(([wx,wy]) => {
    ctx.fillRect(bx+wx,by+wy,5,5);
    if (isNear) {
      ctx.fillStyle = '#ffffff18';
      ctx.fillRect(bx+wx,by+wy,3,2);
      ctx.fillStyle = color+'cc';
    }
  });

  // Door
  ctx.fillStyle = '#0e0c06';
  ctx.fillRect(bx+10,by+26,6,6);

  // Cornice
  ctx.fillStyle = '#2a2614';
  ctx.fillRect(bx-1,by+8,28,3);
  ctx.fillStyle = color+'66';
  ctx.fillRect(bx,by+8,26,1);

  // Flat roof with parapet notches
  ctx.fillStyle = '#1e1c0c';
  ctx.fillRect(bx+1,by+2,24,7);
  ctx.fillStyle = color+'55';
  [1,7,13,19].forEach(nx => ctx.fillRect(bx+nx,by+2,4,3));

  // Flagpole + flag
  ctx.fillStyle = '#2a2414';
  ctx.fillRect(bx+12,by-4,1,6);
  ctx.fillStyle = color;
  ctx.fillRect(bx+13,by-4,5,3);

  // Ground glow when near
  if (isNear) {
    ctx.fillStyle = color+'22';
    ctx.fillRect(bx-4,by+28,34,6);
  }
}

// ── City name label ──────────────────────────────────────────────
export function drawLabel(ctx, col, row, name, color, done, isNear) {
  const cx=col*TILE+TILE/2, cy=row*TILE-32;
  ctx.globalAlpha = done ? 0.3 : 1;
  ctx.font = isNear ? 'bold 8px "Courier New"' : '7px "Courier New"';
  ctx.textAlign = 'center';
  const tw = ctx.measureText(name).width;
  // badge bg
  ctx.fillStyle = '#0e0e1acc';
  ctx.fillRect(cx-tw/2-3,cy-7,tw+6,9);
  // text
  ctx.fillStyle = isNear ? color : '#6a5a3a';
  ctx.fillText(name, cx, cy);
  ctx.globalAlpha = 1;
}

// ── Interact prompt ──────────────────────────────────────────────
export function drawPrompt(ctx, col, row, name) {
  const cx=col*TILE+TILE/2, cy=row*TILE-46;
  const text=`[E] ${name} betreten`;
  ctx.font = 'bold 7px "Courier New"';
  ctx.textAlign = 'center';
  const tw = ctx.measureText(text).width;
  // glowing yellow badge
  ctx.fillStyle = '#e8c020';
  ctx.fillRect(cx-tw/2-5,cy-7,tw+10,10);
  ctx.fillStyle = '#0e0e14';
  ctx.fillText(text, cx, cy);
}

// ── Player sprite ────────────────────────────────────────────────
export function drawPlayer(ctx, px, py, dir, frame, moving) {
  const x=Math.floor(px), y=Math.floor(py);
  const legSwing = moving ? (frame%2===0 ? 2 : -2) : 0;

  // Shadow
  ctx.fillStyle = '#00000050';
  ctx.fillRect(x+2,y+14,12,3);

  // Legs
  ctx.fillStyle = '#181210';
  ctx.fillRect(x+3,y+11,4,5+legSwing);
  ctx.fillRect(x+9,y+11,4,5-legSwing);
  // Boots
  ctx.fillStyle = '#0e0a08';
  ctx.fillRect(x+2,y+14+legSwing,5,3);
  ctx.fillRect(x+9,y+14-legSwing,5,3);

  // Coat body
  ctx.fillStyle = '#1a160e';
  ctx.fillRect(x+3,y+6,10,6);
  // Coat lapels / waistcoat
  ctx.fillStyle = '#c09840';
  ctx.fillRect(x+7,y+7,2,4);
  ctx.fillStyle = '#e0b858';
  ctx.fillRect(x+7,y+7,1,1);

  // Arms
  ctx.fillStyle = '#1a160e';
  if (dir==='left') {
    ctx.fillRect(x+1,y+7,3,5-legSwing);
    ctx.fillRect(x+12,y+7,3,5+legSwing);
  } else if (dir==='right') {
    ctx.fillRect(x+12,y+7,3,5-legSwing);
    ctx.fillRect(x+1,y+7,3,5+legSwing);
  } else {
    ctx.fillRect(x+1,y+7,3,4);
    ctx.fillRect(x+12,y+7,3,4);
  }

  // Head / skin
  ctx.fillStyle = '#e0c070';
  ctx.fillRect(x+4,y+1,8,6);
  // Ear
  ctx.fillStyle = '#d0b060';
  if (dir==='left')  ctx.fillRect(x+3,y+2,1,3);
  if (dir==='right') ctx.fillRect(x+12,y+2,1,3);

  // Eyes (only when facing down/left/right)
  if (dir!=='up'){
    ctx.fillStyle = '#1a0e04';
    const eOff = dir==='left' ? -1 : dir==='right' ? 1 : 0;
    ctx.fillRect(x+5+eOff,y+3,2,1);
    ctx.fillRect(x+9+eOff,y+3,2,1);
  }

  // Hat brim
  ctx.fillStyle = '#0c0a06';
  ctx.fillRect(x+2,y+0,12,2);
  // Hat crown
  ctx.fillRect(x+4,y-5,8,6);
  // Hat band (gold)
  ctx.fillStyle = '#c09840';
  ctx.fillRect(x+4,y-0,8,1);
}
