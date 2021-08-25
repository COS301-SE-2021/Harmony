import React from "react";
import CardFilterScreen from "./CardFilterScreen";

const FavouritesScreen = () => {
  const USER_FAVOURITED_PAIRINGS = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/viewfavourites"
  return (
    <CardFilterScreen givenURL={USER_FAVOURITED_PAIRINGS} isHeaderVisible={false} />

  )
};
export default FavouritesScreen;