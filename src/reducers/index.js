import { combineReducers } from 'redux';

import puzzleReducer from './puzzleReducer';

export default combineReducers({
  puzzle: puzzleReducer,
});
