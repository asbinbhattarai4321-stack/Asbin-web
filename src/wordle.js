import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRandomWord } from './words';
import { WORD_LENGTH, MAX_GUESSES } from './data';
import { getKeyStatuses } from './utils';

// Holds all the game state and rules in one place
export default function useWordle() {
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // 'IN_PROGRESS' | 'WON' | 'LOST'
  const [message, setMessage] = useState('');

  // Keyboard colours are calculated from the guesses, so they never go out of sync
  const keyStatuses = useMemo(
    () => getKeyStatuses(pastGuesses, solutionWord),
    [pastGuesses, solutionWord]
  );

  // Clear the small message after a short time
  useEffect(() => {
    if (!message) return;
    const timerId = setTimeout(() => setMessage(''), 1200);
    return () => clearTimeout(timerId);
  }, [message]);

  // One function for both the physical and the on-screen keyboard
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS') return; // input stops after win or loss

      if (key === 'Enter') {
        if (currentGuess.length !== WORD_LENGTH) {
          setMessage('Not enough letters');
          return;
        }
        const updatedGuesses = [...pastGuesses, currentGuess]; // copy, do not mutate
        setPastGuesses(updatedGuesses);
        setCurrentGuess('');
        if (currentGuess === solutionWord) {
          setGameStatus('WON');
        } else if (updatedGuesses.length === MAX_GUESSES) {
          setGameStatus('LOST');
        }
      } else if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(key)) {
        setCurrentGuess((prev) =>
          prev.length < WORD_LENGTH ? prev + key.toUpperCase() : prev
        );
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord]
  );

  // Start a fresh game with a new word
  const resetGame = useCallback(() => {
    setSolutionWord(getRandomWord());
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setMessage('');
  }, []);

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    keyStatuses,
    message,
    handleKey,
    resetGame,
  };
}