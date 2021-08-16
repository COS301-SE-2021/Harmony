import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
import Homepage from '../src/Homepage';
import ModeratePairing from '../src/ModeratePairing';
import "../Styling/MainStyling.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { AiOutlineHome, AiOutlineSecurityScan } from "react-icons/ai";
import PropTypes from "prop-types";
//icon={<Icon icon="home" />} add to nav elements when decided

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

  };
  linkStyling = {
    color: "#4D4D4D",
    fontFamily: "sans-serif-light",
    fontSize: 20,
    textDecoration: "none",
    paddingLeft: 5
  };

  iconStyling = {
    height: 20,
    width: 20,
    color: "#4D4D4D",
    marginBottom: -2,
  };
  textHeader = {
    fontSize: 40,
    fontFamily: "sans-serif-light"
  }
  render() {
    return (
      <div style={{ width: "100vw", alignItems: "center", backgroundColor: "#F3F3F3" }}>
        <div style={{ backgroundColor: "white" }}>
          <Router>

            <div style={{ textAlign: "center" }}> <p style={this.textHeader}>Harmony Admin</p></div>
            <nav>
              <div style={{ width: "50%", justifyContent: "center", flex: 1, backgroundColor: "pink" }}>
                <Nav appearance="subtle" activeKey={this.state.active} onSelect={this.handleSelect}>
                  <Nav.Item eventKey="HOME"
                    icon={<AiOutlineHome style={this.iconStyling} />}>
                    <Link to="/home" style={this.linkStyling}>Home</Link>
                  </Nav.Item>
                  <Nav.Item eventKey="MODERATEPAIRING"
                    icon={<AiOutlineSecurityScan style={this.iconStyling} />}>
                    <Link to="/moderatePairings" style={this.linkStyling}>Moderate Pairings</Link>
                  </Nav.Item>

                </Nav>
              </div>
            </nav>
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
          </Router>

        </div>
        {/* <Router>
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
        </Router> */}
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
