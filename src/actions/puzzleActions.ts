import { AnyAction } from 'redux';
import { SelectionType } from '../data/types/InteractionTypes';

import { ClueType, TemplateType } from '../data/types/PuzzleTypes';

export const templateUpdated = (template: TemplateType): AnyAction => ({
  type: 'TEMPLATE_UPDATED',
  template,
});

export const addClue = (
  clue: ClueType,
  selection: SelectionType
): AnyAction => ({
  type: 'ADD_CLUE',
  clue,
  selection,
});
