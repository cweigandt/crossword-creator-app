import { AnyAction } from 'redux';

import { ElementType, PuzzleType } from '../data/types/PuzzleTypes';
import templates from '../templates.json';
import { generateElements } from '../utilities/CluesGenerator';

const defaultPuzzle = templates[0];

const initialState: PuzzleType = {
  ...defaultPuzzle,
  solution: defaultPuzzle.template.map((row) => row.map(() => '')),
  elements: generateElements(
    defaultPuzzle.template,
    defaultPuzzle.width,
    defaultPuzzle.height
  ),
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'ELEMENTS_UPDATED':
      return {
        ...state,
        elements: action.elements.map((el: ElementType) => el),
      };
    case 'TEMPLATE_UPDATED':
      return {
        ...state,
        template: action.template,
        elements: generateElements(action.template, state.width, state.height),
      };

    default:
      return state;
  }
};

export default reducer;
