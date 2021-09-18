import { AnyAction } from 'redux';

import { PuzzleType } from '../data/types/PuzzleTypes';

export const restoreState = (puzzle: PuzzleType): AnyAction => ({
  type: 'RESTORE_STATE',
  puzzle,
});
