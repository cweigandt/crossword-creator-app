import { combineReducers } from "redux";

import interactionSlice from "./interactionSlice";
import puzzleSlice from "./puzzleSlice";
import modalSlice from "./modalSlice";
import wordsSlice from "./wordsSlice";

import undoable from "redux-undo";

const rootReducer = combineReducers({
  puzzle: undoable(puzzleSlice.reducer),
  interaction: interactionSlice.reducer,
  modal: modalSlice.reducer,
  words: wordsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
