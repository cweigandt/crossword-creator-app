import { Directions } from '../constants/Directions';

export const newPuzzleObjFromTemplate = (puzzleObj) => {
  const copy = { ...puzzleObj };
  copy.template = copy.template.map((row) => row.map((el) => el));
  delete copy['elements'];
  return copy;
};

export const copyTextToClipboard = (text) => {
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

export const isRowColumnInElement = (element, row, column) => {
  const length = element.answer.replace(/[ -]/g, '').length;
  if (element.direction === Directions.ACROSS) {
    if (column >= element.column && column < element.column + length) {
      return true;
    }
  }
  if (element.direction === Directions.DOWN) {
    if (row >= element.row && row < element.row + length) {
      return true;
    }
  }

  return false;
};

export const getElementForRowColumn = (elements, row, column, direction) => {
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
