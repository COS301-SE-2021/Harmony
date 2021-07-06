import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import styles from "../styles";

function NewPairingScreen({ navigation }) {
  const addPairingURL =
    "https://p9j30pdlqi.execute-api.eu-west-1.amazonaws.com/dev";

  const [data, setData] = useState([]);

  const [FoodItem, setFoodItem] = useState("");
  const [FoodDesc, setFoodDesc] = useState("");
  const [DrinkItem, setDrinkItem] = useState("");
  const [DrinkDesc, setDrinkDesc] = useState("");
  const [Location, setLocation] = useState("");
  const [toSave, setToSave] = useState(false);

  // useEffect(() => {
  //   fetch(addPairingURL, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       DrinkDesc: DrinkDesc,
  //       DrinkItem: DrinkItem,
  //       FoodDesc: FoodDesc,
  //       FoodItem: FoodItem,
  //       Location: Location,
  //       UID: "u1",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setData(json.Data))
  //     .catch((error) => alert(error))
  //     .then(setToSave(false));
  // }, [toSave]);

  const savePairing = () => {
    return Alert.alert(
      "Save",
      "Are you sure you want to create this new pairing?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            console.log("Saving to db...");

            if (
              DrinkDesc === "" ||
              DrinkItem === "" ||
              FoodDesc === "" ||
              FoodItem === "" ||
              Location === ""
            ) {
              console.log("Empty");
              setToSave(false);
            } else {
              console.log("NOT EMPTY");
              fetch(addPairingURL, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  DrinkDesc: DrinkDesc,
                  DrinkItem: DrinkItem,
                  FoodDesc: FoodDesc,
                  FoodItem: FoodItem,
                  Location: Location,
                  UID: "u1",
                }),
              });
            }
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
    <SafeAreaView style={personalStyles.container}>
      <View style={styles.LoginContainer}>
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
    </SafeAreaView>
  );
}
const personalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default NewPairingScreen;