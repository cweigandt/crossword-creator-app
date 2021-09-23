import { AnyAction } from 'redux';

import { GridModes } from '../constants/GridModes';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType } from '../data/types/PuzzleTypes';

export const elementSelected = (selection: SelectionType): AnyAction => ({
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

export const temporaryWordSelected = (clue: ClueType): AnyAction => ({
  type: 'TEMPORARY_WORD_SELECTED',
  clue,
});

export const temporaryWordCleared = (): AnyAction => ({
  type: 'TEMPORARY_WORD_CLEARED',
});
