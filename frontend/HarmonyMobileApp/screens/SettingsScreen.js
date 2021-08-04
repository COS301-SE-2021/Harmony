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
import { Entypo } from "@expo/vector-icons";
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

  const Icon = () => (
    <Entypo
      name="chevron-thin-right"
      size={24}
      color="black"
      // color="#118AB2"
      style={styles.rightIcon}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Account details</Text>
          <Icon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>About</Text>
          <Icon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Theme</Text>
          <Icon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Signout</Text>
          <Icon />
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
    flexDirection: "row",
    justifyContent: "center",
  },
  listText: {
    fontSize: 18,
    alignSelf: "center",
  },
  rightIcon: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    right: "3%",
    top: "75%",
  },
});
