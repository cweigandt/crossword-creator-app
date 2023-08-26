import { Link } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

const PrintLink = () => {
  const puzzles = useSelector(
    (state: RootState) => state.puzzle.present.puzzles
  );

  return (
    <div style={{ position: "absolute", right: "20px" }}>
      <Link
        to="print"
        state={{ puzzles }}
        style={{ color: "black", textDecoration: "none" }}
      >
        🖨️
      </Link>
    </div>
  );
};

export default PrintLink;
