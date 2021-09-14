import '../../styles/clues-list/CluesList.css';

const sortFunction = (a, b) => {
  if (a.clue !== '' && b.clue === '') {
    return -1;
  }
  if (b.clue !== '' && a.clue === '') {
    return 1;
  }

  if (a.direction === 'across' && b.direction === 'down') {
    return -1;
  }

  if (b.direction === 'across' && a.direction === 'down') {
    return 1;
  }

  return a.number < b.number;
};

const makeDisplayString = (clueObj) => {
  const direction = clueObj.direction === 'across' ? 'a' : 'd';
  return `${clueObj.number}${direction}: ${clueObj.clue}`;
};

const CluesList = ({ clues }) => {
  const displayedClues = clues.sort(sortFunction);

  return (
    <div className='clues-list'>
      {displayedClues.map((clueObj, index) => (
        <div
          key={index}
          className={`element ${clueObj.clue.length > 0 && 'has-clue'}`}
        >
          {makeDisplayString(clueObj)}
        </div>
      ))}
    </div>
  );
};

export default CluesList;
