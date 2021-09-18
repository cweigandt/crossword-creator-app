import { AnyAction } from 'redux';

import { PuzzleType } from '../data/types/PuzzleTypes';
import templates from '../templates.json';
import { getRootSelection } from '../utilities';
import { addClueToSolution, buildSolution } from '../utilities/SolutionUtils';
import {
  addClueToElements,
  generateElements,
  transferElements,
} from '../utilities/ElementUtils';

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
    case 'TEMPLATE_UPDATED':
      const newElements = transferElements(
        state.elements,
        action.template,
        state.width,
        state.height
      );
      return {
        ...state,
        template: action.template,
        elements: newElements,
        solution: buildSolution(action.template, newElements),
      };
    case 'ADD_CLUE':
      const rootSelection = getRootSelection(
        state.elements,
        action.selection,
        action.selection.row,
        action.selection.column
      );

      if (!rootSelection) {
        return state;
      }

      return {
        ...state,
        solution: addClueToSolution(state.solution, action.clue, rootSelection),
        elements: addClueToElements(state.elements, action.clue, rootSelection),
      };

    default:
      return state;
  }
};

export default reducer;
