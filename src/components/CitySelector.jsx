import { useState, useEffect } from 'react';

const MAP_W = 560;
const MAP_H = 360;
const STEP = 16;
const P_W = 20;
const P_H = 28;
const SNAP = 50;

const CITIES = [
  { id: 'berlin',  label: 'Berlin',             sub: 'Kaiserliche Hauptstadt', x: 240, y: 45,  color: '#2c4a7c', light: '#6a96e8' },
  { id: 'weimar',  label: 'Weimarer Republik',   sub: 'Republik & Aufbruch',    x: 55,  y: 155, color: '#7c4a14', light: '#e0a040' },
  { id: 'prag',    label: 'Prag',                sub: 'Böhmische Goldene Stadt', x: 330, y: 175, color: '#1f5c2e', light: '#50c870' },
  { id: 'wien',    label: 'Wien',                sub: 'Kaiserliche Residenz',   x: 370, y: 270, color: '#6b1515', light: '#e05050' },
];

const ROADS = [[0,1],[0,2],[1,2],[2,3],[0,3]];

export default function CitySelector({ onSelect }) {
  const [pos, setPos]       = useState({ x: 260, y: 180 });
  const [moving, setMoving] = useState(false);
  const [facing, setFacing] = useState(1);
  const [step, setStep]     = useState(0);

  const cx = pos.x + P_W / 2;
  const cy = pos.y + P_H / 2;
  const nearest = CITIES.reduce((best, city) => {
    const d = Math.hypot(city.x + 12 - cx, city.y + 12 - cy);
    return d < SNAP && (!best || d < best.d) ? { ...city, d } : best;
  }, null);

  useEffect(() => {
    let timer;
    function onKey(e) {
      const map = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0],
                    w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] };
      if (map[e.key]) {
        e.preventDefault();
        const [dx, dy] = map[e.key];
        if (dx !== 0) setFacing(dx);
        setMoving(true);
        setStep(s => (s + 1) % 4);
        clearTimeout(timer);
        timer = setTimeout(() => setMoving(false), 200);
        setPos(p => ({
          x: Math.max(0, Math.min(MAP_W - P_W, p.x + dx * STEP)),
          y: Math.max(0, Math.min(MAP_H - P_H, p.y + dy * STEP)),
        }));
      }
      if ((e.key === 'Enter' || e.key === ' ') && nearest) onSelect(nearest.id);
    }
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, [nearest, onSelect]);

  const legOffset = moving ? (step % 2 === 0 ? 3 : -3) : 0;

  return (
    <div className="cs-overlay">
      <div className="cs-panel">

        <div className="cs-header">
          <span className="cs-orn">✦</span>
          <h2 className="cs-title">Wähle deine Destination</h2>
          <span className="cs-orn">✦</span>
        </div>

        {/* MAP */}
        <div className="cs-map" style={{ width: MAP_W, height: MAP_H }}>

          {/* Map grid texture overlay */}
          <div className="cs-map-grid" />

          {/* Compass rose */}
          <div className="cs-compass">
            <div className="cs-compass-n">N</div>
            <div className="cs-compass-cross">
              <span>▲</span><span>▼</span><span>◀</span><span>▶</span>
            </div>
          </div>

          {/* SVG roads */}
          <svg className="cs-svg" width={MAP_W} height={MAP_H}>
            {ROADS.map(([a, b]) => (
              <line key={`${a}-${b}`}
                x1={CITIES[a].x + 12} y1={CITIES[a].y + 12}
                x2={CITIES[b].x + 12} y2={CITIES[b].y + 12}
                stroke="#8b6830" strokeWidth="2" strokeDasharray="7 5" opacity="0.55"
              />
            ))}
            {ROADS.map(([a, b]) => (
              <line key={`t${a}-${b}`}
                x1={CITIES[a].x + 12} y1={CITIES[a].y + 12}
                x2={CITIES[b].x + 12} y2={CITIES[b].y + 12}
                stroke="#c8a050" strokeWidth="0.5" opacity="0.25"
              />
            ))}
          </svg>

          {/* Cities */}
          {CITIES.map(city => {
            const active = nearest?.id === city.id;
            return (
              <div key={city.id} style={{ position:'absolute', left: city.x, top: city.y }}>
                {active && <div className="cs-city-glow" style={{ background: `radial-gradient(circle, ${city.light}55 0%, transparent 70%)` }} />}
                <div className={`cs-city-marker${active ? ' cs-city-active' : ''}`}
                  style={{ background: active ? city.light : city.color, borderColor: city.light, boxShadow: active ? `0 0 14px ${city.light}` : '0 3px 8px rgba(0,0,0,0.5)' }}
                  onClick={() => onSelect(city.id)}
                >
                  <div className="cs-city-flag" style={{ background: city.light }} />
                </div>
                <div className={`cs-city-label${active ? ' cs-city-label-active' : ''}`}
                  style={{ borderColor: active ? city.light : '#6b5030', background: active ? city.color : 'rgba(12,8,4,0.88)', color: active ? '#fff' : '#c8a870' }}>
                  {city.label}
                </div>
              </div>
            );
          })}

          {/* Player */}
          <div className="cs-player" style={{
            left: pos.x, top: pos.y,
            transform: `scaleX(${facing < 0 ? -1 : 1})`,
          }}>
            {/* hat brim */}
            <div style={{ position:'absolute', left:2,  top:0,  width:16, height:2,  background:'#0d0a06' }} />
            {/* hat top */}
            <div style={{ position:'absolute', left:4,  top:-5, width:12, height:7,  background:'#0d0a06', border:'1px solid #2a1f0a' }} />
            {/* head */}
            <div style={{ position:'absolute', left:4,  top:2,  width:12, height:10, background:'#e8c880', border:'1px solid #a07830' }} />
            {/* eyes */}
            <div style={{ position:'absolute', left:6,  top:5,  width:2,  height:2,  background:'#1a0e04' }} />
            <div style={{ position:'absolute', left:12, top:5,  width:2,  height:2,  background:'#1a0e04' }} />
            {/* coat */}
            <div style={{ position:'absolute', left:3,  top:12, width:14, height:10, background:'#1e1408' }} />
            {/* lapels/waistcoat */}
            <div style={{ position:'absolute', left:8,  top:13, width:4,  height:7,  background:'#b89040' }} />
            {/* left arm */}
            <div style={{ position:'absolute', left:0,  top:13, width:3,  height:8,  background:'#1e1408' }} />
            {/* right arm */}
            <div style={{ position:'absolute', left:17, top:13, width:3,  height:8,  background:'#1e1408' }} />
            {/* left leg */}
            <div style={{ position:'absolute', left:4,  top:22, width:5,  height:6,  background:'#0e0a04', transform: `translateY(${legOffset}px)` }} />
            {/* right leg */}
            <div style={{ position:'absolute', left:11, top:22, width:5,  height:6,  background:'#0e0a04', transform: `translateY(${-legOffset}px)` }} />
            {/* shoes */}
            <div style={{ position:'absolute', left:3,  top:27, width:6,  height:2,  background:'#050302' }} />
            <div style={{ position:'absolute', left:10, top:27, width:6,  height:2,  background:'#050302' }} />
          </div>
        </div>

        {/* Info bar */}
        <div className="cs-infobar">
          {nearest ? (
            <>
              <div className="cs-infobar-city">
                <span className="cs-infobar-name">{nearest.label}</span>
                <span className="cs-infobar-sub">{nearest.sub}</span>
              </div>
              <button className="cs-infobar-btn" onClick={() => onSelect(nearest.id)}>
                Auswählen <kbd>↵</kbd>
              </button>
            </>
          ) : (
            <span className="cs-infobar-hint">Pfeiltasten · WASD zum Bewegen &nbsp;·&nbsp; Klick auf eine Stadt</span>
          )}
        </div>

      </div>
    </div>
  );
}
