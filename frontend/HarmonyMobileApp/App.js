import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";

import LoginScreen from "./LoginScreen.js";
import HomeScreen from "./HomeScreen.js";
import NewPairingScreen from "./NewPairingScreen.js";
import DeletePairingScreen from "./DeletePairingScreen.js";
import ViewPairingsScreen from "./ViewPairingsScreen.js";

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

        <Drawer.Screen
          name="ViewPairings"
          component={ViewPairingsScreen}
          options={{
            title: "View pairings",
            drawerIcon: ({ focused, size }) => (
              <FontAwesome name="eye" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="NewPairing"
          component={NewPairingScreen}
          options={{
            title: "New pairings",
            drawerIcon: ({ focused, size }) => (
              <AntDesign name="plus" size={24} color="black" />
            ),
          }}
        />

        <Drawer.Screen
          name="DeletePairing"
          component={DeletePairingScreen}
          options={{
            title: "Delete pairing",
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
