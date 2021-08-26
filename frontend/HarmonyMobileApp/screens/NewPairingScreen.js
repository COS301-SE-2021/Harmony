import * as React from 'react';
import { View, Text } from 'react-native';
import { Header } from "react-native-elements";
import styles from "../styles";

function NewPairingScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        statusBarProps={{ elevated: "true", backgroundColor: "black" }}
        placement="left"
        centerComponent={
          <Text style={{
            fontFamily: "sans-serif-light",
            fontSize: 35,
            fontWeight: "bold",
            textAlignVertical: "center",
          }}> Create New Pairing</Text>
        }
        containerStyle={{
          backgroundColor: "white",
        }}
      />
      <Text>New pairing Screen</Text>
    </View>
  );
}
export default NewPairingScreen;
