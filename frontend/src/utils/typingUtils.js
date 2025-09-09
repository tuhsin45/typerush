export const calculateWPM = (correctChars, timeElapsed) => {
  const minutes = timeElapsed / 60;
  return minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
};

export const calculateAccuracy = (correctChars, totalTyped) => {
  return totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
};

export const getCharacterStatus = (originalChar, typedChar, position, currentPosition) => {
  if (position > currentPosition) {
    return 'untyped';
  } else if (position === currentPosition) {
    return 'current';
  } else if (originalChar === typedChar) {
    return 'correct';
  } else {
    return 'incorrect';
  }
};

export const formatTime = (seconds) => {
  return seconds.toString().padStart(2, '0');
};
