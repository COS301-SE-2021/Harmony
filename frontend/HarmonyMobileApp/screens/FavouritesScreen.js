import React from "react";
import CardScreen from "./CardScreen";

const FavouritesScreen = () => {
  const userFavourites = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewfavourites"
  return (
    <CardScreen URL={userFavourites} />
  )
};
export default FavouritesScreen;