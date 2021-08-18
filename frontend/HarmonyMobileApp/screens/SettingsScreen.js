import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Auth } from "aws-amplify";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";
import { Entypo, AntDesign } from "@expo/vector-icons";
export default function SettingsScreen({ navigation, updateAuthState }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  async function signOut() {
    try {
      setLoading(true);
      setErrorAlertVisible(false);
      await Auth.signOut();
      setLoading(false);
      AppToast.ToastDisplay("Signed out");
      console.log("Success, Signed out");
      updateAuthState("loggedOut");
    } catch (error) {
      //setModalMessage must come before setErrorAlertVisible
      setModalMessage(error.message);
      setErrorAlertVisible(true);
      setLoading(false);
    }
  }

  const RightIcon = () => (
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

      <TouchableOpacity
        onPress={() => navigation.navigate("Edit Account Details")}
      >
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Account details</Text>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert("About : Under construction")}
      >
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>About</Text>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert("Theme : Under construction")}
      >
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Theme</Text>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <View style={[styles.list, styles.listContainer]}>
          <Text style={styles.listText}>Sign Out</Text>
          <AntDesign
            style={styles.rightIcon}
            name="logout"
            size={24}
            color="black"
          // color="#118AB2"
          />
        </View>
      </TouchableOpacity>
      {isErrorAlertVisible === true && (
        <AppAlert visible={true} message={modalMessage} type={"Error"} />
      )}
      {isLoading === true && <AppLoadingIcon />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: "#fff",
  },
  list: {
    padding: 20,
    marginTop: 1,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "#cccccc",
  },
  listText: {
    fontSize: 18,
    // alignSelf: "center",
  },
  rightIcon: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    right: "3%",
    top: "75%",
  },
});
