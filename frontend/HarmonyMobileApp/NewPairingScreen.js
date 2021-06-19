import React from 'react';
import {Text ,View ,TextInput ,Button ,TouchableOpacity } from 'react-native';


function NewPairingScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>NewPairing Screen</Text>
        {/* <Button
          title="Go to NewPairing... again"
          onPress={() => navigation.push('NewPairing')}
        /> */}
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
        {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
        {/* <Button title="Logout" onPress={() => navigation.navigate('Logout')} /> */}
      </View>
    );
  }

  export default  NewPairingScreen;
