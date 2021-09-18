import { getElement } from './ElementUtils';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { addClueToSolution, visitSelectionBlocks } from './SolutionUtils';
import { getOppositeDirection } from '../constants/Directions';
import { getWordsThatFit } from './WordsListUtils';

let clueRanks: { [key: string]: number } = {};

export const getClueRank = (
  wordsList: ClueType[],
  elements: ElementType[],
  selection: SelectionType,
  solution: SolutionType,
  clue: ClueType
): number => {
  let crossingCount = 0;

  const newSolution = addClueToSolution(solution, clue, selection);

  const selectedElement = getElement(
    elements,
    selection.row,
    selection.column,
    selection.direction
  );

  if (!selectedElement) {
    return 0;
  }

  visitSelectionBlocks(
    selection,
    selectedElement.length,
    (row, column, index) => {
      const crossingElement = getElement(
        elements,
        row,
        column,
        getOppositeDirection(selection.direction)
      );

      if (!crossingElement) {
        return;
      }

      if (crossingElement.answer === '') {
        const possibleElements = getWordsThatFit(
          wordsList,
          elements,
          crossingElement,
          newSolution
        );

        crossingCount = crossingCount + possibleElements.length;
      }
    }
  );
  return crossingCount;
};

export const memoGetClueRank = (
  wordsList: ClueType[],
  elements: ElementType[],
  selection: SelectionType,
  solution: SolutionType,
  clue: ClueType
) => {
  if (!clueRanks.hasOwnProperty(clue.answer)) {
    clueRanks[clue.answer] = getClueRank(
      wordsList,
      elements,
      selection,
      solution,
      clue
    );
  }
  return clueRanks[clue.answer];
};

export const clearClueRanks = () => {
  clueRanks = {};
};
