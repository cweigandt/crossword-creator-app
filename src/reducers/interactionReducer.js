import { Directions } from '../constants/Directions';
import { GridModes } from '../constants/GridModes';

const initialState = {
  mode: GridModes.TEMPLATE,
  selectedElement: {
    row: -1,
    column: -1,
    direction: Directions.ACROSS,
  },
  selectedClue: {},
};
const reducer = (state = initialState, action) => {
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
