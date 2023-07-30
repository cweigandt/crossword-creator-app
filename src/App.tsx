import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import ModalOverlay from "./components/modal/ModalOverlay";

import CluesListContainer from "./containers/CluesListContainer";
import PanelContainer from "./containers/PanelContainer";
import PuzzleContainer from "./containers/PuzzleContainer";
import WordsListContainer from "./containers/WordsListContainer";
import "./styles/App.css";
import { RootState } from "./reducers";
import { GridModes } from "./constants/GridModes";
import TemplateChooserContainer from "./containers/TemplateChooserContainer";

function App() {
  const mode = useSelector((state: RootState) => state.interaction.mode);

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
