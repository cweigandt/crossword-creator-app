import { useCallback, useState } from 'react';

import Grid from '../components/grid/Grid';
import { populateElements } from '../utilities/CluesGenerator';
import { copyTextToClipboard, newPuzzleObjFromTemplate } from '../utilities';

import templates from '../templates.json';
import CountsGraph from '../components/CountsGraph';

import '../styles/containers/PuzzleContainer.css';

const PuzzleContainer = (props) => {
  const [puzzleObj, setPuzzleObj] = useState(
    populateElements(newPuzzleObjFromTemplate(templates[0]))
  );

  const handleGetJSON = useCallback(() => {
    copyTextToClipboard(JSON.stringify(puzzleObj));
  }, [puzzleObj]);

  const handleChange = useCallback(
    (puzzle) => {
      const copy = newPuzzleObjFromTemplate(puzzleObj);
      copy.puzzle = puzzle;
      populateElements(copy);
      setPuzzleObj(copy);
    },
    [puzzleObj]
  );

  return (
    <div className='puzzle-container'>
      <Grid
        template={templates[0].puzzle}
        elements={puzzleObj.elements}
        onChange={handleChange}
      ></Grid>
      <CountsGraph elements={puzzleObj.elements} />
      <button onClick={handleGetJSON}>Copy JSON</button>
    </div>
  );
};

export default PuzzleContainer;
