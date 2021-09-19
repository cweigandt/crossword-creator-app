import { FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { showModal } from '../../actions/modalActions';
import { ModalTypes } from '../../constants/ModalTypes';

const RestoreStateButton = () => {
  const dispatch = useDispatch();

  return (
    <div
      className='restore-state-button'
      onClick={() => {
        dispatch(showModal(ModalTypes.RESTORE_STATE));
      }}
    >
      <FiUpload />
    </div>
  );
};

export default RestoreStateButton;
