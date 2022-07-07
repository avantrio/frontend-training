import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const loadAllUsers = createAsyncThunk("user/fetchAllUsers", async () => {
    const response = await api.getUsers();
    return response.data;
});

const initState = {
    allUsers: {
        allIds: [],
        byId: {},
        isLoading: false,
    },
    subscription: {
        allIds: [1, 2, 3],
        byId: {
            1: "Free",
            2: "Basic",
            3: "Premium",
        },
    },
};

/* eslint-disable no-param-reassign */
// since immer enables direct state mutations
const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setAllUsers(state, { payload }) {
            state.allUsers.allIds = [];
            payload.forEach((usr) => {
                state.allUsers.allIds.push(usr.id);
                state.allUsers.byId[usr.id] = usr;
            });
        },
        setUser(state, { payload }) {
            state.allUsers.byId[payload.id] = payload;
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
        [loadAllUsers.fulfilled]: (state, action) => {
            state.allUsers.allIds = [];
            action.payload.forEach((usr) => {
                state.allUsers.allIds.push(usr.id);
                state.allUsers.byId[usr.id] = usr;
            });
        },
    },
});
/* eslint-disable no-param-reassign */

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
