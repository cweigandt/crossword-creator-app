import { useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const GetStateButton = () => {
  const puzzle = useSelector(
    (state: RootState) => state.puzzle.puzzles[state.puzzle.currentPuzzleIndex]
  );

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(puzzle)).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }, [puzzle]);
  return (
    <div className="get-state-button" onClick={handleClick}>
      <FiDownload />
    </div>
  );
};

export default GetStateButton;
