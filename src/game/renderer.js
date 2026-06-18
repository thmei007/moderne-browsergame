import { TILE, T, PAL } from './mapData.js';

// Building heights (logical px above row*TILE) — used for label placement
const BH = { wien: 92, berlin: 90, prag: 102, weimar: 70 };

// ── Tile drawing ─────────────────────────────────────────────────
export function drawTile(ctx, c, r, type, tick) {
  const x = c * TILE, y = r * TILE;
  switch (type) {
    case T.LAND: {
      const shade = (c * 7 + r * 13) % 4;
      ctx.fillStyle = ['#1e2416','#1c2214','#202618','#1a2012'][shade];
      ctx.fillRect(x, y, TILE, TILE);
      // Grass blades
      ctx.fillStyle = '#2a3418';
      ctx.fillRect(x + (c*17+r*31)%14, y + (c*11+r*19)%10, 1, 2);
      ctx.fillRect(x + (c*29+r*7)%13,  y + (c*13+r*23)%10, 1, 2);
      ctx.fillRect(x + (c*5+r*11)%11,  y + (c*19+r*3)%11,  1, 3);
      // Tiny flowers
      if ((c*23+r*17)%11 === 0) {
        ctx.fillStyle = '#4a3820';
        ctx.fillRect(x + (c*13+r*11)%12, y + (c*7+r*13)%12, 2, 1);
      }
      // Pebble
      if ((c*31+r*19)%17 < 2) {
        ctx.fillStyle = '#2a2820';
        ctx.fillRect(x + (c*13+r*9)%11+2, y + (c*7+r*11)%11+2, 2, 2);
        ctx.fillStyle = '#302c22';
        ctx.fillRect(x + (c*13+r*9)%11+2, y + (c*7+r*11)%11+2, 1, 1);
      }
      break;
    }
    case T.PATH: {
      ctx.fillStyle = '#1e1a14';
      ctx.fillRect(x, y, TILE, TILE);
      // Mortar cross
      ctx.fillStyle = '#181410';
      ctx.fillRect(x + 7, y, 2, TILE);
      ctx.fillRect(x, y + 7, TILE, 2);
      // 4 cobblestones
      const sc = ['#3c3020','#382c1c','#342a1a','#3a2e1e'];
      [[0,0,6,6],[9,0,6,6],[0,9,6,6],[9,9,6,6]].forEach(([sx,sy,sw,sh],i) => {
        ctx.fillStyle = sc[(c+r+i)%4];
        ctx.fillRect(x+sx+1, y+sy+1, sw, sh);
        ctx.fillStyle = '#4a4030';
        ctx.fillRect(x+sx+1, y+sy+1, sw, 1);
        ctx.fillRect(x+sx+1, y+sy+1, 1, sh);
        ctx.fillStyle = '#201c14';
        ctx.fillRect(x+sx+sw, y+sy+sh, 1, 1);
      });
      break;
    }
    case T.TREE: {
      ctx.fillStyle = '#0c1608';
      ctx.fillRect(x, y, TILE, TILE);
      if ((c*7+r*11)%3 === 0) {
        // Pine
        ctx.fillStyle = '#2a1c10'; ctx.fillRect(x+7, y+11, 2, 5);
        ctx.fillStyle = '#0e1e08'; ctx.fillRect(x+6, y+5, 4, 3);
        ctx.fillStyle = '#122408'; ctx.fillRect(x+4, y+7, 8, 3);
        ctx.fillStyle = '#162808'; ctx.fillRect(x+2, y+9, 12, 3);
        ctx.fillStyle = '#1a2e08'; ctx.fillRect(x+5, y+3, 6, 3);
        ctx.fillStyle = '#203810'; ctx.fillRect(x+6, y+3, 1,2); ctx.fillRect(x+4, y+7, 1,2); ctx.fillRect(x+2, y+9, 1,2);
        ctx.fillStyle = '#0a1406'; ctx.fillRect(x+9, y+9, 4, 3);
      } else {
        // Deciduous
        ctx.fillStyle = '#2a1c10'; ctx.fillRect(x+7, y+11, 2, 5);
        ctx.fillStyle = '#102214'; ctx.fillRect(x+3, y+9, 10, 4);
        ctx.fillStyle = '#142a18'; ctx.fillRect(x+2, y+6, 12, 5);
        ctx.fillStyle = '#183010'; ctx.fillRect(x+4, y+4, 8, 4);
        ctx.fillStyle = '#1c3814'; ctx.fillRect(x+5, y+2, 6, 3);
        ctx.fillStyle = '#283e18'; ctx.fillRect(x+5, y+2, 2,2); ctx.fillRect(x+3, y+5, 2,1);
        ctx.fillStyle = '#0c1c0c'; ctx.fillRect(x+10, y+9, 4, 3);
      }
      break;
    }
    case T.MOUN: {
      ctx.fillStyle = '#1c1c20';
      ctx.fillRect(x, y, TILE, TILE);
      [[7,2,2],[6,3,4],[5,4,6],[4,5,8],[3,6,10],[2,7,12],[2,8,12],[1,9,14],[1,10,14],[1,11,14]].forEach(([px,py,pw],i) => {
        ctx.fillStyle = i<3?'#484450':i<6?'#38343e':'#2a2830';
        ctx.fillRect(x+px, y+py, pw, 1);
      });
      // Snow cap (neutral white, not lavender)
      ctx.fillStyle = '#dcdae2'; ctx.fillRect(x+7, y+2, 2, 1);
      ctx.fillStyle = '#c8c6ce'; ctx.fillRect(x+6, y+3, 1,1); ctx.fillRect(x+9, y+3, 1,1);
      // Rock shadow crevices
      ctx.fillStyle = '#141318'; ctx.fillRect(x+3, y+10, 3,1); ctx.fillRect(x+10, y+11, 3,1);
      // Rock highlight edge
      ctx.fillStyle = '#504c58'; ctx.fillRect(x+3, y+6, 1, 3);
      break;
    }
    case T.WATR: {
      ctx.fillStyle = '#0a1018';
      ctx.fillRect(x, y, TILE, TILE);
      ctx.fillStyle = '#0c1420';
      ctx.fillRect(x+1, y+1, TILE-2, TILE-2);
      const wv = Math.floor(tick/30)%4;
      ctx.fillStyle = '#182838'; ctx.fillRect(x+((c*3+wv*4)%10),    y+3,  5,1);
      ctx.fillStyle = '#1a2e40'; ctx.fillRect(x+((c*5+wv*3+6)%10),  y+8,  4,1);
      ctx.fillStyle = '#142030'; ctx.fillRect(x+((c*7+wv*2+2)%10),  y+12, 3,1);
      ctx.fillStyle = '#203848'; ctx.fillRect(x+((c*11+wv*5+4)%10), y+5,  2,1);
      break;
    }
    case T.CITY: {
      ctx.fillStyle = '#24201a';
      ctx.fillRect(x, y, TILE, TILE);
      [[1,1],[9,1],[1,9],[9,9]].forEach(([px,py]) => {
        ctx.fillStyle = '#2e2a1e'; ctx.fillRect(x+px, y+py, 6, 6);
        ctx.fillStyle = '#3c3422'; ctx.fillRect(x+px, y+py, 6, 1);
        ctx.fillRect(x+px, y+py, 1, 6);
        ctx.fillStyle = '#1c1810'; ctx.fillRect(x+px+5, y+py+5, 1,1);
      });
      break;
    }
    default:
      ctx.fillStyle = PAL.sky;
      ctx.fillRect(x, y, TILE, TILE);
  }
}

