import React from "react";
import CardFilterScreen from "./CardFilterScreen";

const FavouritesScreen = () => {
  const USER_FAVOURITED_PAIRINGS = "https://2928u23tv1.execute-api.eu-west-1.amazonaws.com/dev/viewfavourites"
  return (
    <CardFilterScreen givenURL={USER_FAVOURITED_PAIRINGS} isHeaderVisible={false} isDeleteVisible={false} userFavs={true} />

  )
};
export default FavouritesScreen;