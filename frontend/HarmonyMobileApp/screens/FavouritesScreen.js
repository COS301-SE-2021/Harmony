import React from "react";
import CardScreen from "./CardScreen";

const FavouritesScreen = () => {
  const ViewUserFavourites = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewfavourites"
  return (
    <CardScreen URL={ViewUserFavourites} />
  )
};
export default FavouritesScreen;