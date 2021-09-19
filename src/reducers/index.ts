import { combineReducers } from 'redux';

import puzzleReducer from './puzzleReducer';
import interactionReducer from './interactionReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  puzzle: puzzleReducer,
  interaction: interactionReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
