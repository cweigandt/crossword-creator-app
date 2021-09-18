import { ClueType, ElementType } from '../../data/types/PuzzleTypes';
import '../../styles/words-list/WordsList.css';
import { FiXCircle } from 'react-icons/fi';

type PropsType = {
  clues: ClueType[];
  onClick: (clueObj: ClueType) => void;
  onClearClick: (element: ElementType) => void;
  selectedElement: ElementType | null;
};

const WordsList = ({
  clues,
  onClick,
  onClearClick,
  selectedElement,
}: PropsType) => {
  return (
    <div className='words-list'>
      {clues.map((clueObj, index) => {
        const classes = ['word'];
        if (clueObj.clue.length > 0) {
          classes.push('has-answer');
        }
        if (
          selectedElement &&
          clueObj.clue === selectedElement.clue &&
          clueObj.answer === selectedElement.answer
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
            {classes.includes('selected') && (
              <div
                className='clear-button'
                onClick={(e) => {
                  e.stopPropagation();
                  onClearClick(selectedElement!);
                }}
              >
                <FiXCircle />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WordsList;
