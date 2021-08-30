import React, { useState } from 'react';
import { AiOutlineMinusCircle } from "react-icons/ai";
// styles
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
function ItemsButton(item, ...props) {
    const [color, setColor] = useState("#CECECE");
    var classes = useStyles();

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
        <div className={classes.requestedItemBox} onClick={() => changeColour()}>
            <p className={classes.requestedItemName}>{item.item}</p>
            <AiOutlineMinusCircle className={classes.icon} onClick={() => handleRemoveItem(item)} />
        </div>
    );
}

export default ItemsButton;
