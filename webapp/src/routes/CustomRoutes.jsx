import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoginStatus } from '../hooks/auth'


export const PrivateRoute = ({component: Component, ...rest}) => {

    const isLoggedIn = useLoginStatus()

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const isLoggedIn = useLoginStatus()

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLoggedIn && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};