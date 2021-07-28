import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppTextInput({
  leftIcon,
  rightIcon,
  touched,
  error,
  ...otherProps
}) {
  const RightIcon = () => {
    if (!touched) {
      return null;
    } else if (error) {
      return (
        <MaterialCommunityIcons
          name="close-circle"
          size={22}
          color="#FF9494"
          style={styles.icon}
        />
      );
    } else
      return (
        <MaterialCommunityIcons
          name={"check-circle"}
          size={22}
          color="#42ba96"
          style={styles.icon}
        />
      );
  };

  const borderStyle = () => {
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

  return (
    <View style={[styles.container, borderStyle(touched, error)]}>
      {/* Not split into a function because there is no conditional rendering */}
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
        autoCapitalize="none"
        placeholderTextColor="#6e6869"
        {...otherProps}
      />
      {/* Split into a function because there is no conditional rendering */}
      <RightIcon />
    </View>
  );
}

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
  icon: {
    marginRight: 10,
  },
  input: {
    width: "80%",
    fontSize: 18,
    color: "#101010",
  },
});
