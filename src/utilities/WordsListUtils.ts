import { getElement } from './ElementUtils';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { visitSelectionBlocks } from './SolutionUtils';

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

  let existing = '^';
  visitSelectionBlocks(
    selection,
    selectedElement.length,
    (row, column, index) => {
      existing = existing + (solution[row][column] || '.');
    }
  );

  existing = existing + '$';

  const regex = new RegExp(existing);

  return wordsList.filter((word) => {
    return word.answer.replace(/[ -]/g, '').match(regex);
  });
};
