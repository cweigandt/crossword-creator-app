import { connect } from 'react-redux';

import { ModalTypes } from '../../constants/ModalTypes';
import { RootState } from '../../reducers';

import RestoreStateModal from './RestoreStateModal';
import '../../styles/modal/ModalOverlay.css';

type PropsType = {
  modalState: {
    modal: ModalTypes;
    id: number;
  };
};

const ModalOverlay = ({ modalState }: PropsType) => {
  var renderModal = () => {
    // switch on modal type to show LoginModal, etc.
    if (modalState.modal === ModalTypes.RESTORE_STATE) {
      return <RestoreStateModal id={modalState.id} />;
    }
  };

  return <div className='modal-overlay'>{renderModal()}</div>;
};

const mapModalToProps = (state: RootState) => {
  return {
    modalState: state.modal,
  };
};

export default connect(mapModalToProps)(ModalOverlay);
