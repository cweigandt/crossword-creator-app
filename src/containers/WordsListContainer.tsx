import WordsList from '../components/words-list/WordsList';

import '../styles/containers/WordsListContainer.css';
import wordsList from '../data/allClues.json';
import { connect, useDispatch } from 'react-redux';
import { GridModes } from '../constants/GridModes';
import { useCallback } from 'react';
import { wordSelected } from '../actions/interactionActions';
import { addClue, removeClue } from '../actions/puzzleActions';
import { getWordsThatFit } from '../utilities/WordsListUtils';
import { ClueType, ElementType, SolutionType } from '../data/types/PuzzleTypes';
import { SelectionType } from '../data/types/InteractionTypes';
import { RootState } from '../reducers';
import { getElement } from '../utilities/ElementUtils';

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

  const sortFunction = (a: ClueType, b: ClueType): number => {
    if (a.clue !== '' && b.clue === '') {
      return -1;
    }
    if (b.clue !== '' && a.clue === '') {
      return 1;
    }
    return 0;
  };

  // const sortFunction = (a: ClueType, b: ClueType): number => {
  //   const aRank = memoGetClueRank(wordsList, elements, selection, solution, a);
  //   const bRank = memoGetClueRank(wordsList, elements, selection, solution, b);

  //   return aRank - bRank;
  // };

  const handleWordClick = useCallback(
    (clue) => {
      if (
        clue.clue === selectedClue.clue &&
        clue.answer === selectedClue.answer
      ) {
        const element = getElement(
          elements,
          selection.row,
          selection.column,
          selection.direction
        );
        if (element) {
          dispatch(removeClue(element));
          dispatch(wordSelected({ clue: '', answer: '' }));
        }
      } else {
        dispatch(wordSelected(clue));
        dispatch(addClue(clue, selection));
      }
    },
    [dispatch, elements, selection, selectedClue]
  );

  const handleClearClick = useCallback(
    (element) => {
      dispatch(removeClue(element));
      return false;
    },
    [dispatch]
  );

  if (selection.row === -1) {
    return null;
  }

  let displayedWords = (wordsList as ClueType[]).sort(sortFunction);
  let selectedElement = null;

  if (mode === GridModes.LETTER) {
    displayedWords = getWordsThatFit(wordsList, elements, selection, solution);
    selectedElement = getElement(
      elements,
      selection.row,
      selection.column,
      selection.direction
    );
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
        onClearClick={handleClearClick}
        selectedElement={selectedElement}
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
