import React, { useState } from 'react';
import CardScreen from "./CardScreen";
import FilterContext from '../Components/FilterContext';

const HomeScreen = () => {
  const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";

  const [setting1value, setSetting1value] = useState('initialValue1');
  const [tagArray, setTagArray] = useState([]);

  //Adds a tag to the start of the array
  const appendTagToArray = (newTag) => {
    setTagArray(tagArray => [newTag, ...tagArray]);
  };

  //Removes the first tag from the array
  const removeTagFromArray = () => {
    setTagArray(tagArray => [...tagArray.slice(1)]);
  };

  const filterState = {
    tagArray: tagArray,
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