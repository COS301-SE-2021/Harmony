import React, { Component } from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { MODERATEPAIRING, LANDING, HOME } from "../Routes/Router";
import App from "../src/App";
import ModeratePairing from "../src/ModeratePairing"

export default class Body extends Component {

    render() {
        return (
            <div className="body col flex-grow">
                <Switch>
                    <Route path={MODERATEPAIRING}>
                        <ModeratePairing />
                    </Route>
                    <Route path={HOME}>
                        <App />
                    </Route>

                </Switch>
            </div>
        );
    }
}
