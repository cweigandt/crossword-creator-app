import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModalTypes } from "../constants/ModalTypes";

let uid = 0;

export type ShowModalPayload = ModalTypes;
export type HideModalPayload = number;

type StateType = {
  modal: ModalTypes | null;
  id: number;
};

const initialState: StateType = {
  modal: null,
  id: -1,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ShowModalPayload>) {
      state.modal = action.payload;
      state.id = uid++;
    },
    hideModal(state, __action: PayloadAction<HideModalPayload>) {
      state.modal = null;
      state.id = -1;
    },
  },
});

export default modalSlice;
