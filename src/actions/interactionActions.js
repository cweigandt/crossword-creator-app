export const elementSelected = (selection) => ({
  type: 'ELEMENT_SELECTED',
  selection,
});

export const modeChanged = (mode) => ({
  type: 'MODE_CHANGED',
  mode,
});

export const wordSelected = (clue) => ({
  type: 'WORD_SELECTED',
  clue,
});
