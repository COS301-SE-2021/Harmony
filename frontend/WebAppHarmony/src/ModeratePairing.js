import React from 'react';
import './App.css';
import {
    Formik, Form, Field,
} from 'formik';
import Button from '@material-ui/core/Button';
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

    const formElements = {
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 15,
        justifyContent: "space-between",
        display: "flex"
    };

    const textField = {
        borderRadius: 15,
        width: "65%",
        height: 45,
        padding: 15,
    };
    const formLabel = {
        marginTop: 10,
        fontSize: 20
    };
    const requestedItems = {
        Data: [{
            ItemName: "Malva Pudding",
            ItemDescription: "Malva pudding is a sweet pudding that contains apricot jam and has a spongy caramelized texture."
        },
        { ItemName: "Cape Malay Curry", ItemDescription: "Description of cape malay curry" },
        { ItemName: "Biltong", ItemDescription: "Description of biltong" },
        { ItemName: "Boerewors", ItemDescription: "description of boerewors" },
        { ItemName: "Amarula Don Pedro", ItemDescription: "description of amarula dom pedro" },
        { ItemName: "Melktert", ItemDescription: "description of melktert" }]
    };
    var formInitialValues = {
        ItemName: ' ',
        ItemDescription: '',
    }
    // const requestedItems = ["Malva Pudding", "Cape Malay Curry", "Biltong", "Boerewors", "Amarula Don Pedro", "Melktert"];
    const button = {
        backgroundColor: "#CECECE",
        margin: 10,
        height: 35,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 12,
        paddingRight: 12
    };
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", paddingTop: 25, backgroundColor: "#F3F3F3" }}>
            <div style={requestContainer}>
                <p>Users have requested the following items to be added to the database:</p>
                <br />
                {/**
                 * maps the requested item names to be repeatedly displayed
                 */}
                {requestedItems.Data.map((item, index) => (
                    <button style={button} onClick={() => { console.log("click " + item.ItemName); formInitialValues.ItemName = item.ItemName; formInitialValues.ItemDescription = item.ItemDescription }}>
                        <div key={index} style={{ textAlign: "center", paddingBottom: 15, borderWidth: 5, borderColor: "black" }}>
                            <p style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>{item.ItemName}</p></div></button>))}
            </div>
            <div style={addItemContainer}>
                <p>Add an item to the database:</p>
                <div>
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={() => (console.log("submitted"))}
                    >
                        {/** The moderate pairings form to submit */}
                        <Form>
                            <div style={formElements}>
                                <input type="file" id="file-input" name="ImageStyle" />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="ItemName" style={formLabel}>Item Name</label>
                                <Field id="ItemName" name="ItemName" style={textField} />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="ItemDescription" style={formLabel}>Item Description</label>
                                <Field id="ItemDescription" name="ItemDescription" style={textField} />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="Tags" style={formLabel}>Item Tags</label>
                                <Field id="Tags" name="Tags" style={textField} placeholder="Sweet, Fizzy" />
                            </div>

                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>

    );
}

export default ModeratePairing;
