import { useState, useMemo } from 'react';

function shuffle(arr) {
  const a = arr.map((item, i) => ({ item, sort: Math.random() }));
  a.sort((x, y) => x.sort - y.sort);
  return a.map(({ item }) => item);
}

export default function SceneQuestion({ scene, onCorrect }) {
  const shuffledOptions = useMemo(
    () => shuffle(scene.question.options),
    [scene.id]
  );

  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  function handleSelect(index) {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
  }

  const isCorrect = selected !== null && shuffledOptions[selected].correct;

  return (
    <div className="scene">
      <div className="scene-header">
        <span className="character-portrait">{scene.portrait}</span>
        <span className="character-name">{scene.character}</span>
      </div>

      <div className="scene-narrative">
        {scene.narrative.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="question-block">
        <p className="question-text">{scene.question.text}</p>
        <div className="options-grid">
          {shuffledOptions.map((opt, i) => {
            let cls = 'option-btn';
            if (showFeedback) {
              if (opt.correct) cls += ' correct';
              else if (i === selected && !opt.correct) cls += ' wrong';
            }
            if (i === selected) cls += ' selected';
            return (
              <button
                key={opt.text}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          <div className="feedback-header">
            {isCorrect ? '✓ Richtig!' : '✗ Nicht ganz.'}
          </div>
          <p className="feedback-explanation">
            {shuffledOptions[selected].explanation}
          </p>
          <button
            className="btn-primary"
            onClick={() => onCorrect(isCorrect)}
          >
            {isCorrect ? 'Weiter →' : 'Nochmal verstanden — weiter →'}
          </button>
        </div>
      )}
    </div>
  );
}
