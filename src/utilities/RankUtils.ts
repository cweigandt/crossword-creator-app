import { addClueToElements, getElement } from './ElementUtils';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { addClueToSolution, visitSelectionBlocks } from './SolutionUtils';
import { getOppositeDirection } from '../constants/Directions';
import { hasWordThatFits } from './WordsListUtils';

export const getClueRank = (
  wordsList: ClueType[],
  elements: ElementType[],
  selection: SelectionType,
  solution: SolutionType,
  clue: ClueType
): boolean => {
  const selectedElement = getElement(
    elements,
    selection.row,
    selection.column,
    selection.direction
  );

  if (!selectedElement) {
    return false;
  }

  let canSupportAllElements = true;

  const newSolution = addClueToSolution(solution, clue, selectedElement);
  const newElements = addClueToElements(elements, clue, selectedElement);

  visitSelectionBlocks(
    selectedElement,
    selectedElement.length,
    (row, column, index) => {
      const crossingElement = getElement(
        newElements,
        row,
        column,
        getOppositeDirection(selection.direction)
      );

      if (!crossingElement) {
        return;
      }

      if (crossingElement.answer === '') {
        const hasWord = hasWordThatFits(
          wordsList,
          newElements,
          crossingElement,
          newSolution
        );

        canSupportAllElements = canSupportAllElements && hasWord;
      }
    }
  );
  return canSupportAllElements;
};
