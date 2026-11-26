import Tile from './tile';
import { WORD_LENGTH } from './data';

// One guess: 5 tiles in a line
export default function Row({ letters = '', statuses = [] }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(
      <Tile key={i} letter={letters[i] || ''} status={statuses[i] || ''} />
    );
  }
  return <div className="row">{tiles}</div>;
}