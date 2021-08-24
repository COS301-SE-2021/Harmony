import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";

/**@name Homepage
 * @summary returns the homepage 
 */
function Homepage() {
    return (
        <div style={{ width: "100vw", alignItems: "center", backgroundColor: "#F3F3F3" }}>
            <Dashboard></Dashboard>
        </div>
    );
}

export default Homepage;
