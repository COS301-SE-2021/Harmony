import React, { useState, useRef } from 'react';
import UniversalStyle from '../Styling/UniversalStyle';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import AddItemForm from '../components/AddItemForm';
import { AiOutlineMinusCircle } from "react-icons/ai";
//user ages, demographics
function ModeratePairing() {

    /**The name, description and tags for the form */
    const [name, setName] = useState("test name");
    const [description, setDescription] = useState("test decr");
    const [tags, setTags] = useState("test tags");
    const formReference = useRef(null);
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


    /** @function sets the forms default values to the button values
     * @param item = the api response item
     */
    const handleClick = (item) => {
        console.log("click " + item.ItemName);
        setName(item.ItemName);
        setDescription(item.ItemDescription);
        setTags(item.ItemTags);
    }
    /**
     * @function removes the item from the list to be added
     */
    const handleRemoveItem = (item) => {
        console.log("clicked remove " + item.ItemName);
    }

    const handleValueUpdate = (values) => {
        console.log("name updated " + values.ItemName)
    }
    return (
        <div style={UniversalStyle.greyContainer}>
            <div style={ModerateItemStyling.requestContainer}>
                <p>Users have requested the following items to be added to the database:</p>
                <br />
                {/**
                 * maps the requested item names to be repeatedly displayed
                 */}
                {requestedItems.Data.map((item, index) => (
                    <button style={ModerateItemStyling.button} onClick={() => handleClick(item)}>
                        <div key={index} style={ModerateItemStyling.requestedItemBox}>
                            <p style={ModerateItemStyling.requestedItemName}>{item.ItemName}</p>
                            <AiOutlineMinusCircle style={UniversalStyle.icon} onClick={() => handleRemoveItem(item)} />
                        </div>
                    </button>))}
            </div>
            <AddItemForm itemName={name} itemDescription={description} itemTags={tags} />
        </div>

    );
}

export default ModeratePairing;
