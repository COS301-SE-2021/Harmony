import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Auth } from "aws-amplify";
import { AppToast } from "../Components/AppToast";

export default function SettingsScreen({ navigation, updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
      AppToast.ToastDisplay("Signed out");
      console.log("Success, Signed out");
    } catch (error) {
      console.log("Error signing out: ", updateAuthState);
    }
  }

  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Button title="Sign Out" color="tomato" onPress={signOut} />
    // </View>

    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={styles.list}>
          <Text>Personal details</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={styles.list}>
          <Text>About</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={styles.list}>
          <Text>Theme</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <View style={styles.list}>
          <Text>Signout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  list: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
  },
});
