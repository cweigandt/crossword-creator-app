export const elementSelected = ({ row, column, direction }) => ({
  type: 'ELEMENT_SELECTED',
  row,
  column,
  direction,
});

export const elementsListUpdated = (elements) => ({
  type: 'ELEMENTS_UPDATED',
  elements,
});

export const templateUpdated = (template) => ({
  type: 'TEMPLATE_UPDATED',
  template,
});
