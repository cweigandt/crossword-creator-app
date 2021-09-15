import templates from '../templates.json';
import { generateElements } from '../utilities/CluesGenerator';

const defaultTemplate = templates[0];
const initialState = {
  ...defaultTemplate,
  solution: defaultTemplate.template.map((row) => row.map((el) => '')),
  elements: generateElements(
    defaultTemplate.template,
    defaultTemplate.width,
    defaultTemplate.height
  ),
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

    default:
      return state;
  }
};

export default reducer;
