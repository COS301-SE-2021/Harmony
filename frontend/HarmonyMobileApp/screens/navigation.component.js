import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from "@ui-kitten/components";

import HomeScreen from "./HomeScreen.js";
import ViewFavouritesScreen from "./ViewFavouritesScreen.js";
import ViewAllPairingsScreen from "./ViewAllPairingsScreen.js";
import SettingsScreen from "./SettingsScreen.js";

const { Navigator, Screen } = createBottomTabNavigator();

const CameraScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">Camera</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Popular" />
    <BottomNavigationTab title="Camera" />
    <BottomNavigationTab title="Favourites" />
    <BottomNavigationTab title="Settings" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Popular" component={ViewAllPairingsScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Favourite" component={ViewFavouritesScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
