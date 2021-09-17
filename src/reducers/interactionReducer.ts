import { AnyAction } from 'redux';

import { Directions } from '../constants/Directions';
import { GridModes } from '../constants/GridModes';
import { ClueType } from '../data/types/PuzzleTypes';

type ReducerType = {
  mode: GridModes;
  selectedElement: {
    row: number;
    column: number;
    direction: Directions;
  };
  selectedClue: ClueType;
};

const initialState: ReducerType = {
  mode: GridModes.TEMPLATE,
  selectedElement: {
    row: -1,
    column: -1,
    direction: Directions.ACROSS,
  },
  selectedClue: {
    clue: '',
    answer: '',
  },
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

    default:
      return state;
  }
};

export default reducer;
