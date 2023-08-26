import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import ModalOverlay from "../components/modal/ModalOverlay";

import CluesListContainer from "../containers/CluesListContainer";
import PanelContainer from "../containers/PanelContainer";
import PuzzleContainer from "../containers/PuzzleContainer";
import WordsListContainer from "../containers/WordsListContainer";
import "../styles/App.css";
import { RootState } from "../reducers";
import { GridModes } from "../constants/GridModes";
import TemplateChooserContainer from "../containers/TemplateChooserContainer";
import { useEffect } from "react";
import { validateJSON } from "../utilities/RestoreUtils";
import interactionSlice from "../reducers/interactionSlice";
import puzzleSlice from "../reducers/puzzleSlice";
import wordsSlice from "../reducers/wordsSlice";

function App() {
  const mode = useSelector((state: RootState) => state.interaction.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    // Reload localStorage puzzles if they exist
    const loadedPuzzlesString = localStorage.getItem("puzzles");
    if (loadedPuzzlesString) {
      const jsonState = validateJSON(loadedPuzzlesString);
      dispatch(interactionSlice.actions.restoreState({}));
      dispatch(puzzleSlice.actions.restoreState(jsonState));
      dispatch(wordsSlice.actions.restoreState(jsonState));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <PanelContainer
        left={<CluesListContainer />}
        center={<PuzzleContainer />}
        right={
          mode === GridModes.LETTER ? (
            <WordsListContainer />
          ) : (
            <TemplateChooserContainer />
          )
        }
      />
      <ModalOverlay />
    </div>
  );
}

export default App;
