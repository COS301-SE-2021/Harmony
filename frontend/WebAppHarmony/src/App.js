import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <div style={{ borderRadius: 15, backgroundColor: "grey", width: "90%", height: "400px" }}></div>
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