// ── Buildings ────────────────────────────────────────────────────
export function drawBuilding(ctx, col, row, id, color, done) {
  ctx.globalAlpha = done ? 0.26 : 1;
  const cx = col * TILE + 8;
  const by = row * TILE;
  if (id === 'wien')   _wien(ctx, cx, by, color, done);
  else if (id === 'berlin') _berlin(ctx, cx, by, color, done);
  else if (id === 'prag')   _prag(ctx, cx, by, color, done);
  else if (id === 'weimar') _weimar(ctx, cx, by, color, done);
  else                 _generic(ctx, cx, by, color, done);
  ctx.globalAlpha = 1;
}

// ── Wien: Habsburg Baroque Ringstrasse palace ─────────────────
function _wien(ctx, cx, by, color, done) {
  const W = 80, lit = !done && Math.floor(Date.now()/900+7)%4!==0;

  // Ground glow
  if (!done) { ctx.fillStyle = color+'1a'; ctx.fillRect(cx-44, by, 88, 8); }

  // Drop shadow
  ctx.fillStyle = '#04030a'; ctx.fillRect(cx-38, by+2, 76, 6);

  // ── Steps ──
  ctx.fillStyle = '#b0a47e'; ctx.fillRect(cx-W/2-2, by-4, W+4, 4);
  ctx.fillStyle = '#a8987a'; ctx.fillRect(cx-W/2,   by-8, W,   4);
  ctx.fillStyle = '#c0b48a'; ctx.fillRect(cx-W/2+2, by-10,W-4, 2);

  // ── Ground floor (by-10 to by-26) ──
  ctx.fillStyle = '#c4b892'; ctx.fillRect(cx-W/2, by-26, W, 16);
  // Rustication lines
  ctx.fillStyle = '#b0a47e';
  [by-14, by-18, by-22].forEach(ly => ctx.fillRect(cx-W/2, ly, W, 1));
  // Pilasters (6 vertical strips)
  ctx.fillStyle = '#d0c49a';
  [-36,-22,-8,6,20,34].forEach(px => ctx.fillRect(cx+px, by-26, 3, 16));
  // Grand entrance arch
  ctx.fillStyle = '#160e08'; ctx.fillRect(cx-7, by-24, 14, 18);
  ctx.fillStyle = '#1e1408'; ctx.fillRect(cx-5, by-28,  10, 5);
  // Side arched windows (2 per wing)
  ctx.fillStyle = lit ? color+'88' : '#1c1410';
  [[-32,-24],[-18,-24],[16,-24],[28,-24]].forEach(([wx,wy]) => {
    ctx.fillRect(cx+wx, by+wy, 9, 12);
    ctx.fillStyle = '#c4b892'; ctx.fillRect(cx+wx, by+wy-3, 9, 3); // arch crown
    ctx.fillStyle = lit ? color+'88' : '#1c1410';
  });

  // ── Piano nobile (by-26 to by-44, tallest floor) ──
  ctx.fillStyle = '#ccc09a'; ctx.fillRect(cx-W/2, by-44, W, 18);
  // Balustrade strip
  ctx.fillStyle = '#b8ac84'; ctx.fillRect(cx-W/2, by-28, W, 2);
  // 5 grand windows with triangular pediments
  ctx.fillStyle = lit ? color+'aa' : '#1c1410';
  [[-32,-42],[-18,-42],[-4,-42],[10,-42],[24,-42]].forEach(([wx,wy]) => {
    ctx.fillRect(cx+wx, by+wy, 10, 13);
    // Pediment above
    ctx.fillStyle = '#d0c49c';
    ctx.fillRect(cx+wx-1, by+wy-4, 12, 3);
    ctx.fillRect(cx+wx+1, by+wy-6, 8,  2);
    ctx.fillRect(cx+wx+3, by+wy-8, 4,  2);
    ctx.fillStyle = lit ? color+'aa' : '#1c1410';
  });
  if (lit) {
    ctx.fillStyle = '#ffffff18';
    [[-32,-42],[-18,-42],[-4,-42],[10,-42],[24,-42]].forEach(([wx,wy]) =>
      ctx.fillRect(cx+wx, by+wy, 4, 3));
  }

  // ── Second floor (by-44 to by-58) ──
  ctx.fillStyle = '#c8bc96'; ctx.fillRect(cx-W/2, by-58, W, 14);
  ctx.fillStyle = '#b4a880'; ctx.fillRect(cx-W/2, by-46, W, 2);
  ctx.fillStyle = lit ? color+'88' : '#1a1210';
  [[-32,-56],[-20,-56],[-8,-56],[6,-56],[18,-56],[30,-56]].forEach(([wx,wy]) => {
    ctx.fillRect(cx+wx, by+wy, 8, 9);
    ctx.fillStyle = '#d0c49c';
    ctx.fillRect(cx+wx-1, by+wy-2, 10, 2);
    ctx.fillStyle = lit ? color+'88' : '#1a1210';
  });

  // ── Attic / third floor (by-58 to by-68) ──
  ctx.fillStyle = '#c0b490'; ctx.fillRect(cx-W/2, by-68, W, 10);
  ctx.fillStyle = '#b0a47e'; ctx.fillRect(cx-W/2, by-60, W, 2);
  ctx.fillStyle = lit ? color+'66' : '#181210';
  [[-28,-66],[-14,-66],[0,-66],[14,-66],[28,-66]].forEach(([wx,wy]) =>
    ctx.fillRect(cx+wx, by+wy, 6, 6));

  // ── Cornice entablature (by-68 to by-76) ──
  ctx.fillStyle = '#a89872'; ctx.fillRect(cx-W/2-2, by-76, W+4, 8);
  ctx.fillStyle = '#c0b48a'; ctx.fillRect(cx-W/2-2, by-76, W+4, 2);
  // Dentil pattern
  ctx.fillStyle = '#988a64';
  for (let i=0; i<13; i++) ctx.fillRect(cx-36+i*6, by-74, 3, 4);

  // ── Pediment (by-76 to by-84) ──
  ctx.fillStyle = '#b8ac84';
  ctx.fillRect(cx-W/2, by-80, W, 4);
  ctx.fillRect(cx-36,  by-84, 72, 4);
  ctx.fillRect(cx-26,  by-88, 52, 4);
  ctx.fillRect(cx-16,  by-92, 32, 4);
  // Pediment highlights
  ctx.fillStyle = '#c8bc90';
  ctx.fillRect(cx-W/2, by-80, W, 1);

  // ── Copper roof behind pediment (by-76 to by-88) ──
  ctx.fillStyle = '#4a6858'; ctx.fillRect(cx-32, by-76, 64, 12);
  ctx.fillStyle = '#5a7868'; ctx.fillRect(cx-30, by-76, 60, 4);
  ctx.fillStyle = '#3a5848'; ctx.fillRect(cx-28, by-88, 56, 14);
  // Central dome hint
  ctx.fillStyle = '#4a7060';
  [12,10,8,6,4,2].forEach((w,i) => ctx.fillRect(cx-w/2, by-76-i*2, w, 2));
}

