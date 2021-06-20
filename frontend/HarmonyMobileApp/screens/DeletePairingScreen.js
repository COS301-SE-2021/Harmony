import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { render } from "react-dom";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";

import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

import styles from "../styles";

const DeletePairingScreen = (props) => {
  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev/viewpairings";
  const deletePairingURL =
    "https://htsec8hita.execute-api.eu-west-1.amazonaws.com/dev";
  const [isLoading, setLoading] = useState(useIsFocused());
  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [PID, setPID] = useState("");
  const [toDelete, setToDelete] = useState(false);

  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  }, [useIsFocused()]);

  useEffect(() => {
    fetch(deletePairingURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PID: PID,
      }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setToDelete(false))
      .then(setIsDeleted(true));
  }, [toDelete]);

  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setIsDeleted(false));
  }, [isDeleted]);

  const deleteItem = (obj) => {
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete this pairing?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            //setShowBox(false);
            console.log(obj.item);
            setToDelete(true);
            setPID(obj.item);
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
      <ScrollView style={personalStyles.scrollView}>
        <View style={styles.backgroundBarShowLatest}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.TextLarge}> Delete Pairing </Text>
            </View>
          </View>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ PID }, index) => PID}
              renderItem={({ item }) => (
                <View style={styles.backgroundBarShowLatest}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <View>
                      <Image
                        source={require("../assets/person.png")}
                        style={{ width: 40, height: 40, resizeMode: "contain" }}
                      />
                    </View>
                    <View>
                      <Text style={styles.TextSmall}> {item.UID} </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.TextMedium}> {item.FoodItem} </Text>
                    <View style={{ justifyContent: "center" }}>
                      <Image
                        source={require("../assets/plus.png")}
                        style={styles.smallImage}
                      />
                    </View>
                    <Text style={styles.TextMedium}> {item.DrinkItem} </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ justifyContent: "center" }}>
                      <Image
                        source={require("../assets/location.png")}
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                      />
                    </View>
                    <View>
                      <Text style={styles.TextSmall}>{item.Location}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={personalStyles.addToFavouriteBtn}
                    onPress={() => deleteItem({ item: item.PID })}
                  >
                    <AntDesign name="minuscircleo" size={60} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
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

export default DeletePairingScreen;
