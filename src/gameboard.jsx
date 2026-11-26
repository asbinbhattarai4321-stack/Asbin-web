import Row from './row';
import { checkGuess } from './utils';
import { MAX_GUESSES } from './data';

// The 6 x 5 grid: past guesses, the row being typed, and empty rows
export default function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < pastGuesses.length) {
      rows.push(
        <Row
          key={i}
          letters={pastGuesses[i]}
          statuses={checkGuess(pastGuesses[i], solutionWord)}
        />
      );
    } else if (i === pastGuesses.length) {
      rows.push(<Row key={i} letters={currentGuess} />);
    } else {
      rows.push(<Row key={i} />);
    }
  }

  return <div className="board">{rows}</div>;
}