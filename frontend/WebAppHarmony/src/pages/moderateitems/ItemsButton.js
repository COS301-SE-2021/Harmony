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
    const handleRemoveItem = () => {console.log("12 " + item.item);
        const request = {
            ItemName: item.item
        }
        console.log(request)
        fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/removerequesteditem',             {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        method: "POST",
        body: JSON.stringify(request)
    })
        .then(data => data.json()) // Parsing the data into a JavaScript object
       // .then(json => alert( JSON.stringify(json)))
        .then(alert("New item has been removed from the list"))

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
