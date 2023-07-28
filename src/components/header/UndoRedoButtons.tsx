import { useDispatch, useSelector } from "react-redux";

import { ActionCreators } from "redux-undo";
import { RootState } from "../../reducers";
import interactionSlice from "../../reducers/interactionSlice";

const UndoRedoButtons = () => {
  const dispatch = useDispatch();
  const puzzleUndoRedoState = useSelector((state: RootState) => state.puzzle);

  return (
    <div style={{ position: "absolute", left: "20px" }}>
      <button
        style={{ cursor: "pointer" }}
        disabled={puzzleUndoRedoState.past.length === 0}
        onClick={() => {
          dispatch(ActionCreators.undo());
          dispatch(interactionSlice.actions.restoreState({}));
        }}
      >
        ↩️
      </button>
      <button
        style={{ cursor: "pointer" }}
        disabled={puzzleUndoRedoState.future.length === 0}
        onClick={() => {
          dispatch(ActionCreators.redo());
          dispatch(interactionSlice.actions.restoreState({}));
        }}
      >
        ↪️
      </button>
    </div>
  );
};

export default UndoRedoButtons;