// ── Berlin: Gründerzeit / Wilhelminian ───────────────────────
function _berlin(ctx, cx, by, color, done) {
  const lit = !done && Math.floor(Date.now()/800+3)%3!==0;

  if (!done) { ctx.fillStyle = color+'18'; ctx.fillRect(cx-34, by, 68, 8); }
  ctx.fillStyle = '#050306'; ctx.fillRect(cx-28, by+2, 56, 5);

  // ── Chimney (right side) ──
  ctx.fillStyle = '#2e1a10'; ctx.fillRect(cx+22, by-88, 7, 22);
  ctx.fillStyle = '#241408'; ctx.fillRect(cx+21, by-90, 9,  3); // cap
  ctx.fillStyle = '#18100c'; ctx.fillRect(cx+21, by-88, 9,  2); // cap shadow
  // Smoke
  ctx.fillStyle = '#14101a';
  ctx.fillRect(cx+24, by-92, 2,1); ctx.fillRect(cx+23, by-94, 2,1);
  ctx.fillRect(cx+25, by-96, 2,1); ctx.fillRect(cx+22, by-97, 2,1);

  // ── Building plinth ──
  ctx.fillStyle = '#261808'; ctx.fillRect(cx-30, by-4,  60, 4);
  ctx.fillStyle = '#2e1e0e'; ctx.fillRect(cx-29, by-6,  58, 2);

  // ── Main facade (60px wide, 68px tall) ──
  // Base brick color
  ctx.fillStyle = '#342010'; ctx.fillRect(cx-30, by-74, 60, 68);
  // Brick rows (each row 4px tall, alternating offset)
  for (let row=0; row<17; row++) {
    const oy = row*4, offset = row%2===0 ? 0 : 5;
    ctx.fillStyle = row%3===0?'#3e2818':row%3===1?'#3a2414':'#422c1c';
    for (let col=0; col<8; col++)
      ctx.fillRect(cx-29+col*8+offset, by-72+oy, 7, 3);
  }
  // Quoins (corner stones) — alternating light blocks at corners
  ctx.fillStyle = '#4a3020';
  for (let i=0;i<9;i++) {
    if (i%2===0) {
      ctx.fillRect(cx-30, by-74+i*8, 5, 6);
      ctx.fillRect(cx+25, by-74+i*8, 5, 6);
    }
  }

  // ── Parapet with crenellations ──
  ctx.fillStyle = '#2e1c0c'; ctx.fillRect(cx-31, by-76, 62, 4);
  ctx.fillStyle = '#241408';
  for (let i=0;i<9;i++) ctx.fillRect(cx-28+i*7, by-80, 4, 4);

  // ── Window frames & windows (5 floors × 3 windows) ──
  const floors = [by-18, by-30, by-42, by-54, by-66];
  const wcols  = [-18, -4, 10];
  floors.forEach(fy => {
    wcols.forEach(wx => {
      // Stone lintel
      ctx.fillStyle = '#4a3820';
      ctx.fillRect(cx+wx-2, fy-3, 13, 3);
      // Sill
      ctx.fillStyle = '#4a3820';
      ctx.fillRect(cx+wx-1, fy+10, 12, 2);
      // Window glass
      ctx.fillStyle = lit ? color+'aa' : '#12101a';
      ctx.fillRect(cx+wx, fy, 9, 10);
      // Window divider
      ctx.fillStyle = lit ? color+'44' : '#0e0c14';
      ctx.fillRect(cx+wx+4, fy, 1, 10);
      ctx.fillRect(cx+wx, fy+5, 9, 1);
      if (lit) {
        ctx.fillStyle = '#ffffff14';
        ctx.fillRect(cx+wx, fy, 3, 3);
      }
    });
  });

  // ── Decorative clock face (between floors 3 and 4) ──
  ctx.fillStyle = '#3a2c1c';
  ctx.fillRect(cx-5, by-47, 10, 10);
  ctx.fillStyle = '#4a3c28';
  ctx.fillRect(cx-4, by-46, 8, 8);
  ctx.fillStyle = '#2a1e10';
  ctx.fillRect(cx-1, by-45, 2, 1); // 12
  ctx.fillRect(cx-1, by-40, 2, 1); // 6
  ctx.fillRect(cx+2, by-43, 1, 2); // 3
  ctx.fillRect(cx-4, by-43, 1, 2); // 9

  // ── Door ──
  ctx.fillStyle = '#0e0a08'; ctx.fillRect(cx-6, by-14, 12, 14);
  ctx.fillStyle = '#1a1210'; ctx.fillRect(cx-5, by-13,  5,  6);
  ctx.fillStyle = '#1a1210'; ctx.fillRect(cx+1, by-13,  4,  6);
  // Door surround
  ctx.fillStyle = '#4a3828';
  ctx.fillRect(cx-7, by-16, 14, 3);
  ctx.fillRect(cx-7, by-16,  2, 16);
  ctx.fillRect(cx+5, by-16,  2, 16);
}

