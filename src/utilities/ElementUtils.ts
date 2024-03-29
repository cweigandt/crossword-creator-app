import { Directions } from "../constants/Directions";
import { SelectionType } from "../data/types/InteractionTypes";
import { ClueType, ElementType, TemplateType } from "../data/types/PuzzleTypes";

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

export const removeClueFromElements = (
  elements: ElementType[],
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
        clue: "",
        answer: "",
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

const buildAcrossElement = (
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
      clue: "",
      answer: "",
    };
  }

  return null;
};

const buildDownElement = (
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
      clue: "",
      answer: "",
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

export const getLengthOfSelection = (
  template: TemplateType,
  selection: SelectionType
) => {
  if (selection.direction === Directions.ACROSS) {
    return getLength(template, selection.row, selection.column, 1, 0);
  }
  return getLength(template, selection.row, selection.column, 0, 1);
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
      const acrossElement = buildAcrossElement(
        template,
        rowIndex,
        columnIndex,
        clueNumber
      );
      const downElement = buildDownElement(
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

export const isRowColumnInElement = (
  element: ElementType,
  row: number,
  column: number
): boolean => {
  if (element.direction === Directions.ACROSS) {
    if (element.row !== row) {
      return false;
    }

    if (column >= element.column && column < element.column + element.length) {
      return true;
    }
  }
  if (element.direction === Directions.DOWN) {
    if (element.column !== column) {
      return false;
    }

    if (row >= element.row && row < element.row + element.length) {
      return true;
    }
  }

  return false;
};

export const getRowColumnIndexInElement = (
  element: ElementType,
  row: number,
  column: number
): number => {
  if (element.direction === Directions.ACROSS) {
    if (element.row !== row) {
      return -1;
    }

    if (column >= element.column && column < element.column + element.length) {
      return column - element.column;
    }
  }
  if (element.direction === Directions.DOWN) {
    if (element.column !== column) {
      return -1;
    }

    if (row >= element.row && row < element.row + element.length) {
      return row - element.row;
    }
  }

  return -1;
};

export const getElement = (
  elements: ElementType[],
  row: number,
  column: number,
  direction: Directions
): ElementType | null => {
  const possibleElements = elements.filter((el) => {
    return (
      el.direction === direction && (el.row === row || el.column === column)
    );
  });

  let foundElement = null;
  possibleElements.forEach((el) => {
    if (isRowColumnInElement(el, row, column)) {
      foundElement = el;
    }
  });

  return foundElement;
};

export const getElementsForRowColumn = (
  elements: ElementType[],
  row: number,
  column: number
): ElementType[] => {
  return elements.filter((el) => isRowColumnInElement(el, row, column));
};
