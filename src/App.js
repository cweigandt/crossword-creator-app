import PanelContainer from './containers/PanelContainer';
import PuzzleContainer from './containers/PuzzleContainer';
import './styles/App.css';
function App() {
  return (
    <div className='App'>
      <PanelContainer
        left={<div></div>}
        center={<PuzzleContainer />}
        right={<div></div>}
      />
    </div>
  );
}

export default App;
