const Block = ({ clueNumber, content, row, column, onMouseUp }) => {
  const handleMouseUp = () => {
    onMouseUp(row, column);
  };
  let colorClass = content === 1 ? 'has-letter' : 'empty';
  return (
    <div className={`block ${colorClass}`} onMouseUp={handleMouseUp}>
      <div className='letter'></div>
      {clueNumber !== -1 && <div className='number'>{clueNumber}</div>}
    </div>
  );
};

export default Block;
