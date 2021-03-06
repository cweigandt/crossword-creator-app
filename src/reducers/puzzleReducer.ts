import { AnyAction } from 'redux';

import { PuzzleType } from '../data/types/PuzzleTypes';
import templates from '../templates.json';
import { getRootSelection } from '../utilities/SelectionUtils';
import {
  addClueToSolution,
  buildSolution,
  removeSelectionFromSolution,
} from '../utilities/SolutionUtils';
import {
  addClueToElements,
  generateElements,
  removeClueFromElements,
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
      return handleTemplateUpdated(state, action);

    case 'ADD_CLUE':
      return handleAddClue(state, action);

    case 'REMOVE_CLUE':
      return handleRemoveClue(state, action);

    case 'RESTORE_STATE':
      return handleRestoreState(state, action);

    case 'REMOVE_ALL_CLUES':
      return handleRemoveAllClues(state);

    default:
      return state;
  }
};

var handleTemplateUpdated = (
  state: PuzzleType,
  action: AnyAction
): PuzzleType => {
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
};

var handleAddClue = (state: PuzzleType, action: AnyAction): PuzzleType => {
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
};

var handleRemoveClue = (state: PuzzleType, action: AnyAction): PuzzleType => {
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
    solution: removeSelectionFromSolution(
      state.solution,
      state.elements,
      rootSelection
    ),
    elements: removeClueFromElements(state.elements, rootSelection),
  };
};

var handleRestoreState = (state: PuzzleType, action: AnyAction): PuzzleType => {
  return {
    ...initialState,
    ...action.puzzle,
  };
};

var handleRemoveAllClues = (state: PuzzleType): PuzzleType => {
  return {
    ...state,
    solution: state.solution.map((row) => row.map(() => '')),
    elements: state.elements.map((el) => ({ ...el, clue: '', answer: '' })),
  };
};

export default reducer;
