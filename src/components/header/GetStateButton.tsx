import { useCallback } from 'react';
import { FiDownload } from 'react-icons/fi';
import { connect } from 'react-redux';
import { PuzzleType } from '../../data/types/PuzzleTypes';
import { RootState } from '../../reducers';

type PropsType = {
  puzzle: PuzzleType;
};

const GetStateButton = ({ puzzle }: PropsType) => {
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(puzzle)).then(
      function () {
        console.log('Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Could not copy text: ', err);
      }
    );
  }, [puzzle]);
  return (
    <div className='get-state-button' onClick={handleClick}>
      <FiDownload />
    </div>
  );
};

export default connect((state: RootState) => ({
  puzzle: state.puzzle,
}))(GetStateButton);
