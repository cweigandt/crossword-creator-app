import { AnyAction } from 'redux';

import { Directions } from '../constants/Directions';
import { GridModes } from '../constants/GridModes';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType } from '../data/types/PuzzleTypes';

type ReducerType = {
  mode: GridModes;
  selectedElement: SelectionType;
  selectedClue: ClueType;
  temporaryClue: ClueType | null;
};

const initialState: ReducerType = {
  mode: GridModes.LETTER,
  selectedElement: {
    row: -1,
    column: -1,
    direction: Directions.ACROSS,
  },
  selectedClue: {
    clue: '',
    answer: '',
  },
  temporaryClue: null,
};

const reducer = (state: ReducerType = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'ELEMENT_SELECTED':
      return {
        ...state,
        selectedElement: action.selection,
      };
    case 'MODE_CHANGED':
      return {
        ...state,
        mode: action.mode,
      };
    case 'WORD_SELECTED':
      return {
        ...state,
        selectedClue: { ...action.clue },
      };
    case 'TEMPORARY_WORD_SELECTED':
      return {
        ...state,
        temporaryClue: { ...action.clue },
      };
    case 'TEMPORARY_WORD_CLEARED':
      return {
        ...state,
        temporaryClue: null,
      };

    case 'RESTORE_STATE':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
