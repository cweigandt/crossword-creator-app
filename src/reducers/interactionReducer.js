const initialState = {
  selectedElement: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ELEMENT_SELECTED':
      return {
        ...state,
        selectedElement: action.element,
      };

    default:
      return state;
  }
};

export default reducer;