// ── Prag: Gothic / Romanesque cathedral ──────────────────────
function _prag(ctx, cx, by, color, done) {
  const lit = !done && Math.floor(Date.now()/1000+11)%4!==0;

  if (!done) { ctx.fillStyle = color+'18'; ctx.fillRect(cx-26, by, 52, 8); }
  ctx.fillStyle = '#040308'; ctx.fillRect(cx-20, by+2, 40, 5);

  // ── Left wing (cx-24 to cx-8) ──
  ctx.fillStyle = '#2c2438'; ctx.fillRect(cx-24, by-60, 16, 60);
  ctx.fillStyle = '#241e30'; ctx.fillRect(cx-24, by-60,  2, 60); // shadow edge
  // Flying buttress suggestion
  ctx.fillStyle = '#201a2c'; ctx.fillRect(cx-26, by-50, 3, 30);
  ctx.fillRect(cx-24, by-50, 3, 2);
  // Wing windows (lancet — tall with pointed top)
  ctx.fillStyle = lit ? color+'88' : '#1c1828';
  [by-20, by-38, by-56].forEach(wy => {
    ctx.fillRect(cx-21, wy, 5, 14);
    // Pointed arch top
    ctx.fillStyle = '#241e30'; ctx.fillRect(cx-21, wy-3, 5, 3);
    ctx.fillStyle = '#2a2234'; ctx.fillRect(cx-20, wy-5, 3, 2);
    ctx.fillStyle = lit ? color+'88' : '#1c1828';
  });

  // ── Right wing (cx+8 to cx+24) ──
  ctx.fillStyle = '#2c2438'; ctx.fillRect(cx+8, by-60, 16, 60);
  ctx.fillStyle = '#241e30'; ctx.fillRect(cx+22, by-60, 2, 60);
  ctx.fillStyle = '#201a2c'; ctx.fillRect(cx+23, by-50, 3, 30);
  ctx.fillRect(cx+21, by-50, 3, 2);
  ctx.fillStyle = lit ? color+'88' : '#1c1828';
  [by-20, by-38, by-56].forEach(wy => {
    ctx.fillRect(cx+15, wy, 5, 14);
    ctx.fillStyle = '#241e30'; ctx.fillRect(cx+15, wy-3, 5, 3);
    ctx.fillStyle = '#2a2234'; ctx.fillRect(cx+16, wy-5, 3, 2);
    ctx.fillStyle = lit ? color+'88' : '#1c1828';
  });

  // ── Central tower (cx-8 to cx+8) ──
  ctx.fillStyle = '#30283e'; ctx.fillRect(cx-8, by-76, 16, 76);
  ctx.fillStyle = '#281e34'; ctx.fillRect(cx-8, by-76, 2, 76);
  ctx.fillStyle = '#3a3048'; ctx.fillRect(cx-6, by-76, 3, 76);

  // Tower windows
  ctx.fillStyle = lit ? color+'99' : '#1e1830';
  [by-24, by-44, by-64].forEach(wy => {
    ctx.fillRect(cx-4, wy, 8, 15);
    ctx.fillStyle = '#2c2440'; ctx.fillRect(cx-4, wy-4, 8, 4);
    ctx.fillStyle = '#342a48'; ctx.fillRect(cx-3, wy-6, 6, 2);
    ctx.fillStyle = lit ? color+'99' : '#1e1830';
  });

  // ── Rose window on tower ──
  ctx.fillStyle = color+'55'; ctx.fillRect(cx-5, by-52, 10, 10);
  ctx.fillStyle = color+'33';
  ctx.fillRect(cx-7, by-49, 3, 4); ctx.fillRect(cx+4, by-49, 3, 4);
  ctx.fillRect(cx-4, by-55, 8, 3); ctx.fillRect(cx-4, by-43, 8, 3);
  ctx.fillStyle = '#28203a'; ctx.fillRect(cx-1, by-52, 2, 10);
  ctx.fillRect(cx-5, by-48, 10, 2);

  // ── Gargoyles ──
  ctx.fillStyle = '#1c1628';
  ctx.fillRect(cx-10, by-62, 3, 4); ctx.fillRect(cx-12, by-63, 2, 2);
  ctx.fillRect(cx+7,  by-62, 3, 4); ctx.fillRect(cx+10, by-63, 2, 2);

  // ── Spire (above tower, from by-76 up 28px) ──
  [[7,0],[6,2],[5,4],[4,6],[4,8],[3,10],[3,12],[2,14],[2,16],[2,18],[1,20],[1,22],[1,24],[1,26]].forEach(([w,yo]) => {
    ctx.fillStyle = yo<6?'#3a3048':yo<14?'#2e2640':'#241e38';
    ctx.fillRect(cx - Math.ceil(w/2), by-76-yo, w, 2);
  });
  // Spire tip highlight
  ctx.fillStyle = '#4a3c58'; ctx.fillRect(cx, by-102, 1, 2);

  // ── Entrance (pointed arch) ──
  ctx.fillStyle = '#0c0a10'; ctx.fillRect(cx-5, by-18, 10, 18);
  ctx.fillStyle = '#141020'; ctx.fillRect(cx-4, by-24,  8,  7);
  ctx.fillStyle = '#1c1828'; ctx.fillRect(cx-3, by-27,  6,  4);
  ctx.fillStyle = '#282040'; ctx.fillRect(cx-2, by-29,  4,  3);
}

