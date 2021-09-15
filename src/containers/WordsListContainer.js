import WordsList from '../components/words-list/WordsList';

import '../styles/containers/WordsListContainer.css';
import wordsList from '../data/allClues.json';
import { connect } from 'react-redux';
import { getElement } from '../utilities';
import { GridModes } from '../constants/GridModes';

const MAX_WORDS = 100;

const WordsListContainer = ({ elements, mode, selection }) => {
  let displayedWords = wordsList;

  if (mode === GridModes.LETTER) {
    const selectedElement = getElement(
      elements,
      selection.row,
      selection.column,
      selection.direction
    );

    displayedWords = selectedElement
      ? wordsList.filter((word) => {
          return (
            word.answer.replace(/[ -]/g, '').length === selectedElement.length
          );
        })
      : wordsList;
  } else if (wordsList.length > MAX_WORDS) {
    return (
      <div className='words-list-container'>
        <div style={{ textAlign: 'center' }}>{`${wordsList.length} words`}</div>
      </div>
    );
  }

  return (
    <div className='words-list-container'>
      <WordsList words={displayedWords} />
    </div>
  );
};

export default connect((state) => ({
  elements: state.puzzle.elements,
  selection: state.interaction.selectedElement,
  mode: state.interaction.mode,
}))(WordsListContainer);
