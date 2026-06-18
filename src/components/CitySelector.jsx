import { useState, useEffect } from 'react';

const CITIES = [
  {
    id: 'wien',   label: 'Wien',              year: '~1900',
    sub: 'Das Kaffeehaus der Moderne',
    accent: '#8b2020',
  },
  {
    id: 'berlin', label: 'Berlin',            year: '~1910',
    sub: 'Im Strudel des Expressionismus',
    accent: '#1e3e6e',
  },
  {
    id: 'prag',   label: 'Prag',              year: '~1915',
    sub: 'Kafkas Welt der Entfremdung',
    accent: '#1a4e28',
  },
  {
    id: 'weimar', label: 'Weimarer\nRepublik', year: '~1925',
    sub: 'Republik und Neue Sachlichkeit',
    accent: '#6e4e10',
  },
];

function PixelChar() {
  return (
    <div style={{ position: 'relative', width: 20, height: 28, imageRendering: 'pixelated' }}>
      <div style={{ position:'absolute', left:2,  top:-3, width:16, height:3,  background:'#0d0a06' }} />
      <div style={{ position:'absolute', left:4,  top:-7, width:12, height:5,  background:'#0d0a06', border:'1px solid #2a1f0a' }} />
      <div style={{ position:'absolute', left:4,  top:0,  width:12, height:9,  background:'#e8c880', border:'1px solid #a07830' }} />
      <div style={{ position:'absolute', left:6,  top:3,  width:2,  height:2,  background:'#1a0e04' }} />
      <div style={{ position:'absolute', left:12, top:3,  width:2,  height:2,  background:'#1a0e04' }} />
      <div style={{ position:'absolute', left:3,  top:9,  width:14, height:9,  background:'#1e1408' }} />
      <div style={{ position:'absolute', left:8,  top:10, width:4,  height:6,  background:'#c8a050' }} />
      <div style={{ position:'absolute', left:4,  top:18, width:5,  height:6,  background:'#0e0a04' }} />
      <div style={{ position:'absolute', left:11, top:18, width:5,  height:6,  background:'#0e0a04' }} />
      <div style={{ position:'absolute', left:3,  top:23, width:6,  height:2,  background:'#050302' }} />
      <div style={{ position:'absolute', left:10, top:23, width:6,  height:2,  background:'#050302' }} />
    </div>
  );
}

export default function CitySelector({ onSelect, completedIds = [] }) {
  const available = CITIES.filter(c => !completedIds.includes(c.id));
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setActiveIdx(0); }, [completedIds.length]);

  useEffect(() => {
    function onKey(e) {
      if (!available.length) return;
      if (e.key === 'ArrowRight' || e.key === 'd')
        setActiveIdx(i => (i + 1) % available.length);
      if (e.key === 'ArrowLeft'  || e.key === 'a')
        setActiveIdx(i => (i - 1 + available.length) % available.length);
      if (e.key === 'Enter' || e.key === ' ')
        onSelect(available[activeIdx].id);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [available, activeIdx, onSelect]);

  const activeCity = available[activeIdx] ?? null;

  return (
    <div className="cs-overlay">

      <div className="cs-heading">
        <div className="cs-eyebrow">
          {completedIds.length > 0
            ? `${completedIds.length} von 4 Städten bereist`
            : 'Deine Reise durch die Moderne'}
        </div>
        <h2 className="cs-title">Wohin reist du?</h2>
        <div className="cs-ornrule">✦</div>
      </div>

      <div className="cs-grid">
        {CITIES.map(city => {
          const done     = completedIds.includes(city.id);
          const availIdx = available.indexOf(city);
          const isActive = !done && availIdx === activeIdx;

          return (
            <div
              key={city.id}
              className={`cs-card${isActive ? ' cs-active' : ''}${done ? ' cs-done' : ''}`}
              style={{ borderLeftColor: done ? undefined : (isActive ? city.accent : undefined) }}
              onClick={() => !done && onSelect(city.id)}
            >
              {done && <span className="cs-card-badge">✓ bereist</span>}
              {isActive && <span className="cs-card-badge">← wählen →</span>}

              <div className="cs-card-year">{city.year}</div>
              <div className="cs-card-name" style={{ whiteSpace: 'pre-line' }}>{city.label}</div>
              <div className="cs-card-rule" />
              <div className="cs-card-sub">{city.sub}</div>
              <div className="cs-card-char"><PixelChar /></div>
            </div>
          );
        })}
      </div>

      <div className="cs-footer">
        <span className="cs-hint">← → wechseln &nbsp;·&nbsp; Enter auswählen &nbsp;·&nbsp; Klick direkt</span>
        <button
          className="cs-confirm"
          disabled={!activeCity}
          onClick={() => activeCity && onSelect(activeCity.id)}
        >
          Abreisen →
        </button>
      </div>

    </div>
  );
}
