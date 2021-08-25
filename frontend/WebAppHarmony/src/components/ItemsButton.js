import React, { useState, useEffect } from 'react';
import UniversalStyle from '../Styling/UniversalStyle';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import { AiOutlineMinusCircle } from "react-icons/ai";


function ItemsButton(item, ...props) {
    const [name, setName] = useState(item.itemName);

    /**
       * @function removes the item from the list to be added
       */
    const handleRemoveItem = (name) => {
        console.log(item);
    }
    const handleClick = (item) => {
        console.log("click " + item.ItemName);
    }

    return (
        <div style={ModerateItemStyling.requestedItemBox}>
            {console.log("item is " + item.ItemName)}
            <p style={ModerateItemStyling.requestedItemName}>{item.item}</p>
            <AiOutlineMinusCircle style={UniversalStyle.icon} onClick={() => handleRemoveItem(item)} />
        </div>
    );
}

export default ItemsButton;
