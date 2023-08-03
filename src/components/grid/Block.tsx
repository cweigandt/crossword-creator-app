type PropsType = {
  clueNumber?: number;
  content?: string | number;
  showContent?: boolean;
  isWhite: boolean;
  row: number;
  column: number;
  onMouseUp?: (row: number, column: number) => void;
  classes?: string;
};

const Block = ({
  clueNumber = -1,
  content,
  showContent = true,
  isWhite = true,
  row,
  column,
  onMouseUp = () => {},
  classes = "",
}: PropsType) => {
  const handleMouseUp = () => {
    onMouseUp(row, column);
  };
  let colorClass = isWhite ? "has-letter" : "empty";

  return (
    <div className={`block ${colorClass} ${classes}`} onMouseUp={handleMouseUp}>
      <div className="letter">{showContent ? content || " " : " "}</div>
      {clueNumber !== -1 && <div className="number">{clueNumber}</div>}
    </div>
  );
};

export default Block;
