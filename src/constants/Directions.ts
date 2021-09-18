export enum Directions {
  ACROSS = 'across',
  DOWN = 'down',
}

export const getOppositeDirection = (direction: Directions): Directions => {
  return direction === Directions.ACROSS ? Directions.DOWN : Directions.ACROSS;
};
