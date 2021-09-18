import { Directions } from '../../constants/Directions';
import { ElementType } from '../../data/types/PuzzleTypes';
import '../../styles/clues-list/CluesList.css';

type PropsType = {
  elements: ElementType[];
};

const sortFunction = (a: ElementType, b: ElementType): number => {
  if (a.direction === Directions.ACROSS && b.direction === Directions.DOWN) {
    return -1;
  }

  if (b.direction === Directions.ACROSS && a.direction === Directions.DOWN) {
    return 1;
  }

  return a.number - b.number;
};

const makeDisplayString = (element: ElementType): string => {
  const direction = element.direction === Directions.ACROSS ? 'a' : 'd';
  return `${element.number}${direction}: ${element.clue} (${element.answer})`;
};

const CluesList = ({ elements }: PropsType) => {
  const displayedClues: ElementType[] = elements.sort(sortFunction);

  return (
    <div className='clues-list'>
      <div className='clue-count'>{`${elements.length} clues`}</div>

      {displayedClues.map((element, index) => (
        <div
          key={index}
          className={`element ${element.clue.length > 0 && 'has-clue'}`}
        >
          {makeDisplayString(element)}
        </div>
      ))}
    </div>
  );
};

export default CluesList;
