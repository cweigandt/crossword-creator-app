import { AnyAction } from 'redux';
import { ModalTypes } from '../constants/ModalTypes';

type ReducerType = {
  modal: ModalTypes | null;
  id: number;
};

const initialState = {
  modal: null,
  id: -1,
};

var modalReducer = (state: ReducerType = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modal: action.modal,
        id: action.id,
      };

    case 'HIDE_MODAL':
      return {
        ...state,
        modal: null,
        id: -1,
      };

    default:
      return state;
  }
};

export default modalReducer;
