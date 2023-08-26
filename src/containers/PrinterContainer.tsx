import PrintReadyPuzzle from "../components/printer/PrintReadyPuzzle";
import { PuzzleType } from "../data/types/PuzzleTypes";

import "../styles/containers/PrinterContainer.css";

interface PrinterContainerProps {
  puzzles: PuzzleType[];
}

const PrinterContainer = ({ puzzles }: PrinterContainerProps) => {
  return (
    <div>
      {puzzles.map((puzzle, index) => (
        <>
          <PrintReadyPuzzle puzzle={puzzle} key={index} />
          <div className="pagebreak"></div>
        </>
      ))}
    </div>
  );
};

export default PrinterContainer;
