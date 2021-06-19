import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Ionicons from 'react-native-ionicons'

import LoginScreen from './LoginScreen.js'
import HomeScreen from './HomeScreen.js'
import NewPairingScreen from './NewPairingScreen.js'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}   options={{ title: 'Harmony Login' }}/>
        <Stack.Screen name="Home" component={HomeScreen}   options={{ title: 'Welcome' }}/>
        <Stack.Screen name="NewPairing" component={NewPairingScreen}   options={{ title: 'Overview' }}/>
      </Stack.Navigator>     */}

      <Drawer.Navigator 
        initialRouteName="Home"
        openByDefault
        drawerType={'slide'}>

        
        <Drawer.Screen name="Login" component={LoginScreen}   options={{ title: 'Harmony Login' }}/>
        <Drawer.Screen name="Home" component={HomeScreen}          
        // options={{
        //    title: 'Home',
        //    drawerIcon: ({focused, size}) => (
        //       <Ionicons
        //          name="md-home"
        //          size={size}
        //          color={focused ? '#7cc' : '#ccc'}
        //       />
        //    )
        // }}
        />
        <Drawer.Screen name="NewPairing" component={NewPairingScreen}   options={{ title: 'Overview' }}/>

      </Drawer.Navigator>

    </NavigationContainer>
  );
}

export default App;