import React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

function ViewFavouritesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ViewFavourites Screen</Text>
      {/* <Button
          title="Go to ViewPairings... again"
          onPress={() => navigation.push('ViewPairings')}
        /> */}
      {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
      {/* <Button title="Logout" onPress={() => navigation.navigate('Logout')} /> */}
    </View>
  );
}

export default ViewFavouritesScreen;
