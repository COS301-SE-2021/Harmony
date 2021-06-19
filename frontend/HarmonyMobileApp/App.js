import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen.js'
import HomeScreen from './HomeScreen.js'
import NewPairingScreen from './NewPairingScreen.js'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}   options={{ title: 'Harmony Login' }}/>
        <Stack.Screen name="Home" component={HomeScreen}   options={{ title: 'Welcome' }}/>
        <Stack.Screen name="NewPairing" component={NewPairingScreen}   options={{ title: 'Overview' }}/>
      </Stack.Navigator>     
    </NavigationContainer>
  );
}

export default App;