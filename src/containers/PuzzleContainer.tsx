import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';

import Grid from '../components/grid/Grid';
import { templateUpdated } from '../actions/puzzleActions';

import CountsGraph from '../components/CountsGraph';
import { GridModes } from '../constants/GridModes';

import '../styles/containers/PuzzleContainer.css';
import { elementSelected } from '../actions/interactionActions';
import { getOppositeDirection } from '../constants/Directions';
import {
  ClueType,
  ElementType,
  SolutionType,
  TemplateType,
} from '../data/types/PuzzleTypes';
import { SelectionType } from '../data/types/InteractionTypes';
import { RootState } from '../reducers';
import { getElementsForRowColumn } from '../utilities/ElementUtils';

type PropsType = {
  template: TemplateType;
  solution: SolutionType;
  elements: ElementType[];
  mode: GridModes;
  selection: SelectionType;
  temporaryClue: ClueType | null;
};
const PuzzleContainer = ({
  template,
  solution,
  elements,
  mode,
  selection,
  temporaryClue,
}: PropsType) => {
  const dispatch = useDispatch();

  const handleBlockClicked = useCallback(
    (row, column) => {
      if (mode === GridModes.TEMPLATE) {
        const updatedTemplate = template.map((row) => row.map((el) => el));
        updatedTemplate[row][column] = Math.abs(
          updatedTemplate[row][column] - 1
        ); // 1 -> 0, 0 -> -1 -> 1
        dispatch(templateUpdated(updatedTemplate));
      }

      if (mode === GridModes.LETTER) {
        if (template[row][column] === 1) {
          let newSelection = { ...selection };
          const possibleSelectedElements = getElementsForRowColumn(
            elements,
            row,
            column
          );

          // If clicking on same block, toggle direction
          if (selection.row === row && selection.column === column) {
            if (possibleSelectedElements.length === 2) {
              // If there is the ability to change direction
              newSelection.direction = getOppositeDirection(
                newSelection.direction
              );
            }
          } else {
            if (possibleSelectedElements.length === 0) {
              console.error(`Did not find element for block ${row} ${column}`);
            } else if (possibleSelectedElements.length === 1) {
              newSelection = {
                row,
                column: column,
                direction: possibleSelectedElements[0].direction,
              };
            } else {
              // Down and Across both have clues, default to current direction
              newSelection = {
                row,
                column,
                direction: selection.direction,
              };
            }
          }

          dispatch(elementSelected(newSelection));
        }
      }
    },
    [dispatch, elements, mode, selection, template]
  );

  return (
    <div className='puzzle-container'>
      <Grid
        template={template}
        solution={solution}
        elements={elements}
        selection={mode === GridModes.LETTER ? selection : null}
        temporaryClue={temporaryClue}
        onClick={handleBlockClicked}
      ></Grid>
      <CountsGraph elements={elements} />
    </div>
  );
};

export default connect((state: RootState) => ({
  template: state.puzzle.template,
  solution: state.puzzle.solution,
  elements: state.puzzle.elements,
  mode: state.interaction.mode,
  selection: state.interaction.selectedElement,
  temporaryClue: state.interaction.temporaryClue,
}))(PuzzleContainer);
