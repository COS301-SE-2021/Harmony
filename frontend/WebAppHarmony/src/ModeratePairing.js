import React from 'react';
import './App.css';
// import { Formik } from 'formik';

//user ages, demographics
function ModeratePairing() {
    const requestContainer = {
        width: "20%",
        height: 600,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "white",
        float: "left",
        textAlign: "center",
        // margin: "auto",
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    };
    const addItemContainer = {
        width: "65%",
        height: 600,
        marginLeft: 100,
        padding: 15,
        borderRadius: 15,
        float: "left",
        backgroundColor: "white",
        textAlign: "center",
        // margin: "auto",
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    };

    const requestedItems = ["Malva Pudding", "Cape Malay Curry", "Biltong", "Boerewors", "Amarula Don Pedro", "Melktert"];
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", paddingTop: 25, backgroundColor: "#F3F3F3" }}>
            <div style={requestContainer}>
                <p>Users have requested the following items to be added to the database:</p>
                <br />
                <div>{requestedItems.map((item, index) => (<div key={index} style={{ textAlign: "center", paddingBottom: 15 }}><p style={{ fontSize: 18 }}>{item}</p></div>))}</div>
            </div>
            <div style={addItemContainer}>
                <p>Add an item to the database:</p>
            </div>
        </div>

    );
}

export default ModeratePairing;
