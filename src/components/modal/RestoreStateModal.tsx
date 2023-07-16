import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

import "../../styles/modal/RestoreStateModal.css";
import validateInput from "../../utilities/RestoreUtils";
import interactionSlice from "../../reducers/interactionSlice";
import puzzleSlice from "../../reducers/puzzleSlice";
import modalSlice from "../../reducers/modalSlice";

type PropsType = {
  id: number;
};

const RestoreStateModal = ({ id }: PropsType) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(formRef.current || undefined);
    let inputString = formData.get("state") as string;

    try {
      const jsonPuzzle = validateInput(inputString);
      dispatch(interactionSlice.actions.restoreState({}));
      dispatch(puzzleSlice.actions.restoreState(jsonPuzzle));
      dispatch(modalSlice.actions.hideModal(id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = useCallback(() => {
    dispatch(modalSlice.actions.hideModal(id));
  }, [dispatch, id]);

  return (
    <Modal classes="restore-state-modal">
      <div className="modal-title">Load Puzzle</div>
      <div className="modal-close-button" onClick={handleClose}>
        ❌
      </div>
      <form
        id="restoreStateForm"
        name="restoreStateForm"
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className="form-group">
          <textarea
            className="form-control"
            data-test-id="restore-state-textarea"
            id="state"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                return false;
              }
            }}
            name="state"
          />
        </div>
        <button
          type="submit"
          id="restoreStateSubmit"
          data-test-id="restore-state-submit"
          className="btn"
        >
          Load
        </button>
      </form>
    </Modal>
  );
};

export default RestoreStateModal;
