import React, { useEffect, useState } from "react";
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


import styles from "../styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Layout, Divider, Card, Text } from '@ui-kitten/components';
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = (props) => {
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

  const onPress = () => { console.log("pressed successfully") };

  return (
    <ApplicationProvider  {...eva} theme={{ ...eva.light, ...theme }} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: "100%" }}>
          <View style={styles.Header}>
            <Text style={styles.TextLarge}> Harmony </Text>
            <TouchableOpacity onPress={onPress}>
              <Text>
                <Feather name="filter" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
          <Text>Popular pairings of the day</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ PID }, index) => PID}
              renderItem={({ item }) => (
                <View>
                  <Card style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require("../assets/waffles.jpg")}
                        style={styles.standardImage}
                      />
                      <Image
                        source={require("../assets/milkshake.jpg")}
                        style={styles.standardImage}
                      />
                    </View>
                    <View style={styles.cardText}>
                      <Text>{item.FoodItem}</Text>
                      <Text>{item.DrinkItem}</Text>
                      <Text>Pairing descr</Text>
                    </View>
                    <View style={styles.locationBar}>
                      <SimpleLineIcons name="location-pin" size={25} color="black" />
                      <Text>Location</Text>
                      <Feather name="tag" size={25} color="black" />
                      <Text style={styles.TextSmall}>Tag1,Tag2,Tag3,Tag4</Text>

                    </View>
                    <Divider />
                    <View style={styles.iconsBar}>
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Feather name="star" size={25} color="black" />
                        <Text style={{ paddingLeft: "2%", paddingVertical: "1%" }}>4.6</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Feather name="arrow-down-circle" size={25} color="black" />
                        <Text style={{ paddingLeft: "2%", paddingVertical: "1%" }}>45</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Feather name="arrow-up-circle" size={25} color="black" />
                        <Text style={{ paddingLeft: "2%", paddingVertical: "1%" }}>100</Text>
                      </View>
                      <Feather name="heart" size={25} color="black" />
                    </View>

                  </Card>
                  <Text></Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </ApplicationProvider>
  );
};
const personalStyles = StyleSheet.create({

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

export default HomeScreen;




