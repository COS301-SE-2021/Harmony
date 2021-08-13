import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";

function App() {
  return (
    <div style={{ width: "100%", alignItems: "center", backgroundColor: "#F3F3F3" }}>
      <Header></Header>
      <Dashboard></Dashboard>
      {/* <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
    </div>
  );
}

export default App;
