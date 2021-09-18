import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import {
  ClueType,
  ElementType,
  SolutionType,
  TemplateType,
} from '../data/types/PuzzleTypes';
import { getElementsForRowColumn } from './ElementUtils';

export const visitSelectionBlocks = (
  selection: SelectionType,
  length: number,
  visitorFunction: (row: number, column: number, index: number) => void
) => {
  let currentRow = selection.row;
  let currentColumn = selection.column;

  const rowStep = selection.direction === Directions.ACROSS ? 1 : 0;
  const columnStep = selection.direction === Directions.DOWN ? 1 : 0;

  for (let counter = 0; counter < length; counter++) {
    visitorFunction(currentRow, currentColumn, counter);

    currentRow = currentRow + columnStep;
    currentColumn = currentColumn + rowStep;
  }
};

export const addClueToSolution = (
  solution: SolutionType,
  clue: ClueType,
  selection: SelectionType // Has to be a root selection
): SolutionType => {
  const solutionCopy = solution.map((row) => row.map((el) => el));

  // This function assumes row, column, and length are all appropriate for the puzzle
  const compressedAnswer = clue.answer.replace(/[ -]/g, '');

  visitSelectionBlocks(
    selection,
    compressedAnswer.length,
    (row, column, counter) => {
      solutionCopy[row][column] = compressedAnswer[counter].toUpperCase();
    }
  );

  return solutionCopy;
};

export const removeSelectionFromSolution = (
  solution: SolutionType,
  elements: ElementType[],
  selection: SelectionType // Has to be a root selection
): SolutionType => {
  const solutionCopy = solution.map((row) => row.map((el) => el));

  // Step through solution until hitting the edge or a ''
  let stopFlag = false;
  visitSelectionBlocks(selection, 15, (row, column, counter) => {
    if (row >= 15 || column >= 15 || solutionCopy[row][column] === '') {
      stopFlag = true;
    }
    if (stopFlag) {
      return;
    }

    const possibleElements = getElementsForRowColumn(elements, row, column);
    let oppositeElement = null;
    if (possibleElements.length > 0) {
      if (possibleElements[0].direction === selection.direction) {
        oppositeElement = possibleElements[1];
      } else {
        oppositeElement = possibleElements[0];
      }
    }

    if (!oppositeElement || oppositeElement.answer === '') {
      solutionCopy[row][column] = '';
    }
  });

  return solutionCopy;
};

export const buildSolution = (
  template: TemplateType,
  elements: ElementType[]
): SolutionType => {
  let solution = template.map((row) => row.map(() => ''));
  elements.forEach((el) => {
    solution = addClueToSolution(solution, { ...el }, { ...el });
  });
  return solution;
};
