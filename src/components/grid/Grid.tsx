import { useCallback } from 'react';
import { SelectionType } from '../../data/types/InteractionTypes';
import {
  ClueType,
  ElementType,
  SolutionType,
  TemplateType,
} from '../../data/types/PuzzleTypes';
import '../../styles/grid/Grid.css';
import {
  getElement,
  getRowColumnIndexInElement,
  isRowColumnInElement,
} from '../../utilities/ElementUtils';
import Block from './Block';

type PropsType = {
  elements: ElementType[];
  solution: SolutionType;
  template: TemplateType;
  selection: SelectionType | null;
  temporaryClue: ClueType | null;
  onClick: (row: number, column: number) => void;
};

const getClueNumber = (
  elements: ElementType[],
  row: number,
  column: number
): number => {
  if (!elements) {
    return -1;
  }

  const clue = elements.find((el) => {
    return el.row === row && el.column === column;
  });

  if (clue) {
    return clue.number;
  }
  return -1;
};

const Grid = ({
  elements,
  solution,
  template,
  selection,
  temporaryClue,
  onClick,
}: PropsType) => {
  const handleMouseUp = useCallback(
    (row, column) => {
      onClick(row, column);
    },
    [onClick]
  );

  const selectedElement =
    selection &&
    getElement(elements, selection.row, selection.column, selection.direction);

  const renderBlock = (templateValue: number, row: number, column: number) => {
    let content = solution[row][column];

    const classes = [];
    if (selection && row === selection.row && column === selection.column) {
      classes.push('selected-block');
    }

    if (selectedElement && isRowColumnInElement(selectedElement, row, column)) {
      classes.push('selected-word');

      if (temporaryClue && !content) {
        const index = getRowColumnIndexInElement(selectedElement, row, column);
        if (index !== -1) {
          content = temporaryClue.answer
            .replace(/[ -]/g, '')
            [index].toUpperCase();
          classes.push('temporary');
        }
      }
    }

    return (
      <Block
        content={content}
        isWhite={templateValue === 1}
        row={row}
        column={column}
        clueNumber={getClueNumber(elements, row, column)}
        key={row * 100 + column}
        onMouseUp={handleMouseUp}
        classes={classes.join(' ')}
      />
    );
  };

  return (
    <div id='crossword' className='crossword-board'>
      {template.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='row'>
            {row.map((templateValue, columnIndex) =>
              renderBlock(templateValue, rowIndex, columnIndex)
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
