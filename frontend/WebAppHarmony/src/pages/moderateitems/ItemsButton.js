import React, { useState } from 'react';
import { AiOutlineMinusCircle } from "react-icons/ai";
// styles
import useStyles from "./styles";
// components
function ItemsButton(item, ...props) {
    var classes = useStyles();

    /**
       * @function removes the item from the list to be added
       */
    const handleRemoveItem = () => {
        console.log(item);
    }

    return (
        <div className={classes.requestedItemBox}>
            <p className={classes.requestedItemName}>{item.item}</p>
            <div className={classes.icon}>
                <AiOutlineMinusCircle size="20" onClick={() => handleRemoveItem(item)} />
            </div>
        </div>
    );
}

export default ItemsButton;
