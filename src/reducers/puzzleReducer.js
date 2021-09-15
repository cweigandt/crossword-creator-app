import { GridModes } from '../constants/GridModes';
import templates from '../templates.json';
import { generateElements } from '../utilities/CluesGenerator';

const defaultTemplate = templates[0];
const initialState = {
  ...defaultTemplate,
  elements: generateElements(
    defaultTemplate.template,
    defaultTemplate.width,
    defaultTemplate.height
  ),
  mode: GridModes.LETTER,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ELEMENTS_UPDATED':
      return {
        ...state,
        elements: action.elements.map((el) => el),
      };
    case 'TEMPLATE_UPDATED':
      return {
        ...state,
        template: action.template,
        elements: generateElements(action.template, state.width, state.height),
      };
    case 'MODE_CHANGED':
      return {
        ...state,
        mode: action.mode,
      };

    default:
      return state;
  }
};

export default reducer;
