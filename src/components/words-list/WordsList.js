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

const WordsList = ({ clues, onClick, selectedClue }) => {
  const displayedWords = clues.sort(sortFunction);

  return (
    <div className='words-list'>
      {displayedWords.map((wordObj, index) => {
        const classes = ['word'];
        if (wordObj.clue.length > 0) {
          classes.push('has-answer');
        }
        if (
          wordObj.clue === selectedClue.clue &&
          wordObj.answer === selectedClue.answer
        ) {
          classes.push('selected');
        }

        return (
          <div
            key={index}
            className={classes.join(' ')}
            onClick={() => onClick(wordObj)}
          >
            {wordObj.answer}
          </div>
        );
      })}
    </div>
  );
};

export default WordsList;