// ── Weimar: Neoclassical theater / Nationaltheater ───────────
function _weimar(ctx, cx, by, color, done) {
  const W = 88, lit = !done && Math.floor(Date.now()/1100+5)%4!==0;

  if (!done) { ctx.fillStyle = color+'18'; ctx.fillRect(cx-W/2-4, by, W+8, 8); }
  ctx.fillStyle = '#060408'; ctx.fillRect(cx-40, by+2, 80, 5);

  // ── 3-step base ──
  ctx.fillStyle = '#6a5e40'; ctx.fillRect(cx-W/2-2, by-4,  W+4,  4);
  ctx.fillStyle = '#7a6e50'; ctx.fillRect(cx-W/2,   by-8,  W,    4);
  ctx.fillStyle = '#8a7e60'; ctx.fillRect(cx-W/2+2, by-12, W-4,  4);
  ctx.fillStyle = '#9a8e70'; ctx.fillRect(cx-W/2+4, by-14, W-8,  2);

  // ── Main building body (warm stone) ──
  ctx.fillStyle = '#9e8c66'; ctx.fillRect(cx-W/2, by-46, W, 32);
  // Horizontal band lines for depth
  ctx.fillStyle = '#8a7854'; ctx.fillRect(cx-W/2, by-20, W, 1);
  ctx.fillStyle = '#b0986e'; ctx.fillRect(cx-W/2, by-22, W, 1);

  // ── 6 Columns with entasis ──
  const colXs = [-36,-22,-8, 6, 20, 34];
  colXs.forEach(cx2 => {
    // Column shaft
    ctx.fillStyle = '#cabb8c'; ctx.fillRect(cx+cx2, by-42, 4, 28);
    // Shadow side
    ctx.fillStyle = '#a89068'; ctx.fillRect(cx+cx2+3, by-42, 1, 28);
    // Highlight
    ctx.fillStyle = '#d8c898'; ctx.fillRect(cx+cx2, by-42, 1, 28);
    // Capital (top)
    ctx.fillStyle = '#c8b888'; ctx.fillRect(cx+cx2-1, by-44, 6, 3);
    ctx.fillRect(cx+cx2-2, by-46, 8, 2);
    // Base
    ctx.fillStyle = '#c8b888'; ctx.fillRect(cx+cx2-1, by-14, 6, 3);
    ctx.fillRect(cx+cx2-2, by-12, 8, 2);
  });

  // ── Windows between columns ──
  ctx.fillStyle = lit ? color+'88' : '#2a1e0e';
  [[-30, by-40], [-16, by-40], [4, by-40], [18, by-40]].forEach(([wx, wy]) => {
    ctx.fillRect(cx+wx, wy, 8, 18);
    // Stone surround
    ctx.fillStyle = '#b8a478';
    ctx.fillRect(cx+wx-1, wy-2, 10, 2);
    ctx.fillRect(cx+wx-1, wy, 1, 18);
    ctx.fillRect(cx+wx+8, wy, 1, 18);
    ctx.fillRect(cx+wx-1, wy+18, 10, 2);
    ctx.fillStyle = lit ? color+'88' : '#2a1e0e';
  });

  // ── Central double door ──
  ctx.fillStyle = '#120e08'; ctx.fillRect(cx-8, by-26, 16, 26);
  ctx.fillStyle = '#1c1610'; ctx.fillRect(cx-7, by-25,  6, 10);
  ctx.fillStyle = '#1c1610'; ctx.fillRect(cx+1, by-25,  6, 10);
  // Door frame
  ctx.fillStyle = '#b0986a';
  ctx.fillRect(cx-9, by-28, 18, 3);
  ctx.fillRect(cx-9, by-28,  2, 28);
  ctx.fillRect(cx+7, by-28,  2, 28);

  // ── Entablature (above columns) ──
  ctx.fillStyle = '#a89068'; ctx.fillRect(cx-W/2, by-46, W, 6);
  ctx.fillStyle = '#c0a87e'; ctx.fillRect(cx-W/2, by-46, W, 2);
  // Triglyphs / metopes
  ctx.fillStyle = '#8a7250';
  for (let i=0;i<10;i++) ctx.fillRect(cx-40+i*9, by-44, 4, 4);
  ctx.fillStyle = '#b09870';
  for (let i=0;i<9;i++)  ctx.fillRect(cx-35+i*9, by-44, 4, 4);

  // ── Pediment triangle ──
  ctx.fillStyle = '#9a8860'; ctx.fillRect(cx-W/2, by-52, W, 6);
  ctx.fillStyle = '#a8946c'; ctx.fillRect(cx-36,  by-58, 72, 6);
  ctx.fillStyle = '#b0986e'; ctx.fillRect(cx-26,  by-64, 52, 6);
  ctx.fillStyle = '#b89e72'; ctx.fillRect(cx-16,  by-70, 32, 6);
  ctx.fillStyle = '#c0a678'; ctx.fillRect(cx-8,   by-74, 16, 4);
  // Pediment highlight
  ctx.fillStyle = '#c8b07e'; ctx.fillRect(cx-W/2, by-52, W, 1);
  // Sculptural elements in pediment (abstract relief)
  ctx.fillStyle = '#a89060';
  ctx.fillRect(cx-20, by-62, 5, 4); ctx.fillRect(cx-10, by-66, 4, 4);
  ctx.fillRect(cx-2,  by-69, 4, 5); ctx.fillRect(cx+8,  by-66, 4, 4);
  ctx.fillRect(cx+15, by-62, 5, 4);

  // ── Roof (behind pediment) ──
  ctx.fillStyle = '#7a6848'; ctx.fillRect(cx-38, by-52, 76, 8);
  ctx.fillStyle = '#6a5840'; ctx.fillRect(cx-34, by-56, 68, 6);
}

