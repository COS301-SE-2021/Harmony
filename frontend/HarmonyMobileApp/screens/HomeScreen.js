import React, { useState } from 'react';
import CardScreen from "./CardScreen";
import FilterContext from '../Components/FilterContext';

const HomeScreen = () => {
  const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";

  const [mealTagArray, setMealTagArray] = useState([]);
  const [foodTagArray, setFoodTagArray] = useState([]);
  const [drinkTagArray, setDrinkTagArray] = useState([]);


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

  const filterState = {
    mealTagArray: mealTagArray,
    foodTagArray: foodTagArray,
    drinkTagArray: drinkTagArray,
    appendTagToArray,
    removeTagFromArray,
  };


  return (
    <FilterContext.Provider value={filterState}>
      <CardScreen URL={DASHBOARD_PAIRINGS_URL} headerVisible={true} />
    </FilterContext.Provider>

  )
};
export default HomeScreen;