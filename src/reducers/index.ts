import { combineReducers } from 'redux';

import puzzleReducer from './puzzleReducer';
import interactionReducer from './interactionReducer';

const rootReducer = combineReducers({
  puzzle: puzzleReducer,
  interaction: interactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
