import { ModalTypes } from '../constants/ModalTypes';

let uid = 0;

export const showModal = (modalType: ModalTypes) => {
  return {
    type: 'SHOW_MODAL',
    modal: modalType,
    id: uid++,
  };
};

export const hideModal = (id: number) => {
  return {
    type: 'HIDE_MODAL',
    id,
  };
};
