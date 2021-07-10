import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  Modal,
  Pressable,
  Picker
} from "react-native";
import styles from "../styles";
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [flavourProfile, setFlavourProfile] = useState("None");
  const [mealType, setMealType] = useState("None");

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
    <ApplicationProvider  {...eva} theme={{ ...eva.light, ...theme }} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: "100%" }}>
          <View style={styles.Header}>
            <Text style={styles.TextLarge}> Harmony </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!isModalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView} >
                    <Text>Flavour Profile</Text>
                    <Picker
                      flavourProfile={flavourProfile}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => setFlavourProfile(itemValue)}
                    >
                      <Picker.Item label="None" value="None" />
                      <Picker.Item label="Sweet" value="Sweet" />
                      <Picker.Item label="Salty" value="Salty" />
                      <Picker.Item label="Spicy" value="Spicy" />
                      <Picker.Item label="Sour" value="Sour" />
                    </Picker>
                    <Divider />
                    <Text>Meal Type</Text>
                    <Picker
                      mealType={mealType}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => setMealType(itemValue)}
                    >
                      <Picker.Item label="None" value="None" />
                      <Picker.Item label="Breakfast" value="Breakfast" />
                      <Picker.Item label="Brunch" value="Brunch" />
                      <Picker.Item label="Supper" value="Supper" />
                      <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>
                    <Divider />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!isModalVisible)}
                    >
                      <Text style={styles.textStyle}>close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text >
                  <Feather name="filter" size={24} color="white" />
                </Text>
              </Pressable>
            </View>

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
                    <View >
                      <View style={styles.cardText}>
                        <Text>{item.FoodItem}</Text>
                        <Text>{item.DrinkItem}</Text>
                      </View>
                      <View>
                        <Text style={{ textAlign: "center" }}>Pairing descr</Text>
                      </View>
                    </View>

                    <View style={styles.tagBar}>
                      <Text style={styles.tag}><Feather name="tag" size={15} color="white" />Salty</Text>
                      <Text style={styles.tag}><Feather name="tag" size={15} color="white" />Dessert</Text>
                    </View><View style={styles.tagBar}>
                      <Text style={styles.tag}><Feather name="tag" size={15} color="white" />Medium Sized</Text>
                      <Text style={styles.tag}><Feather name="tag" size={15} color="white" />Contains Dairy</Text>
                    </View>
                    <View style={styles.locationBar}>
                      <SimpleLineIcons name="location-pin" size={25} color="black" />
                      <Text>14 Prospect Street, Pretoria, Gauteng </Text>

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
                      <Pressable onPress={showConfirmDialog}>
                        <Feather name="heart" size={25} color="black" />
                      </Pressable>
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




