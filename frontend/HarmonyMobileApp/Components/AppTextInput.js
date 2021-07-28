import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
export default function AppTextInput({
  leftIcon,
  rightIcon,
  touched,
  error,
  ...otherProps
}) {
  return (
    <View style={[styles.container, borderStyle(touched, error)]}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={22}
          color="#6e6869"
          style={styles.leftIcon}
        />
      )}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#6e6869"
        {...otherProps}
      />
      {rightIcon && (
        <MaterialCommunityIcons
          name={rightIcon}
          size={22}
          color="#6e6869"
          style={styles.leftIcon}
        />
      )}
    </View>
  );
}

const borderStyle = (touched, error) => {
  if (!touched) {
    return {
      borderColor: "#ffffff00",
    };
  } else if (error) {
    return {
      borderColor: "#FF9494",
    };
  } else
    return {
      borderColor: "#42ba96",
    };
};

// not used for now
const textStyle = (touched, error) => {
  if (!touched) {
    return {
      placeholderTextColor: "#6e6869",
    };
  } else if (error) {
    return {
      placeholderTextColor: "#FF9494",
    };
  } else
    return {
      placeholderTextColor: "#42ba96",
    };
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderWidth: 0.5,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  succes: {
    borderColor: "red",
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    width: "80%",
    fontSize: 18,
    color: "#101010",
  },
});
