import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
import Homepage from '../src/Homepage';
import ModeratePairing from '../src/ModeratePairing';
import Routing from './Routing';


function App() {
  return (
    <Routing />
  );
}

export default App;
