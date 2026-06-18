import { TOTAL_QUESTIONS } from '../data/gameData';

export default function EndScreen({ score, onRestart }) {
  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);

  let rating, ratingText;
  if (percent === 100) {
    rating = '⭐⭐⭐';
    ratingText = 'Meisterreporter der Moderne — Ihr Bericht wird Geschichte machen.';
  } else if (percent >= 70) {
    rating = '⭐⭐';
    ratingText = 'Solide Kenntnisse — der Redakteur ist zufrieden.';
  } else {
    rating = '⭐';
    ratingText = 'Guter Anfang — eine zweite Reise durch die Moderne würde nicht schaden.';
  }

  return (
    <div className="end-screen">
      <div className="end-content">
        <div className="end-tag">Reise abgeschlossen</div>
        <h2 className="end-title">Dein Bericht ist fertig.</h2>
        <div className="end-rating">{rating}</div>
        <p className="end-rating-text">{ratingText}</p>
        <div className="end-score-box">
          <span className="end-score-number">{score}</span>
          <span className="end-score-of"> / {TOTAL_QUESTIONS}</span>
          <span className="end-score-label">Fragen beim ersten Versuch richtig beantwortet</span>
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
        <button className="btn-secondary" onClick={onRestart}>
          Nochmal reisen
        </button>
      </div>
    </div>
  );
}
