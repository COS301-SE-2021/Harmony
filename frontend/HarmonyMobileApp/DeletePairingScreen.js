import React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

function DeletePairingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>DeletePairing Screen</Text>
      {/* <Button
          title="Go to DeletePairing... again"
          onPress={() => navigation.push('DeletePairing')}
        /> */}
      {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
      {/* <Button title="Logout" onPress={() => navigation.navigate('Logout')} /> */}
    </View>
  );
}

export default DeletePairingScreen;
