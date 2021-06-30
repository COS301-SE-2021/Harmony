import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { render } from "react-dom";
import {
  View,
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
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import styles from "../styles";
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const ViewAllPairingsScreen = (navigation) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev/viewpairings";
  const [isLoading, setLoading] = useState(useIsFocused());
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  });

  const showConfirmDialog = () => {
    return Alert.alert(
      "Add to Favourites",
      "Are you sure you want to Favourite this pairing?",
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
    <SafeAreaView style={personalStyles.container}>
      <TopNavigation
        title="Popular"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />

      <View style={styles.backgroundBarShowLatest}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.TextLarge}> Popular Pairings </Text>
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
                <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={require("../assets/favourites.png")}
                      style={{ width: 40, height: 40, resizeMode: "contain" }}
                    />
                  </View>
                  <View>
                    <Text style={styles.TextSmall}> Add to favourites</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const personalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 130,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  addToFavouriteBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8d918d",
    flexDirection: "row",
  },
});

export default ViewAllPairingsScreen;
