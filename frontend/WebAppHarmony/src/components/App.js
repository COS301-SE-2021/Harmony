import React, {useState} from "react";
import { HashRouter, Route, Switch, Redirect, Router, useHistory } from "react-router-dom";
import { Auth, Hub, Amplify } from 'aws-amplify'
import '../aws-exports'
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
// components
import Layout from "./Layout";
import { useUserState } from "../context/UserContext";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import ResetPass from "../pages/resetpass";
import SignUp from "../pages/signup";

// context

export default function App() {
    // global
    var { isAuthenticated } = useUserState();

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/dashboard" />}
                />
                <PrivateRoute path="/app" component={Layout} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/resetpass" component={ResetPass} />
                <PublicRoute path="/signup" component={SignUp} />
                <Route component={Error} />
            </Switch>
        </HashRouter>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }
}

