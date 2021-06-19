import React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen </Text>
      {/* <Button title="Go to NewPairing" onPress={() => navigation.navigate('NewPairing')}/> */}
      {/* <Button title="Logout" onPress={() => navigation.navigate('Logout')} /> */}
    </View>
  );
}
export default HomeScreen;
