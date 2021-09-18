import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';

import Grid from '../components/grid/Grid';
import { templateUpdated } from '../actions/puzzleActions';

import CountsGraph from '../components/CountsGraph';
import { GridModes } from '../constants/GridModes';

import '../styles/containers/PuzzleContainer.css';
import { elementSelected } from '../actions/interactionActions';
import { Directions } from '../constants/Directions';
import ModeToggle from '../components/ModeToggle';
import {
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
};
const PuzzleContainer = ({
  template,
  solution,
  elements,
  mode,
  selection,
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

          // If clicking on same block, toggle direction
          if (selection.row === row && selection.column === column) {
            newSelection.direction =
              newSelection.direction === Directions.ACROSS
                ? Directions.DOWN
                : Directions.ACROSS;
          } else {
            const possibleSelectedElements = getElementsForRowColumn(
              elements,
              row,
              column
            );

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
      <ModeToggle />
      <Grid
        template={template}
        solution={solution}
        elements={elements}
        selection={mode === GridModes.LETTER ? selection : null}
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
}))(PuzzleContainer);
