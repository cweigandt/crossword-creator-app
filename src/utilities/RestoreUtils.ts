import { Directions } from "../constants/Directions";
import { ElementType, PuzzleType } from "../data/types/PuzzleTypes";

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

const validateTemplateElement = (
  templateElement: number,
  printString: string
) => {
  validateType(templateElement, printString, "number");
  if (templateElement !== 0 && templateElement !== 1) {
    throw new Error(`'template' values must be either 0 or 1`);
  }
};

const validateSolutionElement = (
  solutionElement: string,
  printString: string
) => {
  validateType(solutionElement, printString, "string");
  if (solutionElement.length > 1) {
    throw new Error(
      `'solution' values must be either empty or a single character`
    );
  }
};

const validateInput = (jsonPuzzle: PuzzleType) => {
  const hasAllProps = hasRequiredProps(
    jsonPuzzle,
    "width",
    "height",
    "template",
    "solution",
    "elements"
  );

  if (!hasAllProps) {
    throw new Error(
      "Missing required key - one of: id, width, height, template, solution, elements"
    );
  }

  validateType(jsonPuzzle.width, "width", "number");
  validateType(jsonPuzzle.height, "height", "number");
  validateType(jsonPuzzle.template, "template", "object");
  validateType(jsonPuzzle.solution, "solution", "object");
  validateType(jsonPuzzle.elements, "elements", "object");

  // template and solution
  for (let rowIndex = 0; rowIndex < jsonPuzzle.height; rowIndex++) {
    const templateRow = jsonPuzzle.template[rowIndex];
    const solutionRow = jsonPuzzle.solution[rowIndex];
    validateLength(templateRow, jsonPuzzle.width, "template");
    validateLength(solutionRow, jsonPuzzle.width, "solution");

    for (let columnIndex = 0; columnIndex < jsonPuzzle.width; columnIndex++) {
      const templateElement = templateRow[columnIndex];
      const solutionElement = solutionRow[columnIndex];
      validateTemplateElement(
        templateElement,
        `template[${rowIndex}][${columnIndex}]`
      );
      validateSolutionElement(
        solutionElement,
        `solution[${rowIndex}][${columnIndex}]`
      );
    }
  }

  jsonPuzzle.elements.forEach((el) => {
    const element = el as ElementType;
    validateType(element.number, "elements->number", "number");
    validateType(element.row, "elements->row", "number");
    validateType(element.column, "elements->column", "number");
    validateType(element.length, "elements->length", "number");
    validateType(element.direction, "elements->direction", "string");
    validateType(element.clue, "elements->clue", "string");
    validateType(element.answer, "elements->answer", "string");

    if (element.number <= 0) {
      throw new Error(
        `Element ${element.number} ${element.direction}: number must be positive greater than 0`
      );
    }

    if (element.row < 0 || element.row >= jsonPuzzle.height) {
      throw new Error(
        `Element ${element.number} ${element.direction}: row must be positive and less than puzzle height`
      );
    }
    if (element.column < 0 || element.column >= jsonPuzzle.width) {
      throw new Error(
        `Element ${element.number} ${element.direction}: column must be positive and less than puzzle width`
      );
    }

    if (
      element.length <= 1 ||
      element.length > jsonPuzzle.width ||
      element.length > jsonPuzzle.height
    ) {
      throw new Error(
        `Element ${element.number} ${element.direction}: length must be positive greater than 1 and less than puzzle's width and height`
      );
    }

    if (
      element.direction !== Directions.ACROSS &&
      element.direction !== Directions.DOWN
    ) {
      throw new Error(
        `Element ${element.number} ${element.direction}: direction must be either across or down`
      );
    }
  });

  return jsonPuzzle;
};

export const validateJSON = (inputString: string): PuzzleType[] => {
  const jsonObject = JSON.parse(inputString) as PuzzleType[];

  jsonObject.forEach(validateInput);

  return jsonObject;
};
