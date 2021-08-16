import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";

function Homepage() {
    return (
        <div style={{ width: "100%", alignItems: "center", backgroundColor: "#F3F3F3" }}>
            <Header></Header>
            <Dashboard></Dashboard>
        </div>
    );
}

export default Homepage;
