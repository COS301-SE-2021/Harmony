import React from "react";
import CardScreen from "./CardScreen";

const CreatedPairingsScreen = () => {
    const USER_CREATED_PAIRINGS_URL = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewcreated"
    return (
        <CardScreen URL={USER_CREATED_PAIRINGS_URL} />
    )
};
export default CreatedPairingsScreen;