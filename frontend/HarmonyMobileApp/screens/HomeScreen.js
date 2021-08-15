import React from "react";
import CardScreen from "./CardScreen";

const HomeScreen = () => {
  const homeScreenURL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";
  return (
    <CardScreen URL={homeScreenURL} />
  )
};
export default HomeScreen;