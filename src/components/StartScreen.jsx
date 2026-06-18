export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-frame">
        <span className="start-corner tl">✦</span>
        <span className="start-corner tr">✦</span>
        <span className="start-corner bl">✦</span>
        <span className="start-corner br">✦</span>

        <div className="start-era">1890 — 1930</div>
        <h1 className="start-title">Fin de Siècle</h1>
        <p className="start-sub">Ein Reisespiel durch die literarische Moderne</p>

        <div className="start-rule" />

        <p className="start-desc">
          Du bist Journalist einer Literaturbeilage. Dein Auftrag: die Bewegung
          der literarischen Moderne zu verstehen. Bereise vier Städte, tritt
          Zeitzeugen gegenüber — und beweise, dass du die Epoche wirklich kennst.
        </p>

        <div className="start-cities">
          <span className="start-city">Wien</span>
          <span className="start-city">Berlin</span>
          <span className="start-city">Prag</span>
          <span className="start-city">Weimarer Republik</span>
        </div>

        <button className="btn-primary" onClick={onStart}>Reise beginnen</button>
        <span className="start-hint">4 Kapitel · 15 Fragen · 1 Zuordnungsrätsel · Keine Zeitbegrenzung</span>
      </div>
    </div>
  );
}
