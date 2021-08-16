import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
import Homepage from '../src/Homepage';
import ModeratePairing from '../src/ModeratePairing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Routing() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ReturnHomepage">Home</Link>
            </li>
            <li>
              <Link to="/moderatePairings">Moderate Pairings</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/ReturnHomepage" >
            <ReturnHomepage />
          </Route>
          <Route path="/moderatePairings">
            <Moderate />
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

function ReturnHomepage() {
  return <Homepage />;
};
function Moderate() {
  return (<ModeratePairing />);
};
export default Routing;
