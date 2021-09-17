import { Directions } from '../constants/Directions';
import { ElementType, PuzzleType } from '../data/types/PuzzleTypes';

export const newPuzzleObjFromTemplate = (puzzleObj: PuzzleType): PuzzleType => {
  const copy = { ...puzzleObj };
  copy.template = copy.template.map((row) => row.map((el) => el));
  delete copy['elements'];
  return copy;
};

export const copyTextToClipboard = (text: string): void => {
  if (!navigator.clipboard) {
    alert('Unable to copy to clipboard');
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
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
