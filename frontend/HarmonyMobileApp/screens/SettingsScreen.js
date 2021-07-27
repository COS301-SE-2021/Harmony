import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Auth } from "aws-amplify";
import Toast from "react-native-root-toast";

export default function SettingsScreen({ navigation, updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
      console.log("Success, Signed out");

      // Add a Toast on screen.
      Toast.show("Signed out", {
        duration: Toast.durations.SHORT,
        textColor: "#FFF",
        backgroundColor: "#696969",
        opacity: 1,
        position: -65, //Above the bottom tab bar
      });
    } catch (error) {
      console.log("Error signing out: ", updateAuthState);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
