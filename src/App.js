import CluesListContainer from './containers/CluesListContainer';
import PanelContainer from './containers/PanelContainer';
import PuzzleContainer from './containers/PuzzleContainer';
import WordsListContainer from './containers/WordsListContainer';
import './styles/App.css';
function App() {
  return (
    <div className='App'>
      <PanelContainer
        left={<CluesListContainer />}
        center={<PuzzleContainer />}
        right={<WordsListContainer />}
      />
    </div>
  );
}

export default App;
