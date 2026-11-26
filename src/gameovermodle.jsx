// Shown when the game is won or lost. It reveals the hidden word.
export default function GameOverModal({ gameStatus, solutionWord, onRestart }) {
  if (gameStatus === 'IN_PROGRESS') return null;

  const won = gameStatus === 'WON';

  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">{won ? 'You won!' : 'Game over'}</h2>
        <p>{won ? 'You found the word:' : 'The word was:'}</p>
        <p className="solution">{solutionWord}</p>
        <button type="button" autoFocus onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}