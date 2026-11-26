import { useEffect } from 'react';
import useWordle from './wordle';
import GameBoard from './gameboard';
import Keyboard from './keyboard';
import GameOverModal from './gameovermodle';

export default function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    keyStatuses,
    message,
    handleKey,
    resetGame,
  } = useWordle();

  // Listen to the physical keyboard
  useEffect(() => {
    if (gameStatus !== 'IN_PROGRESS') return; // no input after the game ends

    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return; // keep browser shortcuts working
      if (event.key === 'Enter') event.preventDefault();
      handleKey(event.key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown); // cleanup
  }, [gameStatus, handleKey]);

  return (
    <div className="app">
      <h1 className="title">Wordle</h1>

      <div className="toast-area">
        {message && <div className="toast">{message}</div>}
      </div>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
      />

      <Keyboard keyStatuses={keyStatuses} onKeyPress={handleKey} />

      <GameOverModal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        onRestart={resetGame}
      />
    </div>
  );
}