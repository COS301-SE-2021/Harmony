import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
export default function EditAccountScreen({ navigation }) {
  const RightIcon = () => <Text style={styles.rightIcon}>EDIT</Text>;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={() => navigation.navigate("Edit Account Details")}
      >
        <View style={styles.list}>
          <View>
            <Text style={[styles.listText, styles.placeholderText]}>
              Username
            </Text>
            <Text style={styles.listText}>Example1234</Text>
          </View>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit Account Details")}
      >
        <View style={styles.list}>
          <View>
            <Text style={[styles.listText, styles.placeholderText]}>Email</Text>
            <Text style={styles.listText}>example@gmail.com</Text>
          </View>
          <RightIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit Account Details")}
      >
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 3,
  },
  list: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 1,
    flexDirection: "row",
    // justifyContent: "center",
  },
  listText: {
    fontSize: 18,
    // alignSelf: "center",
  },
  placeholderText: {
    color: "#888",
    marginBottom: 10,
  },
  rightIcon: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    right: "10%",
    top: "75%",
    fontSize: 18,
    color: "#118AB2",
  },
});
