export default function ChapterIntro({ chapter, onContinue }) {
  return (
    <div className="chapter-intro">
      <div className="chapter-intro-content">
        <div className="chapter-tag">{chapter.location} · {chapter.year}</div>
        <h2 className="chapter-title">{chapter.title}</h2>
        <p className="chapter-subtitle">{chapter.subtitle}</p>
        <div className="chapter-divider" />
        <div className="chapter-narrative">
          {chapter.intro.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <button className="btn-primary" onClick={onContinue}>Weiter →</button>
      </div>
    </div>
  );
}