// ── Generic fallback building ─────────────────────────────────
function _generic(ctx, cx, by, color, done) {
  if (!done) { ctx.fillStyle=color+'18'; ctx.fillRect(cx-20,by+2,40,8); }
  ctx.fillStyle='#1e1a28'; ctx.fillRect(cx-16,by-38,32,42);
  ctx.fillStyle=color+'66'; ctx.fillRect(cx-17,by-40,34,4);
  const w=!done; ctx.fillStyle=w?color+'bb':'#1a1820';
  [[4,-32],[14,-32],[22,-32],[4,-22],[22,-22]].forEach(([wx,wy])=>ctx.fillRect(cx-16+wx,by+wy,6,5));
  ctx.fillStyle='#100e18'; ctx.fillRect(cx-4,by-10,8,10);
}

// ── City label ────────────────────────────────────────────────
export function drawLabel(ctx, col, row, id, name, color, done, isNear) {
  const buildH = BH[id] ?? 70;
  const rawLy  = row * TILE - buildH - 14;
  const lx     = col * TILE + TILE / 2;
  const ly     = Math.max(24, rawLy);

  ctx.globalAlpha = done ? 0.35 : 1;
  ctx.font = isNear ? 'bold 9px sans-serif' : '8px sans-serif';
  ctx.textAlign = 'center';
  const tw = ctx.measureText(name).width;
  const bx = lx - tw/2 - 5, bw = tw + 10, bh = 12;

  // Badge background
  ctx.fillStyle = '#0c0c1eee';
  ctx.fillRect(bx, ly - 9, bw, bh);

  // Border
  if (isNear) {
    ctx.fillStyle = color;
    ctx.fillRect(bx,       ly - 9, bw, 1);
    ctx.fillRect(bx,       ly + 3, bw, 1);
    ctx.fillRect(bx,       ly - 9, 1, bh);
    ctx.fillRect(bx + bw - 1, ly - 9, 1, bh);
    // Glow dots at corners
    ctx.fillStyle = color + '88';
    ctx.fillRect(bx,       ly - 9, 2, 2);
    ctx.fillRect(bx+bw-2,  ly - 9, 2, 2);
    ctx.fillRect(bx,       ly + 2, 2, 2);
    ctx.fillRect(bx+bw-2,  ly + 2, 2, 2);
  }

  ctx.fillStyle = isNear ? '#ffffff' : '#7a6a48';
  ctx.fillText(name, lx, ly);
  ctx.globalAlpha = 1;
}

