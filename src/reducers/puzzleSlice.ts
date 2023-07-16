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
export type RestoreStatePayload = PuzzleType;

type StateType = PuzzleType;

const initialState: StateType = {
  ...defaultPuzzle,
  solution: defaultPuzzle.template.map((row) => row.map(() => "")),
  elements: generateElements(
    defaultPuzzle.template,
    defaultPuzzle.width,
    defaultPuzzle.height
  ),
};

const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    updateTemplate(state, action: PayloadAction<UpdateTemplatePayload>) {
      const newElements = transferElements(
        state.elements,
        action.payload,
        state.width,
        state.height
      );
      state.template = action.payload;
      state.elements = newElements;
      state.solution = buildSolution(action.payload, newElements);
    },
    addClue(state, action: PayloadAction<AddCluePayload>) {
      const rootSelection = getRootSelection(
        state.elements,
        action.payload.selection,
        action.payload.selection.row,
        action.payload.selection.column
      );

      if (!rootSelection) {
        return;
      }

      state.solution = addClueToSolution(
        state.solution,
        action.payload.clue,
        rootSelection
      );
      state.elements = addClueToElements(
        state.elements,
        action.payload.clue,
        rootSelection
      );
    },
    removeClue(state, action: PayloadAction<RemoveCluePayload>) {
      const rootSelection = getRootSelection(
        state.elements,
        action.payload,
        action.payload.row,
        action.payload.column
      );

      if (!rootSelection) {
        return;
      }

      state.solution = removeSelectionFromSolution(
        state.solution,
        state.elements,
        rootSelection
      );
      state.elements = removeClueFromElements(state.elements, rootSelection);
    },
    removeAllClues(state, action: PayloadAction<RemoveAllCluesPayload>) {
      state.solution = state.solution.map((row) => row.map(() => ""));
      state.elements = state.elements.map((el) => ({
        ...el,
        clue: "",
        answer: "",
      }));
    },
    restoreState(state, action: PayloadAction<RestoreStatePayload>) {
      state = {
        ...initialState,
        ...action.payload,
      };
    },
  },
});

export default puzzleSlice;
