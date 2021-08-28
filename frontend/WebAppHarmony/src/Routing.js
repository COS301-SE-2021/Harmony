import React, { Component } from 'react';
import './App.css';

import { Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Homepage from './Pages/Homepage';
import ModeratePairing from './Pages/ModeratePairing';
import UserFeedback from './Pages/UserFeedback';
import TrainAI from "./Pages/TrainAI";
// import "../Styling/MainStyling.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { AiOutlineHome, AiOutlineSecurityScan, AiOutlineRadarChart } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";
import ReduxStore from "../src/ReduxStore";
/**
 * The main routing of the entire web app
 */
class Routing extends Component {
  constructor() {
    super();
    this.state = {
      active: ReduxStore.getState().activeBar
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (activeKey) => {
    this.setState({ active: activeKey });
    // this.props.history.push(activeKey);
    ReduxStore.dispatch({
      type: "CHANGEACTIVE",
      payload: activeKey
    })
  };
  linkStyling = {
    color: "#4D4D4D",
    fontFamily: "sans-serif-light",
    fontSize: 20,
    textDecoration: "none",
    paddingLeft: 5,
    paddingRight: 25
  };

  iconStyling = {
    height: 20,
    width: 20,
    color: "#4D4D4D",
    marginBottom: -2,
  };
  textHeader = {
    fontSize: 40,
    fontFamily: "sans-serif-light",
    color: "white"
  }
  render() {
    return (
      <div style={{ width: "100vw", alignItems: "center", backgroundColor: "#F3F3F3" }}>
        <div style={{ backgroundColor: " #FF6347" }}>

          <div style={{ textAlign: "center" }}> <p style={this.textHeader}>Harmony Admin</p></div>
        </div>
        <Router>
          <nav style={{ width: "20%" }}>
            {/* <div style={{ width: "100%", justifyContent: "center", display: "flex" }}> */}
            <div style={{ display: "flex", width: "10%", float: "left" }}>
              <Nav vertical appearance="subtle" activeKey={this.state.active} onSelect={this.handleSelect}>
                <Nav.Item eventKey="HOME"
                  icon={<AiOutlineHome style={this.iconStyling} />}>
                  <Link to="/home" style={this.linkStyling}>Home</Link>
                </Nav.Item>
                <Nav.Item eventKey="MODERATEPAIRING"
                  icon={<AiOutlineSecurityScan style={this.iconStyling} />}>
                  <Link to="/moderateItems" style={this.linkStyling}>Moderate Items</Link>
                </Nav.Item>
                <Nav.Item eventKey="USERFEEDBACK"
                  icon={<RiFeedbackLine style={this.iconStyling} />}>
                  <Link to="/userFeedback" style={this.linkStyling}>User Feedback</Link>
                </Nav.Item>
                <Nav.Item eventKey="TRAINAI"
                  icon={<AiOutlineRadarChart style={this.iconStyling} />}>
                  <Link to="/trainModel" style={this.linkStyling}>Train AI</Link>
                </Nav.Item>
              </Nav>
            </div>
          </nav>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" >
              <ReturnHomepage />
            </Route>
            <Route exact path="/moderateItems">
              <Moderate />
            </Route>
            <Route exact path="/userFeedback">
              <Feedback />
            </Route>
            <Route exact path="/trainModel">
              <Train />
            </Route>

          </Switch>
        </Router>

      </div>
    );
  }
}

/**
 * 
 * @returns the specific pages for the navigation
 */
function ReturnHomepage() {
  return <Homepage />;
};
function Moderate() {
  return (<ModeratePairing />);
};
function Feedback() {
  return (<UserFeedback />);
};
function Train() {
  return (<TrainAI />);
};
export default Routing;
