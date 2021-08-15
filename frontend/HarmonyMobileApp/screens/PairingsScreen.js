import React from "react";
import CardScreen from "./CardScreen";

const PairingsScreen = () => {
    const userCreatedURL = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewcreated"
    return (
        <CardScreen URL={userCreatedURL} />
    )
};
export default PairingsScreen;