import WordsList from '../components/words-list/WordsList';

import '../styles/containers/WordsListContainer.css';
import wordsList from '../data/allClues.json';
import { connect, useDispatch } from 'react-redux';
import { GridModes } from '../constants/GridModes';
import { useCallback } from 'react';
import { wordSelected } from '../actions/interactionActions';
import { addClue } from '../actions/puzzleActions';
import { getWordsThatFit } from '../utilities/WordsListUtils';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { SelectionType } from '../data/types/InteractionTypes';
import { RootState } from '../reducers';

type PropsType = {
  elements: ElementType[];
  mode: GridModes;
  selection: SelectionType;
  solution: SolutionType;
  selectedClue: ClueType;
};

const MAX_WORDS = 100;

const WordsListContainer = ({
  elements,
  mode,
  selection,
  solution,
  selectedClue,
}: PropsType) => {
  const dispatch = useDispatch();

  const handleWordClick = useCallback(
    (clue) => {
      dispatch(wordSelected(clue));
      dispatch(addClue(clue, selection));
    },
    [dispatch, selection]
  );

  let displayedWords = wordsList as ClueType[];

  if (mode === GridModes.LETTER) {
    displayedWords = getWordsThatFit(wordsList, elements, selection, solution);
  } else if (wordsList.length > MAX_WORDS) {
    return (
      <div className='words-list-container'>
        <div style={{ textAlign: 'center' }}>{`${wordsList.length} words`}</div>
      </div>
    );
  }

  return (
    <div className='words-list-container'>
      <WordsList
        clues={displayedWords}
        onClick={handleWordClick}
        selectedClue={selectedClue}
      />
    </div>
  );
};

export default connect((state: RootState) => ({
  elements: state.puzzle.elements,
  selection: state.interaction.selectedElement,
  solution: state.puzzle.solution,
  mode: state.interaction.mode,
  selectedClue: state.interaction.selectedClue,
}))(WordsListContainer);
