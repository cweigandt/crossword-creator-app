import { useCallback } from "react";
import { TemplateType } from "../../data/types/PuzzleTypes";
import "../../styles/grid/Grid.css";
import Block from "./Block";

type PropsType = {
  template: TemplateType;
  onClick: (template: TemplateType) => void;
  style?: object;
};

const TemplatePreviewGrid = ({ template, onClick, style = {} }: PropsType) => {
  const handleClick = useCallback(() => {
    onClick(template);
  }, [onClick, template]);

  return (
    <div
      id="crossword"
      className="crossword-board"
      onClick={handleClick}
      style={style}
    >
      {template.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((templateValue, columnIndex) => (
              <Block
                isWhite={templateValue === 1}
                row={rowIndex}
                column={columnIndex}
                clueNumber={-1}
                key={rowIndex * 100 + columnIndex}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TemplatePreviewGrid;
