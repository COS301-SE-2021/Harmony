import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { ActivityIndicator, View } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { createStackNavigator } from "@react-navigation/stack";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import HomeScreen from "../screens/HomeScreen.js";
import ViewFavouritesScreen from "../screens/ViewFavouritesScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import CameraScreen from "../screens/CameraScreen.js";
import PairingResultsScreen from "../screens/PairingResultsScreen.js";
import DrinkDetailsScreen from "../screens/DrinkDetailsScreen.js";

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

const TabNavigator = (props) => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Camera" component={CameraScreen} />
      <Screen name="Favourite" component={ViewFavouritesScreen} />
      {/* <Screen name="Settings" component={SettingsNavigator} /> */}
      <Screen name="Settings">
        {(screenProps) => (
          <SettingsNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Screen>

      <Screen name="Results" component={Results} />
    </Navigator>
  );
};

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

const SettingsStack = createStackNavigator();

const SettingsNavigator = (props) => (
  <SettingsStack.Navigator
    screenOptions={{
      headerMode: "screen",
      headerStyle: {
        height: 80, // Specify the height of your custom header
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
        headerMode="none"
        screenOptions={{
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
