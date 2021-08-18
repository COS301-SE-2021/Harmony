import React, { useState } from 'react';
import './App.css';
import {
    Formik, Form, Field,
} from 'formik';
import { AiOutlineMinusCircle } from "react-icons/ai";
//user ages, demographics
function ModeratePairing() {

    /**The name, description and tags for the form */
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [tags, setTags] = useState(" ");

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
            ItemDescription: "Malva pudding is a sweet pudding that contains apricot jam and has a spongy caramelized texture.",
            ItemTags: "Sweet , Hot, Warm"
        },
        {
            ItemName: "Cape Malay Curry",
            ItemDescription: "Influenced by Malay cuisine, Cape/Malay curry powder/masala is a blend of sweet and pungent spices. A curry powder/masala of a mild heat yet full of the flavours you expect in Indian curry.",
            ItemTags: "Spicy, Hot, Savoury"
        },
        { ItemName: "Biltong", ItemDescription: "Biltong is a form of dried, cured meat that originated in Southern African countries Various types of meat are used to produce it, ranging from beef to game", ItemTags: "Spicy, Cold, Salty" },
        { ItemName: "Boerewors", ItemDescription: "Boerewors, a type of sausage which originated in South Africa. It is an important part of South African, Zimbabwean and Namibian cuisine and is popular across Southern Africa", ItemTags: "Spicy, Hot, Savoury" },
        { ItemName: "Amarula Don Pedro", ItemDescription: "Amarula is a cream liqueur from South Africa. It is made with sugar, cream and the fruit of the African marula tree", ItemTags: "Alcoholic, Cold, Sweet" },
        { ItemName: "Melktert", ItemDescription: "Melktert is an Afrikaner dessert consisting of a sweet pastry crust containing a custard filling made from milk, flour, sugar and eggs.", ItemTags: "Sweet, Warm" }]
    };

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

    /** @function sets the forms default values to the button values
     * @param item = the api response item
     */
    const handleClick = (item) => {
        console.log("click " + item.ItemName);
        setName(item.ItemName);
        setDescription(item.ItemDescription);
        setTags(item.ItemTags);
    }

    const handleClear = () => {
        setName(" ");
        setDescription(" ");
        setTags(" ");
    }
    /**
     * @function removes the item from the list to be added
     */
    const handleRemoveItem = (item) => {
        console.log("clicked remove " + item.ItemName);
    }
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", paddingTop: 25, backgroundColor: "#F3F3F3" }}>
            <div style={requestContainer}>
                <p>Users have requested the following items to be added to the database:</p>
                <br />
                {/**
                 * maps the requested item names to be repeatedly displayed
                 */}
                {requestedItems.Data.map((item, index) => (
                    <button style={button} onClick={() => handleClick(item)}>
                        <div key={index} style={{ textAlign: "center", paddingBottom: 15, float: "left" }}>
                            <p style={{ fontSize: 20, float: "left" }}>{item.ItemName}</p>
                            <AiOutlineMinusCircle style={{ marginLeft: 5, float: "left", height: 20, width: 20, marginTop: 3, marginRight: -3 }} onClick={() => handleRemoveItem(item)} />
                        </div>
                    </button>))}
            </div>
            <div style={addItemContainer}>
                <p>Add an item to the database:</p>
                <div>
                    <Formik
                        onSubmit={() => (console.log("submitted"))}
                    >
                        {/** The moderate pairings form to submit */}
                        <Form>
                            <div style={formElements}>
                                <input type="file" id="file-input" name="ImageStyle" />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="ItemName" style={formLabel}>Item Name</label>
                                <Field id="ItemName" name="ItemName" style={textField} value={name} />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="ItemDescription" style={formLabel}>Item Description</label>
                                <Field id="ItemDescription" name="ItemDescription" style={textField} value={description} />
                            </div>
                            <div style={formElements}>
                                <label htmlFor="Tags" style={formLabel}>Item Tags</label>
                                <Field id="Tags" name="Tags" style={textField} value={tags} />
                            </div>

                            <div>
                                <button type="submit" onClick={() => console.log("clicked submit")} style={button}><p style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>Add to Database</p></button>
                            </div>
                        </Form>
                    </Formik>
                    <button onClick={() => handleClear()} style={button}><p style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>Clear</p></button>
                </div>
            </div>
        </div>

    );
}

export default ModeratePairing;
