import '../styles/containers/CluesListContainer.css';
import CluesList from '../components/clues-list/CluesList';
import { connect } from 'react-redux';
import { ElementType } from '../data/types/PuzzleTypes';
import { RootState } from '../reducers';

type PropsType = {
  elements: ElementType[];
};
const CluesListContainer = ({ elements }: PropsType) => {
  return (
    <div className='clues-list-container'>
      <CluesList elements={elements} />
    </div>
  );
};

export default connect((state: RootState) => ({
  elements: state.puzzle.elements,
}))(CluesListContainer);
