import { Directions } from '../constants/Directions';

const getLength = (template, startRow, startColumn, yStep, xStep) => {
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

const getAcrossElement = (template, row, column, clueNumber) => {
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
};

const getDownElement = (template, row, column, clueNumber) => {
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
};

export const generateElements = (template, width, height) => {
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
