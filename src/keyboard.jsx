const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

// On-screen keyboard. Keys take the same colours as the tiles.
export default function Keyboard({ keyStatuses, onKeyPress }) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const status = keyStatuses[key] || '';
            const className = ['key', status, key.length > 1 ? 'wide' : '']
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={key}
                type="button"
                className={className}
                onClick={(event) => {
                  event.currentTarget.blur(); // stops a focused key reacting to the physical Enter key
                  onKeyPress(key);
                }}
              >
                {key === 'Backspace' ? '\u232B' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}