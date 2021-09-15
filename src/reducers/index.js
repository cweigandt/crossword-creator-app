import { combineReducers } from 'redux';

import puzzleReducer from './puzzleReducer';
import interactionReducer from './interactionReducer';

export default combineReducers({
  puzzle: puzzleReducer,
  interaction: interactionReducer,
});
