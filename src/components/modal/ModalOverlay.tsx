import { useSelector } from "react-redux";

import { ModalTypes } from "../../constants/ModalTypes";
import { RootState } from "../../reducers";

import RestoreStateModal from "./RestoreStateModal";
import "../../styles/modal/ModalOverlay.css";

const ModalOverlay = () => {
  const modalState = useSelector((state: RootState) => state.modal);

  var renderModal = () => {
    // switch on modal type to show LoginModal, etc.
    if (modalState.modal === ModalTypes.RESTORE_STATE) {
      return <RestoreStateModal id={modalState.id} />;
    }
  };

  return <div className="modal-overlay">{renderModal()}</div>;
};

export default ModalOverlay;
