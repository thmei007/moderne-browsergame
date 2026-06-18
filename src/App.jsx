import { useState } from 'react';
import { CHAPTERS, TOTAL_QUESTIONS } from './data/gameData';
import StartScreen from './components/StartScreen';
import ChapterIntro from './components/ChapterIntro';
import SceneQuestion from './components/SceneQuestion';
import ProgressBar from './components/ProgressBar';
import EndScreen from './components/EndScreen';

const PHASE = {
  START: 'start',
  CHAPTER_INTRO: 'chapter_intro',
  SCENE: 'scene',
  END: 'end',
};

function initialState() {
  return {
    phase: PHASE.START,
    chapterIndex: 0,
    sceneIndex: 0,
    score: 0,
    answeredCorrectFirstTry: 0,
    firstTryThisScene: true,
  };
}

export default function App() {
  const [state, setState] = useState(initialState());

  const chapter = CHAPTERS[state.chapterIndex];
  const scene = chapter?.scenes[state.sceneIndex];
  const answered = CHAPTERS.slice(0, state.chapterIndex).reduce(
    (sum, ch) => sum + ch.scenes.length, 0
  ) + state.sceneIndex;

  function startGame() {
    setState({ ...initialState(), phase: PHASE.CHAPTER_INTRO });
  }

  function startScenes() {
    setState(s => ({ ...s, phase: PHASE.SCENE }));
  }

  function handleAnswered(wasCorrect) {
    setState(s => {
      const scoreGain = wasCorrect ? 1 : 0;
      const nextScene = s.sceneIndex + 1;
      const currentChapter = CHAPTERS[s.chapterIndex];

      if (nextScene < currentChapter.scenes.length) {
        return { ...s, phase: PHASE.SCENE, sceneIndex: nextScene, score: s.score + scoreGain };
      }

      const nextChapter = s.chapterIndex + 1;
      if (nextChapter < CHAPTERS.length) {
        return { ...s, phase: PHASE.CHAPTER_INTRO, chapterIndex: nextChapter, sceneIndex: 0, score: s.score + scoreGain };
      }

      return { ...s, phase: PHASE.END, score: s.score + scoreGain };
    });
  }

  if (state.phase === PHASE.START) {
    return <StartScreen onStart={startGame} />;
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
        {state.phase === PHASE.CHAPTER_INTRO && (
          <ChapterIntro chapter={chapter} onContinue={startScenes} />
        )}
        {state.phase === PHASE.SCENE && scene && (
          <SceneQuestion
            key={scene.id}
            scene={scene}
            onCorrect={handleAnswered}
          />
        )}
      </main>
    </div>
  );
}
