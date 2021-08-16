import React, { Component } from 'react';
import '../src/App.css';
import { Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import App from "../src/App";
import ModeratePairing from '../src/ModeratePairing';
import PropTypes from "prop-types";
import { MODERATEPAIRING } from "../Routes/Router"

//icon={<Icon icon="home" />} add to nav elements when decided
const CustomNav = ({ active, onSelect, ...props }) => {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="../src/App">Home</Link>
                            </li>
                            <li>
                                <Link to="../src/ModeratePairing">Moderate Pairings</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="../src/App">
                            <App />
                        </Route>
                        <Route path="../src/ModeratePairing">
                            <ModeratePairing />
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
                <Nav.Item eventKey="HOME" > Home</Nav.Item>
                <Nav.Item eventKey="MODERATEPAIRING">Moderate Pairings</Nav.Item>

            </Nav>
        </div>
    );
};
const styles = {
    marginBottom: 50
};
class Header extends Component {
    constructor() {
        super();
        this.state = {
            active: 'HOME'
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleSelect = (activeKey) => {
        this.setState({ active: activeKey });
        // this.props.history.push(activeKey);

    }
    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                <div id="adminWord"> <p style={{ fontFamily: "sans-serif-light" }}>Admin</p></div>
                <div>
                    <CustomNav appearance="subtle" active={this.state.active} onSelect={this.handleSelect} />
                </div>
            </div >
        );
    }
}

export default Header;
