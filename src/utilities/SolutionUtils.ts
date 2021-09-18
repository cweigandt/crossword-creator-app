import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import {
  ClueType,
  ElementType,
  SolutionType,
  TemplateType,
} from '../data/types/PuzzleTypes';

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
