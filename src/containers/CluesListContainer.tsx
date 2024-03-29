import "../styles/containers/CluesListContainer.css";
import CluesList from "../components/clues-list/CluesList";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const CluesListContainer = () => {
  const elements = useSelector(
    (state: RootState) =>
      state.puzzle.present.puzzles[state.puzzle.present.currentPuzzleIndex]
        .elements
  );

  return (
    <div className="clues-list-container">
      <CluesList elements={elements} />
    </div>
  );
};

export default CluesListContainer;
