import WordsList from "../components/words-list/WordsList";

import "../styles/containers/WordsListContainer.css";
import wordsList from "../data/allClues.json";
import { connect, useDispatch } from "react-redux";
import { GridModes } from "../constants/GridModes";
import { useCallback, useEffect, useState } from "react";
import { getWordsThatFit } from "../utilities/WordsListUtils";
import { ClueType, ElementType, SolutionType } from "../data/types/PuzzleTypes";
import { SelectionType } from "../data/types/InteractionTypes";
import { RootState } from "../reducers";
import { getElement } from "../utilities/ElementUtils";
import interactionSlice from "../reducers/interactionSlice";
import puzzleSlice from "../reducers/puzzleSlice";

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
  const [clueList, setClueList] = useState(wordsList as ClueType[]);
  const [displayedWords, setDisplayedWords] = useState(wordsList as ClueType[]);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(
    null
  );

  const sortFunction = (a: ClueType, b: ClueType): number => {
    // if (a.clue === selectedClue.clue && a.answer === selectedClue.answer) {
    //   return -1;
    // }
    // if (b.clue === selectedClue.clue && b.answer === selectedClue.answer) {
    //   return 1;
    // }

    if (a.clue !== "" && b.clue === "") {
      return -1;
    }
    if (b.clue !== "" && a.clue === "") {
      return 1;
    }
    return 0;
  };

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
          dispatch(puzzleSlice.actions.removeClue(element));
          dispatch(
            interactionSlice.actions.selectWord({ clue: "", answer: "" })
          );
        }
      } else {
        dispatch(interactionSlice.actions.selectWord(clue));
        dispatch(puzzleSlice.actions.addClue({ clue, selection }));
      }
    },
    [dispatch, elements, selection, selectedClue]
  );

  const handleClearClick = useCallback(
    (element) => {
      dispatch(puzzleSlice.actions.removeClue(element));
      return false;
    },
    [dispatch]
  );

  const handleMouseEnter = useCallback(
    (clueObj) => {
      if (selection.row >= 0 && selection.column >= 0) {
        dispatch(interactionSlice.actions.temporarilySelectWord(clueObj));
      }
    },
    [dispatch, selection]
  );

  const handleMouseLeave = useCallback(
    (__clueObj) => {
      if (selection.row >= 0 && selection.column >= 0) {
        dispatch(interactionSlice.actions.clearTemporarilySelectedWord({}));
      }
    },
    [dispatch, selection]
  );

  useEffect(() => {
    if (mode === GridModes.LETTER) {
      const newWords = getWordsThatFit(clueList, elements, selection, solution);
      setSelectedElement(
        getElement(
          elements,
          selection.row,
          selection.column,
          selection.direction
        )
      );

      setDisplayedWords(newWords.sort(sortFunction));
    }
  }, [mode, selection, elements, solution, clueList]);

  if (selection.row === -1) {
    return null;
  }

  if (mode === GridModes.TEMPLATE && wordsList.length > MAX_WORDS) {
    return (
      <div className="words-list-container">
        <div style={{ textAlign: "center" }}>{`${wordsList.length} words`}</div>
      </div>
    );
  }

  return (
    <div className="words-list-container">
      <WordsList
        clues={displayedWords}
        onClick={handleWordClick}
        onClearClick={handleClearClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        selectedElement={selectedElement}
      />
    </div>
  );
};

export default connect((state: RootState) => ({
  elements: state.puzzle.puzzles[state.puzzle.currentPuzzleIndex].elements,
  selection: state.interaction.selectedElement,
  solution: state.puzzle.puzzles[state.puzzle.currentPuzzleIndex].solution,
  mode: state.interaction.mode,
  selectedClue: state.interaction.selectedClue,
}))(WordsListContainer);
