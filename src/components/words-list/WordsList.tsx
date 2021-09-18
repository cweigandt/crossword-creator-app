import { ClueType } from '../../data/types/PuzzleTypes';
import '../../styles/words-list/WordsList.css';

type PropsType = {
  clues: ClueType[];
  onClick: (clueObj: ClueType) => void;
  selectedClue: ClueType;
};

const WordsList = ({ clues, onClick, selectedClue }: PropsType) => {
  return (
    <div className='words-list'>
      {clues.map((clueObj, index) => {
        const classes = ['word'];
        if (clueObj.clue.length > 0) {
          classes.push('has-answer');
        }
        if (
          clueObj.clue === selectedClue.clue &&
          clueObj.answer === selectedClue.answer
        ) {
          classes.push('selected');
        }

        return (
          <div
            key={index}
            className={classes.join(' ')}
            onClick={() => onClick(clueObj)}
          >
            {clueObj.answer}
          </div>
        );
      })}
    </div>
  );
};

export default WordsList;
