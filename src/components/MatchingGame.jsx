import { useState, useMemo } from 'react';

function shuffle(arr) {
  return [...arr].map(item => ({ item, s: Math.random() }))
    .sort((a, b) => a.s - b.s).map(({ item }) => item);
}

export default function MatchingGame({ scene, onCorrect }) {
  const shuffledRights = useMemo(() => shuffle(scene.pairs.map(p => p.right)), [scene.id]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongRight, setWrongRight] = useState(null);
  const [done, setDone] = useState(false);

  const matchedLefts  = new Set(Object.keys(matched));
  const matchedRights = new Set(Object.values(matched));

  function pickLeft(val) {
    if (matchedLefts.has(val)) return;
    setSelectedLeft(prev => prev === val ? null : val);
  }

  function pickRight(val) {
    if (matchedRights.has(val) || !selectedLeft) return;
    const pair = scene.pairs.find(p => p.left === selectedLeft);
    if (pair && pair.right === val) {
      const next = { ...matched, [selectedLeft]: val };
      setMatched(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === scene.pairs.length) setDone(true);
    } else {
      setWrongRight(val);
      setTimeout(() => setWrongRight(null), 500);
      setSelectedLeft(null);
    }
  }

  return (
    <div className="scene">
      <div className="scene-header">
        <div className="character-portrait">{scene.portrait}</div>
        <div className="character-info">
          <div className="character-name">{scene.character}</div>
        </div>
      </div>

      <div className="scene-narrative">
        {scene.narrative.split('\n').map((l, i) => <p key={i}>{l}</p>)}
      </div>

      <div className="matching-board">
        <div className="matching-col">
          <div className="matching-col-label">Autor</div>
          {scene.pairs.map(({ left }) => (
            <button
              key={left}
              className={`matching-card${matchedLefts.has(left) ? ' mg-matched' : ''}${selectedLeft === left ? ' mg-selected' : ''}`}
              onClick={() => pickLeft(left)}
              disabled={matchedLefts.has(left)}
            >
              {matchedLefts.has(left) && <span className="mg-check">✓</span>}
              {left}
            </button>
          ))}
        </div>

        <div className="matching-col">
          <div className="matching-col-label">Technik / Schlagwort</div>
          {shuffledRights.map(right => (
            <button
              key={right}
              className={`matching-card${matchedRights.has(right) ? ' mg-matched' : ''}${wrongRight === right ? ' mg-wrong' : ''}${selectedLeft && !matchedRights.has(right) ? ' mg-active' : ''}`}
              onClick={() => pickRight(right)}
              disabled={matchedRights.has(right)}
            >
              {matchedRights.has(right) && <span className="mg-check">✓</span>}
              {right}
            </button>
          ))}
        </div>
      </div>

      {!done && (
        <p className={`matching-hint${selectedLeft ? ' active' : ''}`}>
          {selectedLeft
            ? `Wählen Sie das Schlagwort für: „${selectedLeft}"`
            : 'Klicken Sie auf einen Autor, dann auf sein Schlagwort.'}
        </p>
      )}

      {done && (
        <div className="feedback-box feedback-correct">
          <div className="feedback-header">✓ Alle Zuordnungen korrekt!</div>
          <p className="feedback-explanation">{scene.successText}</p>
          <button className="btn-primary" onClick={() => onCorrect(true)}>Weiter →</button>
        </div>
      )}
    </div>
  );
}
