import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Directions } from "../constants/Directions";
import { GridModes } from "../constants/GridModes";
import { SelectionType } from "../data/types/InteractionTypes";
import { ClueType } from "../data/types/PuzzleTypes";

export type SelectElementPayload = {
  row: number;
  column: number;
  direction: Directions;
};
export type ChangeModePayload = GridModes;
export type SelectWordPayload = { clue: string; answer: string };
export type TemporarilySelectWordPayload = {
  clue: string;
  answer: string;
};

export type ClearTemporarilySelectedWordPayload = {};
export type RestoreStatePayload = {};

type StateType = {
  mode: GridModes;
  selectedElement: SelectionType;
  selectedClue: ClueType;
  temporaryClue: ClueType | null;
};

const initialState: StateType = {
  mode: GridModes.TEMPLATE,
  selectedElement: {
    row: -1,
    column: -1,
    direction: Directions.ACROSS,
  },
  selectedClue: {
    clue: "",
    answer: "",
  },
  temporaryClue: null,
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    selectElement(state, action: PayloadAction<SelectElementPayload>) {
      state.selectedElement = action.payload;
    },
    changeMode(state, action: PayloadAction<ChangeModePayload>) {
      state.mode = action.payload;
    },
    selectWord(state, action: PayloadAction<SelectWordPayload>) {
      state.selectedClue = action.payload;
    },
    temporarilySelectWord(
      state,
      action: PayloadAction<TemporarilySelectWordPayload>
    ) {
      state.temporaryClue = action.payload;
    },
    clearTemporarilySelectedWord(
      state,
      action: PayloadAction<ClearTemporarilySelectedWordPayload>
    ) {
      state.temporaryClue = null;
    },
    restoreState(state, __action: PayloadAction<RestoreStatePayload>) {
      state = initialState;
    },
  },
});

export default interactionSlice;
