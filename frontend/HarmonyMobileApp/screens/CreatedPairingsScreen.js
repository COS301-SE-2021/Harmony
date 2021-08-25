import React from "react";
import CardFilterScreen from "./CardFilterScreen";

const CreatedPairingsScreen = () => {
    const USER_CREATED_PAIRINGS_URL = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewcreated"
    return (
        <CardFilterScreen givenURL={USER_CREATED_PAIRINGS_URL} isHeaderVisible={false} />
    )
};
export default CreatedPairingsScreen;