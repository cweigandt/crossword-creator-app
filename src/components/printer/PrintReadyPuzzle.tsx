import { PuzzleType } from "../../data/types/PuzzleTypes";
import Grid from "../grid/Grid";
import PrintedClues from "./PrintedClues";

import "../../styles/printer/PrintReadyPuzzle.css";

interface PrintReadyPuzzleProps {
  puzzle: PuzzleType;
}

const PrintReadyPuzzle = ({ puzzle }: PrintReadyPuzzleProps) => {
  return (
    <div className="print-puzzle-wrapper">
      <Grid
        template={puzzle.template}
        elements={puzzle.elements}
        selection={null}
        temporaryClue={null}
        onClick={null}
      />
      <PrintedClues puzzle={puzzle} />
    </div>
  );
};

export default PrintReadyPuzzle;
