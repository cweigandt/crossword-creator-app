import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';

import Grid from '../components/grid/Grid';
import { templateUpdated } from '../actions/puzzleActions';

import CountsGraph from '../components/CountsGraph';
import GridModes from '../../constants/GridModes';

import '../styles/containers/PuzzleContainer.css';

const PuzzleContainer = ({ template, elements, mode, selection }) => {
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
      }
    },
    [dispatch, mode, template]
  );

  return (
    <div className='puzzle-container'>
      <Grid
        template={template}
        elements={elements}
        selection={selection}
        onClick={handleBlockClicked}
      ></Grid>
      <CountsGraph elements={elements} />
    </div>
  );
};

export default connect((state) => ({
  template: state.puzzle.template,
  elements: state.puzzle.elements,
  mode: state.puzzle.mode,
  selection: state.interaction.selection,
}))(PuzzleContainer);
