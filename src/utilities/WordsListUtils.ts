import { getElement } from '.';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';

const doLettersLineUp = (
  solution: SolutionType,
  word: string,
  element: ElementType
): boolean => {
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
      return doLettersLineUp(solution, word.answer, selectedElement);
    });
};
