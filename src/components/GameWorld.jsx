import { useRef, useEffect } from 'react';
import { TILE, COLS, ROWS, MAP, CITIES, CITY_FULL_NAMES, isWalkable } from '../game/mapData.js';
import { drawTile, drawBuilding, drawLabel, drawPrompt, drawPlayer } from '../game/renderer.js';

const START_COL = 14, START_ROW = 13;
const MOVE_MS   = 140;   // ms per tile step

export default function GameWorld({ onEnterCity, completedIds = [] }) {
  const canvasRef      = useRef(null);
  const nearRef        = useRef(null);
  const completedRef   = useRef(completedIds);
  const onEnterRef     = useRef(onEnterCity);
  completedRef.current = completedIds;
  onEnterRef.current   = onEnterCity;

  // Prevent body scroll while game is active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Largest integer scale that fits the viewport — crisp at any size
    const SCALE = Math.max(1, Math.min(
      Math.floor(window.innerWidth  / (COLS * TILE)),
      Math.floor(window.innerHeight / (ROWS * TILE))
    ));
    canvas.width  = COLS * TILE * SCALE;
    canvas.height = ROWS * TILE * SCALE;
    ctx.imageSmoothingEnabled = false;

    // ── Game state (pure ref, no React updates in loop) ──────────
    const s = {
      col: START_COL, row: START_ROW,
      px: START_COL * TILE, py: START_ROW * TILE,
      tx: START_COL * TILE, ty: START_ROW * TILE,
      moving: false,
      dir: 'down',
      frame: 0,
      tick: 0,
      cooldown: 0,
      keys: {},
    };

    // ── Keyboard ────────────────────────────────────────────────
    function onKeyDown(e) {
      s.keys[e.key] = true;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      if ((e.key==='e'||e.key==='E'||e.key==='Enter') && nearRef.current) {
        onEnterRef.current(nearRef.current.id);
      }
    }
    function onKeyUp(e) { s.keys[e.key] = false; }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // ── Game loop ────────────────────────────────────────────────
    let raf, last = 0;

    function update(dt) {
      s.tick++;
      s.cooldown = Math.max(0, s.cooldown - dt);

      if (!s.moving && s.cooldown <= 0) {
        let dc=0, dr=0;
        if (s.keys['ArrowLeft']  || s.keys['a']) { dc=-1; s.dir='left'; }
        else if (s.keys['ArrowRight']|| s.keys['d']) { dc= 1; s.dir='right'; }
        else if (s.keys['ArrowUp']   || s.keys['w']) { dr=-1; s.dir='up'; }
        else if (s.keys['ArrowDown'] || s.keys['s']) { dr= 1; s.dir='down'; }

        if ((dc!==0||dr!==0) && isWalkable(s.col+dc, s.row+dr)) {
          s.col += dc; s.row += dr;
          s.tx = s.col * TILE; s.ty = s.row * TILE;
          s.moving = true;
          s.frame = (s.frame+1)%4;
          s.cooldown = MOVE_MS;
        }
      }

      // Smooth interpolation towards target
      if (s.moving) {
        const speed = TILE / (MOVE_MS / 16);
        const dx = s.tx - s.px, dy = s.ty - s.py;
        const dist = Math.hypot(dx, dy);
        if (dist <= speed) {
          s.px = s.tx; s.py = s.ty; s.moving = false;
        } else {
          s.px += (dx/dist)*speed;
          s.py += (dy/dist)*speed;
        }
      }

      // Near-city detection (write to ref for keydown handler)
      const done = completedRef.current;
      nearRef.current = CITIES.find(
        city => !done.includes(city.id) &&
                Math.abs(city.col - s.col) <= 1 &&
                Math.abs(city.row - s.row) <= 1
      ) ?? null;
    }

    function render() {
      const W = COLS * TILE, H = ROWS * TILE;
      // Draw everything in logical tile coords — SCALE handles the rest
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      ctx.fillStyle = '#111018';
      ctx.fillRect(0, 0, W, H);

      // Tiles
      for (let r=0;r<ROWS;r++)
        for (let c=0;c<COLS;c++)
          drawTile(ctx, c, r, MAP[r][c], s.tick);

      // Cities (buildings below player z-order)
      const done = completedRef.current;
      CITIES.forEach(city => {
        const isDone  = done.includes(city.id);
        const isNear  = nearRef.current?.id === city.id;
        drawBuilding(ctx, city.col, city.row, city.color, isDone);
        drawLabel(ctx, city.col, city.row, city.name, city.color, isDone, isNear);
        if (isNear) drawPrompt(ctx, city.col, city.row, CITY_FULL_NAMES[city.id]);
      });

      // Player
      drawPlayer(ctx, s.px, s.py, s.dir, s.frame, s.moving);

      // ── HUD ────────────────────────────────────────────────────
      // Top bar
      ctx.fillStyle = 'rgba(11,10,16,0.82)';
      ctx.fillRect(0, 0, W, 20);

      ctx.font = 'italic bold 10px "Courier New"';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#c09040';
      ctx.fillText('Fin de Siècle', 8, 13);

      // City dots in top-center
      const dotW = 58, totalW = CITIES.length * dotW;
      const startX = W/2 - totalW/2;
      CITIES.forEach((city, i) => {
        const isDone = done.includes(city.id);
        const cx = startX + i * dotW + dotW/2;
        ctx.fillStyle = isDone ? city.color + 'cc' : '#2a2418';
        ctx.fillRect(cx - 26, 3, 52, 14);
        ctx.font = '7px "Courier New"';
        ctx.textAlign = 'center';
        ctx.fillStyle = isDone ? '#fff' : '#5a4a2a';
        ctx.fillText((isDone ? '✓ ' : '') + city.name, cx, 13);
      });

      // Top-right: progress
      ctx.font = '8px "Courier New"';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#5a4a2a';
      ctx.fillText(`${done.length} / 4`, W - 8, 13);

      // Bottom bar
      ctx.fillStyle = 'rgba(11,10,16,0.82)';
      ctx.fillRect(0, H - 18, W, 18);
      ctx.font = '7px "Courier New"';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#3a3020';
      ctx.fillText('WASD / Pfeiltasten  bewegen   ·   E / Enter  Stadt betreten', W/2, H - 6);
    }

    function loop(ts) {
      const dt = Math.min(ts - last, 50);
      last = ts;
      update(dt);
      render();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []); // eslint-disable-line

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0910',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Canvas is pre-sized to viewport in useEffect — no CSS scaling needed */}
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
