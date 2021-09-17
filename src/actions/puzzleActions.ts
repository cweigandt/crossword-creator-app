import { AnyAction } from 'redux';

import { TemplateType } from '../data/types/PuzzleTypes';

export const templateUpdated = (template: TemplateType): AnyAction => ({
  type: 'TEMPLATE_UPDATED',
  template,
});
