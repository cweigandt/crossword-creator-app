import Header from './components/header/Header';
import ModalOverlay from './components/modal/ModalOverlay';

import CluesListContainer from './containers/CluesListContainer';
import PanelContainer from './containers/PanelContainer';
import PuzzleContainer from './containers/PuzzleContainer';
import WordsListContainer from './containers/WordsListContainer';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <PanelContainer
        left={<CluesListContainer />}
        center={<PuzzleContainer />}
        right={<WordsListContainer />}
      />
      <ModalOverlay />
    </div>
  );
}

export default App;
