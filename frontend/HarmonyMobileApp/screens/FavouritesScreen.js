import React from "react";
import CardScreen from "./CardScreen";

const FavouritesScreen = () => {
  const USER_FAVOURITED_PAIRINGS = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewfavourites"
  return (
    <CardScreen URL={USER_FAVOURITED_PAIRINGS} />
  )
};
export default FavouritesScreen;