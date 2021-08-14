import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";

import HomeScreen from "./HomeScreen.js";
import ViewFavouritesScreen from "./ViewFavouritesScreen.js";
import ShowLatestPairingsScreen from "./ShowLatestPairingsScreen";
import SettingsScreen from "./SettingsScreen.js";
import PairingResultsScreen from "./PairingResultsScreen.js";
import DrinkDetailsScreen from "./DrinkDetailsScreen.js";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
const Tab = createMaterialTopTabNavigator();

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
    <Screen name="Results" component={Results} />
    {/* <Screen name="Home" component={HomeScreen} /> */}
    <Screen name="Camera" component={CameraScreen} />
    {/* <Screen name="Favourite" component={ViewFavouritesScreen} /> */}
    <Screen name="Favourite" component={UserPairingsTopTabs} />
    {/* <Screen name="Favourite" component={UserPairingsScreen} /> */}
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

function UserPairingsTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Favourites"
      tabBarOptions={{
        labelStyle: {
          textAlign: "center",
          textTransform: "none", //Needed else the table titles will be all caps
          fontSize: 20,
        },
        showIcon: true, //Required for icon to show
        // showLabel: false,// to hide tab text
        activeTintColor: "#3366FF", //When this is the active tab, this will be the color of the text and icons
        inactiveTintColor: "rgba(0,0,0,0.4)",
        // backgroundColor: "rgba(0,0,0,0.1)",

        tabStyle: {
          flexDirection: "row",
          height: 70,
        },
        indicatorStyle: {
          //Style of the scroll bar at the bottom of the tabs
          borderBottomColor: "#3366FF",
          borderBottomWidth: 4,
        },
      }}
    >
      <Tab.Screen
        name="UserFavourites"
        component={ViewFavouritesScreen}
        options={{
          tabBarLabel: "My Favourites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart-o" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="UserPairings"
        component={ShowLatestPairingsScreen}
        options={{
          tabBarLabel: "My Pairings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
const styles = StyleSheet.create({
  tabHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tabContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
