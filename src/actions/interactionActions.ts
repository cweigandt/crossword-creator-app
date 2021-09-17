import { AnyAction } from 'redux';

import { GridModes } from '../constants/GridModes';
import { ClueType, ElementType } from '../data/types/PuzzleTypes';

export const elementSelected = (selection: ElementType): AnyAction => ({
  type: 'ELEMENT_SELECTED',
  selection,
});

export const modeChanged = (mode: GridModes): AnyAction => ({
  type: 'MODE_CHANGED',
  mode,
});

export const wordSelected = (clue: ClueType): AnyAction => ({
  type: 'WORD_SELECTED',
  clue,
});
