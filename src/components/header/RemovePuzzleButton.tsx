import { useDispatch } from "react-redux";

import "../../styles/header/ClearCluesButton.css";
import puzzleSlice from "../../reducers/puzzleSlice";
import ProgressButton from "../widgets/ProgressButton";

const RemovePuzzleButton = () => {
  const dispatch = useDispatch();

  return (
    <ProgressButton
      color="black"
      text="Remove Puzzle"
      onComplete={() => dispatch(puzzleSlice.actions.removeCurrentPuzzle({}))}
    />
  );
};

export default RemovePuzzleButton;
