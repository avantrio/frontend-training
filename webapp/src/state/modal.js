import { createSlice } from "@reduxjs/toolkit";

const initState = {
    modalTypes: [],
    modalProps: {},
};

/* eslint-disable no-param-reassign */
// since immer enables direct state mutations
const modalSlice = createSlice({
    name: "modal",
    initialState: initState,
    reducers: {
        showModal(state, { payload }) {
            state.modalTypes.push(payload.modalType);
            state.modalProps[payload.modalType] = payload.modalProps;
        },
        hideModal(state) {
            state.modalTypes.pop();
        },
    },
});
/* eslint-disable no-param-reassign */

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
