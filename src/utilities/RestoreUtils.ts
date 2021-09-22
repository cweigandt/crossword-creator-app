import { PuzzleType } from '../data/types/PuzzleTypes';

const hasRequiredProps = (object: object, ...varProps: string[]): boolean => {
  return varProps.reduce((accum, prop) => {
    return accum && object.hasOwnProperty(prop);
  }, true as boolean);
};

const validateType = (value: any, name: string, type: string) => {
  if (typeof value !== type) {
    throw new Error(`'${name}' value expected to be of type ${type}`);
  }
};

const validateLength = (el: any[], len: number, field: string) => {
  if (el.length !== len) {
    throw new Error(`${field} value expected to have length ${len}`);
  }
};

const validateInput = (inputString: string): PuzzleType => {
  let jsonPuzzle = {} as PuzzleType;
  jsonPuzzle = JSON.parse(inputString);

  const hasAllProps = hasRequiredProps(
    jsonPuzzle,
    'id',
    'width',
    'height',
    'template',
    'solution',
    'elements'
  );

  if (!hasAllProps) {
    throw new Error(
      'Missing required key - one of: id, width, height, template, solution, elements'
    );
  }

  validateType(jsonPuzzle.id, 'id', 'number');
  validateType(jsonPuzzle.width, 'width', 'number');
  validateType(jsonPuzzle.height, 'height', 'number');
  validateType(jsonPuzzle.template, 'template', 'object');
  validateType(jsonPuzzle.solution, 'solution', 'object');
  validateType(jsonPuzzle.elements, 'elements', 'object');

  // template and solution
  for (let rowIndex = 0; rowIndex < jsonPuzzle.height; rowIndex++) {
    const templateRow = jsonPuzzle.template[rowIndex];
    const solutionRow = jsonPuzzle.solution[rowIndex];
    validateLength(templateRow, jsonPuzzle.width, 'template');
    validateLength(solutionRow, jsonPuzzle.width, 'solution');

    for (let columnIndex = 0; columnIndex < jsonPuzzle.width; columnIndex++) {
      const templateElement = templateRow[columnIndex];
      const solutionElement = solutionRow[columnIndex];
      validateType(
        templateElement,
        `template[${rowIndex}][${columnIndex}]`,
        'number'
      );
      validateType(
        solutionElement,
        `solution[${rowIndex}][${columnIndex}]`,
        'string'
      );
    }
  }

  // TODO validate elements
  // TODO validate template is 0 or 1
  // TODO validate solution is '' or 'A', 'B', etc - 0 or 1 length

  return jsonPuzzle;
};

export default validateInput;
