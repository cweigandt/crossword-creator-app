import { SelectionType } from '../data/types/InteractionTypes';
import { ElementType } from '../data/types/PuzzleTypes';
import { getElementsForRowColumn } from './ElementUtils';

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
};