// ── Interact prompt ───────────────────────────────────────────
export function drawPrompt(ctx, col, row, id, name, tick = 0) {
  const buildH = BH[id] ?? 70;
  const rawCy  = row * TILE - buildH - 28;
  const bob    = Math.floor((tick||0) / 18) % 2;
  const cx     = col * TILE + TILE / 2;
  const cy     = Math.max(30, rawCy) - bob;
  const text   = `[E] ${name} betreten`;

  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  const tw = ctx.measureText(text).width;
  const bx = cx - tw/2 - 6;

  // Shadow under badge
  ctx.fillStyle = '#00000040';
  ctx.fillRect(bx + 2, cy - 7 + 2, tw + 12, 11);

  // Gold badge
  ctx.fillStyle = '#e8c820';
  ctx.fillRect(bx, cy - 8, tw + 12, 12);
  // Highlight strip
  ctx.fillStyle = '#f0d840';
  ctx.fillRect(bx, cy - 8, tw + 12, 3);

  ctx.fillStyle = '#0e0e14';
  ctx.fillText(text, cx, cy);

  // Arrow pointing down toward building
  ctx.fillStyle = '#e8c820';
  ctx.fillRect(cx - 4, cy + 5, 8, 1);
  ctx.fillRect(cx - 3, cy + 6, 6, 1);
  ctx.fillRect(cx - 2, cy + 7, 4, 1);
  ctx.fillRect(cx - 1, cy + 8, 2, 1);
}

