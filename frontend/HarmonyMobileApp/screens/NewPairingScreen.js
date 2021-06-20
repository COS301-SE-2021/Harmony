import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";

import styles from "../styles";

function NewPairingScreen({ navigation }) {
  const [FoodItem, setFoodItem] = useState("");
  const [FoodDesc, setFoodDesc] = useState("");
  const [DrinkItem, setDrinkItem] = useState("");
  const [DrinkDesc, setDrinkDesc] = useState("");
  const [Location, setLocation] = useState("");

  const savePairing = () => {
    return Alert.alert(
      "Save",
      "Are you sure you want to create this new pairing?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            //setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <View style={styles.LoginContainer}>
      <StatusBar style="auto" />

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Food:"
          placeholderTextColor="#003f5c"
          onChangeText={(FoodItem) => setFoodItem(FoodItem)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Description:"
          placeholderTextColor="#003f5c"
          onChangeText={(FoodDesc) => setFoodDesc(FoodDesc)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Drink:"
          placeholderTextColor="#003f5c"
          onChangeText={(DrinkItem) => setDrinkItem(DrinkItem)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Description:"
          placeholderTextColor="#003f5c"
          onChangeText={(DrinkDesc) => setDrinkDesc(DrinkDesc)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Location:"
          placeholderTextColor="#003f5c"
          onChangeText={(Location) => setLocation(Location)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Use current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => savePairing()}
        // onPress={() => getMoviesFromApiAsync()}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NewPairingScreen;
