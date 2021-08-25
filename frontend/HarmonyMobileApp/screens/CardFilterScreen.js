import React, { useState } from 'react';
import CardScreen from "./CardScreen";
import FilterContext from '../Components/FilterContext';
import AppAlert from "../Components/AppAlert";

const CardFilterScreen = ({ givenURL, isHeaderVisible }) => {

  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("Oops, something went wrong.");

  //the filter by which the home feed page can be sorted by
  //Options: Trending, New, Best, Controversial, Nearby
  const [sortPairingType, setSortPairingType] = useState("Trending");

  //The range(distance) in which pairings should be within
  const [range, setRange] = useState(null);

  //The respective arrays holding the applied tags to filter by
  const [mealTagArray, setMealTagArray] = useState([]);
  const [foodTagArray, setFoodTagArray] = useState([]);
  const [drinkTagArray, setDrinkTagArray] = useState([]);

  //Adds a tag to the start of the array
  const appendTagToArray = (newTag, tagType) => {
    //console.long("appending...")
    //console.long(tagType)

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
        //setModalMessage must come before setErrorAlertVisible
        setModalMessage("Oops, something went wrong.");
        setErrorAlertVisible(true);
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
        //setModalMessage must come before setErrorAlertVisible
        setModalMessage("Oops, something went wrong.");
        setErrorAlertVisible(true);
    }
  };

  //Used as an indicator of whether or not the filter has been applied
  //If true then the page must be refreshed and the API with the new Context values
  const [applyFilter, setApplyFilter] = useState(false);

  const toggleFilter = () => {
    setApplyFilter(!applyFilter);
  };

  //Clears all filter values
  const clearFilter = () => {
    setMealTagArray([]);
    setFoodTagArray([]);
    setDrinkTagArray([]);
    setRange(null);
  };


  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const globalStates = {
    sortPairingType: sortPairingType,
    setSortPairingType,

    range: range,
    setRange,

    mealTagArray: mealTagArray,
    foodTagArray: foodTagArray,
    drinkTagArray: drinkTagArray,
    appendTagToArray,
    removeTagFromArray,

    applyFilter: applyFilter,
    toggleFilter,
    clearFilter,

    userLatitude: userLatitude,
    setUserLatitude,
    userLongitude: userLongitude,
    setUserLongitude,
  };


  return (
    <FilterContext.Provider value={globalStates}>
      <CardScreen URL={givenURL} headerVisible={isHeaderVisible} />
      {isErrorAlertVisible === true && (
        <AppAlert visible={true} message={modalMessage} type={"Error"} />
      )}
    </FilterContext.Provider>

  )
};
export default CardFilterScreen;