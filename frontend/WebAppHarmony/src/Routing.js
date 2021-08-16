import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
import Homepage from '../src/Homepage';
import ModeratePairing from '../src/ModeratePairing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PropTypes from "prop-types";
//icon={<Icon icon="home" />} add to nav elements when decided
const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <div>
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
class Routing extends Component {
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
      <div>
        <div id="adminWord"> <p style={{ fontFamily: "sans-serif-light" }}>Admin</p></div>
        <div>
          <CustomNav appearance="subtle" active={this.state.active} onSelect={this.handleSelect} />
        </div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/moderatePairings">Moderate Pairings</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" >
                <ReturnHomepage />
              </Route>
              <Route path="/moderatePairings">
                <Moderate />
              </Route>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function ReturnHomepage() {
  return <Homepage />;
};
function Moderate() {
  return (<ModeratePairing />);
};
export default Routing;
