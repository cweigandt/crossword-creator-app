import { connect, useDispatch } from 'react-redux';
import { FiEdit, FiSquare } from 'react-icons/fi';

import '../styles/ModeToggle.css';
import { GridModes } from '../constants/GridModes';
import { modeChanged } from '../actions/interactionActions';
import { RootState } from '../reducers';

type PropTypes = {
  mode: GridModes;
};

const ModeToggle = ({ mode }: PropTypes) => {
  const dispatch = useDispatch();

  return (
    <div className='mode-toggle'>
      <div
        className={`mode template-mode ${
          mode === GridModes.TEMPLATE ? 'selected' : ''
        }`}
        onClick={() => {
          dispatch(modeChanged(GridModes.TEMPLATE));
        }}
      >
        <FiSquare />
      </div>
      <div
        className={`mode letter-mode ${
          mode === GridModes.LETTER ? 'selected' : ''
        }`}
        onClick={() => {
          dispatch(modeChanged(GridModes.LETTER));
        }}
      >
        <FiEdit />
      </div>
    </div>
  );
};

export default connect((state: RootState) => ({
  mode: state.interaction.mode,
}))(ModeToggle);
