import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import {
  ActivityIndicator, View, StatusBar,
} from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { createStackNavigator } from "@react-navigation/stack";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";


import HomeScreen from "../screens/HomeScreen.js";
import FavouritesScreen from "../screens/FavouritesScreen.js";
import CreatedPairingsScreen from "../screens/CreatedPairingsScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import CameraScreen from "../screens/CameraScreen.js";
import PairingResultsScreen from "../screens/PairingResultsScreen.js";
import DrinkDetailsScreen from "../screens/DrinkDetailsScreen.js";


import NewPairingScreen from "../screens/NewPairingScreen";
import RequestNewItemScreen from "../screens/RequestNewItemScreen";
import PairingDetailsScreen from "../screens/PairingDetailsScreen";

import config from "../aws-exports";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import ConfirmSignUp from "../screens/ConfirmSignUpScreen";
import ForgotPassword from "../screens/ForgotPasswordScreen";
import ConfirmForgotPassword from "../screens/ConfirmForgotPasswordScreen";

import EditAccountScreen from "../screens/EditAccountScreen";
import EditEmailScreen from "../screens/EditEmailScreen";
import ConfirmEditEmailScreen from "../screens/ConfirmEditEmailScreen";
import EditAccountPassword from "../screens/EditAccountPasswordScreen";

import { TransitionPresets } from "@react-navigation/stack";

Amplify.configure(config);

const { Navigator, Screen } = createBottomTabNavigator();
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

const TabNavigator = (props) => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeFeed} />
      <Screen name="Camera" component={CameraScreen} />
      <Screen name="Favourite" component={PairingFeed} />
      <Screen name="SettingsScreen">
        {(screenProps) => (
          <SettingsNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Screen>

      <Screen name="Results" component={Results} />
      {/* <Screen name="PairingResults" component={PairingResultsScreen} /> */}

    </Navigator>
  );
};

const HomeStack = createStackNavigator();
function HomeFeed() {
  return (

    <HomeStack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="NewPairing"
        component={NewPairingScreen}
      />
      <HomeStack.Screen
        name="RequestNewItem"
        component={RequestNewItemScreen}
      />
      <HomeStack.Screen
        name="PairingDetails"
        component={PairingDetailsScreen}
      />
    </HomeStack.Navigator>
  );
}

const PairingStack = createStackNavigator();
function PairingFeed() {
  return (

    <PairingStack.Navigator initialRouteName="UserPairings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <PairingStack.Screen name="UserPairings" component={UserPairingsTopTabs} />
      <PairingStack.Screen
        name="NewPairing"
        component={NewPairingScreen}
      />
      <PairingStack.Screen
        name="RequestNewItem"
        component={RequestNewItemScreen}
      />
    </PairingStack.Navigator>
  );
}

const Stack = createSharedElementStackNavigator();
const Results = () => (
  <Stack.Navigator initialRouteName="PairingResultsScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="PairingResultsScreen" component={PairingResultsScreen} />
    <Stack.Screen
      name="DrinkDetailsScreen"
      component={DrinkDetailsScreen}
      options={() => options}
    />
  </Stack.Navigator>
);

const Tab = createMaterialTopTabNavigator();
const UserPairingsTopTabs = () => (

  <Tab.Navigator
    initialRouteName="Favourites"

    tabBarOptions={{
      labelStyle: {
        textAlign: "center",
        textTransform: "none", //Needed else the table titles will be all caps
        fontSize: 21,
      },
      showIcon: true, //Required for icon to show
      // showLabel: false,// to hide tab text
      activeTintColor: "#3366FF", //When this is the active tab, this will be the color of the text and icons
      inactiveTintColor: "rgba(0,0,0,0.4)",
      // backgroundColor: "rgba(0,0,0,0.1)",

      tabStyle: {
        flexDirection: "row",
        height: 110,
        paddingTop: StatusBar.currentHeight,
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
      component={FavouritesScreen}
      options={{
        tabBarLabel: "My Favourites",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="heart-o" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="UserPairings"
      component={CreatedPairingsScreen}
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

const SettingsStack = createStackNavigator();

const SettingsNavigator = (props) => (
  <SettingsStack.Navigator
    screenOptions={{
      headerMode: "screen",
      headerStyle: {
        height: 100, // Specify the height of your custom header
      },
      headerTitleStyle: {
        fontSize: 28,
        alignSelf: "center",
      },
      headerTitleContainerStyle: {
        left: 0, // Needed else the header will be offset towards the right when theres a back button
      },
      ...TransitionPresets.SlideFromRightIOS,
    }}
    initialRouteName="SettingsStack"
  >
    <SettingsStack.Screen name="Settings">
      {(screenProps) => (
        <SettingsScreen
          {...screenProps}
          updateAuthState={props.updateAuthState}
        />
      )}
    </SettingsStack.Screen>
    <SettingsStack.Screen
      name="Edit Account Details"
      component={EditAccountScreen}
    />
    <SettingsStack.Screen name="Edit Email" component={EditEmailScreen} />
    <SettingsStack.Screen
      name="Confirm Edit Email"
      component={ConfirmEditEmailScreen}
    />
    <SettingsStack.Screen
      name="Edit Password"
      component={EditAccountPassword}
    />
  </SettingsStack.Navigator>
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

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#118AB2" }}>
      <AuthenticationStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      >
        <AuthenticationStack.Screen name="SignIn">
          {(screenProps) => (
            <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AuthenticationStack.Screen>
        <AuthenticationStack.Screen name="SignUp" component={SignUp} />
        <AuthenticationStack.Screen
          name="ConfirmSignUp"
          component={ConfirmSignUp}
        />
        <AuthenticationStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <AuthenticationStack.Screen
          name="ConfirmForgotPassword"
          component={ConfirmForgotPassword}
        />
      </AuthenticationStack.Navigator>
    </View>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#118AB2" />
    </View>
  );
};

export const AppNavigator = (props) => {
  // function AppNavigator() {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log(" User is signed in");
      setUserLoggedIn("loggedIn");
    } catch (err) {
      console.log(" User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === "initializing" && <Initializing />}
      {isUserLoggedIn === "loggedIn" && (
        <TabNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === "loggedOut" && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
};
