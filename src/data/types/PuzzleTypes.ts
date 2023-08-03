import { Directions } from "../../constants/Directions";

export type TemplateType = number[][];
export type SolutionType = string[][];

export type ElementType = {
  number: number;
  row: number;
  column: number;
  length: number;
  direction: Directions;
  clue: string;
  answer: string;
};
export type PuzzleType = {
  width: number;
  height: number;
  template: TemplateType;

  solution: SolutionType;
  elements: ElementType[];
};

export type ClueType = {
  clue: string;
  answer: string;
  isFinalized?: boolean;
};
