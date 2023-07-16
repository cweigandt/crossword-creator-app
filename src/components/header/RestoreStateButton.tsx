import { FiUpload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { ModalTypes } from "../../constants/ModalTypes";
import modalSlice from "../../reducers/modalSlice";

const RestoreStateButton = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="restore-state-button"
      onClick={() => {
        dispatch(modalSlice.actions.showModal(ModalTypes.RESTORE_STATE));
      }}
    >
      <FiUpload />
    </div>
  );
};

export default RestoreStateButton;
