// Grades a guess against the solution.
// Returns an array of 'correct' | 'present' | 'absent', one per letter.
export function checkGuess(guess, solution) {
  const result = Array(guess.length).fill('absent');

  // Count how many times each letter appears in the solution
  const letterCounts = {};
  for (const letter of solution) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // Pass 1: greens (right letter, right place)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct';
      letterCounts[guess[i]]--; // this letter is now used up
    }
  }

  // Pass 2: yellows (right letter, wrong place) if any copies are left
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    const letter = guess[i];
    if (letterCounts[letter] > 0) {
      result[i] = 'present';
      letterCounts[letter]--;
    }
  }

  return result;
}

// Works out the colour of every keyboard key from all past guesses.
// A key only ever upgrades: absent -> present -> correct.
const RANK = { absent: 1, present: 2, correct: 3 };

export function getKeyStatuses(pastGuesses, solution) {
  const keyStatuses = {};
  pastGuesses.forEach((guess) => {
    checkGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i];
      if (!keyStatuses[letter] || RANK[status] > RANK[keyStatuses[letter]]) {
        keyStatuses[letter] = status;
      }
    });
  });
  return keyStatuses;
}