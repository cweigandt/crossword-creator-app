import { useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const GetStateButton = () => {
  const puzzlesState = useSelector(
    (state: RootState) => state.puzzle.present.puzzles
  );

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(puzzlesState)).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }, [puzzlesState]);

  return (
    <div className="get-state-button" onClick={handleClick}>
      <FiDownload />
    </div>
  );
};

export default GetStateButton;
