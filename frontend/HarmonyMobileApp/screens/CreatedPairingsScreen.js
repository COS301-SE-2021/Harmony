import React from "react";
import CardFilterScreen from "./CardFilterScreen";

const CreatedPairingsScreen = () => {
    const USER_CREATED_PAIRINGS_URL = "https://2928u23tv1.execute-api.eu-west-1.amazonaws.com/dev/viewusercreated"
    return (
        <CardFilterScreen givenURL={USER_CREATED_PAIRINGS_URL} isHeaderVisible={false} isDeleteVisible={true} />
    )
};
export default CreatedPairingsScreen;