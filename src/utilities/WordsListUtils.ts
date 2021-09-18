import { getElement } from '.';
import { Directions } from '../constants/Directions';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';

const doLettersLineUp = (
  solution: SolutionType,
  word: string,
  element: ElementType
): boolean => {
  let currentRow = element.row;
  let currentColumn = element.column;

  const rowStep = element.direction === Directions.ACROSS ? 1 : 0;
  const columnStep = element.direction === Directions.DOWN ? 1 : 0;

  for (let counter = 0; counter < element.length; counter++) {
    if (
      solution[currentRow][currentColumn] !== '' &&
      word[counter] !== solution[currentRow][currentColumn]
    ) {
      return false;
    }
    currentRow = currentRow + columnStep;
    currentColumn = currentColumn + rowStep;
  }
  return true;
};

export const getWordsThatFit = (
  wordsList: ClueType[],
  elements: ElementType[],
  selection: SelectionType,
  solution: SolutionType
): ClueType[] => {
  const selectedElement = getElement(
    elements,
    selection.row,
    selection.column,
    selection.direction
  );

  if (!selectedElement) {
    return [];
  }

  return wordsList
    .filter((word) => {
      return word.answer.replace(/[ -]/g, '').length === selectedElement.length;
    })
    .filter((word) => {
      return doLettersLineUp(
        solution,
        word.answer.replace(/[ -]/g, '').toUpperCase(),
        selectedElement
      );
    });
};
