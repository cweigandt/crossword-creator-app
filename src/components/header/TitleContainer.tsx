import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import puzzleSlice from "../../reducers/puzzleSlice";
import interactionSlice from "../../reducers/interactionSlice";
import { GridModes } from "../../constants/GridModes";

const TitleContainer = () => {
  const dispatch = useDispatch();
  const puzzleNumber = useSelector(
    (state: RootState) => state.puzzle.currentPuzzleIndex
  );
  const puzzleCount = useSelector(
    (state: RootState) => state.puzzle.puzzles.length
  );

  const handleLeftClick = useCallback(() => {
    dispatch(puzzleSlice.actions.goToPreviousPuzzle({}));
    dispatch(interactionSlice.actions.restoreState({}));
    dispatch(interactionSlice.actions.changeMode(GridModes.LETTER));
  }, [dispatch]);

  const handleRightClick = useCallback(() => {
    dispatch(puzzleSlice.actions.goToNextPuzzle({}));
    dispatch(interactionSlice.actions.restoreState({}));
    dispatch(interactionSlice.actions.changeMode(GridModes.LETTER));
  }, [dispatch]);

  return (
    <div className="header-title">
      <div className="puzzle-arrow" onClick={handleLeftClick}>
        ⬅️
      </div>
      {`Puzzle ${puzzleNumber + 1} of ${puzzleCount}`}
      <div className="puzzle-arrow" onClick={handleRightClick}>
        ➡️
      </div>
    </div>
  );
};

export default TitleContainer;
