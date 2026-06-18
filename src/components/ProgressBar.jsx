import { CHAPTERS, TOTAL_QUESTIONS } from '../data/gameData';

export default function ProgressBar({ chapterIndex, sceneIndex, answered }) {
  const completedQuestions = CHAPTERS.slice(0, chapterIndex).reduce(
    (sum, ch) => sum + ch.scenes.length,
    0
  ) + sceneIndex;

  const percent = Math.round((answered / TOTAL_QUESTIONS) * 100);

  return (
    <div className="progress-bar-container">
      <div className="chapter-dots">
        {CHAPTERS.map((ch, i) => (
          <span
            key={ch.id}
            className={`chapter-dot ${i < chapterIndex ? 'done' : i === chapterIndex ? 'active' : ''}`}
            title={ch.title}
          >
            {i < chapterIndex ? '✓' : ch.location}
          </span>
        ))}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">{answered} / {TOTAL_QUESTIONS} Fragen</span>
    </div>
  );
}
