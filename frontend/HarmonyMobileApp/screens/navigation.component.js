import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";

import HomeScreen from "./HomeScreen.js";
import ViewFavouritesScreen from "./ViewFavouritesScreen.js";
import SettingsScreen from "./SettingsScreen.js";
import PairingResultsScreen from "./PairingResultsScreen.js";

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const CameraIcon = (props) => (
  <Icon {...props} name="camera-outline" width="32" height="32" />
);
const HeartIcon = (props) => <Icon {...props} name="heart-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

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
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={CameraIcon} />
    <BottomNavigationTab icon={HeartIcon} />
    <BottomNavigationTab icon={SettingsIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={PairingResultsScreen} />
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
