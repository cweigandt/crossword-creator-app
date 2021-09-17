import { Directions } from '../../constants/Directions';

export type TemplateType = number[][];

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
  id: number;
  width: number;
  height: number;
  template: TemplateType;

  solution?: string[][];
  elements?: any;
};

export type ClueType = {
  clue: string;
  answer: string;
};