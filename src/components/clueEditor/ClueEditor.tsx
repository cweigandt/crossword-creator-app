import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getElement, getLengthOfSelection } from "../../utilities/ElementUtils";

import "../../styles/clueEditor/ClueEditor.css";
import wordsSlice from "../../reducers/wordsSlice";
import interactionSlice from "../../reducers/interactionSlice";
import puzzleSlice from "../../reducers/puzzleSlice";
import { getRootSelection } from "../../utilities/SelectionUtils";
import { doLettersLineUp } from "../../utilities/WordsListUtils";

const ALPHABET_REGEX = /^[A-Za-z -]*$/;

const trimValue = (value: string) => {
  return value.replace(/[ -]/g, "");
};
const ClueEditor = () => {
  const dispatch = useDispatch();

  const selectedClue = useSelector(
    (state: RootState) => state.interaction.selectedClue
  );
  const selectedElement = useSelector(
    (state: RootState) => state.interaction.selectedElement
  );
  const { template, elements, solution } = useSelector(
    (state: RootState) =>
      state.puzzle.present.puzzles[state.puzzle.present.currentPuzzleIndex]
  );

  const clueList = useSelector((state: RootState) => state.words.clueList);

  const [answerValue, setAnswerValue] = useState("");
  const [clueValue, setClueValue] = useState("");

  const handleAnswerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const rootSelection = getRootSelection(
        elements,
        selectedElement,
        selectedElement.row,
        selectedElement.column
      );

      if (!rootSelection) {
        return null;
      }
      const letterCount = getLengthOfSelection(template, rootSelection);

      if (!ALPHABET_REGEX.test(event.target.value)) {
        return false;
      }
      if (trimValue(event.target.value).length > letterCount) {
        return false;
      }
      setAnswerValue(event.target.value.toUpperCase());
    },
    [elements, selectedElement, template]
  );

  const handleClueChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setClueValue(event.target.value);
    },
    []
  );

  const handleReplaceClicked = useCallback(() => {
    const newClue = { clue: clueValue, answer: answerValue.toLowerCase() };

    if (selectedElement) {
      dispatch(wordsSlice.actions.unuseClue(selectedClue));
    }
    dispatch(interactionSlice.actions.selectWord(newClue));
    dispatch(
      puzzleSlice.actions.addClue({ clue: newClue, selection: selectedElement })
    );

    const foundIndex = clueList.findIndex((c) => newClue.answer === c.answer);
    if (foundIndex > -1) {
      dispatch(wordsSlice.actions.useClue(clueList[foundIndex]));
    }
  }, [
    clueValue,
    answerValue,
    selectedElement,
    dispatch,
    clueList,
    selectedClue,
  ]);

  useEffect(() => {
    setAnswerValue(selectedClue.answer.toUpperCase());
    setClueValue(selectedClue.clue);
  }, [selectedClue.answer, selectedClue.clue]);

  if (selectedElement.row === -1) {
    return null;
  }

  const rootSelection = getRootSelection(
    elements,
    selectedElement,
    selectedElement.row,
    selectedElement.column
  );

  if (!rootSelection) {
    return null;
  }

  const letterCount = getLengthOfSelection(template, rootSelection);

  let lettersFit = true;
  if (trimValue(answerValue).length === letterCount) {
    lettersFit = doLettersLineUp(
      solution,
      trimValue(answerValue),
      getElement(
        elements,
        rootSelection.row,
        rootSelection.column,
        rootSelection.direction
      )!,
      elements
    );
  }

  const canReplace =
    trimValue(answerValue).length === letterCount && lettersFit;

  let subtitle = `${trimValue(answerValue).length} / ${letterCount}`;
  let hasError = false;
  if (!lettersFit) {
    hasError = true;
    subtitle = "Error: Letters do not line up";
  }

  return (
    <div className="clue-editor-wrapper">
      <div className="clue-editor-title">Clue Editor</div>
      <input
        className="answer-editor-input"
        type="text"
        value={answerValue}
        onChange={handleAnswerChange}
      />
      <div
        className="clue-editor-letter-count-wrapper"
        style={{ color: hasError ? "red" : "black" }}
      >
        {subtitle}
      </div>
      <textarea
        className="clue-editor-input"
        value={clueValue}
        onChange={handleClueChange}
      />
      <div className="button-wrapper">
        <button
          className="replace-button"
          disabled={!canReplace}
          onClick={handleReplaceClicked}
        >
          Replace
        </button>
      </div>
    </div>
  );
};

export default ClueEditor;
