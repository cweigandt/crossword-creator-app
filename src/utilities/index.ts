import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import { ElementType, PuzzleType } from '../data/types/PuzzleTypes';

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

export const getRootSelection = (
  elements: ElementType[],
  selection: SelectionType,
  row: number,
  column: number
): SelectionType | null => {
  const possibleElements = getElementsForRowColumn(elements, row, column);

  if (possibleElements.length === 0) {
    console.error(`Did not find element for block ${row} ${column}`);
    return null;
  } else if (possibleElements.length === 1) {
    return {
      row: possibleElements[0].row,
      column: possibleElements[0].column,
      direction: selection.direction,
    };
  } else {
    // Down and Across both have clues
    if (possibleElements[0].direction === selection.direction) {
      return {
        row: possibleElements[0].row,
        column: possibleElements[0].column,
        direction: selection.direction,
      };
    } else {
      return {
        row: possibleElements[1].row,
        column: possibleElements[1].column,
        direction: selection.direction,
      };
    }
  }
  return null;
};
