import '../../styles/words-list/WordsList.css';

const sortFunction = (a, b) => {
  if (a.clue !== '' && b.clue === '') {
    return -1;
  }
  if (b.clue !== '' && a.clue === '') {
    return 1;
  }
  return 0;
};

const WordsList = ({ words }) => {
  const displayedWords = words
    .filter((word) => {
      return word.answer.replace(/[ -]/g, '').length === 7;
    })
    .sort(sortFunction);

  return (
    <div className='words-list'>
      {displayedWords.map((wordObj, index) => (
        <div
          key={index}
          className={`word ${wordObj.clue.length > 0 && 'has-answer'}`}
        >
          {wordObj.answer}
        </div>
      ))}
    </div>
  );
};

export default WordsList;
