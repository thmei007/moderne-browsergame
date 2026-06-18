import { useState } from 'react';
import { CHAPTERS, TOTAL_QUESTIONS } from './data/gameData';
import StartScreen    from './components/StartScreen';
import ChapterIntro   from './components/ChapterIntro';
import SceneQuestion  from './components/SceneQuestion';
import ProgressBar    from './components/ProgressBar';
import EndScreen      from './components/EndScreen';
import GameWorld      from './components/GameWorld';

const CITY_IDS  = ['wien', 'berlin', 'prag', 'weimar'];
const FINALE_ID = 'finale';

const PHASE = { START:'start', CITY:'city', INTRO:'intro', SCENE:'scene', END:'end' };

function init() {
  return { phase: PHASE.START, chapterIndex: 0, sceneIndex: 0, score: 0, completedCities: [] };
}

export default function App() {
  const [state, setState] = useState(init());

  const chapter = CHAPTERS[state.chapterIndex];
  const scene   = chapter?.scenes[state.sceneIndex];

  const answered = CHAPTERS.slice(0, state.chapterIndex).reduce(
    (s, ch) => s + ch.scenes.length, 0
  ) + state.sceneIndex;

  function startGame() {
    setState({ ...init(), phase: PHASE.CITY });
  }

  function handleCitySelect(cityId) {
    const idx = CHAPTERS.findIndex(ch => ch.id === cityId);
    if (idx === -1) return;
    setState(s => ({ ...s, phase: PHASE.INTRO, chapterIndex: idx, sceneIndex: 0 }));
  }

  function startScenes() {
    setState(s => ({ ...s, phase: PHASE.SCENE }));
  }

  function handleAnswered(wasCorrect) {
    setState(s => {
      const score    = s.score + (wasCorrect ? 1 : 0);
      const nextScene = s.sceneIndex + 1;
      const ch       = CHAPTERS[s.chapterIndex];

      if (nextScene < ch.scenes.length) {
        return { ...s, score, sceneIndex: nextScene };
      }

      const completed = [...s.completedCities, ch.id];

      if (ch.id === FINALE_ID) {
        return { ...s, score, phase: PHASE.END };
      }

      const allCitiesDone = CITY_IDS.every(id => completed.includes(id));
      if (allCitiesDone) {
        const finaleIdx = CHAPTERS.findIndex(c => c.id === FINALE_ID);
        if (finaleIdx !== -1) {
          return { ...s, score, completedCities: completed, phase: PHASE.INTRO, chapterIndex: finaleIdx, sceneIndex: 0 };
        }
        return { ...s, score, phase: PHASE.END };
      }

      return { ...s, score, completedCities: completed, phase: PHASE.CITY };
    });
  }

  if (state.phase === PHASE.START) return <StartScreen onStart={startGame} />;

  if (state.phase === PHASE.CITY) {
    return (
      <GameWorld
        onEnterCity={handleCitySelect}
        completedIds={state.completedCities}
      />
    );
  }

  if (state.phase === PHASE.END) {
    return <EndScreen score={state.score} onRestart={startGame} />;
  }

  return (
    <div className="game-layout">
      <header className="game-header">
        <span className="game-logo">Fin de Siècle</span>
        <ProgressBar
          chapterIndex={state.chapterIndex}
          sceneIndex={state.sceneIndex}
          answered={answered}
        />
      </header>
      <main className="game-main">
        {state.phase === PHASE.INTRO && (
          <ChapterIntro chapter={chapter} onContinue={startScenes} />
        )}
        {state.phase === PHASE.SCENE && scene && (
          <SceneQuestion key={scene.id} scene={scene} onCorrect={handleAnswered} />
        )}
      </main>
    </div>
  );
}
