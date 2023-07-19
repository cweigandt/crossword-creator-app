import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClueType, PuzzleType } from "../data/types/PuzzleTypes";
import wordsList from "../data/allClues.json";

export type UseCluePayload = ClueType;
export type UnuseCluePayload = ClueType;
export type RestoreStatePayload = {
  puzzles: PuzzleType[];
  currentPuzzleIndex: number;
};

type StateType = {
  clueList: ClueType[];
};

const initialState: StateType = {
  clueList: wordsList as ClueType[],
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    useClue(state, action: PayloadAction<UseCluePayload>) {
      const clueIndex = state.clueList.findIndex(
        (c) =>
          c.clue === action.payload.clue && c.answer === action.payload.answer
      );

      if (clueIndex === -1) {
        throw new Error("Clue index in clueList was -1");
      }

      state.clueList = state.clueList
        .slice(0, clueIndex)
        .concat(state.clueList.slice(clueIndex + 1));
    },

    unuseClue(state, action: PayloadAction<UnuseCluePayload>) {
      state.clueList = [action.payload].concat(state.clueList);
    },

    restoreState(state, action: PayloadAction<RestoreStatePayload>) {
      action.payload.puzzles.forEach((puzzle) => {
        puzzle.elements.forEach((element) => {
          const clueIndex = state.clueList.findIndex(
            (c) => c.clue === element.clue && c.answer === element.answer
          );

          if (clueIndex > -1) {
            state.clueList = state.clueList
              .slice(0, clueIndex)
              .concat(state.clueList.slice(clueIndex + 1));
          }
        });
      });
    },
  },
});

export default wordsSlice;
