import React, { useState } from 'react';
import CardScreen from "./CardScreen";
import FilterContext from '../Components/FilterContext';

const HomeScreen = () => {
  const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";

  //The respective arrays holding the applied tags to filter by
  const [mealTagArray, setMealTagArray] = useState([]);
  const [foodTagArray, setFoodTagArray] = useState([]);
  const [drinkTagArray, setDrinkTagArray] = useState([]);

  //the filter by which the home feed page can be sorted by
  //Options: Trending, New, Best, Controversial, Nearby
  const [sortPairingType, setSortPairingType] = useState("Trending");


  //The range(distance) in which pairings should be within
  const [range, setRange] = useState(null);

  //Adds a tag to the start of the array
  const appendTagToArray = (newTag, tagType) => {
    console.log("appending...")
    console.log(tagType)

    switch (tagType) {
      case "mealTypes":
        setMealTagArray(mealTagArray => [newTag, ...mealTagArray]);
        break;
      case "food":
        setFoodTagArray(foodTagArray => [newTag, ...foodTagArray]);
        break;
      case "drinks":
        setDrinkTagArray(drinkTagArray => [newTag, ...drinkTagArray]);
        break;

      default:
        console.log("Incorrect tagType");
    }

  };

  //Removes the first tag from the array
  const removeTagFromArray = (tagTitle, tagType) => {
    switch (tagType) {
      case 'mealTypes':
        setMealTagArray(mealTagArray.filter(item => item !== tagTitle));
        break;
      case 'food':
        setFoodTagArray(foodTagArray.filter(item => item !== tagTitle));
        break;
      case 'drinks':
        setDrinkTagArray(drinkTagArray.filter(item => item !== tagTitle));
        break;
      default:
        console.log("Incorrect tagType");
    }
  };

  //Used as an indicator of whether or not the filter has been applied
  //If true then the page must be refreshed and the API with the new Context values
  const [applyFilter, setApplyFilter] = useState(false);

  const toggleFilter = () => {
    setApplyFilter(!applyFilter);
  };

  //Used as an indicator of whether or not the filter has been applied
  //If true then the page must be refreshed and the API with the new Context values

  const clearFilter = () => {
    setMealTagArray([]);
    setFoodTagArray([]);
    setDrinkTagArray([]);
    setRange(null);
  };


  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const filterState = {
    mealTagArray: mealTagArray,
    foodTagArray: foodTagArray,
    drinkTagArray: drinkTagArray,
    appendTagToArray,
    removeTagFromArray,

    sortPairingType: sortPairingType,
    setSortPairingType,

    range: range,
    setRange,

    applyFilter: applyFilter,
    toggleFilter,
    clearFilter,

    userLatitude: userLatitude,
    setUserLatitude,
    userLongitude: userLongitude,
    setUserLongitude,
  };


  return (
    <FilterContext.Provider value={filterState}>
      <CardScreen URL={DASHBOARD_PAIRINGS_URL} headerVisible={true} />
    </FilterContext.Provider>

  )
};
export default HomeScreen;