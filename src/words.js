// A small list of possible answers (all 5 letters, uppercase)
export const WORDS = [
  'APPLE', 'BRAVE', 'CRANE', 'DREAM', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE',
  'IMAGE', 'JOKER', 'KNIFE', 'LEMON', 'MANGO', 'NIGHT', 'OCEAN', 'PLANT',
  'QUEEN', 'RIVER', 'STONE', 'TIGER', 'UNITY', 'VIVID', 'WATER', 'YOUTH',
  'ZEBRA', 'BEACH', 'CLOUD', 'DANCE', 'EARTH', 'FRUIT', 'GHOST', 'HEART',
  'LIGHT', 'MUSIC', 'PIANO', 'SMILE', 'SUGAR', 'TRAIN', 'WORLD', 'BREAD',
];

// Pick one random word from the list
export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}