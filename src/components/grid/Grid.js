import { useCallback } from 'react';
import '../../styles/grid/Grid.css';
import { getElement, isRowColumnInElement } from '../../utilities';
import Block from './Block';

const getClueNumber = (elements, row, column) => {
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

const Grid = ({ elements, template, selection, onClick }) => {
  const handleMouseUp = useCallback(
    (row, column) => {
      onClick(row, column);
    },
    [onClick]
  );

  const selectedElement = getElement(
    elements,
    selection.row,
    selection.column,
    selection.direction
  );

  const renderBlock = (content, row, column) => {
    const classes = [];
    if (row === selection.row && column === selection.column) {
      // This is the selected block
      classes.push('selected-block');
    }

    if (selectedElement && isRowColumnInElement(selectedElement, row, column)) {
      classes.push('selected-word');
    }

    return (
      <Block
        content={content}
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
            {row.map((content, columnIndex) =>
              renderBlock(content, rowIndex, columnIndex)
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
