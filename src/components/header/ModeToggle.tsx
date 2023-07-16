import { connect, useDispatch } from "react-redux";
import { FiEdit, FiSquare } from "react-icons/fi";

import "../../styles/header/ModeToggle.css";
import { GridModes } from "../../constants/GridModes";
import { RootState } from "../../reducers";
import interactionSlice from "../../reducers/interactionSlice";

type PropTypes = {
  mode: GridModes;
};

const ModeToggle = ({ mode }: PropTypes) => {
  const dispatch = useDispatch();

  return (
    <div className="mode-toggle">
      <div
        className={`mode template-mode ${
          mode === GridModes.TEMPLATE ? "selected" : ""
        }`}
        onClick={() => {
          dispatch(interactionSlice.actions.changeMode(GridModes.TEMPLATE));
        }}
      >
        <FiSquare />
      </div>
      <div
        className={`mode letter-mode ${
          mode === GridModes.LETTER ? "selected" : ""
        }`}
        onClick={() => {
          dispatch(interactionSlice.actions.changeMode(GridModes.LETTER));
        }}
      >
        <FiEdit />
      </div>
    </div>
  );
};

export default connect((state: RootState) => ({
  mode: state.interaction.mode,
}))(ModeToggle);
