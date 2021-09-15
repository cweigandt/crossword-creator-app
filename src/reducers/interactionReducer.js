import { Directions } from '../constants/Directions';

const initialState = {
  selectedElement: {
    row: -1,
    column: -1,
    direction: Directions.ACROSS,
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ELEMENT_SELECTED':
      return {
        ...state,
        selectedElement: action.selection,
      };

    default:
      return state;
  }
};

export default reducer;
