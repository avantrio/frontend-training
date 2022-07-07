import React from "react";
import {
	BrowserRouter as Router,
	Switch
} from "react-router-dom";
import {PrivateRoute,PublicRoute} from "./CustomRoutes";

import SignInPage, {RegisterPage, LogoutPage} from '../pages/AuthPage';
import ModalContainer from "../components/ModalContainer";
import Layout from "../pages/Layout";

const AppRoutes = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <PublicRoute restricted component={SignInPage} path="/signin" exact />
                    <PrivateRoute component={LogoutPage} path="/signout" exact />
                    <PrivateRoute component={RegisterPage} path="/register" exact />
                    <PrivateRoute component={Layout} path="/" />

                </Switch>
                <ModalContainer/>
            </div>
        </Router>
    );
}

export default AppRoutes;

