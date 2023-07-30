import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClueType, PuzzleType, TemplateType } from "../data/types/PuzzleTypes";
import templates from "../templates.json";
import { getRootSelection } from "../utilities/SelectionUtils";
import {
  addClueToSolution,
  buildSolution,
  removeSelectionFromSolution,
} from "../utilities/SolutionUtils";
import {
  addClueToElements,
  generateElements,
  removeClueFromElements,
  transferElements,
} from "../utilities/ElementUtils";
import { SelectionType } from "../data/types/InteractionTypes";

const defaultPuzzle = templates[0];

export type UpdateTemplatePayload = TemplateType;
export type AddCluePayload = { clue: ClueType; selection: SelectionType };
export type RemoveCluePayload = SelectionType;
export type RemoveAllCluesPayload = {};
export type RestoreStatePayload = StateType["puzzles"];
export type GoToNextPuzzlePayload = {};
export type GoToPreviousPuzzlePayload = {};
export type RemoveCurrentPuzzlePayload = {};

const createEmptyPuzzle = (): PuzzleType => {
  return {
    ...defaultPuzzle,
    solution: defaultPuzzle.template.map((row) => row.map(() => "")),
    elements: generateElements(
      defaultPuzzle.template,
      defaultPuzzle.width,
      defaultPuzzle.height
    ),
  };
};

type StateType = { puzzles: PuzzleType[]; currentPuzzleIndex: number };

const initialState: StateType = {
  currentPuzzleIndex: 0,
  puzzles: [createEmptyPuzzle()],
};

const getCurrentPuzzle = (state: StateType) =>
  state.puzzles[state.currentPuzzleIndex];

const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    updateTemplate(state, action: PayloadAction<UpdateTemplatePayload>) {
      const newElements = transferElements(
        getCurrentPuzzle(state).elements,
        action.payload,
        getCurrentPuzzle(state).width,
        getCurrentPuzzle(state).height
      );
      getCurrentPuzzle(state).template = action.payload;
      getCurrentPuzzle(state).elements = newElements;
      getCurrentPuzzle(state).solution = buildSolution(
        action.payload,
        newElements
      );
    },

    addClue(state, action: PayloadAction<AddCluePayload>) {
      const rootSelection = getRootSelection(
        getCurrentPuzzle(state).elements,
        action.payload.selection,
        action.payload.selection.row,
        action.payload.selection.column
      );

      if (!rootSelection) {
        return;
      }

      getCurrentPuzzle(state).solution = addClueToSolution(
        getCurrentPuzzle(state).solution,
        action.payload.clue,
        rootSelection
      );
      getCurrentPuzzle(state).elements = addClueToElements(
        getCurrentPuzzle(state).elements,
        action.payload.clue,
        rootSelection
      );
    },

    removeClue(state, action: PayloadAction<RemoveCluePayload>) {
      const rootSelection = getRootSelection(
        getCurrentPuzzle(state).elements,
        action.payload,
        action.payload.row,
        action.payload.column
      );

      if (!rootSelection) {
        return;
      }

      getCurrentPuzzle(state).solution = removeSelectionFromSolution(
        getCurrentPuzzle(state).solution,
        getCurrentPuzzle(state).elements,
        rootSelection
      );
      getCurrentPuzzle(state).elements = removeClueFromElements(
        getCurrentPuzzle(state).elements,
        rootSelection
      );
    },

    removeAllClues(state, __action: PayloadAction<RemoveAllCluesPayload>) {
      getCurrentPuzzle(state).solution = state.puzzles[
        state.currentPuzzleIndex
      ].solution.map((row) => row.map(() => ""));
      getCurrentPuzzle(state).elements = state.puzzles[
        state.currentPuzzleIndex
      ].elements.map((el) => ({
        ...el,
        clue: "",
        answer: "",
      }));
    },

    restoreState(__state, action: PayloadAction<RestoreStatePayload>) {
      return {
        ...initialState,
        puzzles: action.payload,
        currentPuzzleIndex: action.payload.length - 1,
      };
    },

    goToNextPuzzle(state, __action: PayloadAction<GoToNextPuzzlePayload>) {
      if (state.currentPuzzleIndex + 1 === state.puzzles.length) {
        state.puzzles.push(createEmptyPuzzle());
      }
      state.currentPuzzleIndex = state.currentPuzzleIndex + 1;
    },

    goToPreviousPuzzle(
      state,
      __action: PayloadAction<GoToPreviousPuzzlePayload>
    ) {
      if (state.currentPuzzleIndex === 0) {
        return;
      }
      state.currentPuzzleIndex = state.currentPuzzleIndex - 1;
    },

    removeCurrentPuzzle(
      state,
      action: PayloadAction<RemoveCurrentPuzzlePayload>
    ) {
      const oldCurrentPuzzleIndex = state.currentPuzzleIndex;
      if (oldCurrentPuzzleIndex === 0 && state.puzzles.length === 1) {
        state.puzzles = [createEmptyPuzzle()];
        return;
      }

      if (oldCurrentPuzzleIndex === state.puzzles.length - 1) {
        state.currentPuzzleIndex = oldCurrentPuzzleIndex - 1;
      }

      state.puzzles.splice(oldCurrentPuzzleIndex, 1);
    },
  },
});

export default puzzleSlice;
