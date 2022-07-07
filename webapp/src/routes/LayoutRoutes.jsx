import React from "react";

import Breadcrumbs from "../components/Breadcrumbs";
import {PrivateRoute} from "./CustomRoutes";
import DashboardPage from '../pages/DashboardPage';
import {UserListPage, UserEditPage} from '../pages/UserPages'

const LayoutRoutes = () => {
    return (
        <>
            <Breadcrumbs/>
            <PrivateRoute component={DashboardPage} exact path="/" />
            <PrivateRoute component={UserListPage} exact path="/users" />
            <PrivateRoute component={UserEditPage} exact path="/users/addUser" />
            <PrivateRoute component={UserEditPage} exact path="/users/editUser/:userId" />
        </>
    );
}

export default LayoutRoutes;