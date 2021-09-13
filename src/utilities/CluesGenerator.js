const getLength = (puzzle, startRow, startColumn, yStep, xStep) => {
  let currentRow = startRow;
  let currentColumn = startColumn;

  // TODO: assuming square here
  let len = 0;
  while (
    currentRow < puzzle[0].length &&
    currentColumn < puzzle[0].length &&
    puzzle[currentRow][currentColumn] === 1
  ) {
    len++;
    currentRow = currentRow + xStep;
    currentColumn = currentColumn + yStep;
  }
  return len;
};

const getAcrossElement = (puzzle, row, column, clueNumber) => {
  if (puzzle[row][column] === 0) {
    return null;
  }

  if (column > 0 && puzzle[row][column - 1] === 1) {
    // If element to the left is on
    return null;
  }
  if (column < puzzle[row].length - 1 && puzzle[row][column + 1] === 1) {
    // If element to the right is on then we have an element

    const length = getLength(puzzle, row, column, 1, 0);

    return {
      number: clueNumber,
      row,
      column,
      length,
      direction: 'across',
      clue: '',
      answer: '',
    };
  }
};

const getDownElement = (puzzle, row, column, clueNumber) => {
  if (puzzle[row][column] === 0) {
    return null;
  }

  if (row > 0 && puzzle[row - 1][column] === 1) {
    // If element above is on
    return null;
  }

  // TODO - guessing it's a square here
  if (row < puzzle[row].length - 1 && puzzle[row + 1][column] === 1) {
    // If element below is on then we have an element

    const length = getLength(puzzle, row, column, 0, 1);

    return {
      number: clueNumber,
      row,
      column,
      length,
      direction: 'down',
      clue: '',
      answer: '',
    };
  }
};

export const populateElements = (puzzleObj) => {
  const elements = [];
  let clueNumber = 1;

  for (let rowIndex = 0; rowIndex < puzzleObj.height; rowIndex++) {
    for (let columnIndex = 0; columnIndex < puzzleObj.width; columnIndex++) {
      const acrossElement = getAcrossElement(
        puzzleObj.puzzle,
        rowIndex,
        columnIndex,
        clueNumber
      );
      const downElement = getDownElement(
        puzzleObj.puzzle,
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

  puzzleObj.elements = elements;
  return puzzleObj;
};