// ── Player sprite (22 × 36 px) ───────────────────────────────
export function drawPlayer(ctx, px, py, dir, frame, moving) {
  const x = Math.floor(px) - 3;  // offset so centre of 22px is on tile centre
  const y = Math.floor(py) - 16; // sprite extends 16px above tile top

  const f   = frame % 4;
  const legL = moving ? (f < 2 ? 3 : -3) : 0;
  const legR = -legL;
  const armL = -legL;
  const armR =  legL;

  // ── Shadow ──
  ctx.fillStyle = '#00000058';
  ctx.fillRect(x+4,  py+12, 14, 3);
  ctx.fillRect(x+5,  py+15,  12, 2);
  ctx.fillRect(x+7,  py+17,  8,  1);

  // ── Left leg + boot ──
  ctx.fillStyle = '#26201a'; ctx.fillRect(x+5, y+30, 5, 7 + legL);
  ctx.fillStyle = '#1e1810'; ctx.fillRect(x+4, y+36+legL, 7, 4);   // boot
  ctx.fillStyle = '#2a2218'; ctx.fillRect(x+4, y+36+legL, 7, 1);   // boot highlight

  // ── Right leg + boot ──
  ctx.fillStyle = '#26201a'; ctx.fillRect(x+12, y+30, 5, 7 + legR);
  ctx.fillStyle = '#1e1810'; ctx.fillRect(x+11, y+36+legR, 7, 4);
  ctx.fillStyle = '#2a2218'; ctx.fillRect(x+11, y+36+legR, 7, 1);

  // ── Coat body ──
  ctx.fillStyle = '#1c1810'; ctx.fillRect(x+4, y+18, 14, 14);
  // Coat tails
  ctx.fillStyle = '#18140c'; ctx.fillRect(x+4, y+28, 5, 6);
  ctx.fillRect(x+13, y+28, 5, 6);
  // Coat lapels
  ctx.fillStyle = '#221e16'; ctx.fillRect(x+9, y+18, 4, 10);

  // ── Waistcoat / vest ──
  ctx.fillStyle = '#d4a840'; ctx.fillRect(x+9, y+19, 4, 8);
  ctx.fillStyle = '#e0b848'; ctx.fillRect(x+9, y+19, 2, 1); // sheen
  // Vest buttons
  ctx.fillStyle = '#a07830';
  [y+20, y+23, y+26].forEach(by2 => ctx.fillRect(x+10, by2, 2, 1));

  // ── White shirt & cravat ──
  ctx.fillStyle = '#e8e4d8'; ctx.fillRect(x+9,  y+17, 4, 3);
  ctx.fillStyle = '#d0c8b0'; ctx.fillRect(x+10, y+17, 2, 1); // shadow
  // Cravat knot
  ctx.fillStyle = '#c04030'; ctx.fillRect(x+10, y+18, 2, 2);

  // ── Left arm ──
  ctx.fillStyle = '#1c1810';
  ctx.fillRect(x+1, y+19, 4, 8 + armL);
  // Left hand / glove
  ctx.fillStyle = '#e4c878'; ctx.fillRect(x+0, y+26+armL, 4, 3);

  // ── Right arm ──
  ctx.fillStyle = '#1c1810';
  ctx.fillRect(x+17, y+19, 4, 8 + armR);
  // Walking stick in right hand
  if (moving || true) {
    ctx.fillStyle = '#8a6030'; ctx.fillRect(x+20, y+24+armR, 2, 14);
    ctx.fillStyle = '#a07840'; ctx.fillRect(x+20, y+24+armR, 2, 2); // handle
    ctx.fillStyle = '#6a4820'; ctx.fillRect(x+20, py+13, 2, 2); // tip
  }
  // Right hand
  ctx.fillStyle = '#e4c878'; ctx.fillRect(x+18, y+26+armR, 4, 3);

  // ── Neck ──
  ctx.fillStyle = '#e4c878'; ctx.fillRect(x+9, y+14, 4, 4);

  // ── Head ──
  ctx.fillStyle = '#e4c878'; ctx.fillRect(x+6, y+6, 10, 9);
  // Ear
  ctx.fillStyle = '#d4b868';
  if (dir==='left')  ctx.fillRect(x+5,  y+8,  2, 4);
  if (dir==='right') ctx.fillRect(x+15, y+8,  2, 4);
  // Cheek shading
  ctx.fillStyle = '#c8a85a'; ctx.fillRect(x+6, y+12, 2, 2);

  // ── Eyes ──
  if (dir !== 'up') {
    const eOff = dir==='left'?-1:dir==='right'?1:0;
    ctx.fillStyle = '#1e100a'; ctx.fillRect(x+7+eOff, y+8, 2, 2);
    ctx.fillRect(x+11+eOff, y+8, 2, 2);
    ctx.fillStyle = '#ffffff68'; ctx.fillRect(x+7+eOff, y+8, 1, 1);
    ctx.fillRect(x+11+eOff, y+8, 1, 1);
  }

  // ── Moustache (front view) ──
  if (dir === 'down') {
    ctx.fillStyle = '#3a2010';
    ctx.fillRect(x+7, y+12, 2, 1);
    ctx.fillRect(x+11, y+12, 2, 1);
  }

  // ── Sideburns ──
  if (dir==='left'||dir==='down') {
    ctx.fillStyle = '#3a2010'; ctx.fillRect(x+6, y+9, 1, 3);
  }
  if (dir==='right'||dir==='down') {
    ctx.fillStyle = '#3a2010'; ctx.fillRect(x+15, y+9, 1, 3);
  }

  // ── Top hat brim ──
  ctx.fillStyle = '#0c0a06'; ctx.fillRect(x+2, y+5, 18, 3);
  ctx.fillStyle = '#161410'; ctx.fillRect(x+2, y+5, 18, 1); // brim highlight

  // ── Hat crown ──
  ctx.fillStyle = '#0e0c08'; ctx.fillRect(x+5, y-7, 12, 13);
  // Felt texture
  ctx.fillStyle = '#0a0906'; ctx.fillRect(x+6, y-6, 10, 2);
  // Hat band (gold ribbon)
  ctx.fillStyle = '#c09030'; ctx.fillRect(x+5, y+5,  12, 2);
  ctx.fillStyle = '#d4a040'; ctx.fillRect(x+5, y+5,  12, 1);
}
