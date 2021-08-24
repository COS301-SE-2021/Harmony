import React, { useState } from 'react';
import CardScreen from "./CardScreen";
import FilterContext from '../Components/FilterContext';

const HomeScreen = () => {
  const DASHBOARD_PAIRINGS_URL = "https://9vk5hcie79.execute-api.eu-west-1.amazonaws.com/dev";

  const [setting1value, setSetting1value] = useState('initialValue1');


  const userSettings = {
    setting1name: setting1value,
    setSetting1value,
  };

  return (
    <FilterContext.Provider value={userSettings}>
      <CardScreen URL={DASHBOARD_PAIRINGS_URL} headerVisible={true} />
    </FilterContext.Provider>

  )
};
export default HomeScreen;