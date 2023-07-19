import { useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const GetStateButton = () => {
  const puzzleState = useSelector((state: RootState) => state.puzzle);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(puzzleState)).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }, [puzzleState]);

  return (
    <div className="get-state-button" onClick={handleClick}>
      <FiDownload />
    </div>
  );
};

export default GetStateButton;
