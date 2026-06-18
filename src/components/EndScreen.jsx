import { TOTAL_QUESTIONS } from '../data/gameData';

export default function EndScreen({ score, onRestart }) {
  const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
  const [rating, text] =
    pct === 100 ? ['⭐⭐⭐', 'Meisterreporter der Moderne — Ihr Bericht wird Geschichte machen.'] :
    pct >= 70   ? ['⭐⭐',   'Solide Kenntnisse — der Redakteur ist zufrieden.'] :
                  ['⭐',     'Guter Anfang — eine zweite Reise würde nicht schaden.'];

  return (
    <div className="end-screen">
      <div className="end-content">
        <div className="end-tag">Reise abgeschlossen</div>
        <h2 className="end-title">Dein Bericht ist fertig.</h2>
        <div className="end-rating">{rating}</div>
        <p className="end-rating-text">{text}</p>
        <div className="end-score-box">
          <span className="end-score-number">{score}</span>
          <span className="end-score-of"> / {TOTAL_QUESTIONS}</span>
          <span className="end-score-label">Fragen beim ersten Versuch richtig</span>
        </div>
        <div className="end-summary">
          <h3>Was du auf dieser Reise gelernt hast:</h3>
          <ul>
            <li><strong>Wien ~1900:</strong> Jung Wien, Schnitzler, Hofmannsthals Sprachkrise</li>
            <li><strong>Berlin ~1910:</strong> Expressionismus, Benn, Wandel nach dem Krieg</li>
            <li><strong>Prag ~1915:</strong> Kafka, Entfremdung, der Prager Kreis</li>
            <li><strong>Weimar ~1925:</strong> Neue Sachlichkeit, Döblin, Brechts V-Effekt</li>
          </ul>
        </div>
        <button className="btn-ghost" onClick={onRestart}>Nochmal reisen</button>
      </div>
    </div>
  );
}
