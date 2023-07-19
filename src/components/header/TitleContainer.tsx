import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import puzzleSlice from "../../reducers/puzzleSlice";

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
  }, [dispatch]);

  const handleRightClick = useCallback(() => {
    dispatch(puzzleSlice.actions.goToNextPuzzle({}));
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
