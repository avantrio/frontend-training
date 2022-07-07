import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUser = createAsyncThunk("auth/getUser", async () => {
    const response = await api.getMyProfile();
    return response.data;
});

const initState = {
    profile: {},
    isSignedIn: false,
    isLoading: false,
};

/* eslint-disable no-param-reassign */
// since immer enables direct state mutations
const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setUser(state, { payload }) {
            state.profile = payload;
            state.isSignedIn = true;
        },
        removeUser(state) {
            state.profile = {};
            state.isSignedIn = false;
        },
        setLoading(state, { payload }) {
            state.isLoading = payload;
        },
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.profile = action.payload;
            state.isSignedIn = true;
        },
    },
});
/* eslint-disable no-param-reassign */

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
