import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';

import Grid from '../components/grid/Grid';
import { templateUpdated } from '../actions/puzzleActions';

import CountsGraph from '../components/CountsGraph';

import '../styles/containers/PuzzleContainer.css';

const PuzzleContainer = ({ template, elements }) => {
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (updatedTemplate) => {
      dispatch(templateUpdated(updatedTemplate));
    },
    [dispatch]
  );

  return (
    <div className='puzzle-container'>
      <Grid
        template={template}
        elements={elements}
        onChange={handleChange}
      ></Grid>
      <CountsGraph elements={elements} />
    </div>
  );
};

export default connect((state) => ({
  template: state.puzzle.template,
  elements: state.puzzle.elements,
}))(PuzzleContainer);
