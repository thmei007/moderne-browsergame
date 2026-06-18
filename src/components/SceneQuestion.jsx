import { useState, useMemo } from 'react';

function shuffle(arr) {
  return [...arr].map(item => ({ item, s: Math.random() }))
    .sort((a, b) => a.s - b.s).map(({ item }) => item);
}

export default function SceneQuestion({ scene, onCorrect }) {
  const options  = useMemo(() => shuffle(scene.question.options), [scene.id]);
  const [sel, setSel]       = useState(null);
  const [shown, setShown]   = useState(false);

  function pick(i) {
    if (shown) return;
    setSel(i); setShown(true);
  }

  const correct = sel !== null && options[sel].correct;

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

      <div className="question-block">
        <p className="question-text">{scene.question.text}</p>
        <div className="options-grid">
          {options.map((opt, i) => {
            let cls = 'option-btn';
            if (shown) {
              if (opt.correct)              cls += ' correct';
              else if (i === sel)           cls += ' wrong';
            }
            if (i === sel) cls += ' selected';
            return (
              <button key={opt.text} className={cls} onClick={() => pick(i)} disabled={shown}>
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>

      {shown && (
        <div className={`feedback-box ${correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          <div className="feedback-header">{correct ? '✓ Richtig!' : '✗ Nicht ganz.'}</div>
          <p className="feedback-explanation">{options[sel].explanation}</p>
          <button className="btn-primary" onClick={() => onCorrect(correct)}>
            {correct ? 'Weiter →' : 'Verstanden — weiter →'}
          </button>
        </div>
      )}
    </div>
  );
}
