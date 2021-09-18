import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, TemplateType } from '../data/types/PuzzleTypes';

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

export const findElement = (
  elements: ElementType[],
  elementToFind: ElementType
): ElementType | undefined => {
  return elements.find((el) => {
    return (
      el.row === elementToFind.row &&
      el.column === elementToFind.column &&
      el.direction === elementToFind.direction &&
      el.length === elementToFind.length
    );
  });
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

export const transferElements = (
  oldElements: ElementType[],
  newTemplate: TemplateType,
  width: number,
  height: number
): ElementType[] => {
  const newElements = generateElements(newTemplate, width, height);

  return newElements.map((newEl) => {
    const preExistingElement = findElement(oldElements, newEl);
    if (preExistingElement) {
      newEl.clue = preExistingElement.clue;
      newEl.answer = preExistingElement.answer;
      newEl.length = preExistingElement.length;
    }
    return newEl;
  });
};
