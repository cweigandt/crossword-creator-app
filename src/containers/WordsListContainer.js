import WordsList from '../components/words-list/WordsList';

import '../styles/containers/WordsListContainer.css';
import wordsList from '../data/allClues.json';

const WordsListContainer = () => {
  return (
    <div className='words-list-container'>
      <WordsList words={wordsList} />
    </div>
  );
};

export default WordsListContainer;
