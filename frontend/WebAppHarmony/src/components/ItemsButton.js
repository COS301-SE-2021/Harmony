import React, { useState } from 'react';
import UniversalStyle from '../Styling/UniversalStyle';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import { AiOutlineMinusCircle } from "react-icons/ai";


function ItemsButton(item, ...props) {
    const [color, setColor] = useState("#CECECE");

    /**
       * @function removes the item from the list to be added
       */
    const handleRemoveItem = () => {
        console.log(item);
    }
    const changeColour = () => {
        console.log("clicked ");
        setColor("#FF6347");
    }

    return (
        <div style={ModerateItemStyling.requestedItemBox} onClick={() => changeColour()}>
            <p style={ModerateItemStyling.requestedItemName}>{item.item}</p>
            <AiOutlineMinusCircle style={UniversalStyle.icon} onClick={() => handleRemoveItem(item)} />
        </div>
    );
}

export default ItemsButton;
