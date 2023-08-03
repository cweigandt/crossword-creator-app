import { useDispatch } from "react-redux";

import "../../styles/header/ClearCluesButton.css";
import ProgressButton from "../widgets/ProgressButton";
import puzzleSlice from "../../reducers/puzzleSlice";

const ClearCluesButton = () => {
  const dispatch = useDispatch();

  return (
    <ProgressButton
      color="red"
      text="Clear Clues"
      onComplete={() => dispatch(puzzleSlice.actions.removeAllClues({}))}
    />
  );
};

export default ClearCluesButton;
