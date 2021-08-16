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

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="../src/Homepage.js">Home</Link>
            </li>
            <li>
              <Link to="../src/ModeratePairing.js">Moderate Pairings</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
        <Switch>
          <Route path="../src/Homepage.js" component={Homepage} />
          <Route path="../src/ModeratePairing.js">
            <ModeratePairing />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

function Test() {
  return <h2>Home</h2>;
}
export default App;
