import { combineReducers } from "redux";

import interactionSlice from "./interactionSlice";
import puzzleSlice from "./puzzleSlice";
import modalSlice from "./modalSlice";

const rootReducer = combineReducers({
  puzzle: puzzleSlice.reducer,
  interaction: interactionSlice.reducer,
  modal: modalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
