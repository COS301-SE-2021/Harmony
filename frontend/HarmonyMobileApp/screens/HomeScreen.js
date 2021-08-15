import React from "react";
import CardScreen from "./CardScreen";

const HomeScreen = () => {
  const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";
  return (
    <CardScreen URL={DASHBOARD_PAIRINGS_URL} />
  )
};
export default HomeScreen;