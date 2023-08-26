import { useLocation } from "react-router-dom";
import PrinterContainer from "../containers/PrinterContainer";

const Printer = () => {
  const location = useLocation();

  const puzzles = location.state.puzzles;

  return <PrinterContainer puzzles={puzzles} />;
};

export default Printer;
