import { useCallback } from 'react';
import { connect } from 'react-redux';
import '../../styles/grid/Grid.css';
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

const Grid = ({ elements, template, onClick }) => {
  const handleMouseUp = useCallback(
    (row, column) => {
      onClick(row, column);
    },
    [onClick]
  );

  return (
    <div id='crossword' className='crossword-board'>
      {template.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='row'>
            {row.map((el, columnIndex) => (
              <Block
                content={el}
                row={rowIndex}
                column={columnIndex}
                clueNumber={getClueNumber(elements, rowIndex, columnIndex)}
                key={rowIndex * 100 + columnIndex}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
