import { getElement, getElementsForRowColumn } from "./ElementUtils";
import { SelectionType } from "../data/types/InteractionTypes";
import { ClueType, ElementType, SolutionType } from "../data/types/PuzzleTypes";
import { visitSelectionBlocks } from "./SolutionUtils";

export const doLettersLineUp = (
  solution: SolutionType,
  word: string,
  element: ElementType,
  elements: ElementType[]
): boolean => {
  let theyLineUp = true;
  visitSelectionBlocks(element, element.length, (row, column, index) => {
    const possibleElements = getElementsForRowColumn(elements, row, column);
    let oppositeElement = null;
    if (possibleElements.length > 0) {
      if (possibleElements[0].direction === element.direction) {
        oppositeElement = possibleElements[1];
      } else {
        oppositeElement = possibleElements[0];
      }
    }

    if (
      oppositeElement &&
      oppositeElement.answer !== "" &&
      word[index] !== solution[row][column]
    ) {
      // If there is a crossing element that has an answer filled in
      // AND the block isn't the same letter as our word
      // Then we don't have a match
      theyLineUp = false;
    }
  });

  return theyLineUp;
};

// Includes words that replace non-overlapping blocks
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
      return word.answer.replace(/[ -]/g, "").length === selectedElement.length;
    })
    .filter((word) => {
      return doLettersLineUp(
        solution,
        word.answer.replace(/[ -]/g, "").toUpperCase(),
        selectedElement,
        elements
      );
    });
};

export const hasWordThatFits = (
  wordsList: ClueType[],
  elements: ElementType[],
  selection: SelectionType,
  solution: SolutionType
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

  return wordsList
    .filter((word) => {
      return word.answer.replace(/[ -]/g, "").length === selectedElement.length;
    })
    .some((word) => {
      return doLettersLineUp(
        solution,
        word.answer.replace(/[ -]/g, "").toUpperCase(),
        selectedElement,
        elements
      );
    });
};

export const getWordsThatFitV2 = (
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

  let existing = "^";
  visitSelectionBlocks(
    selection,
    selectedElement.length,
    (row, column, index) => {
      existing = existing + (solution[row][column] || ".");
    }
  );

  existing = existing + "$";

  const regex = new RegExp(existing);

  return wordsList.filter((word) => {
    return word.answer.replace(/[ -]/g, "").match(regex);
  });
};
