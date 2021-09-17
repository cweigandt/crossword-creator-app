import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import {
  ClueType,
  ElementType,
  SolutionType,
  TemplateType,
} from '../data/types/PuzzleTypes';

const getLength = (
  template: TemplateType,
  startRow: number,
  startColumn: number,
  yStep: number,
  xStep: number
): number => {
  let currentRow = startRow;
  let currentColumn = startColumn;

  // TODO: assuming square here
  let len = 0;
  while (
    currentRow < template[0].length &&
    currentColumn < template[0].length &&
    template[currentRow][currentColumn] === 1
  ) {
    len++;
    currentRow = currentRow + xStep;
    currentColumn = currentColumn + yStep;
  }
  return len;
};

const getAcrossElement = (
  template: TemplateType,
  row: number,
  column: number,
  clueNumber: number
): ElementType | null => {
  if (template[row][column] === 0) {
    return null;
  }

  if (column > 0 && template[row][column - 1] === 1) {
    // If element to the left is on
    return null;
  }
  if (column < template[row].length - 1 && template[row][column + 1] === 1) {
    // If element to the right is on then we have an element

    const length = getLength(template, row, column, 1, 0);

    return {
      number: clueNumber,
      row,
      column,
      length,
      direction: Directions.ACROSS,
      clue: '',
      answer: '',
    };
  }

  return null;
};

const getDownElement = (
  template: TemplateType,
  row: number,
  column: number,
  clueNumber: number
): ElementType | null => {
  if (template[row][column] === 0) {
    return null;
  }

  if (row > 0 && template[row - 1][column] === 1) {
    // If element above is on
    return null;
  }

  // TODO - guessing it's a square here
  if (row < template[row].length - 1 && template[row + 1][column] === 1) {
    // If element below is on then we have an element

    const length = getLength(template, row, column, 0, 1);

    return {
      number: clueNumber,
      row,
      column,
      length,
      direction: Directions.DOWN,
      clue: '',
      answer: '',
    };
  }

  return null;
};

export const generateElements = (
  template: TemplateType,
  width: number,
  height: number
): ElementType[] => {
  const elements = [];
  let clueNumber = 1;

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      const acrossElement = getAcrossElement(
        template,
        rowIndex,
        columnIndex,
        clueNumber
      );
      const downElement = getDownElement(
        template,
        rowIndex,
        columnIndex,
        clueNumber
      );
      if (acrossElement || downElement) {
        clueNumber++;
      }

      if (acrossElement) {
        elements.push(acrossElement);
      }
      if (downElement) {
        elements.push(downElement);
      }
    }
  }

  return elements;
};

export const addClueToSolution = (
  solution: SolutionType,
  clue: ClueType,
  selection: SelectionType
): SolutionType => {
  // This function assumes row, column, and length are all appropriate for the puzzle
  const compressedAnswer = clue.answer.replace(/[ -]/g, '');

  let currentRow = selection.row;
  let currentColumn = selection.column;

  const rowStep = selection.direction === Directions.ACROSS ? 1 : 0;
  const columnStep = selection.direction === Directions.DOWN ? 1 : 0;

  for (let counter = 0; counter < compressedAnswer.length; counter++) {
    solution[currentRow][currentColumn] =
      compressedAnswer[counter].toUpperCase();
    currentRow = currentRow + columnStep;
    currentColumn = currentColumn + rowStep;
  }
  return solution;
};

export const addClueToElements = (
  elements: ElementType[],
  clue: ClueType,
  selection: SelectionType
): ElementType[] => {
  return elements.map((el) => {
    if (
      el.row === selection.row &&
      el.column === selection.column &&
      el.direction === selection.direction
    ) {
      el = {
        ...el,
        ...clue,
      };
    }
    return el;
  });
};
