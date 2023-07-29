import { useCallback } from "react";
import { Directions } from "../../constants/Directions";
import { ElementType } from "../../data/types/PuzzleTypes";
import "../../styles/clues-list/CluesList.css";
import { useDispatch, useSelector } from "react-redux";
import interactionSlice from "../../reducers/interactionSlice";
import { RootState } from "../../reducers";
import { getElement } from "../../utilities/ElementUtils";

type PropsType = {
  elements: ElementType[];
};

const sortFunction = (a: ElementType, b: ElementType): number => {
  if (a.direction === Directions.ACROSS && b.direction === Directions.DOWN) {
    return -1;
  }

  if (b.direction === Directions.ACROSS && a.direction === Directions.DOWN) {
    return 1;
  }

  return a.number - b.number;
};

const makeDisplayString = (element: ElementType): string => {
  const direction = element.direction === Directions.ACROSS ? "a" : "d";
  return `${element.number}${direction}: ${element.clue} (${element.answer}) (${element.length})`;
};

const CluesList = ({ elements }: PropsType) => {
  const displayedClues: ElementType[] = [...elements].sort(sortFunction);
  const dispatch = useDispatch();
  const selectedElement = useSelector(
    (state: RootState) => state.interaction.selectedElement
  );

  const rootSelectedElement = getElement(
    elements,
    selectedElement.row,
    selectedElement.column,
    selectedElement.direction
  );

  const handleClick = useCallback(
    (element: ElementType) => {
      dispatch(interactionSlice.actions.selectElement(element));
      dispatch(interactionSlice.actions.selectWord(element));
    },
    [dispatch]
  );

  return (
    <div className="clues-list">
      <div className="clue-count">{`${elements.length} clues`}</div>

      {displayedClues.map((element, index) => {
        const classes = ["element"];
        if (
          rootSelectedElement &&
          element.column === rootSelectedElement.column &&
          element.row === rootSelectedElement.row &&
          element.direction === rootSelectedElement.direction
        ) {
          classes.push("selected-element");
        }

        return (
          <div
            key={index}
            className={classes.join(" ")}
            onClick={() => {
              handleClick(element);
            }}
          >
            {makeDisplayString(element)}
          </div>
        );
      })}
    </div>
  );
};

export default CluesList;
