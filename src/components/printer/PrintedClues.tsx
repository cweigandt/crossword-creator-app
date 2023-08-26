import { Directions } from "../../constants/Directions";
import { ElementType, PuzzleType } from "../../data/types/PuzzleTypes";
import { getLengthDisplayString } from "../../utilities/WordsListUtils";

interface PrintedCluesProps {
  puzzle: PuzzleType;
}

const sortFunction = (a: ElementType, b: ElementType): number => {
  if (a.direction === Directions.ACROSS && b.direction === Directions.DOWN) {
    return -1;
  }

  if (b.direction === Directions.ACROSS && a.direction === Directions.DOWN) {
    return 1;
  }

  return a.number - b.number;
};

const makeDisplayString = (element: ElementType) => {
  const direction = element.direction === Directions.ACROSS ? "a" : "d";
  return (
    <div>
      <strong>{`${element.number}${direction}: `}</strong>
      {element.clue}
      {` (${getLengthDisplayString(element.answer)})`}
    </div>
  );
};

const PrintedClues = ({ puzzle }: PrintedCluesProps) => {
  const displayedClues: ElementType[] = [...puzzle.elements].sort(sortFunction);

  return (
    <div className="print-clues-wrapper">
      {displayedClues.map((clue) => {
        return <div key={clue.number}>{makeDisplayString(clue)}</div>;
      })}
    </div>
  );
};

export default PrintedClues;
