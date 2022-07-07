import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { modalReducer } from "./modal";

// rtk-query demo
import appService from "../services/appService";
import userService from "../services/userService";

export default configureStore({
    reducer: combineReducers({
        toastr: toastrReducer,
        auth: authReducer,
        user: userReducer,
        modal: modalReducer,
        [appService.reducerPath] : appService.reducer,
        [userService.reducerPath] : userService.reducer
    }),
});
