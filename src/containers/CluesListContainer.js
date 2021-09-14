import '../styles/containers/CluesListContainer.css';
import CluesList from '../components/clues-list/CluesList';
import { connect } from 'react-redux';

const CluesListContainer = ({ elements }) => {
  return (
    <div className='clues-list-container'>
      <CluesList clues={elements} />
    </div>
  );
};

export default connect((state) => ({ elements: state.puzzle.elements }))(
  CluesListContainer
);
