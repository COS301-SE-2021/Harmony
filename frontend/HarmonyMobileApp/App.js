import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen.js";
import NewPairingScreen from "./screens/NewPairingScreen.js";
import DeletePairingScreen from "./screens/DeletePairingScreen.js";
import ViewPairingsScreen from "./screens/ViewPairingsScreen.js";

import AddToFavouritesScreen from "./screens/AddToFavouritesScreen.js";
import ShowLatestPairingsScreen from "./screens/ShowLatestPairingsScreen.js";
import ViewAllPairingsScreen from "./screens/ViewAllPairingsScreen.js";
import ViewIndividualItemsScreen from "./screens/ViewIndividualItemsScreen.js";
import ViewFavouritesScreen from "./screens/ViewFavouritesScreen.js";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        openByDefault
        drawerType={"slide"}
        edgeWidth={500}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            drawerIcon: ({ focused, size }) => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />

        {/* <Drawer.Screen
          name="ViewPairings"
          component={ViewPairingsScreen}
          options={{
            title: "View pairings",
            drawerIcon: ({ focused, size }) => (
              <FontAwesome name="eye" size={24} color="black" />
            ),
          }}
        /> */}

        <Drawer.Screen
          name="ViewAllPairings"
          component={ViewAllPairingsScreen}
          options={{
            title: "Popular",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="trending-up" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="ShowLatestPairings"
          component={ShowLatestPairingsScreen}
          options={{
            title: "Recent",
            drawerIcon: ({ focused, size }) => (
              <Entypo name="time-slot" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="NewPairing"
          component={NewPairingScreen}
          options={{
            title: "New",
            drawerIcon: ({ focused, size }) => (
              <AntDesign name="plus" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="Favourites"
          component={ViewFavouritesScreen}
          options={{
            title: "Favourites",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
          }}
        />

        {/* <Drawer.Screen
          name="AddToFavourites"
          component={AddToFavouritesScreen}
          options={{
            title: "Add To Favourites",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
          }}
        /> */}

        <Drawer.Screen
          name="ViewIndividualItems"
          component={ViewIndividualItemsScreen}
          options={{
            title: "Items",
            drawerIcon: ({ focused, size }) => (
              <FontAwesome5 name="hamburger" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="DeletePairing"
          component={DeletePairingScreen}
          options={{
            title: "Delete",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="delete" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Logout",
            drawerIcon: ({ focused, size }) => (
              <AntDesign name="logout" size={24} color="black" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
