export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <div className="start-era">1890 — 1930</div>
        <h1 className="start-title">Fin de Siècle</h1>
        <p className="start-subtitle">Ein Reisespiel durch die literarische Moderne</p>
        <div className="start-divider" />
        <p className="start-description">
          Du bist Journalist einer Literaturbeilage. Dein Auftrag: die Bewegung der literarischen Moderne zu verstehen.
          Deine Reise führt dich durch Wien, Berlin, Prag und die Weimarer Republik.
          <br /><br />
          Nur wer die Epoche wirklich kennt, kann den Bericht schreiben.
        </p>
        <button className="btn-primary" onClick={onStart}>
          Reise beginnen →
        </button>
        <p className="start-hint">4 Kapitel · 15 Fragen · Keine Zeitbegrenzung</p>
      </div>
    </div>
  );
}
