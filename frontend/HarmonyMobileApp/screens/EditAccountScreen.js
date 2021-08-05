import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { AppToast } from "../Components/AppToast";
import AppAlert from "../Components/AppAlert";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import { Auth } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";

export default function EditAccountScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    Auth.currentAuthenticatedUser({}) //Get user information
      .then((data) => {
        setUser(data.username);
        setEmail(data.attributes.email);
      })
      .catch((err) => console.log(err));
  }, []); // Pass empty array to only run once on mount.

  const RightIcon = ({ iconName }) => {
    if (!iconName) {
      return <Text style={styles.rightIconText}>EDIT</Text>;
    } else if (iconName) {
      return (
        // <Text style={[styles.rightIcon, { color: "red" }]}>{iconName}</Text>
        <AntDesign style={[styles.rightIcon]} name="delete" size={28} />
      );
    }
  };

  async function DeleteUser() {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      const user = await Auth.currentAuthenticatedUser();
      // let result = await Auth.deleteUser(user);//Does not exist?
      console.log(result); // SUCCESS

      setLoading(false);

      // Add a Toast on screen.
      AppToast.ToastDisplay("Account deleted");

      // navigation.navigate("Confirm Edit Email");
    } catch (error) {
      //setModalMessage must come before setErrorAlertVisible
      console.log(error);
      setModalMessage(error.message);
      setErrorAlertVisible(true);
      setLoading(false);
    }
  }

  const deleteAccountAlert = () =>
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
        },
        { text: "Confirm", onPress: () => DeleteUser() },
      ]
    );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.list}>
        <View>
          <Text style={[styles.listText, styles.placeholderText]}>
            Username
          </Text>
          <Text style={styles.listText}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Edit Email")}>
        <View style={styles.list}>
          <View>
            <Text style={[styles.listText, styles.placeholderText]}>Email</Text>
            <Text style={styles.listText}>{email}</Text>
          </View>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Edit Password")}>
        <View style={styles.list}>
          <View>
            <Text style={[styles.listText, styles.placeholderText]}>
              Password
            </Text>
            <Text style={styles.listText}>********</Text>
          </View>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAccountAlert}>
        <View style={styles.list}>
          <View>
            <Text style={[styles.listText, { color: "red" }]}>
              Delete account
            </Text>
          </View>
          <RightIcon iconName="DELETE" />
        </View>
      </TouchableOpacity>
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
  },
  placeholderText: {
    color: "#888",
    marginBottom: 10,
  },
  rightIconText: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    right: "10%",
    top: "75%",
    fontSize: 18,
    color: "#118AB2",
  },
  rightIcon: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    right: "10%",
    top: "75%",
    color: "red",
  },
});
