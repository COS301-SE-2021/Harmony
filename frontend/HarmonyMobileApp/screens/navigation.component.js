import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import HomeScreen from "./HomeScreen.js";
import ViewFavouritesScreen from "./ViewFavouritesScreen.js";
import SettingsScreen from "./SettingsScreen.js";
import CameraScreen from "./CameraScreen.js";
import PairingResultsScreen from "./PairingResultsScreen.js";
import DrinkDetailsScreen from "./DrinkDetailsScreen.js";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const CameraIcon = (props) => <Icon {...props} name="camera-outline" />;
const HeartIcon = (props) => <Icon {...props} name="heart-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={CameraIcon} />
    <BottomNavigationTab icon={HeartIcon} />
    <BottomNavigationTab icon={SettingsIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Results" component={Results} />
    {/* <Screen name="Home" component={HomeScreen} /> */}
    <Screen name="Camera" component={CameraScreen} />

    <Screen name="Favourite" component={ViewFavouritesScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
);

const Results = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Results">
    <Stack.Screen name="PairingResults" component={PairingResultsScreen} />
    <Stack.Screen
      name="DrinkDetailsScreen"
      component={DrinkDetailsScreen}
      options={() => options}
    />
  </Stack.Navigator>
);

const options = {
  transitionSpec: {
    //Necessary to avoid image flicker after transition
    open: { animation: "timing", config: { duration: 250 } },
    close: { animation: "timing", config: { duration: 250 } },
  },
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
  cardStyle: {
    backgroundColor: "transparent",
  },
};

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
