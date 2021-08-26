import React from "react";
import CardFilterScreen from "./CardFilterScreen";

const HomeScreen = () => {
    const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";
    return (
        <CardFilterScreen givenURL={DASHBOARD_PAIRINGS_URL} isHeaderVisible={true} />
    )
};
export default HomeScreen;