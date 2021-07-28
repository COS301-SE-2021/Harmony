import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  Pressable,
  Picker,
  RefreshControl,
  StatusBar,
} from "react-native";
import styles from "../styles";
import {
  Feather, SimpleLineIcons, FontAwesome, Entypo, AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons';
import Modal from "react-native-modal";
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Layout, Divider, Card, Text } from '@ui-kitten/components';
import { useIsFocused } from "@react-navigation/native";
import { Header, Slider, CheckBox } from 'react-native-elements'
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
  const [sortPairings, setSortPairings] = useState("Trending");                            // the type of pairings shown filter
  const [mealType, setMealType] = useState("None");                                        // the mealtype filter
  const [locationValue, setLocationValue] = useState(30);                              //distance filer


  const [FoodSalty, setFoodSaltySelected] = useState("#F3F2F2");
  const [FoodSweet, setFoodSweetSelected] = useState("#F3F2F2");
  const [FoodSour, setFoodSourSelected] = useState("#F3F2F2");
  const [FoodSavoury, setFoodSavourySelected] = useState("#F3F2F2");
  const [FoodHot, setFoodHotSelected] = useState("#F3F2F2");
  const [FoodWarm, setFoodWarmSelected] = useState("#F3F2F2");
  const [FoodCold, setFoodColdSelected] = useState("#F3F2F2");

  const [DrinkSalty, setDrinkSaltySelected] = useState("#F3F2F2");
  const [DrinkSweet, setDrinkSweetSelected] = useState("#F3F2F2");
  const [DrinkSour, setDrinkSourSelected] = useState("#F3F2F2");
  const [DrinkHot, setDrinkHotSelected] = useState("#F3F2F2");
  const [DrinkWarm, setDrinkWarmSelected] = useState("#F3F2F2");
  const [DrinkCold, setDrinkColdSelected] = useState("#F3F2F2");

  const [Breakfast, setBreakfastSelected] = useState("#F3F2F2");
  const [Lunch, setLunchSelected] = useState("#F3F2F2");
  const [Supper, setSupperSelected] = useState("#F3F2F2");
  const [Snack, setSnackSelected] = useState("#F3F2F2");

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
  //toggles the modals visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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


  handleDrinkSaltySelected = () => {
    if (DrinkSalty == "#F3F2F2") {
      setDrinkSaltySelected("#1FBFBA"),
        console.log("Drink Salty checked")
    }
    else {
      setDrinkSaltySelected("#F3F2F2"),
        console.log(" Drink Salty unchecked")
    }
  }
  handleDrinkSweetSelected = () => {
    if (DrinkSweet == "#F3F2F2") {
      setDrinkSweetSelected("#1FBFBA"),
        console.log("Drink sweet checked")
    }
    else {
      setDrinkSweetSelected("#F3F2F2"),
        console.log(" Drink sweet unchecked")
    }
  }
  handleDrinkSourSelected = () => {
    if (DrinkSour == "#F3F2F2") {
      setDrinkSourSelected("#1FBFBA"),
        console.log("Drink sour checked")
    }
    else {
      setDrinkSourSelected("#F3F2F2"),
        console.log(" Drink sour unchecked")
    }
  }
  handleDrinkHotSelected = () => {
    if (DrinkHot == "#F3F2F2") {
      setDrinkHotSelected("#1FBFBA"),
        console.log("Drink Hot checked")
    }
    else {
      setDrinkHotSelected("#F3F2F2"),
        console.log(" Drink Hot unchecked")
    }
  }
  handleDrinkWarmSelected = () => {
    if (DrinkWarm == "#F3F2F2") {
      setDrinkWarmSelected("#1FBFBA"),
        console.log("Drink warm checked")
    }
    else {
      setDrinkWarmSelected("#F3F2F2"),
        console.log(" Drink warm unchecked")
    }
  }
  handleDrinkColdSelected = () => {
    if (DrinkCold == "#F3F2F2") {
      setDrinkColdSelected("#1FBFBA"),
        console.log("Drink cold checked")
    }
    else {
      setDrinkColdSelected("#F3F2F2"),
        console.log(" Drink cold unchecked")
    }
  }
  handleBreakfastSelected = () => {
    if (Breakfast == "#F3F2F2") {
      setBreakfastSelected("#DD6E42")
    }
    else {
      setBreakfastSelected("#F3F2F2")
    }
  }
  handleLunchSelected = () => {
    if (Lunch == "#F3F2F2") {
      setLunchSelected("#DD6E42")
    }
    else {
      setLunchSelected("#F3F2F2")
    }
  }
  handleSupperSelected = () => {
    if (Supper == "#F3F2F2") {
      setSupperSelected("#DD6E42")
    }
    else {
      setSupperSelected("#F3F2F2")
    }
  }
  handleSnackSelected = () => {
    if (Snack == "#F3F2F2") {
      setSnackSelected("#DD6E42")
    }
    else {
      setSnackSelected("#F3F2F2")
    }
  }

  handleFoodSaltySelected = () => {
    if (FoodSalty == "#F3F2F2") {
      setFoodSaltySelected("#1FBFBA"),
        console.log("Food Salty checked")
    }
    else {
      setFoodSaltySelected("#F3F2F2"),
        console.log(" Food Salty unchecked")
    }
  }
  handleFoodSavourySelected = () => {
    if (FoodSalty == "#F3F2F2") {
      setFoodSavourySelected("#1FBFBA"),
        console.log("Food Salty checked")
    }
    else {
      setFoodSavoourySelected("#F3F2F2"),
        console.log(" Food Salty unchecked")
    }
  }
  handleFoodSweetSelected = () => {
    if (FoodSweet == "#F3F2F2") {
      setFoodSweetSelected("#1FBFBA"),
        console.log("Food sweet checked")
    }
    else {
      setFoodSweetSelected("#F3F2F2"),
        console.log(" Food sweet unchecked")
    }
  }
  handleFoodSourSelected = () => {
    if (FoodSour == "#F3F2F2") {
      setFoodSourSelected("#1FBFBA"),
        console.log("Food sour checked")
    }
    else {
      setFoodSourSelected("#F3F2F2"),
        console.log(" Food sour unchecked")
    }
  }
  handleFoodHotSelected = () => {
    if (FoodHot == "#F3F2F2") {
      setFoodHotSelected("#1FBFBA"),
        console.log("Food Hot checked")
    }
    else {
      setFoodHotSelected("#F3F2F2"),
        console.log(" Food Hot unchecked")
    }
  }
  handleFoodWarmSelected = () => {
    if (FoodWarm == "#F3F2F2") {
      setFoodWarmSelected("#1FBFBA"),
        console.log("Food warm checked")
    }
    else {
      setFoodWarmSelected("#F3F2F2"),
        console.log(" Food warm unchecked")
    }
  }
  handleFoodColdSelected = () => {
    if (FoodCold == "#F3F2F2") {
      setFoodColdSelected("#1FBFBA"),
        console.log("Food cold checked")
    }
    else {
      setFoodColdSelected("#F3F2F2"),
        console.log(" Food cold unchecked")
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
              isVisible={isModalVisible}
              onBackButtonPress={toggleModal}
              onBackdropPress={toggleModal}
              animationIn={"slideInRight"}
              animationOut={"slideOutRight"}
              swipeDirection={["up", "left", "right", "down"]}
              onSwipeComplete={toggleModal}
            >
              <View style={styles.centeredView}>
                <View style={[styles.modalView, styles.TextSmall]} >
                  <View>
                    <Text style={[styles.TextMedium, { fontWeight: "bold", paddingBottom: "7%" }]}>Filter Pairings</Text>
                  </View>

                  <View style={styles.filterView}>
                    <View style={styles.filterLabel}>
                      <Text style={[styles.spaceLeft, styles.TextSmall]}>Sort Pairings</Text>
                      <View style={styles.spaceRight}>
                        <AntDesign name="caretdown" size={12} style={{ paddingVertical: "10%", marginLeft: 10 }} color="#7C7C7C" />
                        <Text style={[styles.TextSmaller]}> {sortPairings} </Text>
                      </View>
                    </View>
                    <View style={{ opacity: 0, zIndex: 100, marginTop: "-23%", marginRight: "-55%", }}>
                      <Picker
                        sortPairings={sortPairings}
                        style={[styles.TextSmall, { height: 40, width: 120, }]}
                        onValueChange={(itemValue, itemIndex) => { setSortPairings(itemValue); console.log(itemValue) }}
                      >
                        <Picker.Item label="Trending" value="Trending" />
                        <Picker.Item label="Most Liked" value="Most Liked" />
                        <Picker.Item label="Newest" value="Newest" />
                        <Picker.Item label="Controversial" value="Controversial" />
                      </Picker>
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>


                  <View style={styles.filterView}>
                    <View style={[styles.filterLabel]}>
                      <Text style={[styles.spaceLeft, styles.TextSmall]}>Meal Type</Text>

                      <Pressable
                        onPress={handleBreakfastSelected}
                        style={[styles.tag, { backgroundColor: Breakfast }]}
                      >
                        <Text style={styles.TextSmaller}>Breakfast</Text>

                      </Pressable>
                      <Pressable
                        onPress={handleLunchSelected}
                        style={[styles.tag, { backgroundColor: Lunch }]}
                      >
                        <Text style={styles.TextSmaller}>Lunch</Text>

                      </Pressable>
                      <Pressable
                        onPress={handleSupperSelected}
                        style={[styles.tag, { backgroundColor: Supper }]}
                      >
                        <Text style={styles.TextSmaller}>Supper</Text>

                      </Pressable>
                      <Pressable
                        onPress={handleSnackSelected}
                        style={[styles.tag, { backgroundColor: Snack }]}
                      >
                        <Text style={styles.TextSmaller}>Snack</Text>

                      </Pressable>
                    </View>


                    <View style={[styles.filterView, styles.centeredView]}>
                      <View style={[styles.filterLabel]}>
                        <Text style={[styles.spaceLeft, styles.TextSmall]}>Drinks</Text>
                      </View>
                      <View style={{ flexDirection: "row", }}>
                        <Pressable
                          onPress={handleDrinkSaltySelected}
                          style={[styles.tag, { backgroundColor: DrinkSalty }]}
                        >
                          <Text style={styles.TextSmaller}>Salty</Text>

                        </Pressable>
                        <Pressable
                          onPress={handleDrinkSweetSelected}
                          style={[styles.tag, { backgroundColor: DrinkSweet }]}
                        >
                          <Text style={styles.TextSmaller}>Sweet</Text>

                        </Pressable>

                        <Pressable
                          onPress={handleDrinkSourSelected}
                          style={[styles.tag, { backgroundColor: DrinkSour }]}
                        >
                          <Text style={styles.TextSmaller}>Sour</Text>

                        </Pressable>
                      </View>
                      <View style={{ flexDirection: "row", }}>

                        <Pressable
                          onPress={handleDrinkHotSelected}
                          style={[styles.tag, { backgroundColor: DrinkHot }]}
                        >
                          <Text style={styles.TextSmaller}>Hot</Text>

                        </Pressable>
                        <Pressable
                          onPress={handleDrinkWarmSelected}
                          style={[styles.tag, { backgroundColor: DrinkWarm }]}
                        >
                          <Text style={styles.TextSmaller}>Warm</Text>

                        </Pressable>

                        <Pressable
                          onPress={handleDrinkColdSelected}
                          style={[styles.tag, { backgroundColor: DrinkCold }]}
                        >
                          <Text style={styles.TextSmaller}>Cold</Text>

                        </Pressable>




                      </View>
                    </View>


                    <View style={[styles.filterView, styles.centeredView]}>
                      <View style={[styles.filterLabel]}>
                        <Text style={[styles.spaceLeft, styles.TextSmall]}>Food</Text>
                      </View>
                      <View style={{ flexDirection: "row", }}>
                        <Pressable
                          onPress={handleFoodSaltySelected}
                          style={[styles.tag, { backgroundColor: FoodSalty }]}
                        >
                          <Text style={styles.TextSmaller}>Salty</Text>

                        </Pressable>
                        <Pressable
                          onPress={handleFoodSweetSelected}
                          style={[styles.tag, { backgroundColor: FoodSweet }]}
                        >
                          <Text style={styles.TextSmaller}>Sweet</Text>

                        </Pressable>

                        <Pressable
                          onPress={handleFoodSourSelected}
                          style={[styles.tag, { backgroundColor: FoodSour }]}
                        >
                          <Text style={styles.TextSmaller}>Sour</Text>

                        </Pressable>

                        <Pressable
                          onPress={handleFoodSavourySelected}
                          style={[styles.tag, { backgroundColor: FoodSavoury }]}
                        >
                          <Text style={styles.TextSmaller}>Savoury</Text>

                        </Pressable>
                      </View>
                      <View style={{ flexDirection: "row", }}>

                        <Pressable
                          onPress={handleFoodHotSelected}
                          style={[styles.tag, { backgroundColor: FoodHot }]}
                        >
                          <Text style={styles.TextSmaller}>Hot</Text>

                        </Pressable>
                        <Pressable
                          onPress={handleFoodWarmSelected}
                          style={[styles.tag, { backgroundColor: FoodWarm }]}
                        >
                          <Text style={styles.TextSmaller}>Warm</Text>

                        </Pressable>

                        <Pressable
                          onPress={handleFoodColdSelected}
                          style={[styles.tag, { backgroundColor: FoodCold }]}
                        >
                          <Text style={styles.TextSmaller}>Cold</Text>

                        </Pressable>




                      </View>
                    </View>






                  </View>
                  <Text style={{ height: 7 }}></Text>
                  <View style={styles.filterView}>
                    <View style={[styles.filterLabel]}>
                      <Text style={[styles.spaceLeft, styles.TextSmall]}>Distance</Text>
                      <View style={styles.spaceRight}>
                        <Text></Text>
                        <Text style={[styles.TextSmaller]}>{locationValue}KM</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Slider
                        value={locationValue}
                        step={20}
                        maximumValue={100}
                        onValueChange={(value) => (console.log(value), setLocationValue(value))}
                        style={{ width: "70%", }}
                        thumbStyle={{ width: 20, height: 20, backgroundColor: "grey" }} />
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!isModalVisible)}
                  >
                    <Text style={styles.textStyle}>Apply</Text>
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
                              {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                              <MaterialIcons name="fastfood" size={14} color="#fff" />
                              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                              {/* The filled icons look better in this case though */}
                              {/* <Feather name="tag" size={16} color="#fff" /> */}
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}

                          {item.FoodTags.map((tag, index) => (
                            <View style={[styles.tagContainer, { backgroundColor: "#C41ED4" }]} key={index}>
                              {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                              <FontAwesome5 name="hamburger" size={14} color="#fff" />
                              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                              {/* The filled icons look better in this case though */}
                              {/* <Feather name="tag" size={16} color="#fff" /> */}
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                          {item.DrinkTags.map((tag, index) => (
                            <View style={[styles.tagContainer, { backgroundColor: "#1FBFBA" }]}
                              key={index}>
                              {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                              <MaterialCommunityIcons name="cup" size={14} color="#fff" />
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
    </ApplicationProvider >
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




