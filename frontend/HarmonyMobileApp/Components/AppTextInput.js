import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppTextInput({
  leftIcon,
  touched,
  error,
  ...otherProps
}) {
  return (
    <View style={[styles.container, validStyle(touched, error)]}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={22}
          color="#6e6869"
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="#6e6869"
        secureTextEntry={true}
        textContentType="oneTimeCode"
        {...otherProps}
      />
    </View>
  );
}

const validStyle = (touched, error) => {
  if (!touched) {
    return {
      borderColor: "white",
    };
  } else if (error) {
    return {
      borderColor: "red",
    };
  } else
    return {
      borderColor: "green",
    };
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
  },
  succes: {
    borderColor: "red",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: "80%",
    fontSize: 18,
    color: "#101010",
  },
});
