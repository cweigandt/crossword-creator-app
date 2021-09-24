import { useDispatch } from 'react-redux';
import { removeAllClues } from '../../actions/puzzleActions';

import '../../styles/header/ClearCluesButton.css';
import ProgressButton from '../widgets/ProgressButton';

const ClearCluesButton = () => {
  const dispatch = useDispatch();

  return (
    <ProgressButton
      color='red'
      text='Clear Clues'
      onComplete={() => dispatch(removeAllClues())}
    />
  );
};

export default ClearCluesButton;
