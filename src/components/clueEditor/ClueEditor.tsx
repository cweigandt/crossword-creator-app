import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getLengthOfSelection } from "../../utilities/ElementUtils";

import "../../styles/clueEditor/ClueEditor.css";
import wordsSlice from "../../reducers/wordsSlice";
import interactionSlice from "../../reducers/interactionSlice";
import puzzleSlice from "../../reducers/puzzleSlice";

const ALPHABET_REGEX = /^[A-Za-z -]*$/;

const ClueEditor = () => {
  const dispatch = useDispatch();

  const selectedClue = useSelector(
    (state: RootState) => state.interaction.selectedClue
  );
  const selectedElement = useSelector(
    (state: RootState) => state.interaction.selectedElement
  );
  const template = useSelector(
    (state: RootState) =>
      state.puzzle.present.puzzles[state.puzzle.present.currentPuzzleIndex]
        .template
  );
  const clueList = useSelector((state: RootState) => state.words.clueList);

  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const letterCount = getLengthOfSelection(template, selectedElement);

      if (!ALPHABET_REGEX.test(event.target.value)) {
        return false;
      }
      if (event.target.value.length > letterCount) {
        return false;
      }
      setValue(event.target.value.toUpperCase());
    },
    [template, selectedElement]
  );

  const handleReplaceClicked = useCallback(() => {
    const newClue = { clue: "", answer: value };

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
  }, [clueList, dispatch, selectedClue, selectedElement, value]);

  useEffect(() => {
    setValue("");
  }, [selectedElement]);

  if (selectedClue.answer === "" || selectedElement.row === -1) {
    return null;
  }

  const letterCount = getLengthOfSelection(template, selectedElement);
  const canReplace = value.length === letterCount;

  return (
    <div className="clue-editor-wrapper">
      <div className="clue-editor-title">Clue Editor</div>
      <input
        className="clue-editor-input"
        placeholder={selectedClue.answer.toUpperCase()}
        type="text"
        value={value}
        onChange={handleChange}
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
