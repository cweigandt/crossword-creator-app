import { GridModes } from '../constants/GridModes';
import { ClueType, ElementType } from '../data/types/PuzzleTypes';

export const elementSelected = (selection: ElementType) => ({
  type: 'ELEMENT_SELECTED',
  selection,
});

export const modeChanged = (mode: GridModes) => ({
  type: 'MODE_CHANGED',
  mode,
});

export const wordSelected = (clue: ClueType) => ({
  type: 'WORD_SELECTED',
  clue,
});
