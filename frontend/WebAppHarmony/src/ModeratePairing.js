import React from 'react';
import './App.css';
import {
    Formik, Form, Field,
} from 'formik';

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
    }

    const requestedItems = ["Malva Pudding", "Cape Malay Curry", "Biltong", "Boerewors", "Amarula Don Pedro", "Melktert"];
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", paddingTop: 25, backgroundColor: "#F3F3F3" }}>
            <div style={requestContainer}>
                <p>Users have requested the following items to be added to the database:</p>
                <br />
                {requestedItems.map((item, index) => (<div key={index} style={{ textAlign: "center", paddingBottom: 15, borderWidth: 5, borderColor: "black" }}><p style={{ fontSize: 18 }}>{item}</p></div>))}
            </div>
            <div style={addItemContainer}>
                <p>Add an item to the database:</p>
                <div>
                    <Formik
                        initialValues={{
                            ItemName: requestedItems[0],
                            ItemDescription: '',
                        }}
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
                                <Field id="ItemDescription" name="ItemDescription" style={textField} placeholder="Orange flavoured carbonated soft drink" />
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
