import { getElement } from './ElementUtils';
import { SelectionType } from '../data/types/InteractionTypes';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { addClueToSolution, visitSelectionBlocks } from './SolutionUtils';
import { getOppositeDirection } from '../constants/Directions';

const doLettersLineUp = (
  solution: SolutionType,
  word: string,
  element: ElementType
): boolean => {
  let theyLineUp = true;
  visitSelectionBlocks(element, element.length, (row, column, index) => {
    if (solution[row][column] !== '' && word[index] !== solution[row][column]) {
      theyLineUp = false;
    }
  });

  return theyLineUp;
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

let clueRanks: { [key: string]: number } = {};
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
