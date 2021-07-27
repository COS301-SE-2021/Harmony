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
  Picker,
  RefreshControl,
  StatusBar,
} from "react-native";
import styles from "../styles";
import {
  Feather, SimpleLineIcons, FontAwesome, Entypo, AntDesign
} from '@expo/vector-icons';
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Layout, Divider, Card, Text } from '@ui-kitten/components';
import { useIsFocused } from "@react-navigation/native";
import { Header, Slider } from 'react-native-elements'
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;


const HomeScreen = (props) => {
  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev";
  //The loading of the flatlist
  const [isLoading, setLoading] = useState(useIsFocused());

  //the api data
  const [data, setData] = useState([]);

  //controls all the filters
  const [isModalVisible, setModalVisible] = useState(false);                               //for the filter popup
  const [flavourProfile, setFlavourProfile] = useState("None");                            // the flavour profile filter
  const [sortPairings, setSortPairings] = useState("Trending");                            // the type of pairings shown filter
  const [mealType, setMealType] = useState("None");                                        // the mealtype filter
  const [locationValue, setLocationValue] = useState(30);                              //distance filer

  //controls all the icons
  const [favouriteIconChecked, setFavouriteIconChecked] = useState("unchecked");
  const [favouriteIconColor, setFavouriteIconColor] = useState("black");                   // controls the favourite heart color (pink/black)
  const [favouriteIconOutline, setFavouriteIconOutline] = useState("heart-outlined");      // controls whether the heart is filled in or outlined
  const [upIconChecked, setUpIconChecked] = useState("unchecked");
  const [upIconColor, setUpIconColor] = useState("black");
  const [upIconOutline, setUpIconOutline] = useState("upcircleo");
  const [downIconChecked, setDownIconChecked] = useState("unchecked");
  const [downIconColor, setDownIconColor] = useState("black");
  const [downIconOutline, setDownIconOutline] = useState("downcircleo");
  const [refreshing, setRefreshing] = React.useState(false);

  //the refreshing of the flatlist
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  //the api call for trending
  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  });
  handleDownIconPress = () => {
    if (upIconChecked == "unchecked") {
      if (downIconChecked == "unchecked") {
        setDownIconColor("#FF2727"),
          setDownIconOutline("downcircle"),
          console.log("pressed down checked"),
          setDownIconChecked("checked")
      }
      else {
        setDownIconColor("black"),
          setDownIconOutline("downcircleo"),
          console.log("pressed down unchecked"),
          setDownIconChecked("unchecked")
      }
    }
    else {

      setUpIconColor("black"),
        setUpIconOutline("upcircleo"),
        console.log("pressed up unchecked from else"),
        setUpIconChecked("unchecked"),
        setDownIconColor("#FF2727"),
        setDownIconOutline("downcircle"),
        console.log("pressed down checked from else "),
        setDownIconChecked("checked")

    }
  }

  handleUpIconPress = () => {
    if (downIconChecked == "unchecked") {
      if (upIconChecked == "unchecked") {
        setUpIconColor("#80CB41"),
          setUpIconOutline("upcircle"),
          console.log("pressed up checked"),
          setUpIconChecked("checked")
      }
      else {
        setUpIconColor("black"),
          setUpIconOutline("upcircleo"),
          console.log("pressed up unchecked"),
          setUpIconChecked("unchecked")
      }
    }
    else {

      setDownIconColor("black"),
        setDownIconOutline("downcircleo"),
        console.log("pressed down unchecked from else"),
        setDownIconChecked("unchecked"),
        setUpIconColor("#80CB41"),
        setUpIconOutline("upcircle"),
        console.log("pressed up checked from else"),
        setUpIconChecked("checked")

    }
  }

  handleFavouriteIconPress = () => {
    if (favouriteIconChecked == "unchecked") {
      setFavouriteIconColor("#FF2763"),
        setFavouriteIconOutline("heart"),
        console.log("pressed favourite checked"),
        setFavouriteIconChecked("checked")
    }
    else {
      setFavouriteIconColor("black"),
        setFavouriteIconOutline("heart-outlined"),
        console.log("pressed favourite unchecked"),
        setFavouriteIconChecked("unchecked")
    }
  }
  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {sortPairings} </Text>
  )

  const filterButton = () => (
    <View style={{ flexDirection: "row" }}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text >
          <Feather name="filter" size={22} color="white" />
        </Text>
      </Pressable>
      <Text style={{ width: "8%" }}></Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text >
          <Feather name="search" size={22} color="white" />
        </Text>
      </Pressable>
    </View>
  )

  return (
    <ApplicationProvider  {...eva} theme={{ ...eva.light, ...theme }} style={styles.container}>
      <StatusBar height="0%" barStyle="light-content" />
      <Header
        statusBarProps={{ elevated: 'true', backgroundColor: "white" }}
        //   leftComponent={searchButton}
        placement="left"
        centerComponent={< ShowTitle />}
        centerContainerStyle={{ height: "15%", }}
        containerStyle={{
          backgroundColor: 'white',
        }}
        rightComponent={filterButton} />
      <ScrollView style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ height: "100%" }}>
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
                <View style={[styles.modalView, styles.TextSmall]} >

                  <View style={styles.filterLabel}>
                    <Text style={[styles.spaceLeft, styles.TextSmall]}>Sort Pairings</Text>
                    <Text style={[styles.spaceRight, styles.TextSmaller]}> {sortPairings} </Text>
                  </View>
                  <Picker
                    sortPairings={sortPairings}
                    style={[styles.TextSmall, { height: 50, width: 150 }]}
                    onValueChange={(itemValue, itemIndex) => { setSortPairings(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="Trending" value="Trending" />
                    <Picker.Item label="Most Liked" value="Most Liked" />
                    <Picker.Item label="Newest" value="Newest" />
                    <Picker.Item label="Controversial" value="Controversial" />
                  </Picker>

                  <View style={styles.filterLabel}>
                    <Text style={[styles.spaceLeft, styles.TextSmall]}>Flavour Profile</Text>
                    <Text style={[styles.spaceRight, styles.TextSmaller]}> {flavourProfile} </Text>
                  </View>
                  <Picker
                    flavourProfile={flavourProfile}
                    style={{ height: 50, width: 150, }}
                    onValueChange={(itemValue, itemIndex) => { setFlavourProfile(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Sweet" value="Sweet" />
                    <Picker.Item label="Salty" value="Salty" />
                    <Picker.Item label="Spicy" value="Spicy" />
                    <Picker.Item label="Sour" value="Sour" />
                  </Picker>


                  <View style={styles.filterLabel}>
                    <Text style={[styles.spaceLeft, styles.TextSmall]}>Meal Type</Text>
                    <Text style={[styles.spaceRight, styles.TextSmaller]}> {mealType} </Text>
                  </View>
                  <Picker
                    mealType={mealType}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => { setMealType(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Brunch" value="Brunch" />
                    <Picker.Item label="Supper" value="Supper" />
                    <Picker.Item label="Dessert" value="Dessert" />
                  </Picker>


                  <View style={styles.filterLabel}>
                    <Text style={[styles.spaceLeft, styles.TextSmall]}>Distance</Text>
                    <Text style={[styles.spaceRight, styles.TextSmaller]}>{locationValue}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>0</Text>
                    <Slider
                      value={locationValue}
                      step={20}
                      maximumValue={100}
                      onValueChange={(value) => (console.log(value), setLocationValue(value))}
                      style={{ width: "70%", }}
                      thumbStyle={{ width: 20, height: 20, backgroundColor: "grey" }} />
                    <Text>100km</Text>
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!isModalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ PID }, index) => PID}
              renderItem={({ item }) => (
                <View style={{ paddingBottom: 15 }}>
                  <View style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                      <View style={{ flexDirection: "column", textAlign: "center", width: "50%", height: 180 }}>
                        <Image
                          source={{ uri: item.FoodImage }}
                          style={styles.standardImage}
                        />
                        <Text style={styles.cardText}>{item.FoodItem}</Text>

                      </View>

                      <View style={{ flexDirection: "column", textAlign: "center", width: "50%", height: 180 }}>
                        <Image
                          source={{ uri: item.DrinkImage }}
                          style={styles.standardImage}
                        />

                        <Text style={styles.cardText}>{item.DrinkItem}</Text>
                      </View>
                    </View>

                    <Divider />
                    <View style={styles.tagsSection}>
                      <ScrollView
                        contentContainerStyle={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}

                      >
                        <View style={styles.rowContainer}>
                          {item.FoodTags.map((tag, index) => (
                            <View style={styles.tagContainer} key={index}>
                              <FontAwesome name="tag" size={14} color="#fff" />
                              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                              {/* The filled icons look better in this case though */}
                              {/* <Feather name="tag" size={16} color="#fff" /> */}
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                          {item.DrinkTags.map((tag, index) => (
                            <View style={styles.tagContainer} key={index}>
                              <FontAwesome name="tag" size={14} color="#fff" />
                              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                              {/* The filled icons look better in this case though */}
                              {/* <Feather name="tag" size={16} color="#fff" /> */}
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                    <Divider />
                    <View style={styles.locationBar}>
                      <SimpleLineIcons name="location-pin" style={{ paddingVertical: "3%", paddingRight: "2%" }} size={26} color="black" />
                      <View style={{ alignContent: "flex-end", alignSelf: "flex-end", flex: 1, paddingRight: "1%" }}>
                        <Text style={styles.TextSmall}>{item.Location} </Text>
                        <Text style={styles.TextSmall}>35 KM</Text>
                      </View>
                    </View>
                    <Divider />

                    <View style={styles.iconsBar}>
                      <View style={{ flexDirection: "row" }}>
                        <Pressable style={{ flexDirection: "row", justifyContent: "center" }} onPress={handleDownIconPress}>
                          <AntDesign name={downIconOutline} size={24} color={downIconColor} />
                          <Text style={{ paddingLeft: "2%", paddingRight: "5%", paddingVertical: "1%", fontFamily: "sans-serif-light" }}>{item.Downvotes}</Text>
                        </Pressable>
                        <Pressable style={{ flexDirection: "row", justifyContent: "center", paddingRight: "10%" }} onPress={handleUpIconPress}>
                          <AntDesign name={upIconOutline} size={24} color={upIconColor} />
                          <Text style={{ paddingLeft: "2%", paddingVertical: "1%", fontFamily: "sans-serif-light", }}>{item.Upvotes}</Text>
                        </Pressable>

                      </View>
                      <Pressable onPress={handleFavouriteIconPress}>
                        <Entypo name={favouriteIconOutline} size={25} color={favouriteIconColor} />
                      </Pressable>
                    </View>

                  </View>
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
  drinkCard: {
    //Card style for drinks
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 3,
    resizeMode: "cover",
  },
  smallDrinkCard: {
    width: 150,
    height: 150,
  },
  bigDrinkCard: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;




